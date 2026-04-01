// import React, { useEffect, useState } from "react"
// import { trendingMovies, recommendedMovies } from "../data/movies";
// import { getRecommendationAI } from "../services/movies";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Home = () => {

//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [aiMovies, setAimovies] = useState([])

//   const navigate = useNavigate();

//   useEffect(() => {

//     const loadMovies = async () => {

//       const trendingData = await trendingMovies();

//       setTrending(trendingData);
//       setLoading(false);
//     };

//     loadMovies();
//   }, []);


//   useEffect(() => {
//     if (!trending.length) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === trending.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [trending]);

//   useEffect(() => {
//     fetchAI();
//     setLoading(false)

//   }, []);

//   const fetchAI = async () => {
//     try {
//       const data = await getRecommendationAI();
//       setAimovies(data);
//       console.log(data)
//     } catch (error) {
//       console.log(error);
//     }

//     setLoading(false)

//   };

//   if (loading) {
//     return (
//       <div className="bg-black h-screen flex items-center justify-center">
//         <h1 className="text-white text-2xl animate-pulse">
//           Loading Movies...
//         </h1>
//       </div>
//     );

//   }


//   const movie = trending[currentIndex]


//   return (

//     <div className="min-h-screen bg-black pt-18">

//       {/*  TRENDING */}

//       {movie && (

//         <div
//           className="relative h-screen w-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${movie.image.original})`,
//           }}
//         >
//           <div className="absolute inset-0 bg-linear-to-r from-black via-black-40 to-transparent"></div>

//           <h1 className="relative z-10 text-4xl font-bold px-10 pt-10 text-white">
//             Trending Movies
//           </h1>


//           {/* Content */}

//           <div className="relative z-10 h-full flex items-center px-10">
//             <div className="max-w-xl text-white">
//               <h1 className="text-5xl font-extrabold mb-4">
//                 {movie.title}
//               </h1>

//               <p className="text-sm text-gray-300 mb-4">
//                 ⭐ Rating: {movie.rating?.average}
//               </p>

//               <p className="text-md leading-relaxed mb-7">
//                 {movie.story}
//               </p>

//               <div className="flex gap-4">

//                 {/* Watch Button */}

//                 <Link to={movie.watchUrl}>

//                   <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400">
//                     Watch
//                   </button>

//                 </Link>

//                 {/* More Info Button */}


//                 <button
//                   onClick={() => navigate(`/moviedetails/${movie.title.toLowerCase().replace(/\s/g, "")}`)}
//                   className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600"
//                 >
//                   More Info
//                 </button>

//               </div>
//             </div>
//           </div>

//           <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
//             {trending.map((_, index) => (
//               <span
//                 key={index}
//                 className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-yellow-500" : "bg-gray-500"
//                   }`}
//               />
//             ))}
//           </div>

//         </div>
//       )}

//       {/* RECOMMENDED */}

//       <h2 className=" text-white text-2xl px-8 font-bold py-4 mb-4">
//         Recommended For you
//       </h2>

//       <div className="grid grid-cols-2 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 min-h-screen gap-4">
//         {aiMovies.map((show) => (
//           <div
//             key={show.id}
//             className="cursor-pointer"
//             onClick={() => navigate(`/moviedetails/${show.id}`)}
//           >
//             <img
//               src={show.image?.medium}
//               alt={show.title}
//               className="rounded hover:scale-105 transition duration-300"
//             />
//             <p className="text-gray-300 text-sm mt-2 text-center">
//               {show.name}
//             </p>

//             <p>{show.genre}</p>
//           </div>

//         ))}
//       </div>


//     </div>


//   );

// }

// export default Home;

import React, { useEffect, useState } from "react";
import { trendingMovies } from "../data/movies";
import { getRecommendationAI } from "../services/movies";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Install framer-motion
import { Play, Info, Star, ChevronRight } from "lucide-react"; // Install lucide-react

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
    }, 8000); // Increased to 8s for better readability
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

      <section className="relative h-[90vh] w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={currentHero?.image.original}
              alt={currentHero?.title}
              className="w-full bg-center h-[90vh] overflow-hidden"
            />

            {/* Professional Gradient Masks */}
            <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full px-4  pt-14 flex flex-col justify-center md:px-16 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >

            <div className="flex items-center gap-4 mb-10">
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">TRENDING NOW</span>
              <div className="flex items-center text-yellow-400 gap-1 font-bold">
                <Star size={16} fill="currentColor" />
                {currentHero?.rating?.average}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-10 uppercase tracking-tighter italic">
              {currentHero?.title}
            </h1>

            <p className="text-lg text-gray-200 line-clamp-3 mb-8 max-w-2xl leading-relaxed shadow-black drop-shadow-lg">
              {currentHero?.story}
            </p>

            <div className="flex items-center pt-10 gap-4">
              <Link to={currentHero?.watchUrl}>
                <button className="bg-white text-black px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-all scale-100 active:scale-95">
                  <Play size={20} fill="black" /> Watch Now
                </button>
              </Link>

              <button
                onClick={() => navigate(`/moviedetails/${currentHero?.title.toLowerCase().replace(/\s/g, "")}`)}
                className="bg-gray-500/30 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-500/50 transition-all"
              >
                <Info size={20} /> More Info
              </button>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-20 right-10 flex gap-3">
          {trending.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? "w-10 bg-yellow-500" : "w-4 bg-gray-600"
                }`}
            />
          ))}
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}

      <main className="relative z-20 ">

        {/* Recommendation Row */}

        <div className=" px-4 md:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Recommended For You</h2>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {aiMovies.map((show) => (
              <motion.div
                key={show.id}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => navigate(`/moviedetails/${show.id}`)}
              >
                <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/5 bg-gray-900 shadow-2xl">
                  <img
                    src={show.image?.medium}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-100 truncate group-hover:text-yellow-500 transition-colors">
                    {show.name || show.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                    <span>{show.genres?.[0] || "Movie"}</span>
                    <span className="flex items-center gap-1"><Star size={10} /> {show.rating?.average || "N/A"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;