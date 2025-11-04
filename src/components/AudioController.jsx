"use client"

import { useEffect, useRef, useState } from "react"

export default function AudioController() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const unmuteOnInteraction = () => {
      if (!audioRef.current) return
      audioRef.current.muted = false
      audioRef.current.volume = 1
      window.removeEventListener("pointerdown", unmuteOnInteraction)
      window.removeEventListener("touchstart", unmuteOnInteraction)
      window.removeEventListener("click", unmuteOnInteraction)
      window.removeEventListener("keydown", unmuteOnInteraction)
    }

    const tryPlayOnInteraction = () => {
      if (!audioRef.current) return
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        window.removeEventListener("pointerdown", tryPlayOnInteraction)
        window.removeEventListener("touchstart", tryPlayOnInteraction)
        window.removeEventListener("click", tryPlayOnInteraction)
        window.removeEventListener("keydown", tryPlayOnInteraction)
      }).catch(() => {
        // Still blocked; keep listeners for next interaction
      })
    }

    // attempt autoplay immediately, but do NOT remove listeners on failure
    if (audioRef.current) {
      // Start muted to maximize autoplay support on mobile
      audioRef.current.muted = true
      audioRef.current.volume = 0
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // blocked; will wait for user interaction
      })
    }

    // Any interaction will both try to play (if needed) and unmute
    window.addEventListener("pointerdown", tryPlayOnInteraction)
    window.addEventListener("touchstart", tryPlayOnInteraction)
    window.addEventListener("click", tryPlayOnInteraction)
    window.addEventListener("keydown", tryPlayOnInteraction)

    window.addEventListener("pointerdown", unmuteOnInteraction)
    window.addEventListener("touchstart", unmuteOnInteraction)
    window.addEventListener("click", unmuteOnInteraction)
    window.addEventListener("keydown", unmuteOnInteraction)
    return () => {
      window.removeEventListener("pointerdown", tryPlayOnInteraction)
      window.removeEventListener("touchstart", tryPlayOnInteraction)
      window.removeEventListener("click", tryPlayOnInteraction)
      window.removeEventListener("keydown", tryPlayOnInteraction)
      window.removeEventListener("pointerdown", unmuteOnInteraction)
      window.removeEventListener("touchstart", unmuteOnInteraction)
      window.removeEventListener("click", unmuteOnInteraction)
      window.removeEventListener("keydown", unmuteOnInteraction)
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src="/song.m4a" preload="auto" loop playsInline />
    </>
  )
}


