const express = require('express')
const { requestMail, checkotp } = require('../../controllers/user/OrderController')

const UserOTPRouter = express.Router()

UserOTPRouter.post('/requestotp', requestMail)
UserOTPRouter.post('/checkotp', checkotp)

module.exports = UserOTPRouter
