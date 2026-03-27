import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../services/usersApi';

const SignUp = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSign = async (e) => {
    e.preventDefault();
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {

      const res = await createUser({
        name, email, password
      })


      console.log(res)
      toast.success('Signup successfull')
      navigate("/login");


    } catch (error) {

      console.log(error)
      setError(error.response?.data?.message || "Signup failed");

      toast.error("Signup failed")
    }

  };
  return (
    <div>
      <div className="relative min-h-screen flex justify-center items-center">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg" alt="Background" className='absolute w-full h-full object-cover' />
        <form
          onSubmit={handleSign}
          className="bg-black/70 relative z-10 bg-opacity-70 p-8 rounded w-96 justify-center text-white"
        >

          <h1 className="text-3xl font-bold text-yellow-500 mb-6">Sign Up</h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
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

          <p className="text-center mt-4">
            Already have an account?
            <a href="/login" className="text-blue-500 ml-1">
              Login
            </a>
          </p>

        </form>

      </div>
    </div>
  )
}

export default SignUp