"use client"
import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"

export default function MessageScreen({ onNext }) {
  const [showContent, setShowContent] = useState(false)
  const [open, setOpen] = useState(false)

  // Delay showing greeting card
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200) // 1.2 sec delay
    return () => clearTimeout(timer)
  }, [])

  const dots = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
      })),
    []
  )

  const balloons = useMemo(
    () =>
      Array.from({ length: 10 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 6 + Math.random() * 3,
      })),
    []
  )

  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden">

      {/* Floating glowing dots */}
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-400 blur-sm opacity-70"
          style={{ 
            left: `${dot.left}%`, 
            top: `${dot.top}%`,
            willChange: "transform, opacity",
          }}
          animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={{ 
            duration: dot.duration, 
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween",
          }}
        ></motion.span>
      ))}

      {/* Floating balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-4xl text-pink-300"
          style={{ 
            left: `${b.left}%`, 
            top: `${b.top}%`,
            willChange: "transform, opacity",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6], rotate: [0, 10, -10, 0] }}
          transition={{ 
            y: { duration: b.duration, repeat: Infinity, ease: "easeInOut", type: "tween" },
            opacity: { duration: b.duration, repeat: Infinity, ease: "easeInOut", type: "tween" },
            rotate: { duration: b.duration, repeat: Infinity, ease: "easeInOut", type: "tween" },
          }}
        >
          🎈
        </motion.div>
      ))}

      {/* Greeting content appears after delay */}
      {showContent && (
        <>
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 drop-shadow-xl tracking-wide absolute top-12 text-center"
          >
            💝 BIRTHDAY GREETING 💝
          </motion.h2>

          {/* Card Container */}
          <motion.div
            className="relative w-[300px] sm:w-[380px] md:w-[480px] h-[300px] sm:h-[340px] md:h-[400px] cursor-pointer perspective mt-20"
            onClick={() => setOpen(!open)}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.8,
            }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Card base */}
            <div className="absolute w-full h-full bg-gradient-to-br from-[#3a015c] via-[#62007e] to-[#200047] rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.2)]"></div>

            {/* Left cover */}
            <motion.div
              className="absolute w-1/2 h-full left-0 rounded-l-3xl border-r border-pink-300 shadow-inner overflow-hidden flex flex-col items-center justify-center text-center"
              animate={{ rotateY: open ? -180 : 0 }}
              transition={{ 
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                transformOrigin: "right",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#b43aff] via-[#f86cf8] to-[#8a00ff] opacity-90"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,192,203,0.35)_0%,transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,105,180,0.4)_0%,transparent_60%)]"></div>

              {/* Floating hearts */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-200 text-lg"
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%`,
                    willChange: "transform, opacity",
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    type: "tween",
                  }}
                >
                  💖
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ willChange: "transform, opacity" }}
                className="relative z-10 px-4"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                  “Every smile of yours<br /> lights up my world 🌸”
                </h3>
                <p className="text-sm md:text-base mt-2 text-pink-100 italic">
                  — A wish wrapped in love 💌
                </p>
              </motion.div>

              <motion.div
                className="absolute bottom-6 w-2/3 h-[2px] bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 rounded-full blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  type: "tween",
                }}
                style={{ willChange: "opacity" }}
              />
            </motion.div>

            {/* Right cover */}
            <motion.div
              className="absolute w-1/2 h-full right-0 bg-gradient-to-br from-pink-600 via-fuchsia-500 to-purple-600 rounded-r-3xl flex flex-col items-center justify-center text-white text-center font-bold text-2xl md:text-3xl shadow-2xl"
              animate={{ rotateY: open ? 180 : 0 }}
              transition={{ 
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                transformOrigin: "left",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              <motion.h2
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  type: "tween",
                }}
                style={{ willChange: "transform" }}
              >
                🎉 Happy Birthday 🎉
              </motion.h2>
              <p className="text-base md:text-lg mt-3 opacity-90">
                Tap to open your surprise 💌
              </p>
            </motion.div>

            {/* Inside message */}
            {open && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-gradient-to-br from-pink-50 via-pink-100 to-purple-50 text-[#3a015c] shadow-inner overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <motion.h3
  initial={{ y: 20, opacity: 0, scale: 0.95 }}
  animate={{ y: 0, opacity: 1, scale: window.innerWidth < 480 ? 0.75 : 1 }}
  transition={{ 
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.8,
    delay: 0.8,
  }}
  style={{
    willChange: "transform, opacity",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    textAlign: "center",
    maxWidth: "100%",
  }}
  className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md"
>
  💖 To Someone Truly Special 💖
</motion.h3>


                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 1,
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="text-base md:text-lg leading-relaxed max-w-md text-[#440065] italic"
                >
                  On your special day, may your heart shine with endless joy 🌸,  
                  your dreams bloom brighter 🌈, and your smile light up the world ✨.  
                  You are a blessing to everyone around — may today return that love tenfold! 💝  
                </motion.p>

                <motion.div
                  className="mt-5 text-3xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", type: "tween" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut", type: "tween" },
                  }}
                  style={{ willChange: "transform" }}
                >
                  🎂🎁🎈💞
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
