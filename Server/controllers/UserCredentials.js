const mongoose = require('mongoose')
const { USER_DATA } = require('../models/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.registerUser = async (req, res) => {

    const { email, password, firstname, lastname, mobile } = req.body
    const findUser = await USER_DATA.findOne({ email: email })
    if (findUser) {
        return res.json({ status:200 ,error:'User Exist'})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const createUser = await USER_DATA({
            First_Name: firstname,
            Last_Name:lastname,
            Mobile_No:mobile,
            email: email,
            password: hashedPassword
        })
        await createUser.save()

        return res.json({ status:201, message: 'success' })


    } catch (error) {
        console.log(error)
    }
}


//login
exports.loginUser = async (req,res)=>{
    const {email,password} = req.body
    const findUser = await USER_DATA.findOne({email})
    if(!findUser) return res.json({status:404,error:'User doesnot exist'})
    try {
        const isPassowrdcValid = await bcrypt.compare(password,findUser.password)

        if(!isPassowrdcValid) return  res.json({status:401,error:'Password Incorrect'})
        
        const token = jwt.sign({ userId: findUser._id , email:findUser.email,names:findUser.First_Name},process.env.JWT_KEY,
            { expiresIn:'1h'})

        return res.json({status:200,message:'success',token})
        
    } catch (error) {
        
        return res.json({error:error})
    }
} 


exports.authorisation=async(req,res)=>{
    const {token} = req.headers
 
    try {
        const { userId , email } = jwt.verify(token, process.env.JWT_KEY)
        const findUser = await USER_DATA.findOne({email:email,_id:userId})
        // console.log(userId,email)
        if(!findUser) return res.json({status:401,error:"not authorised User"})
        
        return res.json({status:200,message:'Authrisation granted'})

    } catch (error) {
        return res.json({status:404})
    }
} 