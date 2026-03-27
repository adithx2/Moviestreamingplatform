import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/login");

  };


  const handleSign = (e) => {
    e.preventDefault();

    navigate("/signup");

  };

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    // user already logged in

    if (user) {
      navigate("/home");
    }

  }, [navigate]);



  return (

    <div className="min-h-scree w-full bg-black text-white" >

      <header className="fixed w-full top-0 left-0 items-center px-8 py-5 z-50">

        <div className="flex justify-between items-center py-5">
          <h1 className="text-3xl font-bold text-white">
            Filmora<span className="text-yellow-500">X</span>
          </h1>

          <div className="flex items-center gap-4">

            <button onClick={handleSign} className=" bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Sign Up
            </button>

            <button onClick={handleLogin} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Login
            </button>
          </div>
        </div>
      </header>

      <section className=" relative min-h-screen flex items-center justify-center pt-24">

        {/* Background image */}

        <div className="bg-fixed bg-no-repeat h-screen w-full overflow-hidden">
          <img

            src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"

          />

          {/* Content */}

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white max-w-full h-full px-4">

            <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
              Unlimited movies, Shows <br />Your favorite stories start here.
            </h1>

            <Link to="/login" className="p-8">

              <button className="bg-yellow-500 text-white font-bold hover:bg-yellow-700 px-14 py-4 rounded">Get Started</button>
            </Link>

          </div>

        </div>

      </section>

      {/* grid */}

      <div className="p-10  border-t border-yellow-500">
        <h2 className="text-2xl pt-5 px-11 font-semibold text-white mb-4">
          More reasons to join
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">

          <div className="relative rounded-2xl p-6 
      bg-linear-to-br from-[#1a1f3c] via-[#122f5e] to-black">
            <h3 className="text-xl font-semibold text-yellow-500">Enjoy on your TV</h3>
            <p className="text-gray-300 mt-3">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
            </p>

          </div>

          <div className="relative rounded-2xl p-6 h-50
      bg-linear-to-br from-[#1a1f3c] via-[#122f5e] to-black">
            <h3 className="text-xl font-semibold text-yellow-500">
              Download your shows to watch offline
            </h3>
            <p className="text-gray-300 mt-3">
              Save your favourites easily and always have something to watch.
            </p>
          </div>

          <div className="relative rounded-2xl p-6 
      bg-linear-to-br from-[#1a1f3c] via-[#122f5e] to-black">
            <h3 className="text-xl font-semibold text-yellow-500">Watch everywhere</h3>
            <p className="text-gray-300 mt-3">
              Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
            </p>

          </div>

          <div className=" relative rounded-2xl p-6
      bg-linear-to-br from-[#1a1f3c] via-[#122f5e] to-black">
            <h3 className="text-xl font-semibold text-yellow-500">Create profiles for kids</h3>
            <p className="text-gray-300 mt-3">
              Send kids on adventures with their favourite characters in a space made just for them — free with your membership.
            </p>

          </div>

        </div>
      </div>

      <div>
        <footer className=" bg-black text-gray-400 px-5 py-5">
          <div className="max-w-6xl mx-auto font-bold ">

            <h1 className='text-white'>Filmora<span className='text-yellow-500'>X</span></h1>


            {/* Footer Links */}

            <div className="grid grid-cols-2 pt-5 md:grid-cols-4 gap-4 text-sm">
              <p className="hover:underline cursor-pointer">Audio Description</p>
              <p className="hover:underline cursor-pointer">Help Center</p>
              <p className="hover:underline cursor-pointer">Gift Cards</p>
              <p className="hover:underline cursor-pointer">Media Center</p>

              <p className="hover:underline cursor-pointer">Investor Relations</p>
              <p className="hover:underline cursor-pointer">Jobs</p>
              <p className="hover:underline cursor-pointer">Terms of Use</p>
              <p className="hover:underline cursor-pointer">Privacy</p>

              <p className="hover:underline cursor-pointer">Legal Notices</p>
              <p className="hover:underline cursor-pointer">Cookie Preferences</p>
              <p className="hover:underline cursor-pointer">Corporate Information</p>
              <p className="hover:underline cursor-pointer">Contact Us</p>
            </div>

            <p className="mt-8 text-xs text-gray-500">
              © 2026 Filmorax. All rights reserved.
            </p>

          </div>
        </footer>
      </div>
    </div>

  );
};

export default Landing