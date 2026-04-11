import React, { useEffect, useState } from "react";
import MovieCard from "../components/Moviecard";
import { recommendedMovies } from "../data/movies";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await recommendedMovies();

        const movieLike = res.filter(item => item.image).slice(0, 80);
        setFilteredMovies(movieLike);
        setMovies(movieLike);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchMovies();
  }, []);

  const filterGenre = (g) => {
    setGenre(g);
    if (g === "All") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.genres && movie.genres.includes(g)
      );
      setFilteredMovies(filtered);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-yellow-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-transparent animate-pulse"></div>
      </div>
      <h2 className="text-2xl font-bold tracking-widest text-yellow-500 uppercase animate-bounce">
        Fetching Movies
      </h2>
      <p className="mt-2 text-gray-400 max-w-xs">
        Please wait while we curate the best cinematic experiences for you...
      </p>
    </div>
  );

  return (
    <div className="bg-black p-4 min-h-screen pt-24 px-6 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center tracking-wide 
                   bg-clip-text text-transparent 
                   bg-linear-to-r from-orange-400 via-yellow-500 to-orange-600
                   drop-shadow-lg transition-transform duration-300 hover:scale-105">
        Top Rated Movies For You
      </h1>

      <p className="text-lg text-gray-400 mb-6 text-center">
        Explore our curated collection of top-rated and trending <span className="text-yellow-500 font-bold">movies</span>.
      </p>

      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {["All", "Drama", "Comedy", "Action", "Thriller", "Romance", "Crime", "Science-Fiction", "Adventure", "Fantasy"].map(g => (
          <button
            key={g}
            onClick={() => filterGenre(g)}
            className={`px-6 py-2 rounded-full border transition-all duration-300
              ${genre === g ? "bg-yellow-500 text-black border-yellow-500 scale-110" : "border-gray-500 hover:bg-gray-800 text-gray-300"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;