const express = require('express')  
const { getProducts, getProductToBuy } = require('../../controllers/user/Products')

const UserProductRouter = express.Router()

UserProductRouter.get('/products', getProducts)
UserProductRouter.get('/products/:params_productID', getProductToBuy)

module.exports = UserProductRouter
