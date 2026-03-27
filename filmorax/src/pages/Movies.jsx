import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/Moviecard";
import { recommendedMovies } from "../data/movies";

const Movies = () => {

  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('All')
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const res = await recommendedMovies()
        console.log(res)
        const movieLike = res.filter(item => item.image).slice(1, 80);
        setFilteredMovies(movieLike)
        setMovies(movieLike);

      } catch (error) {

        console.log(error)

      }
    }

    fetchMovies()
  }, []);

  const filterGenre = (g) => {
    setGenre(g);

    if (g === "All") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.genres && movie.genres.includes(g)

      );

      console.log(movies[0])
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className="bg-black p-4 min-h-screen pt-24 px-6 text-white">

      <h1 className="text-4xl font-bold mb-4 text-center tracking-wide 
                 bg-clip-text text-transparent 
                 bg-linear-to-r from-orange-400 via-yellow-500  
                 drop-shadow-lg transition-transform duration-300 hover:scale-105 hover:drop-shadow-2xl">

        Top Rated Movies For You
      </h1>

      <p className="text-lg text-gray-400 mb-6">
        Explore our curated collection of top-rated and trending <span className="text-yellow-500 font-bold">movies</span>. Find your next favorite film here!
      </p>

      <div className="flex gap-3 mb-6 flex-wrap">

        {["All", "Drama", "Comedy", "Action", "Thriller", "Romance", "Crime", "Science-Fiction", "Adventure", "Fantasy"].map(g => (
          <button
            key={g}
            onClick={() => filterGenre(g)}
            className={`px-4 py-1 rounded-full border transition
              ${genre === g ? "bg-yellow-500 text-black" : "border-gray-500 hover:bg-gray-800"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
