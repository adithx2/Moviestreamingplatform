import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle , FaSearch } from 'react-icons/fa'

const Navbar = () => {

  const [click, setClick] = useState("");
  const navigate = useNavigate();

  // Search submit function

  const handleSearch = (e) => {
    e.preventDefault();
    if (click.trim() !== "") {
      navigate(`/search?click=${click}`);
      setClick(""); 
    }
  };

  return (

    <div className='flex flex-col md:flex-row items-center md:justify-between px-4 md:px-10 py-4'>
      <nav className='fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md text-white px-6 py-4 flex items-center justify-between items-center transition-colors duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/70 backdrop-blur-md"
      }`}'>

        {/* Logo */}
        <div className='text-white text-2xl font-bold'>

          <Link to='/home'>Filmora<span className='text-yellow-500'>X</span></Link>

        </div>

        {/* Menu */}

        <div className=' flex justify-center px-40'>
          <ul className='flex gap-5 '>
            <li>
              <Link to='/home' className="hover:text-gray-300">Home</Link>
            </li>

            <li>
              <Link to='/tv' className="hover:text-gray-300">Tv Shows</Link>
            </li>

            <li>
              <Link to='/moviedetails' className="hover:text-gray-300">MovieDetails</Link>
            </li>

            <li>
              <Link to='/watchlist' className="hover:text-gray-300">Watchlist</Link>
            </li>
          </ul>

        </div>

        <div className="hidden md:flex items-center gap-4 relative">
        <form onSubmit={handleSearch} className="relative hidden md:block">

          <FaSearch className="absolute top-1/2 left-0 transform -translate-y-1/2 " />
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            value={click}
            onChange={(e) => setClick(e.target.value)}
            className="px-8 py-1 rounded-sm text-white w-64 focus:outline-none"

          />

        </form>

        </div>

        <div className="flex items-center gap-4">
          <FaUserCircle size={28} className="cursor-pointer" />
        </div>

      </nav>

    </div>
  )
}

 

export default Navbar

