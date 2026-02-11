const mongoose = require('mongoose')
const { USER_DATA } = require('../../models/UserAuthModel')
const { TEMP_OTP } = require('../../models/OTPModel')
const { USER_CART } = require('../../models/UserCartModel')
const { ORDER_DB } = require('../../models/UserOrderModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendOtpEmail } = require('../../services/mailer')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

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
        await TEMP_OTP.deleteOne({ USER_ID: userId, Request_Mail: email })
        //return res.json({ status: 429 }) 
        // } //429 is for too many requests

        const orderid = uuidv4()

        const createToken = jwt.sign({ userID: userId, mail: email, phone: mobile, user_order_id: orderid }, process.env.JWT_KEY)


        const otp = crypto.randomInt(100000, 1000000)
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
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
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
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}


exports.order = async (req, res) => {
    const { token, specialtoken } = req.headers
    const { values } = req.body
    try {

        const { userID, mail, phone, user_order_id } = jwt.verify(specialtoken, process.env.JWT_KEY)
        const findCart = await USER_CART.findOne({ USER_CART_id: userID })

        const findOrder = await ORDER_DB.findOne({ USER_ORDER_ID: user_order_id })
        if (findOrder) return res.json({ status: 204, message: 'Order Exist' })


        const createORDER = await ORDER_DB({
            CART_ID: findCart._id,
            USER_ID: userID,
            USER_ORDER_ID: user_order_id,
            USER_DETAILS: { ...values, email: mail, mobile: phone },
            Total_Quantity: findCart.Total_Quantity,
            Total_Price: findCart.Total_Price
        })
        await createORDER.save()
        return res.json({ status: 200, message: 'Completed' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}
