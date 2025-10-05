const mongoose = require('mongoose')

const ISSUES  = new mongoose.Schema({
    USER_ID:String,
    ORDER_ID:String,
    Subject:String,
    Main:String,
    Contact:String,
    Mobile:String,
},{collection:'ISSUES_DB'})

const ISSUES_DB  = new mongoose.model('ISSUES_DB',ISSUES)

module.exports = { ISSUES_DB }
