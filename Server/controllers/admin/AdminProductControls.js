const AdminProductService = require('../../services/admin/AdminProductService')

exports.getProducts = async (req, res) => {
    try {
        const result = await AdminProductService.getProducts()
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.addProduct = async (req, res) => {
    const imageurl = req.file.path;
    try {
        const result = await AdminProductService.addProduct(req.body, imageurl)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.addColor = async (req, res) => {
    const imageurl = req.file.path;
    try {
        const result = await AdminProductService.addColor(req.body, imageurl)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.updateProducts = async (req, res) => {
    try {
        const result = await AdminProductService.updateProducts(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}
