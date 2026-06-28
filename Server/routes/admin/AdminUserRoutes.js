const express = require('express')
const { getUsers } = require('../../controllers/admin/AdminUserControls')
const { adminAuth } = require('../../middlewares/adminAuth')

const AdminUserRouter = express.Router()

//get users
AdminUserRouter.get('/users', adminAuth, getUsers)

module.exports = AdminUserRouter
