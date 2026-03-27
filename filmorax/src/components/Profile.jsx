import React, { useEffect, useState } from 'react'
import { resolvePath, useNavigate } from 'react-router-dom'
import { getWatchlist } from '../services/watchlistApi'
import { updateUser } from '../services/usersApi'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {

    const [user, setUser] = useState(null)
    const [watchlistCount, setWatchlistCount] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState("")
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    useEffect(() => {

        const savedUser = JSON.parse(localStorage.getItem("user"))

        if (!savedUser) {
            navigate("/login")
            return
        }

        if (savedUser?.role === "admin") {
            navigate("/admin");
            return
        }

        setUser(savedUser)
        fetchWatchlist()
        setLoading(false)

    }, [])

    // Fetch watchlist count

    const fetchWatchlist = async () => {

        try {
            const data = await getWatchlist()
            setWatchlistCount(data.length)
        } catch (error) {
            console.log(error)
        }

    }

    // Logout

    const handleLogout = async () => {

        try {

            await axios.post(
                "http://localhost:5000/users/logout",
                {},
                { withCredentials: true }
            )

            localStorage.removeItem("user")
            localStorage.removeItem("token")

            navigate("/", { replace: true })

        } catch (error) {

            console.log(error)
            toast.error("Logout failed")

        }

    }

    // Update Name

    const handleUpdate = async () => {

        if (!newName.trim()) {
            toast.error("Name cannot be empty")
            return
        }

        try {

            const userId = user._id || user.id

            const res = await updateUser(userId, { name: newName })

            console.log(res)

            setUser(res.user)

            localStorage.setItem("user", JSON.stringify(res.user))

            setEditMode(false)

        } catch (error) {

            console.log(error)

        }

        if (loading) {

            return (

                <div className='min-h-screen flex items-center justify-center bg-black text-white'>
                    Loading...
                </div>
            )
        }

    }

    if (!user) return null

    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4">

            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg" alt="background" className='absolute inset-0 w-full h-full object-cover ' />

            <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800">

                {/* User Info */}

                <div className="flex items-center gap-5 mb-5">

                    <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="px-4">

                        {editMode ? (
                            <div className="flex gap-2">

                                <input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="bg-gray-800 px-3 py-2 rounded w-full"
                                />

                                <button
                                    onClick={handleUpdate}
                                    className="bg-green-700 px-4 hover:bg-green-800 rounded"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => (setEditMode(false))}
                                    className="bg-gray-700 px-4 hover:bg-gray-800 rounded"
                                >
                                    Cancel
                                </button>

                            </div>
                        ) : (
                            <div className="flex justify-between items-center">

                                <h2 className="text-2xl font-bold text-yellow-400">
                                    {user.name}
                                </h2>

                                <button
                                    onClick={() => {
                                        setEditMode(true)
                                        setNewName(user.name)
                                    }}
                                    className="text-blue-400 text-sm px-20"
                                >
                                    Edit
                                </button>

                            </div>
                        )}

                        <p className="text-gray-400 text-sm py-2">{user.email}</p>

                    </div>

                </div>


                {/* Watchlist Count */}

                <div className="mb-8">
                    <p className="text-lg">
                        Watchlist Movies:{" "}
                        <span className="font-bold text-yellow-400">
                            {watchlistCount}
                        </span>
                    </p>
                </div>

                {/* Buttons */}

                <div className="flex flex-col gap-4">

                    <button
                        onClick={() => navigate("/watchlist")}
                        className="bg-yellow-500 text-black py-4 rounded-lg font-semibold hover:bg-yellow-400"
                    >
                        View Watchlist
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Logout  */}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-gray-900 p-6 rounded-xl text-center w-80">

                        <h2 className="text-xl font-bold mb-4">
                            Are you sure?
                        </h2>

                        <p className="text-gray-400 mb-6">
                            Do you want to logout?
                        </p>

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
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Profile