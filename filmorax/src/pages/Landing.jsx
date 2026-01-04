import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    navigate("/home");
  };

  return (


    <div className="relative h-screen w-full  ">

      <header className=" w-full fixed top-0 flex justify-between items-center px-8 py-5 z-50">


        <h1 className="text-3xl font-bold text-white">
          Filmora<span className="text-yellow-500">X</span>
        </h1>

        <div className="flex items-center gap-4">
          <select className=" text-white border-2 border-gray-400 bg-black/40 px-3 py-1 rounded ">
            <option>English</option>
            <option>Malayalam</option>
          </select>

          <button onClick={handleSignIn} className="bg-red-600 text-white px-5 py-1 rounded">
            Sign In
          </button>
        </div>

      </header>
      {/* Background image */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg"
          alt="Background"
          className="absolute w-full h-full object-cover"

        />

        {/* Content */}

        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex justify-center items-center text-white max-w-full h-full px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            Unlimited movies, shows <br />Your favorite stories start here.
          </h1>

        </div>


      </div>

      {/* grid */}

      <div className=" flex gap-4 p-10 bg-black grid-cols-5">
        <div className="relative rounded-2xl p-6 
      bg-linear-to-br from-[#1a1f3c] via-[#14122a] to-black">
          <h3 className="text-xl font-semibold">Enjoy on your TV</h3>
          <p className="text-gray-300 mt-3">
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
          </p>

          <div className="absolute bottom-5 right-5 text-pink-500 text-4xl">

          </div>
        </div>

        <div className="relative rounded-2xl p-6 h-50
      bg-linear-to-br from-[#1a1f3c] via-[#14122a] to-black">
          <h3 className="text-xl font-semibold">
            Download your shows to watch offline
          </h3>
          <p className="text-gray-300 mt-3">
            Save your favourites easily and always have something to watch.
          </p>

          <div className="absolute bottom-5 right-5 text-pink-400 text-4xl">

          </div>
        </div>

        <div className="relative rounded-2xl p-6 
      bg-linear-to-br from-[#1a1f3c] via-[#14122a] to-black">
          <h3 className="text-xl font-semibold">Watch everywhere</h3>
          <p className="text-gray-300 mt-3">
            Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
          </p>

          <div className="absolute bottom-5 right-5 text-pink-400 text-4xl">

          </div>
        </div>

        <div className=" relative rounded-2xl p-6
      bg-linear-to-br from-[#1a1f3c] via-[#14122a] to-black">
          <h3 className="text-xl font-semibold">Create profiles for kids</h3>
          <p className="text-gray-300 mt-3">
            Send kids on adventures with their favourite characters in a space made just for them — free with your membership.
          </p>

        </div>

      </div>

              <Footer/>

    </div>

  );
};

export default Landing