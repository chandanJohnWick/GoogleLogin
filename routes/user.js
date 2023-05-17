const express =require('express');
const router = express.Router();
const passport =require('passport');
const User = require('../models/User');

router.get('/',(req,res)=>{
    res.send('hello world');
});

router.get('/auth/google/register',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  router.get('/logout',  (req, res, next) => {
    req.logout();
    res.redirect('/');
});

/*router.get('/admin', async (req,res)=>{

  //const {isAdmin}= req.body ;

//const adminUser = await  User.findOne({ isadmin:req.body.isadmin});
    const adminUser = await User.findOne({ email, isAdmin: true });
    res.send(adminUser);

console.log(adminUser);
if(!adminUser){
  return res.status(404).json({message :"user is not an Admin"});
}


const token = jwt.sign({_id :adminUser._id , isAdmin: adminUser.isAdmin},'jwtprivatekey');

//res.send(token);
res.status(201).json({user:adminUser,token:token});


});


































/*function ensureAuthenticated(req, res, next) {
  if (req.user.isAdmin) {
  
    return next();
  }
  res.status(401).send('Unauthorized');
} */
  /*const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };*/

//for admin
/*router.get('/auth/admin/dashboard', ensureAuthenticated, (req, res) => {
  res.render('/auth/admin/dashboard', {
    user: req.user
  });
});*/

/*
//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/status", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.displayName})
})
*/




module.exports=router ;