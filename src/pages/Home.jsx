import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Loader from "../components/ui/Loader"; // Ensure this path is correct
import { Button } from "../components/ui/button"; // Ensure this path is correct
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Renamed for clarity: logoFadeAudioRef from previous discussion is now audioNameRef for "Shayan Shaikh" intro sound.
  const audioNameRef = useRef(null); // Corresponds to the logo/name fade-in sound
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioLoaderRef = useRef(null); // For the initial 'Loading...' screen sound
  const audioClickRef = useRef(null); // For button click sounds

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    document.title = "Shayan Shaikh | Creative Technologist & Web Developer";

    // Play initial loading sound and manage intro/loading states
    // This sequence controls the 'Loading...' text, then the 'S' logo, then the main content.
    setTimeout(() => {
      setShowIntro(false); // Hide 'Loading...' text
      NProgress.start(); // Start NProgress bar

      // Play audio associated with the loader (e.g., a short transition sound)
      if (audioLoaderRef.current) {
        audioLoaderRef.current.play().catch(() => {
          console.log("Loader audio autoplay blocked or failed.");
        });
      }

      // After a delay, play the sound associated with the name appearing
      setTimeout(() => {
        if (audioNameRef.current) {
          audioNameRef.current.play().catch(() => {
            console.log("Name/Logo audio autoplay blocked or failed.");
          });
        }
      }, 1000); // 1 second after loader audio starts, name audio plays

      // After a longer delay, hide the loader and complete NProgress
      setTimeout(() => {
        setIsLoading(false); // Hide the 'S' logo loader
        NProgress.done(); // Complete NProgress bar
      }, 3000); // 3 seconds total for loading animation + sounds
    }, 2000); // 2 seconds delay before starting the loading sequence
  }, []);

  // Handler for the logo (Shayan Shaikh name) animation completion in the navbar
  // This will trigger the audioNameRef sound *again* when the nav logo animates,
  // if you want the same sound as the initial intro animation.
  // If you only want it once on initial load, remove this handler.
  const handleLogoAnimationComplete = () => {
    // If audioNameRef is meant for the initial 'S' logo fade-in,
    // you might not want it to play every time the nav logo animates.
    // If you want a *different* sound for the nav logo, use a separate ref and sound file.
    // For now, I'll assume you want the same sound to signify the name appearing.
    if (audioNameRef.current) {
      audioNameRef.current.currentTime = 0; // Rewind to start
      audioNameRef.current.play().catch(error => {
        console.log("Navbar logo animation complete audio playback blocked or failed:", error);
      });
    }
  };

  // Handler for individual button clicks
  const handleButtonClick = () => {
    if (audioClickRef.current) {
      audioClickRef.current.currentTime = 0; // Rewind to start
      audioClickRef.current.play().catch(() => {
        console.log("Button click audio playback blocked or failed.");
      });
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    // Optionally play click sound on theme toggle
    handleButtonClick();
  };

  // Intro Screen: "Loading..." text
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

  // Loader Screen: Superman-like 'S' logo
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9998] flex items-center justify-center">
        <motion.img
          // CORRECTED PATH: Public assets are accessed from the root /
          src="/shayan-portfolio-full/public/logo/s.svg.jpg" // Assuming s.svg.jpg is directly in public/logo/
          alt="Shayan Shaikh Logo" // Changed alt text for clarity
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
      {/* Audio Elements (Hidden but preloaded) */}
      <audio ref={audioLoaderRef} src="/shayan-portfolio-full/public/sounds/loader.wav" preload="auto" /> {/* Sound for initial loading */}
      <audio ref={audioNameRef} src="/shayan-portfolio-full/public/sounds/name-sound.mp3.wav" preload="auto" /> {/* Sound for name/logo fade-in */}
      <audio ref={audioClickRef} src="/shayan-portfolio-full/public/sounds/click.wav" preload="auto" />   {/* Sound for button clicks */}
      {/* Background Video for Home Page ONLY */}
     

      {/* Navigation Bar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          <Link to="/" className="text-white no-underline">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={handleLogoAnimationComplete} // This will play audioNameRef sound
              className="text-2xl md:text-4xl font-bold tracking-wide cursor-pointer"
            >
              Shayan Shaikh
            </motion.h1>
          </Link>

          <ul className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
            {/* Removed 'Home' link as name serves as home. Added handleButtonClick for clicks */}
            <li><a href="/stories">Stories</a></li>
            <li><a href="#about" className="hover:text-gray-300 transition" onClick={handleButtonClick}>About</a></li>
            <li><a href="#projects" className="hover:text-gray-300 transition" onClick={handleButtonClick}>Projects</a></li>
            <li><Link to="/certificates" className="hover:text-gray-300 transition" onClick={handleButtonClick}>Certificates</Link></li>
            <li><a href="#awards" className="hover:text-gray-300 transition" onClick={handleButtonClick}>Experience</a></li>
            <li><a href="#contact" className="hover:text-gray-300 transition" onClick={handleButtonClick}>Contact</a></li>
          </ul>

          <button className="md:hidden flex flex-col space-y-1 ml-4" onClick={() => { setIsMenuOpen(!isMenuOpen); handleButtonClick(); }}>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

          <button
            onClick={toggleTheme} // Calls toggleTheme, which internally calls handleButtonClick
            className="hidden md:inline ml-4 p-2 border rounded text-xs md:text-sm hover:bg-gray-700 transition-colors duration-300"
          >
            🌙 / ☀️
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pt-4 pb-6 bg-black border-t border-gray-700">
            <ul className="flex space-x-6 text-sm md:text-base font-medium">
  <li><a href="#hero" className="hover:text-gray-300 transition">Home</a></li>
  <li><a href="#about" className="hover:text-gray-300 transition">About</a></li>
  <li><a href="#projects" className="hover:text-gray-300 transition">Projects</a></li>
  <li><a href="#awards" className="hover:text-gray-300 transition">Experience</a></li>
  <li><a href="#contact" className="hover:text-gray-300 transition">Contact</a></li>
  <li><a href="/stories" className="hover:text-gray-300 transition">Stories</a></li> {/* ✅ Add this */}
