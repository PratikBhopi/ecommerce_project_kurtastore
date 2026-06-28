const AdminCredentialsService = require('../../services/admin/AdminCredentialsService')

exports.authenticate_admin_portal = async (req, res) => {
    try {
        const result = await AdminCredentialsService.authenticate_admin_portal(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.register_Admin = async (req, res) => {
    try {
        const result = await AdminCredentialsService.register_Admin(req.body)
        return res.json(result)
    } catch (error) {
        console.log('register admin error', error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}