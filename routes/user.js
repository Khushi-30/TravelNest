const express = require("express");
const wrapAsync = require("../utility/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userCollector = require("../collectors/user.js");
const router = express.Router();

router.get("/signup", userCollector.renderSignupForm);

router.post("/signup",wrapAsync(userCollector.signup));

router.get("/login", userCollector.renderLoginForm);

router.post("/login",saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
    wrapAsync(userCollector.login)
);

router.get("/logout",userCollector.logout);

module.exports = router;