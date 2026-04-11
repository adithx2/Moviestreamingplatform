import React, { useEffect, useState } from "react";
import TvShowCard from "../components/TvShowCard";
import { recommendedMovies } from "../data/movies";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    const fetchTvshows = async () => {
      setLoading(true);
      try {
        const res = await recommendedMovies();
        const data = res.filter(item => item.image).slice(50, 80);
        setShows(data);
        setFilteredShows(data);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTvshows();
  }, []);

  const filterGenre = (g) => {
    setGenre(g);
    if (g === "All") {
      setFilteredShows(shows);
    } else {
      const filtered = shows.filter(show =>
        show.genres && show.genres.includes(g)
      );
      setFilteredShows(filtered);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-transparent animate-pulse"></div>
      </div>
      <h2 className="text-2xl font-bold tracking-widest text-indigo-400 uppercase animate-pulse">
        Loading Series
      </h2>
      <p className="mt-2 text-gray-400 max-w-xs text-sm">
        Discovering the most trending TV shows for your watchlist. Please hold on...
      </p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen pt-24 px-6 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center tracking-wide 
                 bg-clip-text text-transparent 
                 bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 
                 drop-shadow-lg transition-transform duration-300 hover:scale-105">
        TV Shows
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Discover trending series and all-time favorite <span className="text-indigo-500 font-bold">TV shows</span> in one place.
      </p>

      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {["All", "Drama", "Romance", "Fantasy", "Music", "Western", "Thriller", "Comedy", "Action", "Adventure"].map(g => (
          <button
            key={g}
            onClick={() => filterGenre(g)}
            className={`px-6 py-2 rounded-full border transition-all duration-300
              ${genre === g ? "bg-indigo-600 text-white border-indigo-600 scale-110" : "border-gray-500 hover:bg-gray-800 text-gray-300"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredShows.map((show) => (
          <TvShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default TvShows;