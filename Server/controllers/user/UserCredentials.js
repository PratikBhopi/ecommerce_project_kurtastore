const UserCredentialsService = require('../../services/user/UserCredentialsService')

exports.registerUser = async (req, res) => {
    try {
        const result = await UserCredentialsService.registerUser(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const result = await UserCredentialsService.loginUser(req.body)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.authorisation = async (req, res) => {
    try {
        const result = await UserCredentialsService.authorisation(req.user)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}

exports.logoutUser = async (req, res) => {
    try {
        let token = req.headers.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) return res.status(401).json({ status: 401, error: 'Token missing' });
        
        const result = await UserCredentialsService.logoutUser(token)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, error: 'Internal Server Error', message: error.message })
    }
}