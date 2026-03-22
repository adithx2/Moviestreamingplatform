const express = require("express");
const movieRoutes = express.Router();

const { getRecommendedMovies, getAIRecommendations, getMovieId, getTrendingMovies } = require("../controllers/movieController");
const validateToken = require("../middileware/authMiddileware");

movieRoutes.get("/", (req, res) => {
  res.send("Movies route working");
});

movieRoutes.get("/recommended", getRecommendedMovies);
movieRoutes.get("/ai", validateToken, getAIRecommendations);
movieRoutes.get("/trending", getTrendingMovies);
movieRoutes.get("/:id", getMovieId)

module.exports = movieRoutes;