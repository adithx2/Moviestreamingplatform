const mongoose = require('mongoose')
const watchlistSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    movieId: {

        type: Number,
        required: true
    },

    title:{
        type: String
    },
    
    image: {

        type:String
    }
})

module.exports = mongoose.model("Watchlist", watchlistSchema)