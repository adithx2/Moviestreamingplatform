const express = require("express")
const ratingRoutes = express.Router()
const { addRating, getRating } = require('../controllers/ratingController')

ratingRoutes.get("/:movieId",  getRating)
ratingRoutes.post("/rate", addRating)

module.exports = ratingRoutes