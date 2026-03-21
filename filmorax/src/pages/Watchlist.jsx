import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteWatchlist, getWatchlist } from '../services/watchlistApi';


const Watchlist = () => {


  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setsearchTerm] = useState("")
  const navigate = useNavigate();

  useEffect(() => {

    // getWatchlist

    const fetchWatchlist = async () => {

      try {

        const data = await getWatchlist()
        setWatchlist(data)

      } catch (error) {

        console.log(error)
        toast.error("Failed to load watchlist")

      }

    }

    fetchWatchlist()

  }, []);

  // removeWatchlist

  const removeFromWatchlist = async (id) => {

    try {


      await deleteWatchlist(id)

      const update = watchlist.filter(movie => movie._id !== id)

      setWatchlist(update);

    } catch (error) {

      console.log(error)

    }
  };

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div key={movie._id} className="relative">
              <img
                src={movie.image}
                alt={movie.title}
                className="rounded cursor-pointer"
                onClick={() => navigate(`/moviedetails/${movie.movieId}`)}
                
              />

              <button
                onClick={() => removeFromWatchlist(movie._id)} className='absolute top-2 right-2 bg-black/70 px-4 py-2 rounded text-xs hover:bg-red-600'
              >
                X
              </button>

              <p className="text-sm text-center mt-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>

  );
};

export default Watchlist

