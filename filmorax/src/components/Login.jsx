import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const user = {
      name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/home");

  };
  return (
    <div>
      <div className=" relative h-screen flex justify-center items-center">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg" alt="Background" className='absolute w-full h-full object-cover' />
        <form
          onSubmit={handleLogin}
          className="bg-black/40 relative z-10 bg-opacity-70 p-8 rounded w-96 text-white"
        >

          <h1 className="text-3xl font-bold text-yellow-500 mb-6">Sign In</h1>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 "
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <input
            type="Confirmpassword"
            placeholder="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 p-3 rounded font-bold hover:bg-red-700"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login