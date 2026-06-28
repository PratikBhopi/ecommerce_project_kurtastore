const jwt = require('jsonwebtoken');
const { ADMIN_DB } = require('../models/adminDB');
require('dotenv').config();

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ status: 401, message: 'Admin authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const { adminID, name } = decoded;
        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name });
        
        if (!findAdmin) {
            return res.json({ status: 404, message: 'Not Aurthorised' });
        }

        req.admin = { adminID, name, dbRecord: findAdmin };
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message });
    }
};

module.exports = { adminAuth };
