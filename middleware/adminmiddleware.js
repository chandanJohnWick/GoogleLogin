module.exports=function(req,res,next){

    if(!req.adminuser.isAdmin) return res.status(403).send('access denied');


    //otherwise user is isAdmin pass the control to next middleware function 


    next();
}