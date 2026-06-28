const ProductService = require('../../services/user/ProductService')

exports.addtoCart = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : '';
        const { productid, size, activeIn, productimg } = req.body
        
        const result = await ProductService.addtoCart({ userId, productid, size, activeIn, productimg })
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.updateCart = async (req, res) => {
    try {
        const { userId } = req.user
        const { product_item_id, quantityCount, finalPrice } = req.body
        
        const result = await ProductService.updateCart({ userId, product_item_id, quantityCount, finalPrice })
        return res.json(result)
    } catch (error) {
        console.log('update cart error', error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.getCartProducts = async (req, res) => {
    try {
        const { userId } = req.user
        const result = await ProductService.getCartProducts(userId)
        return res.json(result)
    } catch (error) {
        console.log('getcartProduct error:', error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const { page, limit, search, sort } = req.query;
        const result = await ProductService.getProducts({ page, limit, search, sort })
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.getProductToBuy = async (req, res) => {
    try {
        const { params_productID } = req.params
        const result = await ProductService.getProductToBuy(params_productID)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { userId } = req.user;
        const { product } = req.params;
        const result = await ProductService.deleteItem(userId, product)
        return res.json(result)
    } catch (error) {
        console.log("delete item error:", error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
