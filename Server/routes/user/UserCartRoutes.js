const express = require('express')  
const { addtoCart, updateCart, getCartProducts, deleteItem } = require('../../controllers/user/Products')

const UserCartRouter = express.Router()

UserCartRouter.post('/addtoCart',addtoCart)
UserCartRouter.post('/updateCart',updateCart)
UserCartRouter.get('/getCartProduct',getCartProducts)
UserCartRouter.delete('/deleteCartItem/:product',deleteItem)

module.exports = UserCartRouter
