import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Profile = () => {


    const [user, setUser] = useState(null);
    const [watchlistCount, setWatchlistCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        setUser(savedUser);
        setWatchlistCount(watchlist.length);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!user) {
        return (
            <div className=" bg-black text-white min-h-screen pt-32 text-center">
                No user found
            </div>
        );

    }

    return (
        <div className="relative flex justify-center w-full min-h-screen pt-24 px-8 text-white items-center">

            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg" alt="background" className='absolute inset-0 w-full h-full opacity-40 object-cover ' />

            <div className='absolute inset-0 bg-black/70'></div>

            <div className="relative z-10 w-full max-w-md rounded-md bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl p-10">

                <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-full items-center bg-yellow-500 flex justify-center text-white text-2xl font-bold shadow-lg">
                        {user.name.charAt(0)}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-lg">
                        🎬 Watchlist Movies:{" "}
                        <span className="font-bold">{watchlistCount}</span>
                    </p>
                </div>


                <button
                    onClick={handleLogout}
                    className="bg-red-600 w-full py-2 rounded-xl hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );

};

export default Profile

