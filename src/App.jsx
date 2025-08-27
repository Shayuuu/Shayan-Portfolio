// src/App.jsx
import React, { useEffect, useRef } from 'react'; // Import useRef
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Certificates from './pages/Certificates';
import ProjectDetail from './pages/ProjectDetail';



function App() {
  const pageLoadAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  // 1. Page Loading Sound
  useEffect(() => {
    if (pageLoadAudioRef.current) {
      // It's good practice to try to play and catch errors, as autoplay might be blocked.
      pageLoadAudioRef.current.play().catch(error => {
        console.log("Page load audio autoplay blocked or failed:", error);
        // You could add a UI element here to prompt the user to enable sound
      });
    }
  }, []); // Empty dependency array ensures it runs once on mount

  // Global click sound handler
  const handleGlobalClick = (event) => {
    // Only play sound if the clicked element is a button or an interactive link
    // You might want to refine this condition based on your specific needs
    const targetTagName = event.target.tagName;
    if (clickAudioRef.current && (targetTagName === 'BUTTON' || targetTagName === 'A' || targetTagName === 'INPUT')) {
      clickAudioRef.current.currentTime = 0; // Rewind to start for quick successive clicks
      clickAudioRef.current.play().catch(error => {
        console.log("Click audio playback blocked or failed:", error);
      });
    }
  };

  // Add event listener to the document for global clicks
  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);


  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Audio Elements (hidden) */}
        <audio ref={pageLoadAudioRef} src="/sounds/page-load.mp3" preload="auto" />
        <audio ref={clickAudioRef} src="/sounds/click.mp3" preload="auto" /> {/* Global click sound */}

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/shayan-portfolio-full/public/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Area */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;