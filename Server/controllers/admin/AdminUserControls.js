require('dotenv').config()

const jwt = require('jsonwebtoken')
const { ADMIN_DB } = require('../../models/adminDB')
const { USER_DATA } = require('../../models/UserAuthModel')

exports.getUsers = async (req, res) => {

    const { token } = req.headers

    try {
        const { adminID, name } = jwt.verify(token, process.env.JWT_KEY)

        const findAdmin = await ADMIN_DB.findOne({ ADMIN_ID: adminID, First_Name: name })
        if (!findAdmin) return res.json({ status: 404, message: 'Not Aurthorised' })



        // the -password -_id this is method in which the mentoined fields are not brought while returning the data 
        //for eg here password and _id of each document is not shared
        const findAllUsers = await USER_DATA.find({}, '-password -_id')
        // console.log(findAllUsers)
        return res.json({ status: 200, Users: findAllUsers })
    } catch (error) {
        console.log(error)
    }


}
