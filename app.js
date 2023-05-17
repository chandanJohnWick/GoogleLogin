require('dotenv').config();
const express=require ('express');
const app=express();
const mongoose =require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const userRoute =require('./routes/user');
const adminRoute =require('./routes/admin');
const passport = require('passport');
require('./config/passport')(passport)

const port = process.env.PORT || 4000;


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connection is sussesful'))
.catch((err)=> console.log(err));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }, 
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.json());

app.use('/',userRoute);

app.use('/admin',adminRoute);

app.listen(port,()=>{console.log(`listning  on port ${port}...`);
});

