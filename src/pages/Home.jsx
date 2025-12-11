// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Button } from "../components/ui/button";
import { FaLinkedin, FaGithub, FaEnvelope, FaReact, FaNode, FaPython, FaAws, FaDocker } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiPostgresql, SiMongodb, SiFirebase, SiTailwindcss, SiExpress } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";



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
  const hasVisitedRef = useRef(false);

  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    document.title = "Shayan Shaikh | Creative Technologist & Web Developer";

    // Skip intro/loader after first visit to avoid reload-like experience when navigating back
    const hasVisited = sessionStorage.getItem("hasVisitedHome") === "true";
    if (hasVisited) {
      hasVisitedRef.current = true;
      setShowIntro(false);
      setIsLoading(false);
      NProgress.done();
      return;
    }

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
        sessionStorage.setItem("hasVisitedHome", "true");
        hasVisitedRef.current = true;
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

    // Use env if present, otherwise fallback to hardcoded endpoint
    const sheetEndpoint =
      import.meta.env.VITE_GSHEET_WEBAPP_URL ||
      "https://script.google.com/macros/s/AKfycbx37n3MqQpnyrD5vYQ8YYV3mli1FIlXlU4nbl48XLvW0owZeQALRM-lVf7M7EEwJv-m/exec";

    // Send as form-encoded to avoid CORS preflight with Apps Script
    const payload = new URLSearchParams({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await fetch(sheetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (response.ok) {
        setStatus("✅ Thanks for contacting me! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("❌ Oops! Something went wrong. Please try again later.");
      }
    } catch (err) {
      setStatus("❌ Unable to submit right now. Please try again later.");
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
          src="/logo/NaBAR-.png"
          alt="Shayan Shaikh Logo"
          className="h-28 w-auto md:h-32 object-contain"
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
            <motion.img
              src="/logo/NaBAR-.png"
              alt="Shayan Shaikh Logo"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={handleLogoAnimationComplete}
              className="h-10 w-auto md:h-12 cursor-pointer object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
            <li><a href="#about" onClick={handleButtonClick}>About</a></li>
            <li><a href="#skills" onClick={handleButtonClick}>Skills</a></li>
            <li><a href="#projects" onClick={handleButtonClick}>Projects</a></li>
            <li><Link to="/certificates" onClick={handleButtonClick}>Certificates</Link></li>
            <li><a href="#awards" onClick={handleButtonClick}>Experience</a></li>
            <li><a href="#contact" onClick={handleButtonClick}>Contact</a></li>
          </ul>

          {/* Right Social Icons */}
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
              <li><a href="#skills" onClick={handleButtonClick}>Skills</a></li>
              <li><a href="#projects" onClick={handleButtonClick}>Projects</a></li>
              <li><a href="#awards" onClick={handleButtonClick}>Experience</a></li>
              <li><a href="#contact" onClick={handleButtonClick}>Contact</a></li>
              <li><Link to="/certificates" onClick={handleButtonClick}>Certificates</Link></li>
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
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-30" aria-label="Background video">
          <source src="/background/background.mp4" type="video/mp4" />
        </video>
        <motion.div className="relative z-10 text-center px-4 flex items-center justify-center h-full" style={{ y: y2 }}>
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Shayan Shaikh
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, delay: 0.3 }} 
              className="mt-4 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-200 mb-8"
            >
              Full-Stack Developer Crafting Scalable Solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  handleButtonClick();
                }}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                  handleButtonClick();
                }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-6 md:px-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>About Me</h2>
          <p className="text-gray-300 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto text-center">
            Passionate engineer with expertise in Full-Stack Development, specializing in React, Node.js, AI, and IoT. 
            Built scalable applications and led teams to deliver cutting-edge solutions. 
            Seeking senior roles at innovative teams where I can drive impactful projects and mentor the next generation of developers.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-20 px-6 md:px-20 bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Frontend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaReact className="text-blue-500 text-xl" />
                  <span className="text-gray-300">React - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiJavascript className="text-yellow-400 text-xl" />
                  <span className="text-gray-300">JavaScript - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiTypescript className="text-blue-600 text-xl" />
                  <span className="text-gray-300">TypeScript - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiTailwindcss className="text-cyan-500 text-xl" />
                  <span className="text-gray-300">Tailwind CSS - Mediater</span>
                </div>
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Backend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaNode className="text-green-500 text-xl" />
                  <span className="text-gray-300">Node.js - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiExpress className="text-gray-300 text-xl" />
                  <span className="text-gray-300">Express.js - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiPostgresql className="text-blue-400 text-xl" />
                  <span className="text-gray-300">PostgreSQL - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiMongodb className="text-green-500 text-xl" />
                  <span className="text-gray-300">MongoDB - Mediater</span>
                </div>
              </div>
            </motion.div>

            {/* Tools & Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Tools & Cloud</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaAws className="text-orange-500 text-xl" />
                  <span className="text-gray-300">AWS - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaDocker className="text-blue-500 text-xl" />
                  <span className="text-gray-300">Docker - Intermediate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SiFirebase className="text-yellow-400 text-xl" />
                  <span className="text-gray-300">Firebase - Mediater</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPython className="text-blue-400 text-xl" />
                  <span className="text-gray-300">Python - Mediater</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

     {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 px-6 md:px-20 bg-black">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Projects</h2>
          <div className="space-y-8 md:space-y-12">

            {/* Cognizant Safe City */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-800 transition-all hover:scale-[1.02] hover:border-blue-500 hover:shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-blue-400 transition-colors duration-300">Cognizant Safe City</h3>
              <p className="text-gray-400 mb-4 text-base md:text-lg leading-relaxed">
                AI-powered smart city solution integrating emergency-responsive traffic signals, real-time headcount tech for fire safety,
                and mobile apps for citizen feedback. Implemented ML models for ambulance siren detection, IoT sensors,
                and real-time building monitoring.
              </p>
              <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300 font-semibold">Impact: Reduced emergency response time by 35% • Improved public safety monitoring</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tools: AI, AR, Full Stack, IoT, Embedded Systems, Machine Learning</p>
              <Link
                to="/projects/cognizant-safe-city"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                onClick={handleButtonClick}
              >
                Project Details
              </Link>
            </motion.div>

            {/* Research & IPR Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-800 transition-all hover:scale-[1.02] hover:border-green-500 hover:shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-green-400 transition-colors duration-300">Research & IPR Management Platform</h3>
              <p className="text-gray-400 mb-4 text-base md:text-lg leading-relaxed">
                A centralized digital platform to streamline research activities, manage intellectual property rights, and support
                entrepreneurial growth. Features include real-time data tracking, collaboration modules, and optimized resource management.
              </p>
              <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-sm text-green-300 font-semibold">Impact: Streamlined IPR management workflow • Enhanced collaboration efficiency</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tools: React, Node.js, PostgreSQL, Firebase, AWS S3, Auth0</p>
              <Link
                to="/projects/research-ipr-management"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                onClick={handleButtonClick}
              >
                Project Details
              </Link>
            </motion.div>

            {/* Movie Website */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-800 transition-all hover:scale-[1.02] hover:border-purple-500 hover:shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-purple-400">Movie Website</h3>
              <p className="text-gray-400 mb-4 text-base md:text-lg leading-relaxed">
                A dynamic movie platform built with React, fetching data from The Movie Database (TMDb) API. Features include
                browsing popular movies, detailed movie pages, responsive design, and search functionality.
              </p>
              <div className="mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm text-purple-300 font-semibold">Impact: Modern UX with real-time API integration • Fully responsive design</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tools: React, Tailwind CSS, Framer Motion, TMDb API</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects/movie-website"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
                <a
                  href="https://movie-iota-beryl.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  View Live
                </a>
              </div>
            </motion.div>

            {/* India CompuTech Corporate Website */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-800 transition-all hover:scale-[1.02] hover:border-orange-500 hover:shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-orange-400 transition-colors duration-300">India CompuTech Corporate Website</h3>
              <p className="text-gray-400 mb-4 text-base md:text-lg leading-relaxed">
                A modern, conversion-optimized corporate website for IT infrastructure services with interactive features, Google Sheets integration, and scroll animations.
              </p>
              <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <p className="text-sm text-orange-300 font-semibold">Impact: Enhanced lead capture with Google Sheets integration • Improved user engagement with animations</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tools: HTML5, CSS3, JavaScript (ES6+), AOS.js, Google Sheets API, SEO Optimization</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects/company-website"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
                <a
                  href="https://www.indiacomputech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  View Live
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

       {/* Experience & Awards Section */}
      <section id="awards" className="py-16 md:py-20 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-black">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Experience & Awards</h2>
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 p-6 rounded-xl border-l-4 border-teal-500 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="text-2xl font-semibold text-white mb-2">Software Developer – Pioneer Foundation Engineering Pvt Ltd</h3>
                <span className="text-sm text-gray-400 font-medium">Sep 2025 – Present</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>Building and maintaining production web apps with React/Node, focused on reliability and performance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>Collaborating with cross-functional teams to ship features quickly and improve developer experience.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="text-2xl font-semibold text-white mb-2">Chairperson – IETE Student Chapter</h3>
                <span className="text-sm text-gray-400 font-medium">2024–2025</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Led the chapter and organized 15+ workshops, tech talks, and innovation-driven student events to boost engagement and industry interaction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Increased chapter membership by 40% through strategic outreach and engaging programming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Facilitated partnerships with 5+ industry leaders for mentorship and internship opportunities</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="text-2xl font-semibold text-white mb-2">Team Lead – Cognizant Safe City</h3>
                <span className="text-sm text-gray-400 font-medium">2023–2025</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Led a team of 8 developers building an AI-based urban safety platform with smart surveillance and threat detection features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Implemented ML models for ambulance siren detection, reducing emergency response time by 35%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Delivered panic alerts and crime heatmaps features, improving public safety monitoring capabilities</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="text-2xl font-semibold text-white mb-2">Resilience Tech Masters – Winner</h3>
                <span className="text-sm text-gray-400 font-medium">2025</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Awarded for developing a cutting-edge safety solution recognized for pushing boundaries in tech innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Demonstrated excellence in applying technology for real-world impact and social good</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="text-2xl font-semibold text-white mb-2">Most Promising BE Student</h3>
                <span className="text-sm text-gray-400 font-medium">2024–2025</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Acknowledged for academic excellence and outstanding leadership capabilities by M.H. Saboo Siddik College of Engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Recognized for contributions to both technical innovation and community engagement</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-16 md:py-20 px-6 md:px-20 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>Let's Connect</h2>
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

      {/* Sticky Hire Me CTA */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToContact();
          handleButtonClick();
        }}
        className="fixed bottom-6 right-4 md:right-6 z-50 px-5 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        Hire Me
      </a>
    </div>
  );
}
