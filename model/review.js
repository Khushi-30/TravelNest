const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Review = mongoose.model("Review",reviewSchema);

module.exports =  Review ;