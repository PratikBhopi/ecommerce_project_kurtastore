const express = require('express')
const { getUsers } = require('../../controllers/admin/AdminUserControls')

const AdminUserRouter = express.Router()

//get users
AdminUserRouter.get('/getusers',getUsers)

module.exports = AdminUserRouter
