const mongoose = require('mongoose')
const { USER_DATA, USER_CART, PRODUCTS_DB, TEMP_OTP, ORDER_DB } = require('../models/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const {sendOtpEmail} = require('../services/mailer')
require('dotenv').config()
const {v4:uuidv4} = require('uuid')

// add items to cart: if cart exist push them into products array
// add items to cart: if cart doesnot exist create a cart and then add it to the array of Products

exports.addtoCart = async (req, res) => {
    const { token } = req.headers
    const { productid, size, activeIn, productimg } = req.body
    try {
        var ProductSize = size
        var productColor = activeIn
        var user_pass_token,img
        var userID = ''
        if (!size) ProductSize = 'M'

        const { userId } = jwt.verify(token, process.env.JWT_KEY)
        userID = userId


        const findProduct = await PRODUCTS_DB.findOne({ PRODUCT_id: productid })

        const findUserCart = await USER_CART.findOne({ USER_CART_id: userID })

        if (activeIn) img = findProduct.Colors.find(col => col.hexcode == activeIn)
        else {
            img = findProduct.Colors.find(col => col.img_url == productimg)
            productColor = img.hexcode
        }

        const PRODUCTID = productid + '-' + ProductSize + '-' + productColor
        const NEW_PRODUCT = {
            Price: findProduct.Discounted_Price,
            product_id: PRODUCTID,
            product_name: findProduct.Product_name,
            Quantity: 1,
            payable_amount: findProduct.Discounted_Price,
            product_img_url: img.img_url,
            Size: ProductSize,
            Color: productColor,
        }
        // console.log(NEW_PRODUCT)
        // check if user cart does not  exist create one..
        if (!findUserCart) {
            const createCart = await USER_CART({
                USER_CART_id: userID,
                Products: [
                    NEW_PRODUCT

                ],
                Total_Quantity: 1,
                Total_Price: findProduct.Discounted_Price,
            })
            // you can update the terms or data by storing it in a new variable and then uploading or updating itf

            createCart.save()
            return res.json({ status: 200, message: 'Created and Added to cart',client_token:user_pass_token })
        }

        // if cart exist
        // check if product exist or not if yes then only increase it's qunatity count
        const If_Product_exist = findUserCart.Products.find(product => product.product_id == PRODUCTID)
        if (If_Product_exist) {
            const updateField = {
                Quantity: If_Product_exist.Quantity + 1,
                payable_amount: findProduct.Discounted_Price * (If_Product_exist.Quantity + 1),
            }

            const updateObj = {}
            for (const key in updateField) {
                updateObj[`Products.$.${key}`] = updateField[key]
            }

            await USER_CART.updateOne(
                { USER_CART_id: userID, 'Products.product_id': PRODUCTID },
                {
                    $set: updateObj
                })
                
            const pipeline = [
                {
                    $set: {
                        Total_Price: { $sum: "$Products.payable_amount" },
                        Total_Quantity: { $sum: "$Products.Quantity" }
                    }
                }
            ];

            await USER_CART.updateOne({ USER_CART_id: userID }, pipeline)

            return res.json({ status: 200, message: 'product existed and updated'})
        }


        // if none of the above condition do this  if the  product doesnot exist

        // await findUserCart.updateOne({ $push: { Products: NEW_PRODUCT },$set:{Total_Quantity:} })
        const prooo = await USER_CART.findOne({ USER_CART_id: userID });
        await USER_CART.updateOne(
            { USER_CART_id: userID },
            {
                $push: { Products: NEW_PRODUCT },
                $set: {
                    Total_Quantity: prooo.Total_Quantity + 1,
                    Total_Price: prooo.Total_Price + NEW_PRODUCT.payable_amount
                }
            }
        );
        

    return res.json({ status: 200, message: 'Added to cart' })

} catch (error) {
    console.log(error)
}
}

// this controller is to update the products inside the cart i.e deleting the product or change in quantity and size affects price

exports.updateCart = async (req, res) => {
    const { token } = req.headers
    const { product_item_id, quantityCount, finalPrice } = req.body
    const [id, size, color] = product_item_id.split('-');
    try {
        // this is to update quantity and price of product in cart of user
        const { userId } = jwt.verify(token, process.env.JWT_KEY)

        const updateField = {
            Quantity: quantityCount,
            payable_amount: finalPrice
        }
        

        const updateObj = {}
        for (const key in updateField) {
            updateObj[`Products.$.${key}`] = updateField[key]


        }

        await USER_CART.updateOne(
            { USER_CART_id: userId, 'Products.product_id': id + '-' + size + '-' + color },
            {
                $set: updateObj
            })


        // const cart = await USER_CART.findOne({ USER_CART_id: userId })
        const pipeline = [
            {
                $set: {
                    Total_Price: { $sum: "$Products.payable_amount" },
                    Total_Quantity: { $sum: "$Products.Quantity" }
                }
            }
        ];

        const result = await USER_CART.updateOne({ USER_CART_id: userId }, pipeline);

        return res.json({ status: 200 })
    } catch (error) {
        console.log('update cart error', error)
    }
}


// controller to send the cart data to user's cart to show it on ui

exports.getCartProducts = async (req, res) => {

    const { token } = req.headers

    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY)

        const findUser = await USER_DATA.findOne({ _id: userId })

        if (!findUser) return res.json({ status: 404, message: 'User not found' });

        const findCart = await USER_CART.findOne({ USER_CART_id: userId })

        if (!findCart) {
            return res.json({ status: 204, message: 'No Products' })
        }


        return res.json({ status: 200, cartProducts: findCart })


    } catch (error) {
        // console.log('getcartProduct error:', error)
        return res.json({ status: 404, message: 'kindly login' })
    }
}



