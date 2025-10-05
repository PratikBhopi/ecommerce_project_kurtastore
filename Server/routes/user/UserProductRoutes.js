const express = require('express')  
const { getProducts, getProductToBuy } = require('../../controllers/user/Products')

const UserProductRouter = express.Router()

UserProductRouter.get('/getProducts',getProducts)
UserProductRouter.get('/fetchProducttoBuy/:params_productID',getProductToBuy)

module.exports = UserProductRouter
