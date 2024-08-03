require('dotenv').config()

const jwt = require('jsonwebtoken')
const { ADMIN_DB } = require('../models/adminDB')
const { USER_DATA, PRODUCTS_DB, ORDER_DB } = require('../models/database')
const AdminRouter = require('../routes/AdminRoutes')


exports.getUsers = async (req, res) => {

    const { token } = req.headers

    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)

        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })



        // the -password -_id this is method in which the mentoined fields are not brought while returning the data 
        //for eg here password and _id of each document is not shared
        const findAllUsers = await USER_DATA.find({}, '-password -_id')
        // console.log(findAllUsers)
        return res.json({ status: 200, Users: findAllUsers })
    } catch (error) {
        console.log(error)
    }


}


exports.getProducts = async (req, res) => {
    const { token } = req.headers
    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })

        const allProducts = await PRODUCTS_DB.find({})

        return res.json({ status: 200, Products: allProducts })


    } catch (error) {
        console.log(error)
    }
}



exports.addProduct = async (req, res) => {

    const imageurl = req.file.path;
    const { token } = req.headers

    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })

        const findProduct = await PRODUCTS_DB.findOne({PRODUCT_id:req.body.PRODUCT_id})

        if(findProduct){
            return res.json({status:409,message:'already exist'})
        }

        const addproduct = await PRODUCTS_DB({ ...req.body, Status: 'available', Product_img_url: `${imageurl}` ,uploaded_at:'Latest'})
        await addproduct.save()
        
        await PRODUCTS_DB.updateOne({PRODUCT_id:req.body.PRODUCT_id},{
            $set:{
                Colors:[{
                    img_url:imageurl,
                    color:req.body.Product_Color,
                    hexcode:req.body.Product_Hexcode,
                    stocks:req.body.stocks
                }]
            }
        })

        return res.json({ status: 200, message: 'Sucess' })

    } catch (error) {

        console.log(error)
        return res.json({ status: 404, error: 'error' })
    }
}


exports.addColor = async (req, res) => {

    const imageurl = req.file.path;

    try {
        const findp = await PRODUCTS_DB.findOne({PRODUCT_id:req.body.PRODUCT_id})
        // console.log(findp)
        if(!findp) return res.json({status:404,message:'Product Does not exist'})

        await PRODUCTS_DB.updateOne(
            { PRODUCT_id: req.body.PRODUCT_id },
            {
              $push: {
                Colors: {
                  img_url: `${imageurl}`,
                  color: req.body.color,
                  hexcode: req.body.hexcode,
                  stocks:req.body.stocks
                }
              }
            }
          );

          return res.json({status:200,message:'Updated'})
} catch (error) {
    console.log(error)
}
}


exports.updateProducts = async (req,res)=>{
    const {values,id} = req.body
    // console.log(values,id)

    try {
         await PRODUCTS_DB.updateOne({PRODUCT_id:id},{
            $set:{
                Product_name:values.product_name,
                Price:values.price,
                Discounted_Price:values.discounted_price
            }
        })

        return res.json({status:200})

        

        
    } catch (error) {
        
    }
}


exports.getusersorders = async(req,res)=>{
    const { token } = req.headers
    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })

        const allProducts = await ORDER_DB.find({})
        // console.log(allProducts)

        return res.json({ status: 200, Products: allProducts })


    } catch (error) {
        console.log(error)
    }
}

exports.updateOrder = async (req,res)=>{
    const { token } = req.headers
    const {order_stat,orderid} = req.body
    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })
        
        await ORDER_DB.updateOne({USER_ORDER_ID:orderid},{
            $set:{
                orderStatus:order_stat
            }
        })
        
        return res.json({status:200,message:'updated'})
        
    } catch (error) {
        console.log(error)
        return res.json({status:202})
    }
}

exports.updateStocks = async (req,res)=>{
    const { token } = req.headers

    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })
        
       await PRODUCTS_DB.updateOne({PRODUCT_id:req.body.productid},{
        $set:{
            outofstock:req.body.outofstock
        }
       })
        
        return res.json({status:200,message:'updated'})
        
    } catch (error) {
        console.log(error)
        return res.json({status:202})
    }
}