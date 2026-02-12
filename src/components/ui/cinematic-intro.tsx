"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "@/app/providers/language-provider";

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Fixed duration intro instead of percentage calculation
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // Intro duration ~2.8s

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }, // Cinematic "Curtain Up"
      }}
    >
      <div className="w-full max-w-2xl px-10 flex flex-col items-center">
        {/* Name Reveal - Staggered & Explicit White */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1], // Elegant cubic bezier
            }}
            className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white text-center"
          >
            DARELL RANGGA
          </motion.h1>
        </div>

        {/* Separator Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          className="h-[2px] w-32 bg-white/20 mb-8"
        />

        {/* Subtitle - Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-sm md:text-base font-mono uppercase text-white/60 tracking-[0.5em]"
        >
          {language === "id" ? "MEMUAT PORTOFOLIO" : "LOADING PORTFOLIO"}
        </motion.div>
      </div>
    </motion.div>
  );
}
