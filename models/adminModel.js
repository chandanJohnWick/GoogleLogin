const mongoose =require('mongoose');

const adminUser =mongoose.model('adminUser',new mongoose.Schema({

name:String,
email:String,
isAdmin:Boolean,
password:String


}));


exports.adminUser = adminUser;