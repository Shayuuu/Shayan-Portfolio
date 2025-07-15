// src/pages/Certificates.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Define your certificate data
// You can replace these with your actual certificate details
const certificateData = [
  {
    id: 1,
    title: "Resilence Techmaster 2.0",
    awardBody: "Anjuman-I-Islam",
    image: "/gold.jpg", // Replace with your image path
    description: "Clinched 1st Prize at Resilience TechMaster 2.0 — a celebration of innovation, teamwork, and unbreakable spirit!",
  },
  {
    id: 2,
    title: "IP Awareness/Training program",
    awardBody: "National IP Awarness Mission",
    image: "/NPM.jpg", // Replace with your image path
    description: "Successfully conducted an IP Awareness/Training Program under NIPAM, fostering innovation through education on intellectual property rights.",
  },
  {
    id: 3,
    title: "The Complete Web Development",
    awardBody: "Udemy",
    image: "/udemy.jpg", // Replace with your image path
    description: "Mastering HTML, CSS, JavaScript, Node.js, MongoDB, and more to build full‑stack web applications.",
    
  },
  {
    id: 4,
    title: "ERR_404 Hackathon",
    awardBody: "Anjuman-I-Islam",
    image: "/404.jpg", // Replace with your image path
    description: "Successfully participated in a 36-hour hackathon, pushing boundaries through nonstop innovation, collaboration, and problem-solving under pressure.",
    
  },
  {
    id: 5,
    title: "Inovative Project",
    awardBody: "Creative Ideas And Inovation In Action",
    image: "/ciia.jpg", // Replace with your image path
    description: "Showcased an innovative idea at CIIA 4, blending creativity with real-world impact.",
   
  },
  {
    id: 6,
    title: "Web Development Internship",
    awardBody: "CodeAlpha",
    image: "/code.jpg", // Replace with your image path
    description: " Gaining hands-on experience in building responsive and dynamic web applications.",
    
  },
  {
    id: 7,
    title: "Letter Of Appoinment",
    awardBody: "Instituion Of Electronics And Telecommunication Engineering",
    image: "/LOP.jpg", // Replace with your image path
    description: " Elected as Chairman of the IETE Student Forum to lead innovation, foster technical growth, and empower student engagement.",
  },
  {
    id: 8,
    title: "Project Display",
    awardBody: "Fr. Conceicao Rodrigues College Of Engineering Bandra",
    image: "/parkalp.png", // Replace with your image path
    description: "Learned about Agile principles and Scrum framework for project management.",
  },
  {
    id: 9,
    title: "Innovative Idea For Entrepreneurship",
    awardBody: "Entrepreneur Development Cell",
    image: "/edc.png", // Replace with your image path
    description: "Developed a startup-focused project, aimed at solving real-world problems through innovation and entrepreneurial thinking.", 
  },
  
  // Add more certificate data here
];

const ITEMS_PER_LOAD = 6; // How many certificates to load at once

export default function Certificates() {
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_LOAD);
  const logoFadeAudioRef = useRef(null);

  const loadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_LOAD);
  };
  const handleLogoAnimationComplete = () => {
    // Play sound when logo animation completes
    if (logoFadeAudioRef.current) {
      logoFadeAudioRef.current.currentTime = 0; // Rewind to start
      logoFadeAudioRef.current.play().catch(error => {
        console.log("Logo fade audio playback blocked or failed:", error);
      });
    }
  };

  return (
    
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans transition-colors duration-500 pt-20">
      {/* Navigation (You might want to reuse your Nav component here if you have one) */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-2xl md:text-4xl font-bold tracking-wide"
          >
            Shayan Shaikh
          </motion.h1>
          {/* Add your existing navigation links here or a back button */}
          <a href="/" className="text-sm md:text-base font-medium hover:text-gray-300 transition">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          All Certificates
        </motion.h1>

        {/* Filters/Info Bar - Mimicking DNEG's style */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-gray-400 text-sm md:text-base border-b border-gray-700 pb-4">
          <span className="mb-2 md:mb-0">{certificateData.length} Certificates</span>
          <div className="flex space-x-4">
            <span>CERTIFICATION BODY</span> {/* Can be a dropdown for filtering if you implement it */}
            <span>FILTER BY CATEGORY</span> {/* Can be a dropdown for filtering if you implement it */}
          </div>
        </div>

        {/* Certificate Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {certificateData.slice(0, itemsToShow).map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-105 hover:border-blue-500 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-full h-48 md:h-64 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white text-lg md:text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {cert.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-blue-400 text-xs md:text-sm font-medium uppercase mb-1">
                  {cert.awardBody}
                </p>
                <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                  {cert.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Load More Button */}
        {itemsToShow < certificateData.length && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}