"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to play on mount (will likely be blocked, but we try)
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    // Global click listener to unlock audio ("interaction" fallback)
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.error("Unlock failed", e));
      }
      // Remove listener once we've tried to unlock
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Manual play failed", e));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/ancient-wind-112528.mp3"
        loop
        preload="none"
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#f4e4bc] dark:bg-[#2c241b] text-[#3e2723] dark:text-[#d7ccc8] px-3 py-1 rounded-sm border border-[#8d6e63] text-xs font-serif shadow-lg pointer-events-none"
          >
            <span className="mr-1">Play Ambient</span>
            <span className="animate-pulse">♫</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className={`rounded-full w-12 h-12 border-2 shadow-xl transition-all duration-300 ${
          isPlaying
            ? "bg-[#c5a059] text-[#2c241b] border-[#c5a059] shadow-[#c5a059]/20"
            : "bg-[#1a1614] text-[#8d6e63] border-[#8d6e63] hover:border-[#c5a059] hover:text-[#c5a059]"
        }`}
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
      >
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Volume2 className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <VolumeX className="h-5 w-5" />
          </motion.div>
        )}

        {/* Orbiting particle when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-[#c5a059]/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Button>
    </div>
  );
}
