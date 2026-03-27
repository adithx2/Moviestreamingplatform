const axios = require("axios");
require('dotenv').config()
const watchlist = require('../models/Watchlist')
const rating = require('../models/Rating')
const tf = require('@tensorflow/tfjs')
const Movie = require('../models/Movie')
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
        genres: show.genres || [],
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

const createMovie = async (req, res) => {
  try {
    const { title, image, rating, year, genres } = req.body;

    if (!title || !image || !rating || !year) {
      return res.status(400).json({ message: "All fields required" });
    }

    const movie = new Movie({
      title,
      image,
      rating,
      year,
      genres
    });

    await movie.save();
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        image: req.body.image,
        rating: req.body.rating,
        year: req.body.year,
        genres: req.body.genres,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update movie" });
  }
};

// Delete movie
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" });
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
        title: "Lokah",
        rating: { average: 7.6 },
        premiered: "2025",
        genres: ["superhero, fantasy, action"],
        story: "Chandra, a young woman, arrives in Bengaluru with a mission. Her neighbor, Sunny, sets out to unravel the mystery about her and they are on an unexpected adventure ride together.",
        content: "Lokah Chapter 1: Chandra is a 2025 Indian Malayalam-language superhero film written and directed by Dominic Arun and produced by Dulquer Salmaan under his banner Wayfarer Films. It stars Kalyani Priyadarshan in the title role along with Naslen, and Sandy, Chandu Salim Kumar and Arun Kurian in the supporting role. The story revolves around Chandra, a mysterious woman who arrives in Bengaluru who was summoned by Moothon to fight the evil. Her life changes after she meets a young man named Sunny and his friends and gets entangled with corrupt inspector Nachiyappa and an organ-trafficking ring associated with him.",
        watchUrl: "https://youtu.be/64XHtNWTB5o?si=NOydNI7rM5kx0NiL",

        image: {
          original: "https://i.ytimg.com/vi/TBCyw6pLcwI/maxresdefault.jpg"
        }
      },
      {
        id: 2,
        title: "Dhurandar",
        rating: { average: 8.3 },
        premiered: "2025",
        genres: ["Spy action-thriller"],
        story: "A mysterious traveler slips into the heart of Karachi's underbelly and rises through its ranks with lethal precision, only to tear the notorious ISI-Underworld nexus apart from within.",
        content: "Ajay Sanyal has witnessed many unusual attacks from Pakistan towards India which has claimed many lives and his seniors blame him for his failed strategy. Sanyal plans for a secret operation called Dhurandhar.Humza a spy enters Pakistan with a mission to break networks of terrorism planning attacks against India.His brief plan is to enter the gang of Rehman Dacait whose one of the most powerful gangsters with huge network.This seems to be quite impossible but with the help of another spy Alam he manages to enter the gang.Humza soon becomes a trust worthy aide of Rehman and starts to send information to RAW via Alam.Rehman is eyeing upcoming elections his mentor Jameel Jamali fears of loosing his seat and decides to take help of SP Aslam Chaudhary to eliminate Rehman.Humza is looking for more networks of terrorism and saves Rehman.But is unaware that by going this way he has invited major destruction in his country.",
        watchUrl: "https://youtu.be/BKOVzHcjEIo?si=bBbTKbujFFX6670r",
        image: {
          original: "https://assets-in.bmscdn.com/discovery-catalog/events/et00452447-hfgkjpezdq-landscape.jpg"
        }
      },

      {
        id: 3,
        title: "Mission Impossible The Final Reckoning",
        rating: { average: 8.8 },
        premiered: "2025",
        genres: ["superhero, fantasy, action"],
        story: "Hunt and the IMF pursue a dangerous AI called the Entity that's infiltrated global intelligence. With governments and a figure from his past in pursuit, Hunt races to stop it from forever changing the world.",
        content: "Mission: Impossible The Final Reckoning is a 2025 American action spy film directed by Christopher McQuarrie from a screenplay he co-wrote with Erik Jendresen.[7][8] It is the direct sequel to Mission: Impossible – Dead Reckoning Part One[b] (2023) and the eighth installment in the Mission: Impossible film series. The ensemble cast includes Tom Cruise (in his final portrayal of Ethan Hunt),[10] Hayley Atwell, Ving Rhames, Simon Pegg, Henry Czerny and Angela Bassett.[11][12] In the film, Hunt and his IMF team continue their mission to prevent the Entity, a rogue artificial intelligence, from destroying all of humanity.",
        watchUrl: "https://youtu.be/fsQgc9pCyDU?si=a0jIoABhStG-LkVV",
        image: {
          original: "https://i.ytimg.com/vi/NOhDyUmT9z0/maxresdefault.jpg"
        }
      },

      {
        id: 4,
        title: "Stranger things season 5",
        rating: { average: 8.6 },
        premiered: "2025",
        genres: ["horror, fantasy, action"],
        story: "In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.",
        content: "The fifth and final season of the American science fiction horror drama television series Stranger Things, marketed as Stranger Things 5, was released on the streaming service Netflix in two volumes and the finale. The first set of four episodes was released on November 26, 2025, the second set of three episodes was released on December 25, and the finale was released on December 31. The season was produced by the show's creators, the Duffer Brothers, along with Shawn Levy and Dan Cohen.",
        watchUrl: "https://youtu.be/AfQ13jsLDms?si=gnWWx459o4AMwnSL",
        image: {
          original: "https://deadline.com/wp-content/uploads/2025/12/stranger-things-season-5-netflix-posters.jpg"
        }
      },

      {
        id: 5,
        title: "Sarvam maya",
        rating: { average: 7.7 },
        premiered: "2025",
        genres: ["supernatural romantic comedy and fantasy"],
        story: "A young Hindu priest's peaceful life is disrupted when he meets a spirit. What starts as a supernatural challenge evolves into a profound journey that tests his faith and makes him question everything he knows.",
        content: "Sarvam Maya (Everything is a delusion) is a 2025 Indian Malayalam-language supernatural romantic comedy film written and directed by Akhil Sathyan.[4] Produced by Firefly Films, the film stars Nivin Pauly in the lead role and Riya Shibu in the title role along with Preity Mukhundhan, Aju Varghese, and Janardhanan.[5] The film is produced by Ajayya Kumar and Rajeev Menon under Firefly Productions Sarvam Maya released worldwide on 25 December 2025 in theatres, coinciding with Christmas.[8][9] The film received critical acclaim with praise for the performances (particularly of Nivin Pauly and Riya Shibu), direction, music, pacing, execution, story, humour, cinematography, screenplay, and light-heartedness. It has emerged as a commercial blockbuster and became fourth highest-grossing Malayalam film of 2025 and one of the highest-grossing Malayalam films of all time.",
        watchUrl: "https://youtu.be/uDh6gYX_4S0?si=5XAKvrFevYMnoxor",
        image: {
          original: "https://assets-in.bmscdn.com/discovery-catalog/events/et00473343-tsfygteztf-landscape.jpg"
        }
      },

    ];

    res.status(200).json(movies);

  } catch (error) {

    res.status(500).json({ message: "Error fetching trending" });

  }

};

module.exports = { getRecommendedMovies, getAIRecommendations, createMovie, deleteMovie, updateMovie, getMovieId, getTrendingMovies };