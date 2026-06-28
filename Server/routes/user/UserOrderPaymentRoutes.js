const express = require('express')
const { order } = require('../../controllers/user/OrderController')
const { handlePayment, createOrder, paymentOrder, getOrders } = require('../../controllers/user/PaymentController')
const { userAuth } = require('../../middlewares/userAuth')


const UserOrderPaymentRouter = express.Router()

UserOrderPaymentRouter.post('/orders', userAuth, order)
UserOrderPaymentRouter.post('/payments/order', userAuth, createOrder)
UserOrderPaymentRouter.post('/payments/success', userAuth, paymentOrder)
UserOrderPaymentRouter.get('/orders', userAuth, getOrders)

module.exports = UserOrderPaymentRouter
