const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const {validateSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const ExpressError = require("./utility/ExpressError.js");

module.exports.isLogIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be Logged in!!!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.validate = (req, res, next) =>{
    let {error} = validateSchema.validate(req.body);
    if(error){
        throw(new ExpressError(400,error));
    }
    else{
        next();
    }
};

module.exports.validateReview =  (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        console.log(error);
        throw(new ExpressError(400,error));
    }
    else{
        next();
    }
};

module.exports.isOwner = async(req, res, next) =>{
    let {id} = req.params;
    const list = await Listing.findById(id);
    if(! list.owner.equals(res.locals.cuser._id)){
        req.flash("error","You have not access for doing this!!!");
        return res.redirect(`/testing/${id}`);
    }  
    next();
};

module.exports.isAuthor = async(req, res, next) =>{
    let {id,rId} = req.params;
    const review = await Review.findById(rId);
    if(!review.author.equals(res.locals.cuser._id)){
        req.flash("error","You have not access for doing this!!!");
        return res.redirect(`/testing/${id}`);
    }  
    next();
};