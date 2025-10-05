const express = require('express')  
const { registerUser, loginUser, authorisation } = require('../../controllers/user/UserCredentials')

const UserAuthRouter = express.Router()

UserAuthRouter.post('/register',registerUser)
UserAuthRouter.post('/login',loginUser)
UserAuthRouter.post('/authorization',authorisation)

module.exports = UserAuthRouter
