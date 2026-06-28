const express = require('express')
const { getusersorders, updateOrder } = require('../../controllers/admin/AdminOrderControls')
const { adminAuth } = require('../../middlewares/adminAuth')

const AdminOrderRouter = express.Router()

// get orders
AdminOrderRouter.get('/orders', adminAuth, getusersorders)

//update order
AdminOrderRouter.put('/orders', adminAuth, updateOrder)

module.exports = AdminOrderRouter
