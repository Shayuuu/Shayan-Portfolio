// src/pages/ProjectDetail.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

// You'll need to define your project data here or import it from a central source
// For now, let's define it directly for demonstration.
// In a larger app, you might fetch this from an API or a separate data file.
const allProjectsData = [
  {
    id: "cognizant-safe-city", // This will be used in the URL slug
    title: "Cognizant Safe City",
    shortDescription: "AI-powered smart city solution integrating emergency-responsive traffic signals, real-time headcount tech for fire safety, and mobile apps for citizen feedback.",
    fullDescription: [
      "The Cognizant Safe City project is a cutting-edge, AI-powered public safety solution developed to modernize urban security and optimize emergency response mechanisms. Designed in collaboration with Cognizant under its CSR and Academic Connect initiative, the platform aims to integrate smart surveillance, real-time analytics, and citizen-focused tools into a unified ecosystem that supports proactive law enforcement and safer communities..",
      "Key features include a real-time facial recognition system using OpenCV and Python, enabling authorities to identify individuals from surveillance feeds and match them with criminal databases. A geo-mapping dashboard visualizes crime-prone zones and patrol routes, providing data-driven insights for intelligent policing. The platform also includes a centralized incident reporting portal, allowing citizens to file complaints and track their resolution, thereby fostering transparency and community trust.",
      "We engineered a dynamic emergency alert system, including a panic button trigger for distress situations, integrated with police and emergency units for instant response. Leveraging IoT and cloud services, the system also supports anomaly detection in public spaces and secure data handling through encrypted APIs and role-based access control. The web application—built with React.js, Node.js, Express.js, and MongoDB—delivers a seamless experience, combining modern UI/UX with powerful backend capabilities.",
      "Machine Learning models were incorporated to detect suspicious behavior and predict crime hotspots using historical data patterns. As part of the development team, I contributed to AI modules, UI development, secure API integration, and performance optimization. The project was successfully presented to Cognizant mentors and showcased at intercollegiate innovation forums, representing a significant leap toward intelligent, safer urban infrastructure."
    ],
    technologies: ["AI", "AR", "Full Stack (React, Node.js)", "IoT", "Embedded Systems", "Machine Learning", "Computer Vision", "PostgreSQL", "AWS"],
    images: [
      "/image1.jpg", // Replace with your actual image paths
      "/image2.jpg",
      "/image3.jpg",
      "/image4.jpg",
    ],
    // You can add more details like:
    // videoUrl: "path/to/project-video.mp4",
    // githubLink: "https://github.com/your-repo/safe-city",
    // liveDemoLink: "https://safe-city-demo.com",
  },
  {
    id: "research-ipr-management",
    title: "Research & IPR Management Platform",
    shortDescription: "A centralized digital platform to streamline research activities, manage intellectual property rights, and support entrepreneurial growth.",
    fullDescription: [
      "This platform provides a centralized digital solution to streamline research activities and manage intellectual property rights (IPR) efficiently. It is designed to support entrepreneurial growth within academic and R&D institutions.",
      "Key functionalities include real-time data tracking of research projects, comprehensive collaboration modules for researchers, and optimized resource management features. The platform facilitates the entire IPR lifecycle, from ideation and patent application to commercialization. It ensures secure storage of research data and provides analytics for project progress and resource utilization."
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Firebase", "AWS S3", "Auth0"],
    images: [
        "/projects/ipr-platform/image1.jpg",
        "/projects/ipr-platform/image2.jpg",
    ],
  },
  // Add more project data as needed, ensuring a unique 'id' for each
];

export default function ProjectDetail() {
  const { projectId } = useParams(); // Get the dynamic part of the URL (e.g., 'cognizant-safe-city')
  const project = allProjectsData.find(p => p.id === projectId);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Shayan Shaikh Portfolio`;
    } else {
      document.title = "Project Not Found | Shayan Shaikh Portfolio";
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-lg text-gray-400 mb-6">The project you are looking for does not exist.</p>
          <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
        </div>
      </div>
    );
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay for each child image
        delayChildren: 0.3,
      },
    },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };


  return (
    <div className="bg-black text-white min-h-screen font-sans pt-20">
      {/* Navigation Bar - Reusing the same structure */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          <Link to="/" className="text-white no-underline">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-2xl md:text-4xl font-bold tracking-wide cursor-pointer"
            >
              Shayan Shaikh
            </motion.h1>
          </Link>
          <Link to="/#projects" className="text-sm md:text-base font-medium hover:text-gray-300 transition">
            ← Back to Projects
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-center md:text-left"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-4xl mx-auto md:mx-0"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {project.shortDescription}
        </motion.p>

        {/* Technologies Used */}
        <motion.div
          className="mb-12"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="bg-gray-800 text-blue-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>


        {/* Project Images/Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={imageContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {project.images.map((imageSrc, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-800 group"
                variants={imageItemVariants}
              >
                <img
                  src={imageSrc}
                  alt={`${project.title} Image ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {`Image ${index + 1}`} {/* Or add a description for each image in your data */}
                    </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Full Project Description */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Project Overview</h2>
          {project.fullDescription.map((paragraph, index) => (
            <p key={index} className="text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Optional: Project Links (GitHub, Live Demo) */}
        {(project.githubLink || project.liveDemoLink) && (
          <motion.div
            className="mt-12 flex space-x-4 justify-center md:justify-start"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                View GitHub
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
              >
                Live Demo
              </a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}