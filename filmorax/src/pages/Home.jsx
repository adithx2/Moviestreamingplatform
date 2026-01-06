import React, { useEffect, useState } from 'react'
import {
  fetchTrendingMovies,
  fetchRecommendedMovies
} from '../data/movies'

const Home = () => {

  const [trending, setTrending] = useState([])
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    fetchTrendingMovies().then(setTrending)
    fetchRecommendedMovies().then(setRecommended)
  }, [])

  const movie = trending[0]

  return (

    <div className="bg-black min-h-screen pt-18 text-white">

      {/*  TRENDING HERO */}

      {movie && (
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{

            backgroundImage: `url(${movie.image.original})`

          }}
        >

          <h1 className='relative z-10 text-2xl font-bold px-10 pt-10'>Trending Movie</h1>

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent text-white"></div>

          {/* Content */}

          <div className="relative z-10 h-100 flex items-center px-10 pt-50">
            <div className="max-w-xl">
              <h1 className="text-5xl font-extrabold mb-4">
                {movie.name}
              </h1>

              <p className="text-sm text-gray-300 mb-4">
                ⭐ Rating: {movie.rating?.average}
              </p>

              <p className="text-md leading-relaxed mb-7">
                {movie.content}
              </p>

              <div className="flex gap-4">
                <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300">
                  Watch
                </button>
                <button className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600">
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ RECOMMENDED */}

      <div className="px-5 border-2 border-gray-500">
        <h2 className="text-2xl font-bold mb-4 mt-4 p-4 text-white">
          Recommended For You </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {recommended.map(show => (
            <div key={show.id}>
              <img
                src={show.image.medium}
                className="rounded hover:scale-105 transition duration-300"
              />
              <p className="text-sm mt-2 text-center">
                {show.name}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Home