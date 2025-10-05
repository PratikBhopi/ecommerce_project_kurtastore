const mongoose = require('mongoose')

const USER_ORDER_DB = new mongoose.Schema({
    CART_ID: String,
    USER_ID: String,
    USER_ORDER_ID:String,
    USER_DETAILS:{
        firstname: String,
        lastname: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        email: String,
        mobile: String,
    },
    ITEMS: [
        {
            product_id: String,
            product_name: String,
            Quantity: Number,
            Size: String,
            Color: String,
            Amount: Number,
            Product_url:String
        }
    ],
    TRANSACTION:{
        orderId: String,
        paymentId: String,
        signature: String,
        amount: Number,
        currency: String,
        status: { type: String, default: 'Pending' }, // Could be 'Pending', 'Paid', 'Failed', etc.
    },
    Issue_Reported:{type:Boolean,default:false},
    orderStatus: { type: String, default: 'Processing' }, // Could be 'Processing', 'Shipped', 'Delivered', etc.
    createdAt: { type: Date, default: Date.now },
    Total_Quantity: Number,
    Total_Price: Number,
}, { collection: 'ORDER_DB' })
const ORDER_DB = new mongoose.model("ORDER", USER_ORDER_DB)

module.exports = { ORDER_DB }
