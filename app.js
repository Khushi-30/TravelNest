if(process.env.NODE_ENV != "production"){
    require('dotenv').config()    
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

const path = require("path");
app.set('view engine','ejs');
app.set("views" , path.join(__dirname,"views"));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));

const ExpressError = require("./utility/ExpressError.js");

const listRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js")
const session = require("express-session");
const flash = require("express-flash");

const User = require('./model/user');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

const dbUrl = process.env.ATLASDB_URL;

main()
    .then((res) => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
};

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*60*60
});

store.on("error",()=>{
    console.log("ERROR in mongo store",err);
})

const sessionOption = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

app.use(session(sessionOption)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.cuser = req.user;
    next();
});

app.use("/testing",listRoute);
app.use("/testing/:id/review",reviewRoute);
app.use("/",userRoute);

app.all("*",(req,res,next) => {
    next(new ExpressError(404,"page not found"));
});

app.use((err,req,res,next) => {
    let{statuscode=500, message="something went wrong"} = err;
    res.render("error.ejs",{message});
});

app.listen(8080, () =>{
    console.log("server listening");
});