const express = require("express");
const movieRoutes = express.Router();

const { getRecommendedMovies, getMovies, getMovieId, getAIRecommendations, createMovie, deleteMovie, updateMovie, getTrendingMovies } = require("../controllers/movieController");
const { validateToken, admin } = require("../middileware/authMiddileware");

movieRoutes.post("/", validateToken, admin, createMovie);
movieRoutes.put("/:id", validateToken, admin, updateMovie);
movieRoutes.delete("/:id", validateToken, admin, deleteMovie);

movieRoutes.get("/ai", validateToken, getAIRecommendations);
movieRoutes.get("/trending", getTrendingMovies);
movieRoutes.get("/recommended", validateToken, getRecommendedMovies);
movieRoutes.get("/:id", getMovieId)

module.exports = movieRoutes;