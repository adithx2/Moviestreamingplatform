import React, { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchRecommendedMovies,
} from "../data/movies";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const trendingData = await fetchTrendingMovies();
      const recommendedData = await fetchRecommendedMovies();

      setTrending(trendingData);
      setRecommended(recommendedData);
      setLoading(false);
    };

    loadMovies();
  }, []);


  // if (loading) {
  //   return (
  //     <div className="bg-black text-white text-center pt-32">
  //       Loading movies...
  //     </div>
  //   );
  // }

  const movie = trending[0]
  return (

    <div className="bg-black min-h-screenn border-2 border-gray-500 pt-18 text-white">

      {/*  TRENDING */}

      {movie && (
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.image.original})`,
          }}
        >

          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>

          <h1 className="relative z-10 text-2xl font-bold px-10 pt-10 text-white">
            Trending Movie
          </h1>

          {/* Content */}

          <div className="relative z-10 h-full flex items-center px-10">
            <div className="max-w-xl text-white">
              <h1 className="text-5xl font-extrabold mb-4">
                {movie.name}
              </h1>

              <p className="text-sm text-gray-300 mb-4">
                ⭐ Rating: {movie.rating?.average}
              </p>

              <p className="text-md leading-relaxed mb-7">
                {movie.story}
              </p>

              <div className="flex gap-4">

                {/* Watch Button */}

                <Link to={'https://youtu.be/AfQ13jsLDms'}>
                  <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400">
                    Watch
                  </button>

                </Link>

                {/* More Info Button */}
                <button
                  onClick={() => navigate(`/moviedetails/strangerthings`)}
                  className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECOMMENDED */}
      <h2 className=" text-white text-2xl px-8 font-bold mb-6">
        Recommended For you
      </h2>

      <div className="grid grid-cols-2 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommended.map((show) => (
          <div
            key={show.id}
            className="cursor-pointer"
            onClick={() => navigate(`/moviedetails/${show.id}`)}
          >
            <img
              src={show.image.medium}
              alt={show.name}
              className="rounded hover:scale-105 transition duration-300"
            />
            <p className="text-gray-300 text-sm mt-2 text-center">
              {show.name}
            </p>
          </div>
        ))}
      </div>
    </div>

  );


};

export default Home;