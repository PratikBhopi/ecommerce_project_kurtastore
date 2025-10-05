const mongoose = require('mongoose')

const OTP_DB = new mongoose.Schema({
    USER_ID: String,
    Request_Mail: String,
    OTP: String,
    token: String,
    createdAt: { type: Date, default: Date.now, expires: 1000 }
}, { collection: 'OTP_DB' })

const TEMP_OTP = new mongoose.model('OTP-DB', OTP_DB)

module.exports = { TEMP_OTP }
