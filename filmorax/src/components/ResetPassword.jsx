import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/reset-password/${token}`, { password });
      toast.success("Password Updated! Logging you in...");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid or Expired Link");
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center bg-black">
      <form onSubmit={handleUpdate} className="bg-black/80 z-10 p-10 rounded w-96 text-white border border-gray-800">
        <h1 className="text-2xl font-bold mb-4">New Password</h1>
        <input 
          type="password" placeholder="Enter New Password" required
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-red-600 p-3 rounded font-bold hover:bg-red-700">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;