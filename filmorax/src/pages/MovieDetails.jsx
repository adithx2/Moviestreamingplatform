import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getRatings, addRating } from "../services/ratingApi";
import { trendingMovies, } from "../data/movies";
import { getMovieId } from "../services/movies";
import { AddWatchlist } from "../components/Addwatchlist";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(null)
  const [ratings, setRatings] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    const fetchMoviedetails = async () => {

      try {

        // Check if the id matches trending movie

        const trending = await trendingMovies()

        const localMovie = trending.find(

          (m) => m.name.toLowerCase().replace(/\s/g, "") === id.toLowerCase()
        );

        if (localMovie) {
          setMovie(localMovie);
          setLoading(false);
          return

        }

        // movie id

        const res = await getMovieId(id)

        setMovie(res.data)
        setLoading(false)

      } catch (error) {

        console.log(error)
        setLoading(false)
      }

    }

    fetchMoviedetails()


  }, [id]);

  // movie rating

  useEffect(() => {


    const fetchRatings = async () => {

      try {

        const res = await getRatings(id)
        setRatings(res);

        const myRating = res.find(

          (item) => item.user?._id?.toString() === user?.id.toString()

        )

        if (myRating) {
          setRating(myRating.rating)
        }

      } catch (error) {
        console.log(error)
      }

    }
    fetchRatings();

  }, [id, user]);

  const handleRating = async (value) => {

    if (!user?.id) {
      toast.error("Please login first");
      return;
    }

    setRating(value);

    try {

      await addRating({
        user: user.id,
        movieId: id,
        rating: value,
      });

      toast.success("Rating added");

    } catch (error) {

      console.log(error);
      toast.error("Rating failed");

    }

  };

  // loading

  if (loading) {
    return (
      <div className="bg-black h-screen text-white text-center pt-32">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black w-full h-screen text-white text-center pt-32">
        Movie not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">


      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{
          backgroundImage: `url(${movie.image?.original})`,
        }}
      ></div>


      <div className="absolute inset-0 bg-black/50"></div>

      {/*  Content */}

      <div className="relative z-10 pt-28 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-black/40 backdrop-blur-md p-6 rounded-lg">

          {/* Images */}

          <img
            src={movie.image?.original}
            alt={movie.name}
            className="rounded-lg md:w-1/3 shadow-lg"
          />

          {/* Details */}

          <div className="md:w-2/2">
            <h1 className="text-4xl font-bold mb-4">
              {movie.name}
            </h1>


            <p className="text-gray-300 mb-2">
              ⭐ Rating: {movie.rating?.average}
            </p>

            <p className="text-gray-300 mb-2">
              📅 Premiered: {movie.premiered}
            </p>

            <p className="text-gray-300 mb-2">
              🎭 Genres: {movie.genres?.length ? movie.genres.join(", ") : " Unknown "}
            </p>

            <p className="text-gray-300 mb-2">
              {movie.content}
            </p>

            <div
              className="text-gray-200 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: movie.summary }}
            />

            <button onClick={() => AddWatchlist(movie)} className="bg-red-600 px-6 py-2 rounded hover:bg-red-700">
              Add to Watchlist
            </button>

            <div className="mt-6">

              <h2 className="text-xl mb-2">
                Rate this movie
              </h2>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-3xl cursor-pointer transition transform hover:scale-125 ${star <= rating || 0 ? "text-yellow-400" : "text-gray-500"
                      }`}
                  >
                    ★
                  </span>
                ))}

              </div>

            </div>

          </div>
        </div>

        {/* User Ratings */}

        <div className="max-w-6xl mx-auto m-10 bg-black/40 p-5 rounded-lg">

          <h2 className="text-2xl font-bold mb-5">
            User Ratings
          </h2>

          {ratings.length === 0 ? (
            <p className="text-gray-400">
              No ratings yet
            </p>
          ) : (
            ratings.map((item) => (
              <div key={item._id} className="mb-5">
                <p>
                  {item.user?.name || "User"} ⭐ {item.rating}
                </p>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;