// gives all the data of products to the ui

exports.getProducts = async (req, res) => {

    try {
        const products = await PRODUCTS_DB.find({})
        // console.log(products)
        return res.json({ products: products, status: 200 })


    } catch (error) {
        console.log(error)
    }


}

// ==============================================================


exports.getProductToBuy = async (req, res) => {
    const { params_productID } = req.params

    try {

        const findProduct = await PRODUCTS_DB.findOne({ PRODUCT_id: params_productID })

        return res.json({ status: 200, product: findProduct })


    } catch (error) {
        console.log(error)
    }
}



exports.deleteItem = async (req, res) => {

    const { token } = req.headers;
    const { product } = req.params; // Assuming product is the parameter containing productid-size-color
    //console.log('Encoded product:', product); // Logging the encoded parameter for debugging

    const decoded = decodeURIComponent(product); // Decoding the URL parameter
    //console.log('Decoded product:', decoded); // Logging the decoded parameter for debugging

    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY);

        const findCart = await USER_CART.findOne({ USER_CART_id: userId });
        const pro = findCart.Products.find(p => p.product_id == decoded);


        await USER_CART.updateOne(
            { USER_CART_id: userId },
            {
                $pull: {
                    Products: {
                        product_id: decoded,
                    }
                },
                $set: {
                    Total_Quantity: findCart.Total_Quantity - pro.Quantity,
                    Total_Price: findCart.Total_Price -  pro.payable_amount,
                }
            }
        );
        const totalpr = await USER_CART.findOne({ USER_CART_id: userId })
        if (totalpr.Total_Quantity == 0) {
            await USER_CART.deleteOne({ USER_CART_id: userId })
        }

        return res.json({ status: 200, message: 'Product deleted from cart' });

    } catch (error) {
        console.log("delete item error:", error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

}

// ====================================================================================
// ====================================================================================


exports.requestMail = async (req, res) => {

    const { token } = req.headers
    const { email, mobile } = req.body



    try {
        // console.log(';ld')
        const { userId } = jwt.verify(token, process.env.JWT_KEY)
        const findUser = await USER_DATA.findOne({ _id: userId })
        if (!findUser) return res.json({ status: 404, error: 'error occured' })


        const findOTP = await TEMP_OTP.findOne({ USER_ID: userId, Request_Mail: email })
        // if (findOTP){
            await TEMP_OTP.deleteOne({USER_ID:userId,Request_Mail:email})
            //return res.json({ status: 429 }) 
        // } //429 is for too many requests

        const orderid = uuidv4()

        const createToken = jwt.sign({ userID: userId, mail: email, phone: mobile ,user_order_id:orderid}, process.env.JWT_KEY)
        

        const otp = crypto.randomInt(100000,1000000)
        const temp_Cred = await TEMP_OTP({
            USER_ID: userId,
            Request_Mail: email,
            OTP: otp,
            token: createToken
        })
        await temp_Cred.save()
        // console.log(email,otp)
        sendOtpEmail(email, otp)
        return res.json({ status: 200, message: 'done', verificationToken: createToken })
    } catch (error) {
        console.log(error)
    }
}

exports.checkotp = async (req, res) => {
    const { specialtoken } = req.headers
    const { otp } = req.body
    try {
        const { userID, mail } = jwt.verify(specialtoken, process.env.JWT_KEY)

        const findOtp = await TEMP_OTP.findOne({ USER_ID: userID, Request_Mail: mail })

        //check otp:
        if (findOtp.OTP == otp) {
            await TEMP_OTP.deleteOne({ USER_ID: userID })
            return res.json({ status: 200, message: 'Verified' })
        }
        else return res.json({ status: 202, message: 'not verified' })
    } catch (error) {
        console.log('checkotp eroro', error)
    }
}


exports.order = async (req, res) => {
    const { token, specialtoken } = req.headers
    const { values } = req.body
    try {       

        const { userID, mail, phone,user_order_id } = jwt.verify(specialtoken, process.env.JWT_KEY)
        const findCart = await USER_CART.findOne({ USER_CART_id: userID })

        const findOrder = await ORDER_DB.findOne({ USER_ORDER_ID: user_order_id })
        if (findOrder) return res.json({ status: 204, message: 'Order Exist' })
        

        const createORDER = await ORDER_DB({
            CART_ID: findCart._id,
            USER_ID: userID,
            USER_ORDER_ID:user_order_id,
            USER_DETAILS: { ...values, email: mail, mobile: phone },
            Total_Quantity:findCart.Total_Quantity,
            Total_Price:findCart.Total_Price
        })
        await createORDER.save()
        return res.json({ status: 200, message: 'Completed' })

    } catch (error) {
        return res.json({stauts:404,erorr:error})
    }
}



