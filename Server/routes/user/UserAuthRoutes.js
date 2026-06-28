const express = require('express')  
const { registerUser, loginUser, authorisation } = require('../../controllers/user/UserCredentials')
const { userAuth } = require('../../middlewares/userAuth')

const UserAuthRouter = express.Router()

UserAuthRouter.post('/auth/register', registerUser)
UserAuthRouter.post('/auth/login', loginUser)
UserAuthRouter.get('/auth/status', userAuth, authorisation)

module.exports = UserAuthRouter
