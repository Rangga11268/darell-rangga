"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "@/app/providers/language-provider";

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // Slightly longer for the progress animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -100,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Newspaper Grain/Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-multiply bg-noise" />
      
      {/* The Printing "Scanner" Line */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-10 pointer-events-none"
      />

      <div className="w-full max-w-4xl px-10 flex flex-col items-center relative z-20">
        {/* Top Editorial Bar */}
        <div className="w-full flex justify-between items-center mb-16 border-b-2 border-primary pb-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="label-caps text-[10px] font-bold"
          >
            VOL. 2025
          </motion.span>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="label-caps text-[12px] font-black tracking-[0.5em] text-center"
          >
            THE DAILY ARCHIVE
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="label-caps text-[10px] font-bold"
          >
            NO. 07
          </motion.span>
        </div>

        {/* Masthead Reveal - Dramatic Serif */}
        <div className="overflow-hidden mb-4 py-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-primary text-center leading-[0.8]"
          >
            DARELL RANGGA
          </motion.h1>
        </div>

        {/* Tagline Reveal */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="label-caps text-[12px] md:text-[14px] font-bold text-on-surface-variant mb-12 border-t hairline-t border-primary/20 pt-4 w-full text-center"
        >
          {language === "id" ? "PENGEMBANG FULLSTACK & KREATOR DIGITAL" : "FULLSTACK DEVELOPER & DIGITAL CRAFTSMAN"}
        </motion.div>

        {/* Progress & Printing Status */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="w-full h-[4px] bg-primary/5 relative overflow-hidden border hairline border-primary/10">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-y-0 left-0 bg-primary"
            />
          </div>
          
          <div className="flex items-center gap-4 text-[11px] font-bold label-caps tracking-[0.2em] text-primary">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-t-primary border-r-primary border-b-primary/10 border-l-primary/10 rounded-full"
            />
            <span className="animate-pulse">
              {language === "id" ? "MENGUMPULKAN ARSIP BERITA..." : "COLLECTING PRESS ARCHIVES..."}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Outer Border */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="fixed inset-4 border-4 border-double border-primary/20 pointer-events-none z-30"
      />
    </motion.div>
  );
}
