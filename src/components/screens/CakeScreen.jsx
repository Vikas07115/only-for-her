"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame } from "lucide-react"

const balloonColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"]

export default function CakeScreen({ onNext }) {
  const [balloons, setBalloons] = useState(
    balloonColors.map((color, i) => ({ id: i, color, popped: false }))
  )
  const [showMessage, setShowMessage] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [lit, setLit] = useState(false)
  const [decorated, setDecorated] = useState(false)

  const popBalloons = (index = 0) => {
    if (index >= balloons.length) {
      setShowMessage(true)
      return
    }
    setBalloons(prev =>
      prev.map(b => (b.id === index ? { ...b, popped: true } : b))
    )
    burst()
    setTimeout(() => popBalloons(index + 1), 500)
  }

  const burst = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: balloonColors,
    })
  }

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
        setShowCake(true)
        setTimeout(() => setDecorated(true), 1000)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500)
    setTimeout(() => burst(), 1000)
  }

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#3a015c] via-[#62007e] to-[#9b2fae]">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Floating Flowers Left & Right */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-pink-300 text-2xl md:text-3xl"
            style={{
              left: i % 2 === 0 ? `${Math.random() * 20}%` : `${80 + Math.random() * 15}%`,
              top: `${Math.random() * 100}%`,
              willChange: "transform",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 12 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* DECORATION AFTER BALLOONS POP */}
      {decorated && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[-120px] w-10 h-14 rounded-full"
              style={{ 
                left: `${15 * i + 10}%`, 
                backgroundColor: balloonColors[i % balloonColors.length],
                willChange: "transform",
              }}
              animate={{ y: [-20, -window.innerHeight - 200] }}
              transition={{
                repeat: Infinity,
                duration: 6 + i,
                delay: i * 0.5,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          ))}

          <motion.div
            className="absolute top-6 text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg text-center px-3"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            🎈🎉 Happy Birthday Dear! 🎉🎈
          </motion.div>
        </>
      )}

      {/* BALLOONS */}
      {!decorated && (
        <div className="absolute top-20 md:top-28 flex justify-center w-full gap-4 md:gap-6 flex-wrap z-10">
          {balloons.map(balloon => (
            <AnimatePresence key={balloon.id}>
              {!balloon.popped && (
                <motion.div
                  className="w-12 h-20 md:w-16 md:h-24 rounded-full flex items-end justify-center cursor-pointer shadow-lg"
                  style={{ 
                    background: balloon.color,
                    willChange: "transform, opacity",
                  }}
                  initial={{ y: 200, scale: 0, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    scale: 1, 
                    opacity: 1,
                    rotate: [0, 5, -5, 0]
                  }}
                  exit={{ 
                    y: -250, 
                    scale: 0, 
                    opacity: 0,
                    rotate: 180
                  }}
                  transition={{ 
                    y: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 },
                    scale: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 },
                    opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", type: "tween" },
                    default: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => popBalloons(0)}
                >
                  <div className="w-1 h-6 md:h-8 bg-white mb-1"></div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      )}

      {/* “POP ANY BALLOON” TEXT */}
      {!decorated && (
        <motion.div
          className="absolute top-[55%] md:top-[50%] text-lg sm:text-xl md:text-2xl font-semibold text-pink-200 text-center px-4 z-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          ✨ Pop any balloon ✨
        </motion.div>
      )}

      {/* MESSAGE */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mt-40 md:mt-48 z-10 px-4"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ 
              opacity: 0, 
              y: -50, 
              scale: 0.8,
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            🎉 Wish You a Very Happy Birthday Dear 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAKE SECTION */}
      {showCake && (
        <motion.div
          className="flex flex-col items-center z-10 absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Cake lit={lit} />
          <div className="flex flex-col items-center gap-4 mt-15">
            {!lit ? (
              <GradientButton
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-full font-bold animate-bounce flex items-center"
                onClick={lightCandle}
              >
                <Flame size={20} className="mr-2" /> Light the Candle
              </GradientButton>
            ) : (
              <GradientButton
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-full font-bold animate-bounce flex items-center"
                onClick={onNext}
              >
                Next <ArrowRight size={20} className="ml-2" />
              </GradientButton>
            )}
          </div>
    </motion.div>
      )}
    </div>
  )
}

function Cake({ lit }) {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div 
        className="cake relative w-28 sm:w-36 md:w-48"
        animate={lit ? { 
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: lit ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <div className="plate w-full h-2 bg-gray-200 rounded-b-full"></div>
        <div className="layer w-full h-6 bg-pink-500"></div>
        <div className="layer w-full h-6 bg-pink-400"></div>
        <div className="layer w-full h-6 bg-pink-300"></div>
        <div className="icing w-full h-2 bg-white"></div>
        <div className="candle relative top-[-20px]">
          {lit && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, y: 10, scaleX: 0.8 }}
              animate={{ 
                opacity: 1, 
                scaleY: 1, 
                y: 0, 
                scaleX: 1,
              }}
              transition={{ 
                type: "spring",
                stiffness: 280,
                damping: 22,
                mass: 0.6,
              }}
              className="flame shadow-[0_0_20px_rgba(255,105,180,0.7)] rounded-full w-3 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400"
              style={{
                willChange: "transform, opacity",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
