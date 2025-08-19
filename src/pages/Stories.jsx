
import { motion } from "framer-motion";

const stories = [
  {
    title: "The Hunt",
    summary:"A relentless masked hunter stalks a war-torn world, driven by vengeance and blood-soaked secrets.",
    image: "/shayan-portfolio-full/public/stories/the hunt.png",
    link: "/story/the-tiger-in-the-city",
  },
  {
    title: "Echoes of the Rain",
    summary: "In the monsoon-drenched alleys of a forgotten village, a girl uncovers a haunting family secret.",
    image: "/stories/rain.jpg",
    link: "/story/echoes-of-the-rain",
  },
  {
    title: "Neon Dreams",
    summary: "A hacker in 2092 Mumbai risks everything to rewrite reality for love.",
    image: "/stories/neon.jpg",
    link: "/story/neon-dreams",
  },
];

export default function Stories() {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6 md:px-20 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-12 text-center"
      >
        📚 Shayan's Stories
      </motion.h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gray-900 rounded-xl p-5 shadow-lg border border-gray-800 hover:scale-[1.03] transition-transform"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">{story.title}</h3>
            <p className="text-gray-300 text-sm">{story.summary}</p>
            <a
              href={story.link}
              className="inline-block mt-4 text-pink-400 hover:underline hover:text-white"
            >
              Read More →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
