const express =require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const {adminUser} = require('../models/adminModel');
const mongoose =require ('mongoose');

router.use(express.json());
router.post('/',async (req,res)=>{

   let  adminuser= await adminUser.findOne({email:req.body.email});

   console.log(adminuser);
  if(!adminuser) return res.status(404).send('user is  admin ');

  /*adminuser =new adminUser({
   name :req.body.name,
   email: req.body.email,
   password:req.body.password,
   isAdmin:req.body.isAdmin 
  });
  await adminuser.save();
  res.send(adminuser); 
  */

  const token = jwt.sign({_id :adminuser._id},PRIVATE_KEY);
  res.send(token) ;  

});

module.exports=router ;