</ul>

          </div>
        )}
      </nav>

      {/* Hero Section - Removed duplicate video, as it's now handled in App.jsx globally */}
      <section id="hero" className="h-screen w-full relative overflow-hidden pt-20">
        <video // Attach the ref here
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src="/shayan-portfolio-full/public/background/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
          <motion.div
            className="text-center px-4 flex items-center justify-center h-full" // This div is already nested, so its z-index is relative to its parent (the section)
            style={{ y: y2 }}
          >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold"
            >
              Shayan Shaikh
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-4 text-lg md:text-xl max-w-xl mx-auto"
            >
              Creative Technologist & Full-Stack Developer crafting immersive, intelligent digital experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-8"
            >
              <Button
                onClick={handleButtonClick}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                View Portfolio
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 md:px-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            I’m a passionate Web Developer and Creative Technologist, driven by a deep love for both design and code.
            I specialize in crafting dynamic, user-friendly websites and digital experiences that are not only visually
            appealing but also built with robust functionality. My journey in tech has been a perfect fusion of artistic
            vision and technical skill, allowing me to create solutions that stand out in both design and performance.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-20 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-12">Projects</h2>
          <div className="space-y-12">
            {/* Cognizant Safe City Project */}
            <Link to="/projects/cognizant-safe-city" className="block group" onClick={handleButtonClick}> {/* Added click handler */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 transition-transform hover:scale-[1.02] hover:border-blue-500">
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">Cognizant Safe City</h3>
                <p className="text-gray-400 mb-2">
                  AI-powered smart city solution integrating emergency-responsive traffic signals, real-time headcount tech for fire safety,
                  and mobile apps for citizen feedback. Implemented ML models for ambulance siren detection, IoT sensors,
                  and real-time building monitoring.
                </p>
                <p className="text-sm text-gray-500">Tools: AI, AR, Full Stack, IoT, Embedded Systems</p>
              </div>
            </Link>

            {/* Research & IPR Management Platform Project */}
            {/* If this also needs a click sound, you'd add onClick={handleButtonClick} */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
              <h3 className="text-2xl font-semibold mb-2">Research & IPR Management Platform</h3>
              <p className="text-gray-400 mb-2">
                A centralized digital platform to streamline research activities, manage intellectual property rights, and support
                entrepreneurial growth. Features include real-time data tracking, collaboration modules, and optimized
                resource management.
              </p>
              <p className="text-sm text-gray-500">Tools: React, Node.js, PostgreSQL, Firebase, AWS S3, Auth0</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience & Awards Section */}
      <section id="awards" className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-12">Experience & Awards</h2>
          <div className="space-y-10">
            {/* Add onClick={handleButtonClick} to these divs if they are clickable/interactive and you want sound */}
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
      <section id="contact" className="py-20 px-6 md:px-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <form
            className="space-y-6 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
              handleButtonClick(); // Play sound on form submit button click
            }}
          >
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input type="text" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input type="email" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required />
            </div>
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea rows="4" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700" required></textarea>
            </div>
            <Button type="submit" className="mt-4 border-white text-white hover:bg-white hover:text-black">
              Send Message
            </Button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}