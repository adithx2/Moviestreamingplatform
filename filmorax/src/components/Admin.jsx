import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUsers, FaFilm, FaList, FaSignOutAlt } from "react-icons/fa";
import { getUsers, logout } from "../services/usersApi";
import { fetchRecommendedMovies, createMovie, deleteMovie, updateMovie, } from "../services/movies";
import { getWatchlist } from "../services/watchlistApi";

const Admin = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [newMovie, setNewMovie] = useState({
    title: "",
    image: "",
    rating: "",
    year: "",
    genres: "",
  });

  const [editMovieId, setEditMovieId] = useState(null);

  // Auth check + fetch data

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser || savedUser.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  // Fetch all data

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchMovies(), fetchWatchlists()]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlists = async () => {
    try {
      const data = await getWatchlist();
      setWatchlist(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await fetchRecommendedMovies();
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {

      const res = await logout()

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Update movie

  const handleAddMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      ...newMovie,
      rating: Number(newMovie.rating),
      genres: newMovie.genres
        ? newMovie.genres.split(",").map((g) => g.trim())
        : [],
    };

    try {
      if (editMovieId) {
        const updated = await updateMovie(editMovieId, movieData);

        setMovies((prev) =>
          prev.map((m) => (m._id === editMovieId ? updated : m))
        );

        setEditMovieId(null);
        toast.success("Movie Updated");
      } else {
        const res = await createMovie(movieData);
        setMovies((prev) => [...prev, res]);
        toast.success("Movie Added");
      }

      setNewMovie({
        title: "",
        image: "",
        rating: "",
        year: "",
        genres: "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Movie action failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  // Delete movie

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
      toast.success("Movie Deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Edit movie

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

  return (
    <div className="flex flex-col md:flex-row bg-black min-h-screen text-white pt-16">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 top-16 left-0 w-full z-40">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="group relative flex items-center justify-center p-2 bg-transparent border-2 border-yellow-400/50 rounded-lg hover:bg-yellow-500 transition-all duration-300 active:scale-90"
        >
          <div className={`flex items-center transition-all duration-500 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}>
            {/* First Arrow */}
            <span className="block w-3 h-3 border-t-2 border-r-2 border-white rotate-45 -mr-1 shadow-sm"></span>
            {/* Second Arrow */}
            <span className="block w-3 h-3 border-t-2 border-r-2 border-white rotate-45 opacity-50 group-hover:opacity-100 transition-opacity"></span>
          </div>

          {/* Tooltip for better UX */}
          <span className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-[10px] py-1 px-2 rounded">
            {isSidebarOpen ? "Close" : "Open"}
          </span>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition duration-200 z-30 w-64 bg-gray-900 md:bg-black p-5 pt-28 md:pt-10 space-y-4`}
      >
        <h2 className="hidden md:block text-2xl font-bold mb-7 text-yellow-500">
          Admin Panel
        </h2>

        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800"
        >
          <FaList /> Dashboard
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800"
        >
          <FaUsers /> Users
        </button>

        <button
          onClick={() => setActiveTab("movies")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800"
        >
          <FaFilm /> Movies
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 w-full p-3 rounded text-red-500 border border-red-500 mt-10"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 items-center justify-center p-4 md:p-10 mt-12 md:mt-0">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-red-600 p-6 rounded-xl">
              Users: {users.length}
            </div>
            <div className="bg-blue-600 p-6 rounded-xl">
              Movies: {movies.length}
            </div>
            <div className="bg-green-600 p-6 rounded-xl">
              Watchlists: {watchList.length}
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="bg-gray-900 rounded-lg p-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="border-b border-gray-800 py-2"
              >
                {u.name} - {u.email}
              </div>
            ))}
          </div>
        )}

        {/* Movies */}
        {activeTab === "movies" && (
          <div>
            <form
              onSubmit={handleAddMovie}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 bg-gray-900 p-4 rounded-lg"
            >
              <input
                placeholder="Title"
                value={newMovie.title}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.target.value })
                }
                className="bg-gray-800 p-2 rounded"
              />
              <input
                placeholder="Image URL"
                value={newMovie.image}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, image: e.target.value })
                }
                className="bg-gray-800 p-2 rounded"
              />
              <input
                placeholder="Rating"
                value={newMovie.rating}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, rating: e.target.value })
                }
                className="bg-gray-800 p-2 rounded"
              />
              <input
                placeholder="Year"
                value={newMovie.year}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, year: e.target.value })
                }
                className="bg-gray-800 p-2 rounded"
              />
              <input
                placeholder="Genres"
                value={newMovie.genres}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, genres: e.target.value })
                }
                className="bg-gray-800 p-2 rounded"
              />
              <button className="bg-green-600 py-2 rounded">
                {editMovieId ? "Update Movie" : "Add Movie"}
              </button>
            </form>

            {movies.map((m) => (
              <div
                key={m._id}
                className="flex justify-between border-b border-gray-800 py-"
              >
                {m.title}
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditMovie(m)}
                    className="bg-blue-600 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMovie(m._id)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-gray-900 px-14 p-8 rounded-xl text-center">
            <h2 className="text-xl mb-6">Confirm Logout</h2>
            <p className="text-gray-400 mb-6">Do you want to logout?</p>

            <div className="flex gap-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;