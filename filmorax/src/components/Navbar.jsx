import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FaUserCircle, FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  // Framer Motion Variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
  };

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

      <nav className={`fixed top-0 left-0 w-full h-18 z-50 text-white px-6 py-4 flex items-center justify-between transition-colors duration-300 ${scrolled ? "bg-black/2 backdop-blur-md" : "bg-black/2 backrop-blur-md"}`}
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

        <div className="flex items-center">
          <FaUserCircle
            size={28}
            className="cursor-pointer"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("user"));

              if (!user) {
                navigate("/login");
              } else if (user.role === "admin") {
                navigate("/admin");
              } else {
                navigate(`/profile`);
              }
            }}
          />
        </div>


        {/* Mobile Hamburger */}

        <div 
          className="md:hidden text-2xl cursor-pointer transition-all duration-300" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-yellow-500" /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu Dropdown with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-14 left-0 w-full bg-black/2 backdrop-blr-md text-white z-40 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Navigation Links */}
            <motion.div className='flex flex-col gap-4 px-6 py-6'>
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/home" 
                  onClick={() => setMenuOpen(false)} 
                  className='block text-base font-medium text-white hover:text-yellow-400 transition-colors'
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/movies" 
                  onClick={() => setMenuOpen(false)} 
                  className='block text-base font-medium text-white hover:text-yellow-400 transition-colors'
                >
                  Movies
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/tvshows" 
                  onClick={() => setMenuOpen(false)} 
                  className='block text-base font-medium text-white hover:text-yellow-400 transition-colors'
                >
                  TV Shows
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/watchlist" 
                  onClick={() => setMenuOpen(false)} 
                  className='block text-base font-medium text-white hover:text-yellow-400 transition-colors'
                >
                  Watchlist
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Search */}
            <motion.form onSubmit={handleSearch} className="relative px-6 pb-6" variants={mobileItemVariants}>
              <FaSearch className="absolute top-5 left-8 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={click}
                onChange={(e) => setClick(e.target.value)}
                className="w-full bg-black/50 border border-yellow-500 text-white px-10 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Navbar

