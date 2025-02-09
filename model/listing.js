const mongoose = require('mongoose');
const Review = require('./review.js');
const User = require('./user.js');
const { required } = require('joi');

const listSchema = new mongoose.Schema({
    
    title: {
        type:String,
        require:true,
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: [String],
        enum: ["Trending", "Food", "Luxe", "Mountain", "Domes", "Castles", "Farm", "Beach", "Arctic", "Boat",
            "Desert", "Jungle", "Waterfalls", "Cityscape", "Caves", "Forests", "Islands", "Nightlife", 
            "Hot Springs", "Wildlife", "Countryside", "Temples"],
        require : true
    }
});

listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listSchema);

module.exports =  Listing ;