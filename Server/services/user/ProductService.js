const { USER_DATA } = require('../../models/UserAuthModel')
const { USER_CART } = require('../../models/UserCartModel')
const { PRODUCTS_DB } = require('../../models/ProductModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.addtoCart = async ({ userId, productid, size, activeIn, productimg }) => {
    var ProductSize = size
    var productColor = activeIn
    var user_pass_token, img
    var userID = userId || ''

    if (!size) ProductSize = 'M'

    const findProduct = await PRODUCTS_DB.findOne({ PRODUCT_id: productid })

    const findUserCart = await USER_CART.findOne({ USER_CART_id: userID })

    if (activeIn) img = findProduct.Colors.find(col => col.hexcode == activeIn)
    else {
        img = findProduct.Colors.find(col => col.img_url == productimg)
        productColor = img.hexcode
    }

    const PRODUCTID = productid + '-' + ProductSize + '-' + productColor;
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
        await createCart.save()
        return { status: 200, message: 'Created and Added to cart', client_token: user_pass_token }
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

        return { status: 200, message: 'product existed and updated' }
    }

    // if none of the above condition do this  if the  product doesnot exist
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

    return { status: 200, message: 'Added to cart' }
}

exports.updateCart = async ({ userId, product_item_id, quantityCount, finalPrice }) => {
    const [id, size, color] = product_item_id.split('-');

    // this is to update quantity and price of product in cart of user

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

    const pipeline = [
        {
            $set: {
                Total_Price: { $sum: "$Products.payable_amount" },
                Total_Quantity: { $sum: "$Products.Quantity" }
            }
        }
    ];

    await USER_CART.updateOne({ USER_CART_id: userId }, pipeline);

    return { status: 200 }
}

exports.getCartProducts = async (userId) => {

    const findUser = await USER_DATA.findOne({ _id: userId })

    if (!findUser) return { status: 404, message: 'User not found' };

    const findCart = await USER_CART.findOne({ USER_CART_id: userId })

    if (!findCart) {
        return { status: 204, message: 'No Products' }
    }

    return { status: 200, cartProducts: findCart }
}

exports.getProducts = async () => {
    const products = await PRODUCTS_DB.find({})
    return { products: products, status: 200 }
}

exports.getProductToBuy = async (params_productID) => {
    const findProduct = await PRODUCTS_DB.findOne({ PRODUCT_id: params_productID })
    return { status: 200, product: findProduct }
}

exports.deleteItem = async (userId, product) => {
    const decoded = decodeURIComponent(product);

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
                Total_Price: findCart.Total_Price - pro.payable_amount,
            }
        }
    );

    const totalpr = await USER_CART.findOne({ USER_CART_id: userId })
    if (totalpr.Total_Quantity == 0) {
        await USER_CART.deleteOne({ USER_CART_id: userId })
    }

    return { status: 200, message: 'Product deleted from cart' };
}
