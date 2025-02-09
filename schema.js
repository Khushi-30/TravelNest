const Joi = require("joi");

module.exports.validateSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: {
            url: Joi.string().required(),
        },
        price: Joi.number().required(),
        category: Joi.array().items(Joi.string().valid(
            "Trending", "Food", "Luxe", "Mountain", "Domes", "Castles", "Farm", "Beach", "Arctic", "Boat",
            "Jungle", "Waterfalls", "Cityscape", "Caves", "Forests", "Nightlife", 
            "Hot Springs", "Wildlife", "Countryside", "Temples"
        )).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
        date: Joi.date()
    }).required()
});