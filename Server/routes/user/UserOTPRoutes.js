const express = require('express')
const { requestMail, checkotp } = require('../../controllers/user/OrderController')
const { userAuth } = require('../../middlewares/userAuth')


const UserOTPRouter = express.Router()

UserOTPRouter.post('/otp/request', userAuth, requestMail)
UserOTPRouter.post('/otp/verify', userAuth, checkotp)

module.exports = UserOTPRouter
