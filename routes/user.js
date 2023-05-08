const express =require('express');
const router = express.Router();
const passport =require('passport');





router.get('/',(req,res)=>{
    res.send('hello world');
});
// for register new user
router.get('/auth/google/register',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/admin/dashboard');
  });

  router.get('/logout',  (req, res, next) => {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
  
    return next();
  }
  res.status(401).send('Unauthorized');
}
  /*const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };*/

//for admin
router.get('/auth/admin/dashboard', ensureAuthenticated, (req, res) => {
  res.render('/auth/admin/dashboard', {
    user: req.user
  });
});

/*
//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/status", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.displayName})
})
*/




module.exports=router ;