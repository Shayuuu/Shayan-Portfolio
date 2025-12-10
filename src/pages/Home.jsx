// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Button } from "../components/ui/button";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const audioLoaderRef = useRef(null);
  const audioNameRef = useRef(null);
  const audioClickRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    document.title = "Shayan Shaikh | Creative Technologist & Web Developer";

    setTimeout(() => {
      setShowIntro(false);
      NProgress.start();
      if (audioLoaderRef.current) audioLoaderRef.current.play().catch(() => {});

      setTimeout(() => {
        if (audioNameRef.current) audioNameRef.current.play().catch(() => {});
      }, 1000);

      setTimeout(() => {
        setIsLoading(false);
        NProgress.done();
      }, 3000);
    }, 2000);
  }, []);

  const handleButtonClick = () => {
    if (audioClickRef.current) {
      audioClickRef.current.currentTime = 0;
      audioClickRef.current.play().catch(() => {});
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    handleButtonClick();
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoAnimationComplete = () => {
    if (audioNameRef.current) {
      audioNameRef.current.currentTime = 0;
      audioNameRef.current.play().catch(() => {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/myzdyrdj", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("✅ Thanks for contacting me! I'll get back to you soon.");
      form.reset();
    } else {
      setStatus("❌ Oops! Something went wrong. Try again later.");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
    handleButtonClick();
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <motion.p
          className="text-white text-2xl tracking-widest font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9998] flex items-center justify-center">
        <motion.img
          src="/logo/s.svg.jpg"
          alt="Shayan Shaikh Logo"
          className="w-48 h-48"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans transition-colors duration-500 pt-20">
      {/* Audio */}
      <audio ref={audioLoaderRef} src="/sounds/loader.wav" preload="auto" />
      <audio ref={audioNameRef} src="/sounds/name-sound.mp3.wav" preload="auto" />
      <audio ref={audioClickRef} src="/sounds/click.wav" preload="auto" />

      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          <Link to="/" className="text-white no-underline">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={handleLogoAnimationComplete}
              className="text-2xl md:text-4xl font-bold tracking-wide cursor-pointer"
            >
              Shayan Shaikh
            </motion.h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
            <li><a href="#about" onClick={handleButtonClick}>About</a></li>
            <li><a href="#projects" onClick={handleButtonClick}>Projects</a></li>
            <li><Link to="/certificates" onClick={handleButtonClick}>Certificates</Link></li>
            <li><a href="#awards" onClick={handleButtonClick}>Experience</a></li>
            <li><a href="#contact" onClick={handleButtonClick}>Contact</a></li>
          </ul>

          {/* Right Buttons + Social Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={scrollToContact} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              Hire Me
            </button>
            <div className="hidden md:flex items-center space-x-3 text-xl">
              <motion.a href="https://www.linkedin.com/in/shayan-shaikh-816832221/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#0A66C2" }} transition={{ type: "spring", stiffness: 300 }}>
                <FaLinkedin />
              </motion.a>
              <motion.a href="https://github.com/Shayuuu" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#6e5494" }} transition={{ type: "spring", stiffness: 300 }}>
                <FaGithub />
              </motion.a>
              <motion.a href="mailto:shayanshaikh2003.ss@gmail.com"
                whileHover={{ scale: 1.2, color: "#EA4335" }} transition={{ type: "spring", stiffness: 300 }}>
                <FaEnvelope />
              </motion.a>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden flex flex-col space-y-1 ml-4" onClick={() => { setIsMenuOpen(!isMenuOpen); handleButtonClick(); }}>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pt-4 pb-6 bg-black border-t border-gray-700">
            <ul className="flex flex-col space-y-2 text-sm font-medium">
              <li><a href="#hero" onClick={handleButtonClick}>Home</a></li>
              <li><a href="#about" onClick={handleButtonClick}>About</a></li>
              <li><a href="#projects" onClick={handleButtonClick}>Projects</a></li>
              <li><a href="#awards" onClick={handleButtonClick}>Experience</a></li>
              <li><a href="#contact" onClick={handleButtonClick}>Contact</a></li>
              <li><Link to="/stories" onClick={handleButtonClick}>Stories</Link></li>
              <li className="flex space-x-4 mt-2 text-xl">
                <a href="https://www.linkedin.com/in/shayan-shaikh-816832221" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/Shayuuu" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="mailto:shayanshaikh2003.ss@gmail.com">Gmail</a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen w-full relative overflow-hidden pt-20">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-30">
          <source src="/background/background.mp4" type="video/mp4" />
        </video>
        <motion.div className="relative z-10 text-center px-4 flex items-center justify-center h-full" style={{ y: y2 }}>
          <div>
            <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-7xl font-bold">
              Shayan Shaikh
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
              Creative Technologist & Full-Stack Developer crafting immersive, intelligent digital experiences.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            I’m a passionate Web Developer and Creative Technologist, driven by a deep love for both design and code.
            I specialize in crafting dynamic, user-friendly websites and digital experiences that are visually appealing
            and built with robust functionality.
          </p>
        </motion.div>
      </section>

     {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-20 bg-black">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold mb-12">Projects</h2>
          <div className="space-y-12">

            {/* Cognizant Safe City */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 transition-transform hover:scale-[1.02] hover:border-blue-500">
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">Cognizant Safe City</h3>
              <p className="text-gray-400 mb-2">
                AI-powered smart city solution integrating emergency-responsive traffic signals, real-time headcount tech for fire safety,
                and mobile apps for citizen feedback. Implemented ML models for ambulance siren detection, IoT sensors,
                and real-time building monitoring.
              </p>
              <p className="text-sm text-gray-500 mb-4">Tools: AI, AR, Full Stack, IoT, Embedded Systems</p>
              <Link
                to="/projects/cognizant-safe-city"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleButtonClick}
              >
                Project Details
              </Link>
            </div>

            {/* Research & IPR Management */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 transition-transform hover:scale-[1.02] hover:border-green-500">
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">Research & IPR Management Platform</h3>
              <p className="text-gray-400 mb-2">
                A centralized digital platform to streamline research activities, manage intellectual property rights, and support
                entrepreneurial growth. Features include real-time data tracking, collaboration modules, and optimized resource management.
              </p>
              <p className="text-sm text-gray-500 mb-4">Tools: React, Node.js, PostgreSQL, Firebase, AWS S3, Auth0</p>
              <Link
                to="/projects/research-ipr-management"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                onClick={handleButtonClick}
              >
                Project Details
              </Link>
            </div>

            {/* Movie Website */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 transition-transform hover:scale-[1.02] hover:border-purple-500">
              <h3 className="text-2xl font-semibold mb-2 text-purple-400">Movie Website</h3>
              <p className="text-gray-400 mb-2">
                A dynamic movie platform built with React, fetching data from The Movie Database (TMDb) API. Features include
                browsing popular movies, detailed movie pages, responsive design, and search functionality.
              </p>
              <p className="text-sm text-gray-500 mb-4">Tools: React, Tailwind CSS, Framer Motion, TMDb API</p>
              <div className="flex space-x-4">
                <Link
                  to="/projects/movie-website"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
                <a
                  href="https://movie-iota-beryl.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  onClick={handleButtonClick}
                >
                  View Live
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

       {/* Awards Section */}
      <section id="awards" className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-black">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold mb-12">Experience & Awards</h2>
          <div className="space-y-10">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-semibold">Chairperson – IETE Student Chapter</h3>
              <p className="text-gray-400">Led the chapter, organized workshops, tech talks, and innovation-driven student events to boost engagement and industry interaction.</p>
              <span className="text-sm text-gray-500">2024–2025</span>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-semibold">Team Lead – Cognizant Safe City</h3>
              <p className="text-gray-400">Led a team building an AI-based urban safety platform with smart surveillance and threat detection features like panic alerts and crime heatmaps.</p>
              <span className="text-sm text-gray-500">2023–2025</span>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-semibold">Resilience Tech Masters – Winner</h3>
              <p className="text-gray-400">Awarded for developing a cutting-edge safety solution. Recognized for pushing boundaries and applying tech for real-world impact.</p>
              <span className="text-sm text-gray-500">2025</span>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-semibold">Most Promising BE Student</h3>
              <p className="text-gray-400">Acknowledged for academic excellence and leadership capabilities by M.H. Saboo Siddik College of Engineering.</p>
              <span className="text-sm text-gray-500">2024–2025</span>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-6 md:px-20 bg-black">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input name="name" type="text" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input name="email" type="email" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required />
            </div>
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea name="message" rows="4" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required></textarea>
            </div>
            <Button type="submit" className="mt-4 border-white text-white hover:bg-white hover:text-black">Send Message</Button>
          </form>
          {status && (
            <p className={`mt-4 text-center transition-opacity duration-700 ${showMessage ? "opacity-100" : "opacity-0"} text-green-400`}>
              {status}
            </p>
          )}

          {/* Social Icons Footer */}
          <div className="mt-8 flex justify-center space-x-6 text-2xl">
            <motion.a href="https://www.linkedin.com/in/shayan-shaikh-816832221/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#0A66C2" }} transition={{ type: "spring", stiffness: 300 }}>
              <FaLinkedin />
            </motion.a>
            <motion.a href="https://github.com/Shayuuu" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#6e5494" }} transition={{ type: "spring", stiffness: 300 }}>
              <FaGithub />
            </motion.a>
            <motion.a href="mailto:shayanshaikh2003.ss@gmail.com"
              whileHover={{ scale: 1.2, color: "#EA4335" }} transition={{ type: "spring", stiffness: 300 }}>
              <FaEnvelope />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
