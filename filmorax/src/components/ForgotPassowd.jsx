import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Assuming you add this to your usersApi.js
import { forgotPassword } from "../services/usersApi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Replace with your actual API call
            await forgotPassword({ email });

            toast.success("Reset link sent to your email!");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
                alt="Background"
                className='absolute w-full h-full object-cover'
            />

            <form onSubmit={handleSubmit} className="bg-black/70 relative z-10 p-10 rounded w-96 text-white">
                <h1 className="text-3xl font-bold text-yellow-500 mb-4">Reset Password</h1>
                <p className="text-gray-300 mb-6 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 p-3 rounded font-bold hover:bg-red-700 disabled:bg-gray-600"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full mt-4 text-sm text-blue-500 hover:underline"
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;