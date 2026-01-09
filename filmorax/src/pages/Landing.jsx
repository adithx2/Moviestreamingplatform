import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    navigate("/Login");
  };

  return (

    <div className="min-h-scree w-full bg-black text-white" >

      <header className="fixed w-full top-0 left-0 items-center px-8 py-5 z-50">

        <div className="flex justify-between items-center px-8 py-5">
          <h1 className="text-3xl font-bold text-white">
            Filmora<span className="text-yellow-500">X</span>
          </h1>

          <div className="flex items-center gap-4">
            <select className="text-white border-2 border-gray-400 bg-black/40 px-4 py-1 rounded ">
              <option>English</option>
              <option>Malayalam</option>
            </select>

            <button onClick={handleSignIn} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <section className=" relative min-h-screen flex items-center justify-center pt-24">

        {/* Background image */}

        <div className=" bg-fixed bg-no-repeat h-screen w-full overflow-hidden">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"

          />

          {/* Content */}

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white max-w-full h-full px-4">

            <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
              Unlimited movies, shows <br />Your favorite stories start here.
            </h1>

            <Link to="/login" className="p-8">

              <button className="bg-yellow-500 text-black hover:bg-yellow-700 px-14 py-4 rounded font-semibold">Get Started</button>
            </Link>

          </div>


        </div>

      </section>

      {/* grid */}


      <div className="p-10  border-t border-yellow-500">
        <h2 className="text-2xl pt-5 px-11 font-semibold text-white mb-4">
          More reasons to join
        </h2>

        <div className="flex gap-4 p-5 ">


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
    </div>



  );
};

export default Landing

