import React, { useEffect, useState } from "react";
import { trendingMovies } from "../data/movies";
import { getRecommendationAI } from "../services/movies";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Play, Info, Star } from "lucide-react";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiMovies, setAimovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trendingData, aiData] = await Promise.all([
          trendingMovies(),
          getRecommendationAI(),
        ]);
        setTrending(trendingData);
        setAimovies(aiData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (!trending.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === trending.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [trending]);

  if (loading) {
    return (
      <div className=" bg-[#0a0a0a] h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 animate-pulse font-medium tracking-widest">PREPARING YOUR FEED</p>
      </div>
    );
  }

  const currentHero = trending[currentIndex];

  return (
    <div className="min-h-screen bg-[#050505] text-yellow-500 overflow-x-hidden">

      {/* --- HERO SECTION --- */}

      <section className="relative h-screen sm:h-[85vh] md:h-[90vh] w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full"
          >
            <img
              src={currentHero?.image.original}
              alt={currentHero?.title}
              className="w-full h-full bg-center"
            />

            <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full px-4 sm:px-6 md:px-32 pt-12 sm:pt-14 flex flex-col justify-center max-w-5xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-5">
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">TRENDING NOW</span>
              <div className="flex items-center text-yellow-400 gap-1 font-bold text-sm">
                <Star size={16} fill="currentColor" />
                {currentHero?.rating?.average}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 md:mb-10 uppercase tracking-tighter italic leading-tight">
              {currentHero?.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-2 sm:line-clamp-3 mb-6 sm:mb-8 max-w-2xl leading-relaxed shadow-black drop-shadow-lg">
              {currentHero?.story}
            </p>

            <div className="flex  sm:flex-row items-center pt-6 sm:pt-10 gap-3 sm:gap-4">
              <Link to={currentHero?.watchUrl}>
                <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all scale-100 active:scale-95 text-sm sm:text-base">
                  <Play size={20} fill="black" /> Watch Now
                </button>
              </Link>

              <button
                onClick={() => navigate(`/moviedetails/${currentHero?.title.toLowerCase().replace(/\s/g, "")}`)}
                className=" bg-gray-500/20 backdrop-blur-md text-white border border-white/10 px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-500/50 transition-all text-sm sm:text-base"
              >
                <Info size={20} /> More Info
              </button>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-20 right-4 sm:right-8 md:right-10 flex gap-2 sm:gap-3">
          {trending.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 sm:h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? "w-8 sm:w-10 bg-yellow-500" : "w-3 sm:w-4 bg-gray-600"
                }`}
            />
          ))}
        </div>
      </section>


      <main className="relative z-10 bg-[#050505] pb-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Curated Collection</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Trending Releases</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {trending.slice(0, 6).map((show) => (
              <motion.div
                key={show.id}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] shadow-2xl shadow-black/20"
              >
                <button
                  onClick={() => navigate(`/moviedetails/${(show.title || show.name || "").toLowerCase().replace(/\s+/g, "")}`)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-900">
                    <img
                      src={show.image?.original}
                      alt={show.title || show.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-gray-400">
                      <span>{show.genres?.[0] || "Film"}</span>
                      <span className="inline-flex items-center gap-1 text-yellow-300">
                        <Star size={12} /> {show.rating?.average ?? "N/A"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">{show.title || show.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400 line-clamp-3">
                      {show.story || show.summary?.replace(/<[^>]+>/g, "") || "A refined choice for your watchlist."}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {aiMovies && aiMovies.length > 0 && (
          <section className="mx-auto max-w-7xl px-8 py-10 sm:px-6 lg:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">AI</p>
                <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Recommended For You</h2>
              </div>

            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {aiMovies.map((show) => (
                <motion.button
                  key={show.id}
                  whileHover={{ y: -5 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] p-0 text-left shadow-xl shadow-black/20"
                  onClick={() => navigate(`/moviedetails/${show.id}`)}
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <img
                      src={show.image?.original}
                      alt={show.title || show.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-gray-500">
                      <span>{show.genres?.[0] || "Series"}</span>
                      <span className="inline-flex items-center gap-1 text-yellow-300">
                        <Star size={12} /> {show.rating?.average ?? "N/A"}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{show.name || show.title}</h3>
                    <p className="text-sm leading-6 text-gray-400 line-clamp-3">
                      {show.story || show.summary?.replace(/<[^>]+>/g, "") || "Hand-picked by AI for your next binge."}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
