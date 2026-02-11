const express = require('express')
const { order } = require('../../controllers/user/OrderController')
const { handlePayment, createOrder, paymentOrder, getOrders } = require('../../controllers/user/PaymentController')

const UserOrderPaymentRouter = express.Router()

UserOrderPaymentRouter.post('/submitOrderDetails', order)
UserOrderPaymentRouter.post('/createOrder', createOrder)
UserOrderPaymentRouter.post('/payment-success', paymentOrder)
UserOrderPaymentRouter.get('/getorders', getOrders)

module.exports = UserOrderPaymentRouter
