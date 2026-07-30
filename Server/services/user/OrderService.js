const { USER_DATA } = require('../../models/UserAuthModel')
const { TEMP_OTP } = require('../../models/OTPModel')
const { USER_CART } = require('../../models/UserCartModel')
const { ORDER_DB } = require('../../models/UserOrderModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendOtpEmail } = require('../../services/mailer')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const OTPCache = require('../../cache/OTPCache')

exports.requestMail = async (userId, email, mobile) => {
    // --- Idempotency guard: block if user already requested OTP within cooldown window ---
    const inCooldown = await OTPCache.isInCooldown(userId)
    if (inCooldown) {
        const ttl = await OTPCache.getCooldownTTL(userId)
        return {
            status: 429,
            error: 'Too Many Requests',
            message: `OTP already sent. Please wait ${ttl} second(s) before requesting again.`
        }
    }

    const findUser = await USER_DATA.findOne({ _id: userId })
    if (!findUser) return { status: 404, error: 'User not found' }

    // Remove any previous OTP for this user+email in MongoDB
    await TEMP_OTP.deleteOne({ USER_ID: userId, Request_Mail: email })

    const orderid = uuidv4()
    const createToken = jwt.sign(
        { userID: userId, mail: email, phone: mobile, user_order_id: orderid },
        process.env.JWT_KEY
    )

    const otp = crypto.randomInt(100000, 1000000)
    const temp_Cred = new TEMP_OTP({
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
    // --- Lockout guard: block if user exceeded failed attempt limit ---
    const lockedOut = await OTPCache.isLockedOut(userId)
    if (lockedOut) {
        return {
            status: 429,
            error: 'Too Many Requests',
            message: 'Too many incorrect attempts. Please request a new OTP after 10 minutes.'
        }
    }

    // --- Replay guard: block if this OTP session was already verified ---
    const alreadyVerified = await OTPCache.isAlreadyVerified(userId)
    if (alreadyVerified) {
        return { status: 409, error: 'Conflict', message: 'OTP already verified. Proceed to place your order.' }
    }

    const { mail } = jwt.verify(specialtoken, process.env.JWT_KEY)

    const findOtp = await TEMP_OTP.findOne({ USER_ID: userId, Request_Mail: mail })

    if (findOtp && findOtp.OTP == otp) {
        // Successful verification — clean up MongoDB record, mark verified in Redis, reset attempts
        await TEMP_OTP.deleteOne({ USER_ID: userId })
        await OTPCache.markVerified(userId)
        await OTPCache.clearAttempts(userId)
        return { status: 200, message: 'Verified' }
    } else {
        // Wrong OTP — increment attempt counter
        const attemptsLeft = await OTPCache.recordFailedAttempt(userId)
        return {
            status: 202,
            message: 'not verified',
            attemptsLeft
        }
    }
}

exports.order = async (userId, specialtoken, values) => {
    const { mail, phone, user_order_id } = jwt.verify(specialtoken, process.env.JWT_KEY)

    // Guard: ensure OTP was verified before allowing order placement
    const isVerified = await OTPCache.isAlreadyVerified(userId)
    if (!isVerified) {
        return { status: 403, error: 'Forbidden', message: 'OTP verification required before placing an order.' }
    }

    const findCart = await USER_CART.findOne({ USER_CART_id: userId })
    const findOrder = await ORDER_DB.findOne({ USER_ORDER_ID: user_order_id })
    if (findOrder) return { status: 204, message: 'Order Exist' }

    const createORDER = new ORDER_DB({
        CART_ID: findCart._id,
        USER_ID: userId,
        USER_ORDER_ID: user_order_id,
        USER_DETAILS: { ...values, email: mail, mobile: phone },
        Total_Quantity: findCart.Total_Quantity,
        Total_Price: findCart.Total_Price
    })
    await createORDER.save()

    // Clean up all OTP-related Redis keys after successful order
    await OTPCache.clearAllOtpKeys(userId)

    return { status: 200, message: 'Completed' }
}
