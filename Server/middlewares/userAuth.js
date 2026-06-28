const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuth = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ status: 401, message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('User auth error:', error);
        return res.status(403).json({ status: 403, message: 'Invalid or expired token' });
    }
};
module.exports = { userAuth };
