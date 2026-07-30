const OrderService = require('../../services/user/OrderService')
const OTPCache = require('../../cache/OTPCache')

exports.requestMail = async (req, res) => {
    try {
        const { userId } = req.user
        const { email, mobile } = req.body
        const result = await OrderService.requestMail(userId, email, mobile)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.checkotp = async (req, res) => {
    try {
        const { userId } = req.user
        const { specialtoken } = req.headers
        const { otp } = req.body
        const result = await OrderService.checkotp(userId, specialtoken, otp)
        return res.json(result)
    } catch (error) {
        console.log('checkotp eroro', error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.order = async (req, res) => {
    try {
        const { userId } = req.user
        const { specialtoken } = req.headers
        const { values } = req.body
        const result = await OrderService.order(userId, specialtoken, values)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

// GET /otp/status
// Returns current OTP state for the user: cooldown TTL, lockout status, verified status.
// Useful for the client to disable "Resend OTP" button or show a countdown.
exports.getOtpStatus = async (req, res) => {
    try {
        const { userId } = req.user

        const [inCooldown, cooldownTTL, lockedOut, alreadyVerified] = await Promise.all([
            OTPCache.isInCooldown(userId),
            OTPCache.getCooldownTTL(userId),
            OTPCache.isLockedOut(userId),
            OTPCache.isAlreadyVerified(userId),
        ])

        return res.json({
            status: 200,
            inCooldown,                              // true = resend is blocked
            cooldownTTL: inCooldown ? cooldownTTL : 0, // seconds left on cooldown
            lockedOut,                               // true = too many wrong attempts
            alreadyVerified,                         // true = OTP already passed, ready to order
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}
