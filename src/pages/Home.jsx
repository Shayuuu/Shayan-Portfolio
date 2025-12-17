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

  const scrollToHero = () => {
    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
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
          src="/logo/ss-logo.png"
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
          <a
            href="#hero"
            className="text-white no-underline"
            onClick={(e) => {
              e.preventDefault();
              scrollToHero();
              handleButtonClick();
            }}
          >
            <motion.img
              src="/logo/ss-logo.png"
              alt="Shayan Shaikh Logo"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={handleLogoAnimationComplete}
              className="h-10 w-auto md:h-12 cursor-pointer object-contain"
            />
          </a>

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
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-40" aria-label="Background video">
          <source src="/background/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
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
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 text-sm font-semibold">Full-Stack · React · Node</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 text-sm font-semibold">Performance & DX</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 text-sm font-semibold">Available for Remote</span>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, delay: 0.3 }} 
              className="mt-4 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-200 mb-8"
            >
              I ship fast, scalable products that improve conversions and reliability. Recently cut load time by 35% and boosted signups by 25%.
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
                  <span className="text-gray-300">Docker - Mediater</span>
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

          {/* Featured Project: India CompuTech Corporate Website */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, rotate: -0.25 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-orange-500/40 mb-10"
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/15 via-transparent to-amber-500/15 pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/15 text-orange-200">
                Featured • Marketing Site
              </span>
              <span className="text-xs text-gray-400">B2B Infra</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-cyan-200">
              India CompuTech Corporate Website
            </h3>
            <p className="text-gray-300 mb-4 text-base md:text-lg leading-relaxed">
              A conversion-optimized corporate site with interactive quiz, Google Sheets lead capture, motion-first sections, and SEO/OG tuning tailored for a B2B infrastructure brand.
            </p>
            <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <p className="text-sm text-orange-200 font-semibold">
                Focus: Higher lead capture · Trust-building storytelling · Smooth scroll experience
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {["HTML5", "CSS3", "JS (ES6+)", "AOS Animations", "Google Sheets", "SEO"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-800">
              <Link
                to="/projects/company-website"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                onClick={handleButtonClick}
              >
                Project Details
              </Link>
              <a
                href="https://www.indiacomputech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                onClick={handleButtonClick}
              >
                View Live
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Cognizant Safe City */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -0.25 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-7 rounded-2xl shadow-xl border border-gray-800"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/15 text-blue-200">Full-Stack / AI</span>
                <span className="text-xs text-gray-400">Smart City</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-blue-200">Cognizant Safe City</h3>
              <p className="text-gray-300 mb-4 text-base leading-relaxed">
                AI-powered smart city solution with emergency-responsive signals, real-time headcount, and citizen feedback apps; ML for siren detection and IoT monitoring.
              </p>
              <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-200 font-semibold">Impact: -35% emergency response time · Better public safety monitoring</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["AI", "IoT", "ML", "React", "Node", "Vision"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-200 border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                <Link
                  to="/projects/cognizant-safe-city"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
              </div>
            </motion.div>

            {/* Research & IPR Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -0.25 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-7 rounded-2xl shadow-xl border border-gray-800"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/15 text-green-200">Platform</span>
                <span className="text-xs text-gray-400">IPR & Research</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-green-200">Research & IPR Management</h3>
              <p className="text-gray-300 mb-4 text-base leading-relaxed">
                Centralized platform for research tracking, IPR lifecycle, and collaboration; real-time data, resource planning, and secure storage.
              </p>
              <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-sm text-green-200 font-semibold">Impact: Streamlined IPR workflow · Faster collaboration cycles</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Node", "PostgreSQL", "Firebase", "AWS S3", "Auth0"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-200 border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                <Link
                  to="/projects/research-ipr-management"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
              </div>
            </motion.div>

            {/* Movie Website */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-7 rounded-2xl shadow-xl border border-gray-800"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/15 text-purple-200">Frontend</span>
                <span className="text-xs text-gray-400">Media</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-purple-200">Movie Website</h3>
              <p className="text-gray-300 mb-4 text-base leading-relaxed">
                TMDb-powered movie explorer with responsive UI, smooth animations, and detailed pages for trailers and ratings.
              </p>
              <div className="mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm text-purple-200 font-semibold">Impact: Real-time API UX · Fully responsive experience</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Tailwind", "Framer Motion", "TMDb API"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-200 border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                <Link
                  to="/projects/movie-website"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
                <a
                  href="https://movie-iota-beryl.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  View Live
                </a>
              </div>
            </motion.div>

            {/* Cinesnap - Premium Movie Booking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -0.25 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-7 rounded-2xl shadow-xl border border-gray-800"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/15 text-cyan-200">Full-Stack / UX</span>
                <span className="text-xs text-gray-400">Cinema Booking</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-cyan-200">Cinesnap</h3>
              <p className="text-gray-300 mb-4 text-base leading-relaxed">
                Premium movie ticket booking experience with cinematic UI, smooth seat selection and delightful micro-interactions.
              </p>
              <div className="mb-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-sm text-cyan-200 font-semibold">Impact: Motion-first UX · Product feel · Showcases front-end craft</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Tailwind", "Framer Motion", "UX Engineering"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-200 border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                <Link
                  to="/projects/cinesnap"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  onClick={handleButtonClick}
                >
                  Project Details
                </Link>
                <a
                  href="https://cine-snap-ph.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
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


      {/* Hobbies */}
      <section id="hobbies" className="py-12 md:py-16 px-6 md:px-20 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 p-6 md:p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Hobbies</h3>
              <p className="text-gray-300 max-w-3xl">
                Story writing helps me sharpen narrative thinking and empathy. Explore my ongoing thriller “The Hunt” on Wattpad.
              </p>
            </div>
            <a
              href="https://www.wattpad.com/story/345143266-the-hunt?utm_source=android&utm_medium=whatsapp&utm_content=share_writing&wp_page=create&wp_uname=shayyannz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md"
              onClick={handleButtonClick}
            >
              Read “The Hunt”
            </a>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Let's Connect</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">Tell me about the role and the outcome you need—I'll outline how I can ship it fast, reliably, and with clear communication.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-sm">
            {[
              "Ship fast with clean handoff and docs",
              "Performance-first (LCP/CLS wins)",
              "Transparent comms & async updates",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200">
                {item}
              </div>
            ))}
          </div>
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
