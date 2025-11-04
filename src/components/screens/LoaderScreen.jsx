"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderScreen({ onDone }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(t);
          setTimeout(() => onDone?.(), 800);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center 
      text-white overflow-hidden bg-gradient-to-b from-[#3a015c] via-[#62007e] to-[#200047] px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: 'opacity' }}
    >
      {/* Countdown Number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ 
            scale: { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 },
            opacity: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          className="font-black text-transparent bg-clip-text 
          bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 
          drop-shadow-[0_0_30px_rgba(236,72,153,0.25)] p-0.5
          text-[60px] xs:text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px]"
          style={{ willChange: 'transform, opacity' }}
        >
          {count}
        </motion.div>
      </AnimatePresence>

      {/* Subtitle Text */}
      <motion.h1
        className="font-semibold text-transparent bg-clip-text text-center leading-snug
        bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 
        mt-8 sm:mt-10 text-lg sm:text-2xl md:text-3xl lg:text-4xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
        transition={{ 
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut', type: 'tween' },
          y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        Crafting your special moment...
      </motion.h1>
    </motion.div>
  );
}
