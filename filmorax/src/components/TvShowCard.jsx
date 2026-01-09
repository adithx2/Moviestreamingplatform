import React from "react";
import { useNavigate } from "react-router-dom";

const TvShowCard = ({ show }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/moviedetails/${show.id}`)}
    >
      <img
        src={
          show.image?.medium
        }
        alt={show.name}
        className="rounded hover:scale-105 transition duration-300"
      />
      <p className="text-sm mt-2 text-center text-gray-300">
        {show.name}
      </p>
    </div>
  );
};

export default TvShowCard;
