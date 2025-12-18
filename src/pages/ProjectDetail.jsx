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
      "/project/image1.jpg", // Replace with your actual image paths
      "/project/image2.jpg",
      "/project/image3.jpg",
      "/project/image4.jpg",
    ],
    caseStudy: {
      impact: [
        "Designed as a unified smart-city safety platform: surveillance + analytics + citizen reporting in one workflow",
        "Strong real-world framing: emergency response, incident reporting, and proactive monitoring",
      ],
      role: [
        "Built UI screens and flows for dashboards and reporting",
        "Integrated secure APIs and contributed to performance optimization",
        "Worked on AI module integration and feature polish for demo readiness",
      ],
      keyFeatures: [
        "Facial recognition pipeline (OpenCV/Python) for identification from surveillance feeds",
        "Crime heatmap / geo-mapping dashboard for data-driven monitoring and patrol insights",
        "Citizen incident reporting portal with tracking for transparency",
        "Panic alert flow for emergency situations with rapid escalation",
      ],
      architecture: [
        "React frontend → Node/Express APIs → database layer for incident + user data",
        "Computer vision/ML services integrated as AI modules powering detection/insights",
        "Role-based access + secure API handling for sensitive workflows",
      ],
      challenges: [
        "Balancing complex real-time dashboard UX with clarity (filters, states, and readable insights)",
        "Integrating AI/vision outputs into a usable UI without overwhelming users",
      ],
      roadmap: [
        "Add evaluation metrics for ML modules (precision/recall dashboards) and continuous improvement loop",
        "Introduce audit logs for actions + incident lifecycle for enterprise readiness",
      ],
    },
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
        "/project/ipr 1.png", 
      "/project/ipr 3.png",
      "/project/ipr 4.png",
      "/project/ipr 5.png",
    ],
    caseStudy: {
      impact: [
        "Centralized research + IPR workflows into one platform to reduce manual tracking and improve collaboration",
        "Designed to support institutions with visibility into progress, resources, and IPR lifecycle status",
      ],
      role: [
        "Worked on UI modules for tracking, collaboration, and lifecycle visibility",
        "Integrated backend APIs and ensured data consistency for core flows",
      ],
      keyFeatures: [
        "Research project tracking with real-time status visibility",
        "IPR lifecycle management (idea → filing → review → commercialization)",
        "Secure storage of documents and research artifacts (S3) and access control (Auth0)",
        "Analytics-style views for progress/resource utilization",
      ],
      architecture: [
        "React frontend → Node APIs → PostgreSQL as system of record",
        "Firebase for real-time modules where needed; S3 for file storage; Auth0 for auth/roles",
      ],
      challenges: [
        "Designing lifecycle states that are simple for users but accurate for real processes",
        "Keeping UX fast while working with large lists + forms (filters, pagination patterns)",
      ],
      roadmap: [
        "Add role-based dashboards (student/researcher/admin) with tailored KPIs",
        "Introduce approval workflows + notifications (email/in-app) for lifecycle events",
      ],
    },
  },
  {
  id: "movie-website",
  title: "Movie Website",
  shortDescription: "A dynamic movie platform built with React, fetching data from The Movie Database (TMDb) API.",
  fullDescription: [
    "This Movie Website allows users to browse popular movies, search for specific titles, and view detailed information about each movie. It leverages TMDb API for live movie data and integrates responsive design for seamless access across devices.",
    "Key features include movie listings, search functionality, detailed movie pages with trailers and ratings, and smooth animations for a modern UX. The platform is built to be fast, responsive, and easy to maintain."
  ],
  technologies: ["React", "Tailwind CSS", "Framer Motion", "TMDb API"],
  images: [
    "/project/Movie 1.png", 
      "/project/Movie 2.png",
      "/project/Movie 3.png",
      "/project/Movie 4.png",
  ],
  liveDemoLink: "https://movie-iota-beryl.vercel.app/",
  caseStudy: {
    impact: [
      "Built a production-like movie discovery UX with fast browsing + search and clean detail pages",
      "Demonstrates strong UI polish with motion and responsive layouts",
    ],
    role: [
      "Implemented core UI screens: listings, search results, movie details",
      "Integrated TMDb endpoints and handled loading/error states cleanly",
    ],
    keyFeatures: [
      "Trending/popular listings + search",
      "Movie detail page: ratings, overview, and trailer entry point",
      "Responsive UI and animation polish (Framer Motion)",
    ],
    architecture: [
      "React SPA → TMDb API via fetch → component-driven pages and reusable UI blocks",
      "State patterns for query/search + pagination-style UX",
    ],
    challenges: [
      "Keeping perceived performance high with images + API latency (skeletons, layout stability)",
      "Designing a consistent card system for many screen sizes",
    ],
    roadmap: [
      "Add watchlist (local storage / auth) and recommendations based on user taste",
      "Improve SEO by migrating to SSR/Next.js version (optional for a v2)",
    ],
  },
},
{
  id: "company-website",
  title: "India CompuTech Corporate Website",
  shortDescription: "A modern, conversion-optimized corporate website for IT infrastructure services with interactive features, Google Sheets integration, and scroll animations.",
  fullDescription: [
    "Developed a complete 4-page corporate website for India CompuTech, an IT infrastructure and cloud services company. The project features a responsive, mobile-first design with a red/white brand theme. Key highlights include an interactive 3-question service selector quiz with smart recommendations, Google Sheets form integration for lead capture, scroll-triggered animations using AOS.js, and comprehensive SEO optimization with Open Graph tags. The site includes 13 sections on the homepage (hero, testimonials, case studies, service bundles, timeline, statistics counter), a team showcase, detailed services page, and contact form with animated success/error modals. Built with vanilla HTML5, CSS3 (4,020 lines), and JavaScript (921 lines) for optimal performance. Features WhatsApp integration, live chat widget, trust badges, client testimonials, and animated statistics counters. Fully responsive across all devices with custom mobile navigation and optimized layouts.."
  ],
  technologies: ["HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "AOS.js",
    "Feather Icons",
    "Google Apps Script",
    "Google Sheets API",
    "Google Fonts (Inter)",
    "Responsive Design",
    "WebP Images",
    "SEO Optimization",
    "Open Graph Tags"],

  images: [
    "/project/company-1.png", 
      "/project/company-2.png",
      "/project/company-3.png",
      "/project/company-4.png",
  ],
  liveDemoLink: "https://www.indiacomputech.com/",
  caseStudy: {
    impact: [
      "Conversion-first marketing site designed to increase lead capture and trust for a B2B infra brand",
      "Showcases real-world UX patterns: quiz-based routing, trust badges, testimonials, and clear CTAs",
    ],
    role: [
      "Built end-to-end multi-page site (layout, components, animations, responsive navigation)",
      "Implemented lead capture with Google Sheets integration via Apps Script",
      "Added SEO + Open Graph metadata and performance-minded vanilla implementation",
    ],
    keyFeatures: [
      "Interactive 3-step services quiz with smart recommendations",
      "Contact/lead forms wired to Google Sheets (no backend required)",
      "AOS scroll-trigger animations + counters + modal success/error UX",
      "WhatsApp integration + trust sections (testimonials, badges, case studies)",
    ],
    architecture: [
      "Static multi-page site (HTML/CSS/JS) optimized for speed and reliability",
      "Forms → Google Apps Script → Google Sheets as lightweight CRM",
      "AOS for animations + careful responsive breakpoints for all devices",
    ],
    challenges: [
      "Maintaining consistency across many sections while keeping the site fast and readable",
      "Ensuring mobile nav + long pages remain smooth and user-friendly",
    ],
    roadmap: [
      "Add lightweight CMS or JSON-driven content to reduce manual updates",
      "Add analytics events (CTA clicks, quiz completion) to measure funnel performance",
    ],
  },
},
{
  id: "cinesnap",
  title: "CineSnap - Premium Movie Booking Platform",
  shortDescription: "Full-stack movie ticket booking platform with real-time seat locking, payment integration, OTT recommendations, and cinema-grade UI/UX experience.",
  fullDescription: [
    "CineSnap is a premium, cinema-grade movie ticket booking platform built to feel like a modern consumer product—not a student CRUD app. It focuses on highly polished UI/UX, fast interactions, and a clear booking funnel (discover → choose show → pick seats → pay → ticket).",
    "The core experience is built around a responsive seat-selection flow with strong micro-interactions and state clarity: hover states, selected-seat summaries, pricing clarity, and smooth transitions that reduce friction and improve conversion.",
    "On the backend side, the platform is structured for real-world readiness: real-time seat availability (locking to prevent double-booking), secure authentication, and payment integrations. Movie discovery is powered by TMDb and layered with recommendation UX patterns users already trust from BookMyShow/OTT apps.",
    "2026 roadmap (AI + Frontend): CineSnap evolves into an AI-assisted booking experience where users can type what they want (“2 seats near center tonight under ₹400”) and the UI auto-applies filters, suggests the best options, and explains why—while still keeping the final control in the user’s hands."
  ],
  technologies: ["Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Redis (Upstash)",
      "NextAuth.js",
      "Stripe",
      "Razorpay",
      "TMDb API",
      "Framer Motion",
      "Tailwind CSS",
      "Node.js",
      "Express.js"],

  images: [
    "/project/cinesnap1.png", 
      "/project/cinesnap2.png",
      "/project/cinesnap4.png",
      "/project/cinesnap3.png",
  ],
  liveDemoLink: "https://cine-snap-ph.vercel.app/",
  keyFeatures: [
    "Real-time seat locking to prevent double-booking (locking window + expiry)",
    "Pricing + seat type tiers (Regular / Premium / VIP) with clear UX feedback",
    "Payment-ready checkout flow (Stripe/Razorpay) with success state + ticket delivery",
    "Movie discovery via TMDb with trending, search, and detail pages",
    "Recommendation surfaces (OTT-style carousels) to boost engagement"
  ],
  frontendHighlights: [
    "Motion-first UI: page transitions, hover states, and micro-interactions that feel premium",
    "State clarity: selected seats, price summary, and disabled states are always obvious",
    "Mobile UX: tap-friendly seat grid, sticky summary, and fast flows (no confusion)",
    "Performance mindset: image optimization + minimizing re-renders in heavy UI screens"
  ],
  architecture: [
    "Client (Next.js) → API routes (booking/payments) → Postgres (Neon) for persistence",
    "Redis (Upstash) used for seat lock keys + TTL-based lock expiry",
    "Auth via NextAuth to protect booking history and user sessions",
    "TMDb for movie metadata + posters + trailers"
  ],
  aiUpgradePlan: [
    {
      title: "AI Booking Assistant (UX)",
      items: [
        "Command palette (Cmd+K): user types intent → UI applies filters instantly",
        "Inline suggestions: showtime + seat suggestions with a short 'why' explanation",
        "Safe UX: AI suggests, user confirms (no surprise auto-pay actions)"
      ]
    },
    {
      title: "Intent Parsing + Seat Recommendation (API)",
      items: [
        "POST /api/ai/booking-intent → returns JSON: { movieQuery, date, timeRange, seats, budget, preferences }",
        "POST /api/ai/seat-suggest → input: seatMap + intent → output: ranked seat groups + explanation",
        "Cache results per showtime for speed; fall back to deterministic rules if AI fails"
      ]
    },
    {
      title: "Quality + Safety (What recruiters care about)",
      items: [
        "Store prompt/response logs (anonymized) + basic evaluation set (20–50 queries)",
        "Guardrails: strict JSON schema, timeout + retries, and friendly error messaging",
        "Cost control: smaller model for parsing + bigger model only when needed"
      ]
    }
  ],
},
  // Add more project data as needed, ensuring a unique 'id' for each
];

