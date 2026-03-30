import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUsers, FaFilm, FaList, FaSignOutAlt,
  FaPlus, FaEdit, FaTrash, FaChartLine
} from "react-icons/fa";
import { getUsers, logout } from "../services/usersApi";
import { fetchRecommendedMovies, createMovie, deleteMovie, updateMovie } from "../services/movies";
import { getWatchlist } from "../services/watchlistApi";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "", image: "", rating: "", year: "", genres: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || savedUser.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uData, mData, wData] = await Promise.all([
        getUsers(),
        fetchRecommendedMovies(),
        getWatchlist()
      ]);
      setUsers(uData || []);
      setMovies(Array.isArray(mData) ? mData : []);
      setWatchlist(wData || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const movieData = {
      ...newMovie,
      rating: Number(newMovie.rating),
      genres: newMovie.genres ? newMovie.genres.split(",").map((g) => g.trim()) : [],
    };

    try {
      if (editMovieId) {
        const updated = await updateMovie(editMovieId, movieData);
        setMovies(movies.map((m) => (m._id === editMovieId ? updated : m)));
        toast.success("Movie updated successfully");
      } else {
        const res = await createMovie(movieData);
        setMovies([...movies, res]);
        toast.success("Movie added successfully");
      }
      setNewMovie({ title: "", image: "", rating: "", year: "", genres: "" });
      setEditMovieId(null);
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m._id !== id));
      toast.success("Movie deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEditMovie = (movie) => {
    setNewMovie({
      title: movie.title,
      image: movie.image,
      rating: movie.rating,
      year: movie.year,
      genres: Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres,
    });
    setEditMovieId(movie._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-500">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mb-4"></div>
      <p className="font-medium">Loading Management Console...</p>
    </div>
  );

  return (
    <div className="flex bg-[#0f0f0f] min-h-screen text-gray-200 font-sans">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-yellow-500 tracking-tight">FILMORAX<span className="text-white">ADMIN</span></h2>
        </div>

        <nav className="mt-2 px-4 space-y-2">
          {/* ... rest of your NavItems ... */}
        </nav>

        <div className="p-4">

          {/* NEW: Return Home Link */}
          <button
            onClick={() => navigate("/home")}
            className=" flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-yellow-500 transition-colors uppercase tracking-wider"
          >
            <span className="text-lg">←</span> View Main Site
          </button>
        </div>


        <nav className="mt-6 px-4 space-y-2">
          <NavItem active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<FaChartLine />} label="Dashboard" />
          <NavItem active={activeTab === "users"} onClick={() => setActiveTab("users")} icon={<FaUsers />} label="User Management" />
          <NavItem active={activeTab === "movies"} onClick={() => setActiveTab("movies")} icon={<FaFilm />} label="Movie Library" />

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-4 w-full p-3 mt-4 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <FaSignOutAlt /> <span className="font-medium">Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10 m-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-yellow-500 border border-yellOw-500 rounded">
            <FaList />
          </button>
        </header>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard label="Total Users" count={users.length} icon={<FaUsers />} color="text-blue-500" />
              <StatCard label="Movies Listed" count={movies.length} icon={<FaFilm />} color="text-yellow-500" />
              <StatCard label="Watchlists" count={watchList.length} icon={<FaList />} color="text-green-500" />
            </div>
            {/* Quick Overview Table or Chart could go here */}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="overflow-hidden bg-gray-900 rounded-xl border border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-800/50">
                    <td className="p-4 font-medium text-white">{u.name}</td>
                    <td className="p-4 text-gray-400">{u.email}</td>
                    <td className="p-4 text-xs font-bold text-yellow-500 uppercase">{u.role || 'User'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Movies Tab */}
        {activeTab === "movies" && (
          <div className="space-y-6">
            {/* Form Card */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                {editMovieId ? <FaEdit className="text-blue-500" /> : <FaPlus className="text-green-500" />}
                {editMovieId ? "Edit Movie Details" : "Add New Movie"}
              </h3>
              <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input placeholder="Movie Title" value={newMovie.title} onChange={(val) => setNewMovie({ ...newMovie, title: val })} />
                <Input placeholder="Image URL" value={newMovie.image} onChange={(val) => setNewMovie({ ...newMovie, image: val })} />
                <Input placeholder="Rating (e.g. 8.5)" value={newMovie.rating} onChange={(val) => setNewMovie({ ...newMovie, rating: val })} />
                <Input placeholder="Release Year" value={newMovie.year} onChange={(val) => setNewMovie({ ...newMovie, year: val })} />
                <Input placeholder="Genres (comma separated)" value={newMovie.genres} onChange={(val) => setNewMovie({ ...newMovie, genres: val })} />
                <button className={`py-2 rounded-lg font-bold transition-all ${editMovieId ? "bg-blue-600 hover:bg-blue-700" : "bg-yellow-500 hover:bg-yellow-600 text-black"}`}>
                  {editMovieId ? "Update Entry" : "Save Movie"}
                </button>
              </form>
            </div>

            {/* Movies List Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="p-4">Movie</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Year</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {movies.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 text-white font-medium">{m.genres}</td>
                      <td className="p-4"><span className="bg-gray-800 px-2 py-1 rounded text-yellow-500">★ {m._rating}</span></td>
                      <td className="p-4 text-gray-400">{m.year}</td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => handleEditMovie(m)} className="text-blue-400 hover:text-blue-300"><FaEdit /></button>
                        <button onClick={() => handleDeleteMovie(m._id)} className="text-red-500 hover:text-red-400"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal & Overlay code remains similar but styled better... */}
      {showModal && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowModal(false)} />}
    </div>
  );
};

// --- Sub-components for cleaner code ---

const NavItem = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${active ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20" : "hover:bg-gray-800 text-gray-400"}`}
  >
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ label, count, icon, color }) => (
  <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
      <h4 className="text-3xl font-bold text-white">{count}</h4>
    </div>
    <div className={`text-3xl ${color} bg-gray-800/50 p-4 rounded-xl`}>
      {icon}
    </div>
  </div>
);

const Input = ({ placeholder, value, onChange }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-gray-800 border border-gray-700 text-white p-2.5 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all placeholder:text-gray-500"
  />
);

const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-100 backdrop-blur-sm">
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl text-center max-w-sm w-full mx-4">
      <div className="bg-red-500/10 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
        <FaSignOutAlt />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Confirm Logout</h2>
      <p className="text-gray-400 mb-8">Are you sure you want to end your session?</p>
      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl font-medium transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-colors">Logout</button>
      </div>
    </div>
  </div>
);

export default Admin;