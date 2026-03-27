import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers } from "../services/usersApi";
import { fetchRecommendedMovies, createMovie, deleteMovie, updateMovie, } from "../services/movies";
import { getWatchlist } from "../services/watchlistApi";

const Admin = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [watchList, setWatchlist] = useState([])

  const [newMovie, setNewMovie] = useState({

    title: "",
    image: "",
    rating: "",
    year: "",
    genres: ""
    
  });

  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(() => {


    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login");
      return;
    }

    if (savedUser.role !== "admin") {
      navigate("/");
      return;
    }

    fetchUsers();
    fetchMovies();
    fetchWatchlists()
    setLoading(false)

  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);

  };

  const fetchWatchlists = async () => {
    try {
      const res = await getWatchlist()
      setWatchlist(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Movies
  const fetchMovies = async () => {
    const data = await fetchRecommendedMovies();
    setMovies(Array.isArray(data) ? data : []);
  };

  // Add / Update Movie
  const handleAddMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      title: newMovie.title || "",
      image: newMovie.image || "",
      rating: Number(newMovie.rating) || 0,
      year: newMovie.year || "",
      genres: newMovie.genres
        ? newMovie.genres.split(",").map((g) => g.trim())
        : [],
    };

    if (editMovieId) {
      const updated = await updateMovie(editMovieId, movieData);
      setMovies(
        movies.map((m) => (m._id === editMovieId ? updated : m))
      );
      setEditMovieId(null);
    } else {
      const res = await createMovie(movieData);
      setMovies([...movies, res]);
    }

    setNewMovie({
      title: "",
      image: "",
      rating: "",
      year: "",
      genres: ""
    });
  };

  // Delete Movie
  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    setMovies(movies.filter((m) => m._id !== id));
  };

  // Edit Movie
  const handleEditMovie = (movie) => {
    setNewMovie({
      title: movie.title || "",
      image: movie.image || "",
      rating: movie.rating || "",
      year: movie.year || "",
      genres: Array.isArray(movie.genres)
        ? movie.genres.join(", ")
        : movie.genres || "",
    });

    setEditMovieId(movie._id);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  }

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <div className="w-60 bg-black py-28 px-5 ">
        <h2 className="text-2xl font-bold mb-7">Admin Panel</h2>

        <button
          onClick={() => setActiveTab("dashboard")}
          className="block mb-3"
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className="block mb-3"
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("movies")}
          className="block mb-3"
        >
          Movies
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1 pt-28">
        {/* Topbar */}
        <div className="flex justify-between items-center bg-black p-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 px-4 py-2  rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-3xl mb-6">Dashboard</h1>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-red-600 p-6 rounded">
                  Users: {users.length}
                </div>
                <div className="bg-blue-600 p-6 rounded">
                  Movies: {movies.length}

                </div>
                <div className="bg-green-600 p-6 rounded">
                  Watchlists: {watchList?.length}
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div>
              <h1 className="text-2xl mb-4">Users</h1>

              <table className="w-full border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t border-gray-700 text-center"
                    >
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Movies */}
          {activeTab === "movies" && (
            <div>
              <h1 className="text-2xl mb-4">Movies</h1>

              {/* Add / Update Movie */}
              <form onSubmit={handleAddMovie} className="mb-6">
                <input
                  placeholder="Title"
                  value={newMovie.title}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, title: e.target.value })
                  }
                  className="bg-gray-800 p-2 mr-2"
                />

                <input
                  placeholder="Image URL"
                  value={newMovie.image}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, image: e.target.value })
                  }
                  className="bg-gray-800 p-2 mr-2"
                />

                <input
                  placeholder="Rating"
                  value={newMovie.rating}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, rating: e.target.value })
                  }
                  className="bg-gray-800 p-2 mr-2"
                />

                <input
                  placeholder="Year"
                  value={newMovie.year}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, year: e.target.value })
                  }
                  className="bg-gray-800 p-2 mr-2"
                />

                <input
                  placeholder="Genres"
                  value={newMovie.genres}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, genres: e.target.value })
                  }
                  className="bg-gray-800 p-2 mr-2"
                />

                <button className="bg-green-600 px-4 py-2">
                  {editMovieId ? "Update Movie" : "Add Movie"}
                </button>
              </form>

              {/* Movie List */}
              <table className="w-full border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">Title</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((m) => (
                    <tr
                      key={m._id}
                      className="border-t border-gray-700 text-center"
                    >
                      <td className="p-2">{m.title}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleEditMovie(m)}
                          className="bg-blue-700 px-4 py-1 mr-2 hover:bg-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(m._id)}
                          className="bg-red-700 px-4 py-1 hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-gray-900 p-6 rounded-xl text-center w-80">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-400 mb-6">Do you want to logout?</p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-700 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
              >Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