export default function ProjectDetail() {
  const { projectId } = useParams(); // Get the dynamic part of the URL (e.g., 'cognizant-safe-city')
  const project = allProjectsData.find(p => p.id === projectId);

  useEffect(() => {
    // Ensure the detail page always opens at the top (React Router preserves scroll by default)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [projectId]);

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
            <motion.img
              src="/logo/ss-logo.png"
              alt="Shayan Shaikh Logo"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="h-10 w-auto md:h-12 cursor-pointer object-contain"
            />
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
                  onError={(e) => {
                    e.currentTarget.src = "/certificate/404.jpg";
                  }}
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

        {/* Case Study Sections (AI + Frontend) */}
        {(project.caseStudy || project.keyFeatures || project.frontendHighlights || project.architecture || project.aiUpgradePlan) && (
          <motion.div
            className="mt-12 space-y-10"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            {(project.caseStudy?.impact) && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Impact</h2>
                <ul className="space-y-2 text-gray-300">
                  {project.caseStudy.impact.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.caseStudy?.role) && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">My Role</h2>
                <ul className="space-y-2 text-gray-300">
                  {project.caseStudy.role.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.caseStudy?.keyFeatures || project.keyFeatures) && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Key Features</h2>
                <ul className="space-y-2 text-gray-300">
                  {(project.caseStudy?.keyFeatures || project.keyFeatures).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.caseStudy?.frontendHighlights || project.frontendHighlights) && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Frontend UX Highlights</h2>
                <ul className="space-y-2 text-gray-300">
                  {(project.caseStudy?.frontendHighlights || project.frontendHighlights).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.caseStudy?.architecture || project.architecture) && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Architecture (High Level)</h2>
                <ul className="space-y-2 text-gray-300">
                  {(project.caseStudy?.architecture || project.architecture).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy?.challenges && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Challenges & Solutions</h2>
                <ul className="space-y-2 text-gray-300">
                  {project.caseStudy.challenges.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-rose-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy?.roadmap && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Roadmap / Next Improvements</h2>
                <ul className="space-y-2 text-gray-300">
                  {project.caseStudy.roadmap.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.aiUpgradePlan && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">AI Upgrade Plan (2026)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.aiUpgradePlan.map((section, idx) => (
                    <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        {section.items.map((it, j) => (
                          <li key={j} className="flex items-start">
                            <span className="text-cyan-400 mr-2">•</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

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
