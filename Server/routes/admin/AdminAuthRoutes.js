const express = require('express')
const { authenticate_admin_portal, register_Admin } = require('../../controllers/admin/AdminCredentials')

const AdminAuthRouter = express.Router()

AdminAuthRouter.post('/authenticationadmin',authenticate_admin_portal)
AdminAuthRouter.post('/register_admin',register_Admin)

module.exports = AdminAuthRouter
