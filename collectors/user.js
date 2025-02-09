const User = require("../model/user");

module.exports.renderSignupForm = async (req, res,next) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser , password);
 
        req.login(registerUser, (err) => {
            if (err){
               return next(err); 
            }
            req.flash("success","You successfully signUp!");
            res.redirect("/testing");
        });
        
    }
    catch(err){
       req.flash("error",err.message);
       res.redirect("/signup");
    }
};

module.exports.renderLoginForm = async (req, res,next) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/testing";
    req.flash("success","You successfully Login!");
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        req.flash("success","You successfully Logout!");
        res.redirect("/testing");
    });
};