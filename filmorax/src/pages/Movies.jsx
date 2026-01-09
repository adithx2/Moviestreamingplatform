import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/Moviecard";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/shows")
    .then((res) => {

    const movieLike = res.data.filter(item => item.image).slice(1,55);
      setMovies(movieLike);
    });
  }, []);


  return (
    <div className="bg-black min-h-screen pt-24 px-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
