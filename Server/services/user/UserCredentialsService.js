const { USER_DATA } = require('../../models/UserAuthModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { redisClient } = require('../../config/redis');

exports.registerUser = async ({ email, password, firstname, lastname, mobile }) => {
    const findUser = await USER_DATA.findOne({ email: email })

    if (findUser) {
        return { status: 200, error: 'User Exist' }
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const createUser = await USER_DATA({
        First_Name: firstname,
        Last_Name: lastname,
        Mobile_No: mobile,
        email: email,
        password: hashedPassword
    })

    await createUser.save()

    return { status: 201, message: 'success' }
}

exports.loginUser = async ({ email, password }) => {
    const findUser = await USER_DATA.findOne({ email })

    if (!findUser) return { status: 404, error: 'User doesnot exist' }

    const isPassowrdcValid = await bcrypt.compare(password, findUser.password)

    if (!isPassowrdcValid) return { status: 401, error: 'Password Incorrect' }

    const token = jwt.sign({ userId: findUser._id, email: findUser.email, names: findUser.First_Name }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY })

    return { status: 200, message: 'success', token }
}

exports.authorisation = async ({ userId, email }) => {
    const findUser = await USER_DATA.findOne({ email: email, _id: userId })
    if (!findUser) return { status: 401, error: "not authorised User" }
    return { status: 200, message: 'Authrisation granted' }
}

exports.logoutUser = async (token) => {
    try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingExpiry = decoded.exp - currentTime;
            
            if (remainingExpiry > 0) {
                // EX sets the expiry time in seconds
                await redisClient.setEx(`blacklist:${token}`, remainingExpiry, 'blacklisted');
            }
        }
        return { status: 200, message: 'Logout successful' }
    } catch (error) {
        console.error('Error blacklisting token:', error);
        return { status: 500, error: 'Internal server error during logout' }
    }
}
