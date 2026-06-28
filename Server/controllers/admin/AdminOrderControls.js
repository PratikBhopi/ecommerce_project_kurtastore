const AdminOrderService = require('../../services/admin/AdminOrderService')

exports.getusersorders = async (req, res) => {
    try {
        const result = await AdminOrderService.getusersorders()
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const result = await AdminOrderService.updateOrder(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.updateStocks = async (req, res) => {
    try {
        const result = await AdminOrderService.updateStocks(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}
