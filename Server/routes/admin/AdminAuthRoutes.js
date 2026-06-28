const express = require('express')
const { authenticate_admin_portal, register_Admin } = require('../../controllers/admin/AdminCredentials')

const AdminAuthRouter = express.Router()

AdminAuthRouter.post('/auth/login', authenticate_admin_portal)
AdminAuthRouter.post('/auth/register', register_Admin)

module.exports = AdminAuthRouter
