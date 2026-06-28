const express = require('express')  
const { addtoCart, updateCart, getCartProducts, deleteItem } = require('../../controllers/user/Products')
const { userAuth } = require('../../middlewares/userAuth')

const UserCartRouter = express.Router()

UserCartRouter.post('/cart', userAuth, addtoCart)
UserCartRouter.put('/cart', userAuth, updateCart)
UserCartRouter.get('/cart', userAuth, getCartProducts)
UserCartRouter.delete('/cart/:product', userAuth, deleteItem)

module.exports = UserCartRouter
