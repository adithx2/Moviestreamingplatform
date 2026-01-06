import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaSearch } from 'react-icons/fa'

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

  const handleLogout = () => {
    navigate("/");
  };

  return (

    
      <nav className='fixed top-0 left-0 w-full h-18 z-50 bg-black backdrop-blur-md text-white px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
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
              <Link to='/tvshows' className="hover:text-gray-300">Tv Shows</Link>
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

            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 " />
            <input
              type="text"
              placeholder="Search movies or TV shows..."
              value={click}
              onChange={(e) => setClick(e.target.value)}
              className="px-8 py-1 rounded-sm text-white w-64 border border-gray-500 focus:outline-none"

            />

          </form>

        </div>

          <div className="ml-auto">
          <button
            onClick={handleLogout}
            className="bg-red-600 p-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center ml-5">
          <FaUserCircle size={28} className="cursor-pointer" />
        </div>

      </nav>

  )
}


// const Navbar = () => {

//   const [click, setClick] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (click.trim() !== "") {
//       navigate(`/search?click=${click}`);
//       setClick("");
//     }
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full h-18 z-50 bg-black text-white px-6 flex items-center justify-between">

//       {/* Logo */}
//       <div className="text-2xl font-bold">
//         <Link to="/home">
//           Filmora<span className="text-yellow-500">X</span>
//         </Link>
//       </div>

//       {/* Menu */}
//       <ul className="hidden md:flex gap-6">
//         <li><Link to="/home">Home</Link></li>
//         <li><Link to="/tvshows">Tv Shows</Link></li>
//         <li><Link to="/moviedetails">MovieDetails</Link></li>
//         <li><Link to="/watchlist">Watchlist</Link></li>
//       </ul>

//       {/* Search */}
//       <form onSubmit={handleSearch} className="hidden md:block relative">
//         <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2" />
//         <input
//           type="text"
//           placeholder="Search movies or TV shows..."
//           value={click}
//           onChange={(e) => setClick(e.target.value)}
//           className="pl-8 py-1 bg-black border border-gray-600 rounded"
//         />
//       </form>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 px-3 py-1 rounded"
//         >
//           Logout
//         </button>
//         <FaUserCircle size={26} />
//       </div>

//     </nav>
//   );
// };

export default Navbar

