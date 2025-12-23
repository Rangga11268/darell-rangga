"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Compass, Scroll, Gem } from "lucide-react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        // Randomize speed for "organic" feel
        return prev + Math.random() * 8;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsLoading(false);
  };

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 bg-[#0c0a09] z-[100] flex items-center justify-center overflow-hidden"
      >
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 bg-[url('/img/BgExample.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>

        <div className="flex flex-col items-center relative z-10 p-10">
          {/* Main Ancient Seal Container */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-12">
            {/* Outer Rotating Runes Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-[#8d6e63]/30 rounded-full flex items-center justify-center p-2"
            >
              <div className="w-full h-full border-[1px] border-dashed border-[#8d6e63]/50 rounded-full"></div>
            </motion.div>

            {/* Counter-Rotating Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-[1px] border-[#c5a059]/20 rounded-full flex items-center justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c5a059]">
                <Star size={12} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[#c5a059]">
                <Star size={12} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c5a059]">
                <Star size={12} />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[#c5a059]">
                <Star size={12} />
              </div>
            </motion.div>

            {/* Glowing Center Core */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  "0 0 20px rgba(197, 160, 89, 0.2)",
                  "0 0 40px rgba(197, 160, 89, 0.5)",
                  "0 0 20px rgba(197, 160, 89, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 bg-[#c5a059]/10 rounded-full border border-[#c5a059] flex items-center justify-center backdrop-blur-sm relative cursor-pointer"
              onClick={isReady ? handleEnter : undefined}
              whileHover={isReady ? { scale: 1.05 } : {}}
              whileTap={isReady ? { scale: 0.95 } : {}}
            >
              <Gem className="text-[#c5a059] w-12 h-12 stroke-[1px]" />

              {/* Orbital Particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="w-2 h-2 bg-[#d4af37] rounded-full absolute top-2 left-1/2 -translate-x-1/2 shadow-lg shadow-[#d4af37]"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-sans text-[#d4c5a9] tracking-[0.2em] font-bold uppercase drop-shadow-md">
              {isReady ? "Seal Broken" : "Unsealing Artifacts"}
            </h2>

            <AnimatePresence mode="wait">
              {isReady ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={handleEnter}
                  className="px-8 py-2 bg-[#c5a059] text-[#2c241b] rounded-sm font-serif font-bold tracking-widest hover:bg-[#d4af37] transition-colors border border-[#8d6e63] shadow-lg animate-pulse"
                >
                  ENTER REALM
                </motion.button>
              ) : (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 justify-center text-[#8d6e63] font-serif italic text-sm"
                >
                  <Scroll size={14} />
                  <span>Gathering mana... {Math.round(progress)}%</span>
                  <Compass size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar (Mana Bar) */}
          {!isReady && (
            <div className="w-64 h-1 bg-[#2c241b] rounded-full mt-8 overflow-hidden border border-[#5d4037]/50 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8d6e63] via-[#c5a059] to-[#d4af37]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-shimmer"></div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
