const express = require('express')
const { getusersorders, updateOrder } = require('../../controllers/admin/AdminOrderControls')

const AdminOrderRouter = express.Router()

// get orders
AdminOrderRouter.get('/getorders',getusersorders)

//update order
AdminOrderRouter.post('/updateOrder',updateOrder)

module.exports = AdminOrderRouter
