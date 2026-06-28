const { ADMIN_DB } = require('../../models/adminDB')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authenticate_admin_portal = async ({ email, password, adminKey }) => {
    const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminKey, email: email })
    if (!findAdmin) return { status: 404, message: 'No Admin Found' }
    if (findAdmin.password != password && findAdmin.ADMIN_ID != adminKey) return { status: 202, message: "error" }

    const adminToken = jwt.sign({ adminID: adminKey, name: findAdmin.First_Name }, process.env.JWT_KEY, { expiresIn: '1h' })
    return { status: 200, token: adminToken, message: "Logged In" }
}

exports.register_Admin = async (adminData) => {
    const createAdmin = await ADMIN_DB({
        ...adminData, ADMIN_ID: "@aawaraEthincs2024", isAdmin: true
    })
    await createAdmin.save()
    return { status: 200, message: 'Success' }
}
