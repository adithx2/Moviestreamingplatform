import React, { useEffect, useState } from "react";
import { trendingMovies } from "../data/movies";
import { getRecommendationAI } from "../services/movies";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Star, ChevronRight } from "lucide-react";

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
          getRecommendationAI()
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

  // Auto-slide effect
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
              className="w-full h-full bg-center object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full px-4 sm:px-6 md:px-16 pt-12 sm:pt-14 flex flex-col justify-center max-w-5xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
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

            <div className="flex flex-col sm:flex-row items-center pt-6 sm:pt-10 gap-3 sm:gap-4">
              <Link to={currentHero?.watchUrl}>
                <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all scale-100 active:scale-95 text-sm sm:text-base">
                  <Play size={20} fill="black" /> Watch Now
                </button>
              </Link>

              <button
                onClick={() => navigate(`/moviedetails/${currentHero?.title.toLowerCase().replace(/\s/g, "")}`)}
                className="w-full sm:w-auto bg-gray-500/20 backdrop-blur-md text-white border border-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-500/50 transition-all text-sm sm:text-base"
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

      {/* --- CONTENT SECTION --- */}

      <main className="relative z-20 ">

        {/* Recommendation */}

        {aiMovies && aiMovies.length > 0 && (

          <div className="px-4 sm:px-6 md:px-16 py-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Recommended For You</h2>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {aiMovies.map((show) => (
                <motion.div
                  key={show.id}
                  whileHover={{ y: -10 }}
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/moviedetails/${show.id}`)}
                >
                  <div className="relative aspect-2/3 overflow-hidden rounded-lg sm:rounded-xl border border-white/5 bg-gray-900 shadow-2xl">
                    <img
                      src={show.image?.original}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                  </div>

                  <div className="mt-2 sm:mt-4">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-100 truncate group-hover:text-yellow-500 transition-colors">
                      {show.name || show.title}
                    </h3>
                    <div className="flex justify-between items-center text-[8px] sm:text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                      <span>{show.genres?.[0] || "Movie"}</span>
                      <span className="flex items-center gap-1"><Star size={8} /> {show.rating?.average || "N/A"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default Home;
