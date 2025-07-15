import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold tracking-widest"
      >
        SHAYAN SHAIKH
      </motion.h1>
    </motion.div>
  );
}
