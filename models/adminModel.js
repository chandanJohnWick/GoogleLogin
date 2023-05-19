const mongoose =require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const adminSchema =new mongoose.Schema({
name:String,
email:String,
password:String,
isAdmin:Boolean

});

adminSchema.methods.generateAuthToken =function (){
    const token = jwt.sign({_id :this._id,isAdmin:this.isAdmin},process.env.PRIVATE_KEY);
    return token;

}

const adminUser =mongoose.model('adminUser',adminSchema);


exports.adminUser = adminUser;