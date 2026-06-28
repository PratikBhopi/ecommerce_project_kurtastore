const jwt = require('jsonwebtoken');
require('dotenv').config();
const { redisClient } = require('../config/redis');

const userAuth = async (req, res, next) => {
    let token = req.headers.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ status: 401, message: 'Authentication required' });
    }

    try {
        const isBlacklisted = await redisClient.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ status: 401, message: 'Token is blacklisted. Please login again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('User auth error:', error.message);
        return res.status(403).json({ status: 403, message: 'Invalid or expired token' });
    }
};
module.exports = { userAuth };
