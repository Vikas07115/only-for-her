"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import GradientButton from "../GradientButton"
import { useEffect, useState } from "react"

export default function SweetMomentsAnimated({ onNext }) {
  const photos = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
  ]

  const [visiblePhotos, setVisiblePhotos] = useState([])

  // Sequential photo fade-in (1 sec apart)
  useEffect(() => {
    const timers = photos.map((_, i) => {
      return setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, i])
      }, i * 800)
    })
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  const [flowers, setFlowers] = useState([])

  // Floating flowers animation setup
  useEffect(() => {
    const newFlowers = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 30,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      rotation: Math.random() * 360,
    }))
    setFlowers(newFlowers)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[100svh] overflow-hidden px-4 py-10 w-full">

      {/* Fixed and preloaded background */}
      <div
        className="fixed inset-0 -z-10 bg-[url('/zsdfghjk.jpg')] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundAttachment: "fixed",
          willChange: "transform",
          transform: "translateZ(0)", // prevents flicker
        }}
      >
        

        {/* Floating blobs */}
        <div className="absolute w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-pink-500/25 rounded-full blur-3xl animate-blob1 -top-40 -left-40"></div>
        <div className="absolute w-[380px] md:w-[480px] h-[380px] md:h-[480px] bg-fuchsia-500/20 rounded-full blur-3xl animate-blob2 top-0 right-0 -translate-x-10 md:-translate-x-20"></div>
        <div className="absolute w-[320px] md:w-[400px] h-[320px] md:h-[400px] bg-cyan-400/25 rounded-full blur-3xl animate-blob3 bottom-0 left-0"></div>
        <div className="absolute w-[300px] md:w-[350px] h-[300px] md:h-[350px] bg-violet-400/25 rounded-full blur-3xl animate-blob4 bottom-0 right-0"></div>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ willChange: "transform, opacity" }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow-lg"
      >
        Some Sweet Moments
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="text-xs sm:text-sm text-white/90 mb-8"
      >
        (Hover over the memories)
      </motion.p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
        {photos.map((src, i) =>
          visiblePhotos.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8,
              }}
              whileHover={{
                scale: 1.08,
                y: -5,
                boxShadow: "0 0 30px rgba(255, 100, 255, 0.6)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }
              }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
              className="relative rounded-2xl overflow-hidden"
            >
              <motion.img
                src={src}
                alt={`Memory ${i + 1}`}
                className="h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] md:h-[200px] md:w-[200px] object-cover rounded-xl max-w-full"
                loading="eager"
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ willChange: "transform" }}
              />

              {/* Corner-drawing outline */}
              <div className="pointer-events-none absolute inset-0">
                {/* Top line */}
                <motion.span
                  className="absolute top-0 left-0 right-0 h-[2px] bg-pink-300/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
                />
                {/* Right line */}
                <motion.span
                  className="absolute top-0 right-0 bottom-0 w-[2px] bg-pink-300/70"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
                />
                {/* Bottom line */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-300/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "right center", willChange: "transform, opacity" }}
                />
                {/* Left line */}
                <motion.span
                  className="absolute top-0 left-0 bottom-0 w-[2px] bg-pink-300/70"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.45, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "center bottom", willChange: "transform, opacity" }}
                />
              </div>
            </motion.div>
          ) : null
        )}
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
          delay: photos.length * 0.8 + 0.5,
        }}
        style={{ willChange: "transform, opacity" }}
        className="mt-8"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.2); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 50px) scale(1.3); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -30px) scale(1.1); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -50px) scale(1.2); }
        }
        .animate-blob1 { animation: blob1 7s ease-in-out infinite alternate; }
        .animate-blob2 { animation: blob2 6s ease-in-out infinite alternate; }
        .animate-blob3 { animation: blob3 8s ease-in-out infinite alternate; }
        .animate-blob4 { animation: blob4 6.5s ease-in-out infinite alternate; }
      `}</style>
    </div>
  )
}
