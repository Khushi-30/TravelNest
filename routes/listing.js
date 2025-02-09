const express = require("express");

const wrapAsync = require("../utility/wrapAsync.js");
const {isLogIn ,validate, isOwner} = require("../middleware.js");
const listingCollector = require("../collectors/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const router = express.Router();

//Index
router.get("/", wrapAsync(listingCollector.index));

//New
router.get("/new",isLogIn,wrapAsync(listingCollector.renderNewForm));
router.post("/",isLogIn,upload.single('listing[image]'),validate,
    wrapAsync(listingCollector.createNewList)
);

//Filter
router.get("/filter",wrapAsync(listingCollector.filterIndex));

//Edit
router.get("/:id/edit",isLogIn,isOwner,wrapAsync(listingCollector.renderEditForm));
router.put("/:id",upload.single('listing[image]'),validate,wrapAsync(listingCollector.editList));

//Delete
router.delete("/:id",isLogIn,isOwner,wrapAsync(listingCollector.destroyList));

//Show
router.get("/:id",wrapAsync(listingCollector.showList));

module.exports = router;