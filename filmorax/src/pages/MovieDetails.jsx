// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MovieDetails = () => {
//   const { id } = useParams(); // URL il ninn movie id
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`https://api.tvmaze.com/shows/${id}`)
//       .then((res) => {
//         setMovie(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Movie details error", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="bg-black text-white text-center pt-32">
//         Loading details...
//       </div>
//     );
//   }

//   if (!movie) {
//     return (
//       <div className="bg-gray-500 text-white text-center pt-32">
//         Movie not found
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-500 min-h-screen pt-24 px-6 text-white">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
//         {/* Poster */}
//         <img
//           src={movie.image?.original}
//           alt={movie.name}
//           className="rounded-lg md:w-1/3"
//         />

//         {/* Details */}
//         <div className="md:w-2/3">
//           <h1 className="text-4xl font-bold mb-4">
//             {movie.name}
//           </h1>

//           <p className="text-gray-300 mb-2">
//             ⭐ Rating: {movie.rating?.average || "N/A"}
//           </p>

//           <p className="text-gray-300 mb-2">
//             📅 Premiered: {movie.premiered}
//           </p>

//           <p className="text-gray-300 mb-4">
//             🎭 Genre: {movie.genres.join(", ")}
//           </p>

//           <div
//             className="text-gray-200 mb-6"
//             dangerouslySetInnerHTML={{ __html: movie.summary }}
//           />

//           <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700">
//             Add to Watchlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white text-center pt-32">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black text-white text-center pt-32">
        Movie not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* 🔹 BLUR BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{
          backgroundImage: `url(${movie.image?.original})`,
        }}
      ></div>

      {/* 🔹 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* 🔹 CONTENT */}
      <div className="relative z-10 pt-28 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-black/40 backdrop-blur-md p-6 rounded-lg">

          {/* Poster */}
          <img
            src={movie.image?.original}
            alt={movie.name}
            className="rounded-lg md:w-1/3 shadow-lg"
          />

          {/* Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">
              {movie.name}
            </h1>

            <p className="text-gray-300 mb-2">
              ⭐ Rating: {movie.rating?.average || "N/A"}
            </p>

            <p className="text-gray-300 mb-2">
              📅 Premiered: {movie.premiered}
            </p>

            <p className="text-gray-300 mb-4">
              🎭 Genres: {movie.genres.join(", ")}
            </p>

            <div
              className="text-gray-200 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: movie.summary }}
            />

            <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700">
              Add to Watchlist
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;