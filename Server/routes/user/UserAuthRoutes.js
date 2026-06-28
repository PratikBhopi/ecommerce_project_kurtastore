const express = require('express')  
const { registerUser, loginUser, authorisation, logoutUser } = require('../../controllers/user/UserCredentials')
const { userAuth } = require('../../middlewares/userAuth')
const rateLimiter = require('../../middlewares/rateLimiter')

const UserAuthRouter = express.Router()

UserAuthRouter.post('/auth/register', rateLimiter(5, 15), registerUser)
UserAuthRouter.post('/auth/login', rateLimiter(5, 15), loginUser)
UserAuthRouter.post('/auth/logout', logoutUser)
UserAuthRouter.get('/auth/status', userAuth, authorisation)

module.exports = UserAuthRouter
