const axios = require("axios");
require('dotenv').config()
const watchlist = require('../models/Watchlist')
const rating = require('../models/Rating')
const tf = require('@tensorflow/tfjs')
const { trainModel } = require('../models/ai')

// Recommended Movies 

const getRecommendedMovies = async (req, res) => {

  try {

    const response = await axios.get("https://api.tvmaze.com/shows");

    const movies = response.data
      .filter(show => show.image)
      .slice(10, 88)
      .map(show => ({
        id: show.id,
        title: show.title,
        genres : show.genres || [],
        rating: show.rating,
        premiered: show.premiered,
        image: show.image
      }));

    res.status(200).json(movies);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Failed to fetch movies" });

  }

};

// ai recomentation

const getAIRecommendations = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const userId = req.user.id

    // get ALL users data 

    const allWatchlist = await watchlist.find()
    const allRatings = await rating.find()

    let data = []

    // ratings

    allRatings.forEach(r => {
      data.push({
        userId: r.user.toString(),
        movieId: r.movieId.toString(),
        rating: r.rating / 5
      })
    })

    // watchlist fallback

    allWatchlist.forEach(w => {
      data.push({
        userId: w.userId.toString(),
        movieId: w.movieId.toString(),
        rating: 0.5
      })
    })

    if (!data.length) return res.json([])

    const users = [...new Set(data.map(d => d.userId))]
    const movies = [...new Set(data.map(d => d.movieId))]

    const formatted = data.map(d => ({
      userIndex: users.indexOf(d.userId),
      movieIndex: movies.indexOf(d.movieId),
      rating: d.rating
    }))

    // model

    const model = await trainModel(formatted)

    const userIndex = users.indexOf(userId.toString())

    if (userIndex === -1) return res.json([])

    // predict

    let predictions = []

    for (let i = 0; i < movies.length; i++) {

      const input = tf.tensor2d([[userIndex, i]])
      const pred = model.predict(input)

      const score = pred.dataSync()[0]

      predictions.push({
        movieId: movies[i],
        score
      })
    }

    // sort

    predictions.sort((a, b) => b.score - a.score)

    const topMovies = predictions.slice(5, 80)

    // fetch real data

    const response = await axios.get("https://api.tvmaze.com/shows")
    const allMovies = response.data

    const result = topMovies.map(p =>
      allMovies.find(m => m.id == p.movieId)
    ).filter(Boolean)

    res.json(result)

  } catch (error) {
    console.log("AI ERROR:", error)
    res.status(500).json({ message: "AI recommendation failed" })
  }
}


// movieId

const getMovieId = async (req, res) => {

  try {

    const { id } = req.params;

    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);

    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie"
    });

  }

};

// Trending 

const getTrendingMovies = async (req, res) => {

  try {

    const movies = [
      {
        id: 1,
        title: "Trending Movies",
        name: "Stranger Things",
        rating: { average: 8.7 },
        premiered: "2025",
        story: "When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
        image: {
          original: "https://deadline.com/wp-content/uploads/2025/12/stranger-things-season-5-netflix-posters.jpg?w=1024"
        }
      }
    ];

    res.status(200).json(movies);

  } catch (error) {

    res.status(500).json({ message: "Error fetching trending" });

  }

};

module.exports = { getRecommendedMovies, getAIRecommendations, getMovieId, getTrendingMovies };