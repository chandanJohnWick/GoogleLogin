const express =require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const {adminUser} = require('../models/adminModel');
const mongoose =require ('mongoose');
const auth = require('../middleware/auth');
const adM=require('../middleware/adminmiddleware');

router.use(express.json());
router.post('/',[auth,adM],async (req,res,next)=>{

  try{
   let  adminuser= await adminUser.findOne({email:req.body.email});

   console.log(adminuser);
  if(adminuser) return res.status(404).send('user is  registered ');
//if use is not registered then new user created and  below code will exicute
  adminuser =new adminUser({
   name :req.body.name,
   email: req.body.email,
   password:req.body.password,
   
  });
  await adminuser.save();
  
   
  

  const token = adminuser.generateAuthToken();
    res.send(token) ;  

}
catch(ex){
  next(ex);
}

});

module.exports=router ;