"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinishing(true), 500);
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-display"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Minimal Name Reveal with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-foreground flex items-center gap-2"
            >
              Darell <span className="text-primary">Rangga</span>
            </motion.div>

            {/* Animated Loading Indicator (No Text) */}
            <div className="w-32 h-1 bg-muted overflow-hidden rounded-full relative">
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 100}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ opacity: 0.5 }}
              />
            </div>

            {/* Subtle Pulse Animation */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase"
            >
              Loading System
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
