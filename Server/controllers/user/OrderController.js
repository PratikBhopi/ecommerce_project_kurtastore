const OrderService = require('../../services/user/OrderService')

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
