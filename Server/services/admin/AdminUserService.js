const { USER_DATA } = require('../../models/UserAuthModel')

exports.getUsers = async () => {
    const findAllUsers = await USER_DATA.find({}, '-password -_id')
    return { status: 200, Users: findAllUsers }
}
