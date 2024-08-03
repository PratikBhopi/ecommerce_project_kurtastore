const mongoose = require('mongoose')
const { ADMIN_DB } = require('../models/adminDB')
const jwt = require('jsonwebtoken')
require('dotenv').config()



exports.authenticate_admin_portal= async (req,res) => {
    const {email,password,adminKey} = req.body
    try {
        const findAdmin = await ADMIN_DB.findOne({ADMIN_ID:adminKey,email:email})
        if(!findAdmin) return res.json({status:404,message:'No Admin Found'})
        if(findAdmin.password != password && findAdmin.ADMIN_ID != adminKey) return res.json({status:202,message:"error"})
        
        const adminToken = jwt.sign({adminID:adminKey,name:findAdmin.First_Name },process.env.JWT_KEY,{expiresIn:'1h'})
        console.log('logged in')
        return res.json({status:200,token:adminToken,message:"Logged In"})

    } catch (error) {
        console.log(error)
    }
}

// {
//     "First_Name":"Pratik",
//     "Last_Name":"Bhopi",
//     "email":"pkbhopi132@gmail.com",
//     "password":"pratik1234"
// }

exports.register_Admin = async (req,res)=>{
    const {First_Name,Last_Name,email,password,mobile} = req.body
    try {
        const adminID = '@aawaraEthincs2024'
        const createAdmin = await ADMIN_DB({
            ...req.body,ADMIN_ID:"@aawaraEthincs2024",isAdmin:true
        })
        await createAdmin.save()


        return res.json({status:200,message:'Success'})
        
    } catch (error) {
        console.log('register admin error',error)
    }
}