const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    title: String,
    image: String,
    rating: Number,
    year: String,
    genres:[String],
    story: String,
    content: String,
    watchUrl: String,
},

    { timestamps: true }

);

module.exports = mongoose.model("Movie", movieSchema);

