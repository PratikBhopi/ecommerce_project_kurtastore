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