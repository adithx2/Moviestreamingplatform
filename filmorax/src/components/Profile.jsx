import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist } from '../services/watchlistApi';
import { updateUser, logout } from '../services/usersApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { User, Mail, Film, LogOut, Edit2, Check, X, Loader2 } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [watchlistCount, setWatchlistCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            navigate("/login");
            return;
        }

        if (savedUser?.role === "admin") {
            navigate("/admin");
            return;
        }

        setUser(savedUser);
        fetchWatchlist();
        setLoading(false);
    }, [navigate]);

    const fetchWatchlist = async () => {
        try {
            const data = await getWatchlist();
            setWatchlistCount(data.length);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {

            await logout()
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const handleUpdate = async () => {
        if (!newName.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            const userId = user._id || user.id;
            const res = await updateUser(userId, { name: newName });
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            setEditMode(false);
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    if (loading) {

        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white'>
                <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-4" />
                <p className="text-gray-400 animate-pulse">Loading your profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="relative min-h-screen text-slate-200 flex items-center justify-center p-6 bg-[#050505]">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
                    alt="background"
                    className='w-full h-full object-cover opacity-20'
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/40 to-[#050505]"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="bg-black/5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                    {/* Header/Avatar Section */}
                    <div className="relative h-20 bg-linear-to-r from-yellow-600 to-yellow-400">
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border-4 border-[#050505] flex items-center justify-center text-4xl font-bold text-yellow-500 shadow-xl">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-14 pb-5 px-8">
                        {/* Name Section */}
                        <div className="text-center mb-8">
                            {editMode ? (
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        autoFocus
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-yellow-500 transition-all"
                                    />
                                    <button onClick={handleUpdate} className="p-2 bg-green-600 rounded-lg hover:bg-green-500"><Check size={20} /></button>
                                    <button onClick={() => setEditMode(false)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><X size={20} /></button>
                                </div>
                            ) : (
                                <div className="group flex items-center justify-center gap-3">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                                        {user.name}
                                    </h2>
                                    <button
                                        onClick={() => { setEditMode(true); setNewName(user.name); }}
                                        className="text-gray-500 hover:text-yellow-500 transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            )}
                            <p className="text-gray-400 flex items-center justify-center gap-2 mt-1">
                                <Mail size={14} /> {user.email}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                                        <Film size={20} />
                                    </div>
                                    <span className="text-gray-300 font-medium">Watchlist</span>
                                </div>
                                <span className="text-xl font-bold text-white">{watchlistCount} <span className="text-xs text-gray-500 font-normal">titles</span></span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate("/watchlist")}
                                className="w-full bg-yellow-500 hover:bg-yellow-700 text-black py-3.5 rounded-xl font-bold transition-all active:scale-[0.98]"
                            >
                                View Watchlist
                            </button>

                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full flex items-center justify-center gap-2 bg-transparent text-red-500 border border-red-500/20 py-3.5 rounded-xl font-semibold hover:bg-red-500/10 transition-all"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogOut size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Sign Out?</h2>
                        <p className="text-gray-400 mb-8">Are you sure you want to sign out of your account?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-white/5 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-red-600 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
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

export default Profile;