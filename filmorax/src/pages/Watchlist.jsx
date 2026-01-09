import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {

  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setsearchTerm] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (watchlist.length === 0) {
    return (
      <div className="bg-black text-white font-bold min-h-screen pt-32 text-center">
        <h1>Your watchlist is empty 🎬</h1>

      </div>
    );
  }

  return (
    <div>
      <div className="bg-black min-h-screen pt-24 px-6 text-white">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        {/* Search input */}

        <div className='mb-6'>

          <input type="text" placeholder='Search in Watchlist' className='w-full p-4 rounded bg-gray-800 text-white focus:outline-none' value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />

        </div>

        {filteredWatchlist.length === 0 && (
          <p className='text-center text-gray-400 mt-6'>No results found</p>
        )}
      

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredWatchlist.map((movie) => (
            <div key={movie.id} className="relative">
              <img
                src={movie.image?.medium || movie.image?.original}
                alt={movie.name}
                className="rounded cursor-pointer"
                onClick={() => navigate(`/moviedetails/${movie.id}`)}
              />

              <button
                onClick={() => removeFromWatchlist(movie.id)} className='absolute top-2 right-2 bg-black/70 px-2 py-2 rounded text-xs hover:bg-red-600'
              >
                ✕
              </button>

              <p className="text-sm text-center mt-2">
                {movie.name}
              </p>
            </div>
          ))}
        </div>
         

      </div>
        
      </div>

      

      );
};

export default Watchlist

