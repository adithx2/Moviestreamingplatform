import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Search submit function
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
      setQuery(""); // clear input
    }
  };
  return (

    <div>
      <nav className='fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md text-white px-6 py-4 flex items-center justify-between'>

        {/* Logo */}
        <div className='text-yellow-500 text-2xl font-bold'>

          <Link to='/home'>FilmoraX</Link>

        </div>

        {/* Menu */}

        <div className=' flex justify-center px-40'>
          <ul className='flex gap-5 '>
            <li>
              <Link to='/home'>Home</Link>
            </li>

            <li>
              <Link to='/tv'>Tv Shows</Link>
            </li>

            <li>
              <Link to='/search'>Search</Link>
            </li>

            <li>
              <Link to='/watchlist'>Watchlist</Link>
            </li>
          </ul>

        </div>

        <form onSubmit={handleSearch} className="relative hidden md:block">

          <FaSearch className="absolute top-1/2 left-0 transform -translate-y-1/2 " />
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-8 py-1 rounded-sm text-white w-64 focus:outline-none"

          />

        </form>

        <div className="flex items-center gap-4">
          <FaUserCircle size={28} className="cursor-pointer" />
        </div>

      </nav>

    </div>
  )
}

export default Navbar