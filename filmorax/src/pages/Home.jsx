import React, { useEffect, useState } from "react"
import { trendingMovies, recommendedMovies } from "../data/movies";
import { getRecommendationAI } from "../services/movies";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiMovies, setAimovies] = useState([])

  const navigate = useNavigate();

  useEffect(() => {

    const loadMovies = async () => {

      const trendingData = await trendingMovies();

      setTrending(trendingData);
      setLoading(false);
    };

    loadMovies();
  }, []);


  useEffect(() => {
    if (!trending.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === trending.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [trending]);

  useEffect(() => {
    fetchAI();
    setLoading(false)

  }, []);

  const fetchAI = async () => {
    try {
      const data = await getRecommendationAI();
      setAimovies(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }

    setLoading(false)

  };

  if (loading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl animate-pulse">
          Loading Movies...
        </h1>
      </div>
    );

  }


  const movie = trending[currentIndex]


  return (

    <div className="min-h-screen bg-black pt-18">

      {/*  TRENDING */}

      {movie && (

        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.image.original})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black via-black-40 to-transparent"></div>

          <h1 className="relative z-10 text-4xl font-bold px-10 pt-10 text-white">
            Trending Movies
          </h1>


          {/* Content */}

          <div className="relative z-10 h-full flex items-center px-10">
            <div className="max-w-xl text-white">
              <h1 className="text-5xl font-extrabold mb-4">
                {movie.title}
              </h1>

              <p className="text-sm text-gray-300 mb-4">
                ⭐ Rating: {movie.rating?.average}
              </p>

              <p className="text-md leading-relaxed mb-7">
                {movie.story}
              </p>

              <div className="flex gap-4">

                {/* Watch Button */}

                <Link to={movie.watchUrl}>

                  <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400">
                    Watch
                  </button>

                </Link>

                {/* More Info Button */}


                <button
                  onClick={() => navigate(`/moviedetails/${movie.title.toLowerCase().replace(/\s/g, "")}`)}
                  className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600"
                >
                  More Info
                </button>

              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
            {trending.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-yellow-500" : "bg-gray-500"
                  }`}
              />
            ))}
          </div>

        </div>
      )}

      {/* RECOMMENDED */}

      <h2 className=" text-white text-2xl px-8 font-bold py-4 mb-4">
        Recommended For you
      </h2>

      <div className="grid grid-cols-2 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 min-h-screen gap-4">
        {aiMovies.map((show) => (
          <div
            key={show.id}
            className="cursor-pointer"
            onClick={() => navigate(`/moviedetails/${show.id}`)}
          >
            <img
              src={show.image?.medium}
              alt={show.title}
              className="rounded hover:scale-105 transition duration-300"
            />
            <p className="text-gray-300 text-sm mt-2 text-center">
              {show.name}
            </p>

            <p>{show.genre}</p>
          </div>

        ))}
      </div>


    </div>


  );

}

export default Home;

