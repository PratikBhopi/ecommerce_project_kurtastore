const mongoose = require('mongoose')

const USER_CART_DB = new mongoose.Schema({
    USER_CART_id: String,
    Products: [{
        Price: Number,
        product_id: String,
        product_name: String,
        Quantity: Number,
        payable_amount: Number,
        product_img_url: String,
        Size: String,
        Color: String
    }],
    Total_Quantity: Number,
    Total_Price: Number
},
    { collection: "USER_CART_DB" })
const USER_CART = new mongoose.model("USER_CART_DB", USER_CART_DB)

module.exports = { USER_CART }
