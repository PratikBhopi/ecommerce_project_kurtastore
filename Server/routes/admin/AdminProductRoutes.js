const express = require('express')
const { getProducts, addProduct, addColor, updateProducts } = require('../../controllers/admin/AdminProductControls')
const { updateStocks } = require('../../controllers/admin/AdminOrderControls')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')
const { adminAuth } = require('../../middlewares/adminAuth')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const { PRODUCT_id, Product_Color, color } = req.body;
        const filename = Product_Color 
            ? `${PRODUCT_id}-${Product_Color}` 
            : `${PRODUCT_id}-${color}`;

        return {
            folder: 'uploads/images',
            public_id: filename
        };
    },
});

const upload = multer({storage})

const AdminProductRouter = express.Router()

//get products:
AdminProductRouter.get('/products', adminAuth, getProducts)

//edit product
AdminProductRouter.put('/products', adminAuth, updateProducts)

//add products
AdminProductRouter.post('/products', adminAuth, upload.single('image'), addProduct)
AdminProductRouter.post('/products/colors', adminAuth, upload.single('image'), addColor)
AdminProductRouter.put('/products/stock', adminAuth, updateStocks)

module.exports = AdminProductRouter
