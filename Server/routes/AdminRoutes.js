const express = require('express')
const { authenticate_admin_portal, register_Admin } = require('../controllers/AdminCredentials')
const { getUsers, getProducts, addProduct, addColor, updateProducts, getusersorders, updateOrder, updateStocks } = require('../controllers/AdminControls')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



const AdminRouter = express.Router()

AdminRouter.post('/authenticationadmin',authenticate_admin_portal)
AdminRouter.post('/register_admin',register_Admin)


//get users
AdminRouter.get('/getusers',getUsers)

//get products:
AdminRouter.get('/getProduct',getProducts)

// get orders
AdminRouter.get('/getorders',getusersorders)

//update order
AdminRouter.post('/updateOrder',updateOrder)

//edit product
AdminRouter.post('/updateProduct',updateProducts)

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

//add products
AdminRouter.post('/addproduct',upload.single('image'),addProduct)
AdminRouter.post('/addcolor',upload.single('image'),addColor)
AdminRouter.post('/updateStock',updateStocks)

module.exports = AdminRouter