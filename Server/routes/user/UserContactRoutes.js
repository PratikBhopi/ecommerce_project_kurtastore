const express = require('express')  
const { requestIssues } = require('../../controllers/user/PaymentController')
const { userAuth } = require('../../middlewares/userAuth')

const UserContactRouter = express.Router()

UserContactRouter.post('/issues', userAuth, requestIssues)

module.exports = UserContactRouter
