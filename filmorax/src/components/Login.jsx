import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { loginUser } from "../services/usersApi"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    setError('')

    try {

      const res = await loginUser({

        email,
        password

      })

      console.log(res)

      toast.success("Login successful")

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

      // user data save

      localStorage.setItem("user", JSON.stringify(res.user))
      localStorage.setItem("token", res.token);

    } catch (error) {

      console.log(error)

      setError("Invalid email or password")

      toast.error("Login failed")

    }

  }

  return (
    <div className="relative h-screen flex justify-center items-center">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg" alt="Background" className='absolute w-full h-full object-cover' />

      <form
        onSubmit={handleLogin}
        className="bg-black/70 relative z-10 p-10 rounded w-96 text-white"
      >

        <h1 className="text-3xl font-bold text-yellow-500 mb-6">

          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none"
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 p-3 rounded font-bold hover:bg-red-700"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Signup
          </a>
        </p>

      </form>

    </div>
  )
}

export default Login