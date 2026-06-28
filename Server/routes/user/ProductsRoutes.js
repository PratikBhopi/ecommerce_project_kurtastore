const express = require('express')
const { getProducts, getProductToBuy } = require('../../controllers/user/Products')

const ProductsRouter = express.Router()

ProductsRouter.get('/products', getProducts)
ProductsRouter.get('/products/:params_productID', getProductToBuy)

module.exports = ProductsRouter
