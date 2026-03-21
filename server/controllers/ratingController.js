const Rating = require('../models/Rating')

const getRating = async (req, res) => {

    try {

        const movieId = req.params.movieId

        const ratings = await Rating.find({ movieId })
            .populate("user", "name _id")
        res.status(200).json(ratings)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const addRating = async (req, res) => {

    try {

        const { user, movieId, rating } = req.body

        // check existing rating

        const existing = await Rating.findOne({ user, movieId })

        if (existing) {

            existing.rating = rating
            await existing.save()

            return res.json(existing)
        }

        const newRating = new Rating({
            user,
            movieId,
            rating
        })

        await newRating.save()

        res.status(201).json(newRating)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

module.exports = { getRating, addRating }