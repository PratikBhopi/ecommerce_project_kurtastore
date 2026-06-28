const PaymentService = require('../../services/user/PaymentService')

exports.createOrder = async (req, res) => {
    try {
        const result = await PaymentService.createOrder(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.paymentOrder = async (req, res) => {
    try {
        const result = await PaymentService.paymentOrder(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.user
        const result = await PaymentService.getOrders(userId)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.requestIssues = async (req, res) => {
    try {
        const { userId } = req.user
        const { subject, main, orderid } = req.body
        const result = await PaymentService.requestIssues({ userId, subject, main, orderid })
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}