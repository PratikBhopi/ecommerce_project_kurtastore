const { USER_DATA } = require('../../models/UserAuthModel')
const { TEMP_OTP } = require('../../models/OTPModel')
const { USER_CART } = require('../../models/UserCartModel')
const { ORDER_DB } = require('../../models/UserOrderModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendOtpEmail } = require('../../services/mailer')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

exports.requestMail = async (userId, email, mobile) => {
    const findUser = await USER_DATA.findOne({ _id: userId })

    if (!findUser) return { status: 404, error: 'error occured' }

    await TEMP_OTP.deleteOne({ USER_ID: userId, Request_Mail: email })

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
    sendOtpEmail(email, otp)
    return { status: 200, message: 'done', verificationToken: createToken }
}

exports.checkotp = async (userId, specialtoken, otp) => {
    const { mail } = jwt.verify(specialtoken, process.env.JWT_KEY)
    
    const findOtp = await TEMP_OTP.findOne({ USER_ID: userId, Request_Mail: mail })
    if (findOtp && findOtp.OTP == otp) {
        await TEMP_OTP.deleteOne({ USER_ID: userId })
        return { status: 200, message: 'Verified' }
    } else {
        return { status: 202, message: 'not verified' }
    }
}

exports.order = async (userId, specialtoken, values) => {
    const { mail, phone, user_order_id } = jwt.verify(specialtoken, process.env.JWT_KEY)
    
    const findCart = await USER_CART.findOne({ USER_CART_id: userId })
    const findOrder = await ORDER_DB.findOne({ USER_ORDER_ID: user_order_id })
    if (findOrder) return { status: 204, message: 'Order Exist' }

    const createORDER = await ORDER_DB({
        CART_ID: findCart._id,
        USER_ID: userId,
        USER_ORDER_ID: user_order_id,
        USER_DETAILS: { ...values, email: mail, mobile: phone },
        Total_Quantity: findCart.Total_Quantity,
        Total_Price: findCart.Total_Price
    })
    await createORDER.save()
    return { status: 200, message: 'Completed' }
}
