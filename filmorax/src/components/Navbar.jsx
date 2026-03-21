import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FaUserCircle, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {

  const [click, setClick] = useState("");
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const navigate = useNavigate();

  const location = useLocation()


  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  if (location.pathname === "/login" || location.pathname === "/signup") {

    return null;
  }


  // Search submit function

  const handleSearch = (e) => {
    e.preventDefault();
    if (!click.trim()) return;
    navigate(`/search?click=${encodeURIComponent(click)}`);

  };

  return (
    <div>

      <nav className={`fixed top-0 left-0 w-full h-18 z-50 text-white px-6 py-4 flex items-center justify-between transition-colors duration-300 ${scrolled ? "bg-black/2 backrop-blur-md" : "bg-black/70 backdrop-blur-md"
        }`}
      >
        {/* Logo */}

        <div className='text-white text-2xl font-bold'>

          <Link to='/home'>Filmora<span className='text-yellow-500'>X</span></Link>

        </div>

        {/* Menu */}

        <div className='flex justify-center px-20'>
          <ul className='gap-5 hidden md:flex  whitespace-nowrap '>
            <li>
              <Link to='/home' className="hover:text-gray-300">Home</Link>
            </li>

            <li>
              <Link to='/movies' className="hover:text-gray-300">Movies</Link>
            </li>

            <li>
              <Link to='/tvshows' className="hover:text-gray-300">Tv Shows</Link>
            </li>

            <li>
              <Link to='/watchlist' className="hover:text-gray-300">Watchlist</Link>
            </li>
          </ul>

        </div>

        <div className=" md:flex items-center gap-4 relative">

          {/* Search only movies and tvshows  */}

          {(location.pathname === "/movies" || location.pathname === "/tvshows") && (

            <form onSubmit={handleSearch} className="relative hidden md:block">

              <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 " />
              <input
                type="text"
                placeholder="Search movies or TV shows..."
                value={click}
                onChange={(e) => setClick(e.target.value)}
                className="px-8 py-2 rounded-sm text-white w-70 border border-gray-500 focus:outline-none"

              />
            </form>
          )}

        </div>

        <div className="flex  items-center">


          <FaUserCircle size={28} className="cursor-pointer" onClick={() => {
            navigate("/profile")
            setMenuOpen(false)
          }}

          />


        </div>

        {/* Mobile Hamburger */}

        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {menuOpen && (
        <div className={`fixed top-14 left-0 w-full bg-black text-white z-40 flex flex-col justify-between gap-6 py-6 md:hidden transition-colors duration-300 ${scrolled ? "bg-black/2 backrop-blur-md" : "bg-black/70 backdrop-blur-md"

          }`}

        >

          <div className='flex flex-col gap-4 px-8'>
            <Link to="/home" onClick={() => setMenuOpen(false)} className='hover:text-gray-400'>Home</Link>
            <Link to="/movies" onClick={() => setMenuOpen(false)} className='hover:text-gray-400'>Movies</Link>
            <Link to="/tvshows" onClick={() => setMenuOpen(false)} className='hover:text-gray-400'>TV Shows</Link>
            <Link to="/watchlist" onClick={() => setMenuOpen(false)} className='hover:text-gray-400'>Watchlist</Link>
          </div>

          {/* Mobile Search  */}


          <form onSubmit={handleSearch} className="relative px-5 mt-6">
            <FaSearch className="absolute top-1/2 left-8 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={click}
              onChange={(e) => setClick(e.target.value)}
              className="w-full border border-y-amber-400 px-10 py-2 rounded"
            />

          </form>

        </div>
      )}

    </div>
  )
}

export default Navbar

