const express = require('express')  
const { requestIssues } = require('../../controllers/user/PaymentController')

const UserContactRouter = express.Router()

UserContactRouter.post('/request-us',requestIssues)

module.exports = UserContactRouter
