import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("click");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    axios
      .get(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="bg-black min-h-screen pt-24 px-6 text-white">
      <h2 className="text-xl font-bold mb-6">
        Search results for "{query}"
      </h2>

      {loading && <p className="text-gray-300">Searching...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-400">No results found</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((item) => (
          <div
            key={item.show.id}
            className="cursor-pointer"
            onClick={() => navigate(`/moviedetails/${item.show.id}`)}
          >
            <img
              src={item.show.image?.medium}
              alt={item.show.name}
              className="rounded hover:scale-105 transition duration-300"
            />
            <p className="text-sm mt-2 text-center text-gray-300">
              {item.show.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;