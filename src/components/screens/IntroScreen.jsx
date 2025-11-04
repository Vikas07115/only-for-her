"use client"

import GradientButton from "../GradientButton"
import { Gift } from "lucide-react"
import { motion } from "framer-motion"

export default function IntroScreen({ onNext }) {
    return (
       <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-[#3a015c] via-[#62007e] to-[#200047] overflow-hidden">

            
            {/* Animated neon elements */}
            <div className="absolute w-72 h-72 rounded-full bg-pink-500 opacity-20 animate-float1 -top-16 -left-16 blur-2xl"></div>
            <div className="absolute w-60 h-60 rounded-full bg-purple-500 opacity-25 animate-float2 top-10 right-10 blur-2xl"></div>
            <div className="absolute w-40 h-40 rounded-full bg-cyan-400 opacity-30 animate-float3 bottom-20 left-20 blur-xl"></div>
            <div className="absolute w-48 h-48 rounded-full bg-rose-400 opacity-20 animate-float4 bottom-10 right-36 blur-xl"></div>
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-80 animate-twinkle top-1/4 left-1/3"></div>
            <div className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-70 animate-twinkle top-1/2 left-1/4"></div>
            <div className="absolute w-5 h-5 bg-purple-300 rounded-full opacity-60 animate-twinkle top-2/3 right-1/3"></div>

            {/* Main content */}
            <motion.div
                className="relative flex flex-col items-center gap-10 z-10 px-4"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: "transform, opacity" }}
            >
                <motion.img
                    src="/gifs/intro.gif"
                    alt="Birthday Animation"
                    className="w-36 h-36 md:w-48 md:h-48 rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.7)] animate-spin-slow hover:animate-bounce"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.9 }}
                    style={{ willChange: "transform, opacity" }}
                />

                <div className="text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold text-pink-400 drop-shadow-[0_0_20px_rgba(255,105,180,0.7)] tracking-tight animate-pulse"
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        🎉 For the one who makes my heart smile every day 💕 🌸
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xl md:text-2xl text-purple-300 italic animate-[wiggle_1.5s_ease-in-out_infinite]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        A sparkling surprise awaits… ✨🍭
                    </motion.p>
                </div>

                <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.9, delay: 0.2 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <GradientButton
                        onClick={() => onNext?.()}
                        className="px-8 py-4 text-xl rounded-full shadow-[0_0_30px_rgba(255,105,180,0.6)] hover:scale-110 hover:shadow-[0_0_50px_rgba(255,105,180,0.9)] transition-all duration-300 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-300 text-white font-bold"
                    >
                        <Gift size={24} className="mr-2" />
                        Unwrap the Magic
                    </GradientButton>
                </motion.div>
            </motion.div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg); }
                    50% { transform: rotate(3deg); }
                }
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(25px) translateX(15px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(-10px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(20px) translateX(20px); }
                }
                @keyframes float4 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-25px) translateX(15px); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .animate-[wiggle_1.5s_ease-in-out_infinite] {
                    animation: wiggle 1.5s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin 12s linear infinite;
                }
                .animate-float1 {
                    animation: float1 6s ease-in-out infinite alternate;
                }
                .animate-float2 {
                    animation: float2 5s ease-in-out infinite alternate;
                }
                .animate-float3 {
                    animation: float3 7s ease-in-out infinite alternate;
                }
                .animate-float4 {
                    animation: float4 6.5s ease-in-out infinite alternate;
                }
                .animate-twinkle {
                    animation: twinkle 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
