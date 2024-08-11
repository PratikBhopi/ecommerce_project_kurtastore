const mongoose = require('mongoose')
const AdminRouter = require('../routes/AdminRoutes')


const ADMIN_CREDENTIALS = new mongoose.Schema({
    First_Name:String,
    Last_Name:String,
    email:String,
    mobile:{type:String,default:"000000000"},
    password:String,
    isAdmin:{type:Boolean,default:true},
    Access:String,  //keep access as (all, only products) so that not every admin can look into  the privacy of users
    // GENERAL== ADD/DELETE PRODUCTS  && OWNER== access to entire data of system  
    ADMIN_ID:String
},
{collection:'ADMIN_DB'})

const ADMIN_DB = new mongoose.model('ADMIN_DB',ADMIN_CREDENTIALS)








module.exports = { ADMIN_DB }