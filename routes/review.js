const express = require("express");

const wrapAsync = require("../utility/wrapAsync.js");
const { validateReview, isLogIn, isAuthor } = require("../middleware.js");
const reviewCollector = require("../collectors/review.js");
const router = express.Router({mergeParams : true});

router.post("/",isLogIn,validateReview, wrapAsync(reviewCollector.createReview));
 
router.delete("/:rId",isLogIn,isAuthor,wrapAsync(reviewCollector.destroyReview));

module.exports = router;