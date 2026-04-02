import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/home");
  }, [navigate]);

  const features = [
    { title: "Enjoy on your TV", desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more." },
    { title: "Watch Offline", desc: "Save your favourites easily and always have something to watch." },
    { title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV." },
    { title: "Profiles for kids", desc: "Send kids on adventures with their favourite characters in a space made just for them." },
  ];

  // Animation Variants 
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed w-full top-0 left-0 items-center px-8 py-5 z-50 bg-black/0 backdrop-blr-md"
      >
        <div className="flex justify-between items-center py-2">
          <h1 className="text-3xl font-bold text-white tracking-tighter">
            Filmora<span className="text-yellow-500">X</span>
          </h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/signup")} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-all active:scale-95">
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} className="border border-white/30 hover:bg-white/10 text-white px-5 py-2 rounded-md transition-all">
              Login
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col justify-center items-center text-center px-4"
        >
          <h1 className="text-white text-5xl md:text-5xl font-bold mb-5">
            Unlimited movies, Shows <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
              Your Favorite stories start here.
            </span>
          </h1>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-yellow-500 text-white font-bold text-lg px-12 py-4 rounded hover:shadow-yellow-700 transition-all">
                Get Started
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid with Scroll Reveal */}
      <div className="max-w-7xl mx-auto p-10">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-10 border-l-4 border-yellow-500 pl-4"
        >
          More reasons to join
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="relative rounded-2xl p-8 bg-linear-to-br from-[#1a1f3c] via-[#0f172a] to-black border border-white/5"
            >
              <h3 className="text-xl font-semibold text-yellow-500 mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black text-gray-400 px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className='text-white font-bold text-2xl mb-8'>Filmora<span className='text-yellow-500'>X</span></h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            {['Help Center', 'Terms of Use', 'Privacy', 'Contact Us', 'Jobs', 'Cookie Preferences', 'Legal Notices', 'Media Center'].map(link => (
              <p key={link} className="hover:text-yellow-500 transition-colors cursor-pointer">{link}</p>
            ))}
          </div>
          <p className="mt-12 text-xs text-gray-600">© 2026 FilmoraX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


export default Landing;