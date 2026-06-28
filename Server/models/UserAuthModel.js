const mongoose = require('mongoose')

const USER_LOGIN_DATA = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Mobile_No: Number,
    email: String,
    password: String,
},
    {
        collection: 'USER_DATA'
    })
const USER_DATA = new mongoose.model("USER_DATA", USER_LOGIN_DATA)

module.exports = { USER_DATA }
