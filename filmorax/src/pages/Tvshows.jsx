import React, { useEffect, useState } from "react";
import axios from "axios";
import TvShowCard from "../components/TvShowCard";
import { recommendedMovies } from "../data/movies";
import { FaLaptopHouse } from "react-icons/fa";
const TvShows = () => {

  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState("All")
  const [loading, setLoading] = useState(true)
  const [filteredShows, setFilteredShows] = useState([])

  useEffect(() => {

    const fetchTvshows = async () => {

      setLoading(true)

      try {

        const res = await recommendedMovies()

        setShows(res.filter(item => item.image).slice(50, 80))
        setFilteredShows(res)

        const allGenres = [
          ...new Set(res.flatMap(show => show.genres || []))
        ];

        setGenres(["All", ...allGenres]);
      } catch (error) {

        console.log(error)
      }
    };

    fetchTvshows()

    setLoading(false)

  }, []);

  const filterGenre = (g) => {
    setGenre(g);

    if (g === "All") {
      setFilteredShows(shows);
      return;
    }

    const filtered = shows.filter(show =>
      show.genres.includes(g)
    );

    setFilteredShows(filtered);
  };


  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-500">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mb-4"></div>
      <p className="font-medium">Loading Movies...</p>
    </div>
  );


  return (
    <div className="bg-black min-h-screen pt-24 px-6 text-white">

      <h1 className="text-4xl font-bold mb-4 text-center tracking-wide 
                 bg-clip-text text-transparent 
                 bg-linear-to-r from-orange-400 via-yellow-500 to-pink-600 
                 drop-shadow-lg transition-transform duration-300 hover:scale-105 hover:drop-shadow-2xl">

        TV Shows
      </h1>
      <p className="text-lg text-gray-400 mb-6">

        Discover trending series and all-time favorite <span className="text-yellow-500 font-bold">Tv shows</span> in one place.
      </p>

      <div className="flex gap-3 mb-6 flex-wrap">
        {["All", "Drama", "Romance", "Fantasy", "Music", "Western", "Thriller", "Comedy", "Action", "Adventure"].map(g => (
          <button
            key={g}
            onClick={() => filterGenre(g)}
            className={`px-4 py-1 rounded-full border transition
              ${genre === g ? "bg-indigo-500 text-white" : "border-gray-500 hover:bg-gray-800"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredShows.map((show) => (
          <TvShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default TvShows;