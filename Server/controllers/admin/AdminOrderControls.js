require('dotenv').config()

const jwt = require('jsonwebtoken')
const { ADMIN_DB } = require('../../models/adminDB')
const { ORDER_DB } = require('../../models/UserOrderModel')
const { PRODUCTS_DB } = require('../../models/ProductModel')

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
