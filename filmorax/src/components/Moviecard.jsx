import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/moviedetails/${movie.id}`)}
    >
      <img
        src={
          movie.image?.medium || movie.image?.original
          
        }
        alt={movie.name}
        className="rounded hover:scale-105 transition duration-300"
      />
      <p className="text-sm mt-2 text-center text-gray-300">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
