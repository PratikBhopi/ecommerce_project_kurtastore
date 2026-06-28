const AdminUserService = require('../../services/admin/AdminUserService')

exports.getUsers = async (req, res) => {
    try {
        const result = await AdminUserService.getUsers()
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}
