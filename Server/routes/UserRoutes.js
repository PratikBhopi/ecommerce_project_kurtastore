const express = require('express')  
const { registerUser, loginUser, authorisation } = require('../controllers/UserCredentials')
const { addtoCart, getProducts, updateCart, addProduct, getCartProducts, getProductToBuy, getCartLength, deleteItem, order,  requestMail, checkotp } = require('../controllers/Products')
const { handlePayment, createOrder, paymentOrder, getOrders, requestIssues } = require('../controllers/PaymentController')
const UserRouter = express.Router()

UserRouter.post('/register',registerUser)
UserRouter.post('/login',loginUser)
UserRouter.post('/authorization',authorisation)


UserRouter.post('/addtoCart',addtoCart)
UserRouter.post('/updateCart',updateCart)
UserRouter.get('/getCartProduct',getCartProducts)
UserRouter.delete('/deleteCartItem/:product',deleteItem)

UserRouter.get('/getProducts',getProducts)
UserRouter.get('/fetchProducttoBuy/:params_productID',getProductToBuy)



UserRouter.post('/requestotp',requestMail)
UserRouter.post('/checkotp',checkotp)
UserRouter.post('/submitOrderDetails',order)

UserRouter.post('/createOrder',createOrder)

UserRouter.post('/payment-success',paymentOrder)

UserRouter.get('/getorders',getOrders)

UserRouter.post('/request-us',requestIssues)

module.exports = UserRouter