const Listing = require("../model/listing");
const Review = require("../model/review");

module.exports.createReview = async(req, res)=>{
    let list = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    list.reviews.push(newReview);
    req.flash("success","New review added!");
    await list.save();
    await newReview.save();
 
    res.redirect(`/testing/${list._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id , rId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull:{reviews : rId}});
    await Review.findByIdAndDelete(rId);
    req.flash("success","Review deleted!");
    res.redirect(`/testing/${id}`);
};