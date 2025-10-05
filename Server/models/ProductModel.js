const mongoose = require('mongoose')

const PRODUCT_DB = new mongoose.Schema({
    PRODUCT_id: String,
    Product_img_url: String,
    Product_name: String,
    Price: Number, //price to be show as cut
    Discounted_Price: Number, //price to be paid
    Description: String,
    Status: String,// outof stock,available
    Product_Color:String,
    Product_Hexcode:String,
    // Discount: Number,
    Colors: [
        {
            img_url: String,
            color: String,
            hexcode: String,
            stocks:Number,
            outofStockSize:String,
        }
    ],
    uploaded_at:{
        type:String,
        default:Date.now(),
        expires:864000
    }
},
    { collection: 'PRODUCT_DB' })
const PRODUCTS_DB = new mongoose.model('PRODUCT_DB', PRODUCT_DB)

module.exports = { PRODUCTS_DB }
