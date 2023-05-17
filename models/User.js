
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId:String,
    name:String,
    photo:String,
    email:String,
    isAdmin: Boolean ,
         
});

/*userSchema.methods.generatAuthToken=function(){

    const  token=jwt.sign({_id: this._id, isAdmin: this.isAdmin},'jwtprivatekey')
}*/
module.exports = mongoose.model('user', userSchema);