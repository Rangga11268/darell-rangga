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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-noise opacity-[0.05] mix-blend-overlay" />
      
      <div className="w-full max-w-2xl px-10 flex flex-col items-center relative z-10">
        {/* Editorial Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-caps text-[10px] tracking-[0.3em] text-primary/40 mb-12 flex items-center gap-4"
        >
          <span className="h-px w-8 bg-primary/20" />
          {language === "id" ? "EDISI DIGITAL" : "DIGITAL EDITION"}
          <span className="h-px w-8 bg-primary/20" />
        </motion.div>

        {/* Name Reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-primary text-center"
          >
            DARELL RANGGA
          </motion.h1>
        </div>

        {/* Progress Container */}
        <div className="w-48 h-[2px] bg-primary/10 relative overflow-hidden mb-6">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "0%" }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            className="absolute inset-0 bg-primary"
          />
        </div>

        {/* Subtitle / Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-[11px] font-bold label-caps text-primary tracking-[0.4em] flex items-center gap-3">
             <motion.span
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="w-1.5 h-1.5 rounded-full bg-primary"
             />
             {language === "id" ? "MENCETAK ARSIP..." : "PRINTING ARCHIVE..."}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2 }}
            className="text-[9px] font-mono uppercase tracking-widest text-primary italic"
          >
            {language === "id" ? "Mohon Tunggu Sebentar" : "Please Wait A Moment"}
          </motion.div>
        </motion.div>
      </div>

      {/* Aesthetic Border Frame */}
      <motion.div 
        initial={{ opacity: 0, inset: "2rem" }}
        animate={{ opacity: 1, inset: "1rem" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed pointer-events-none border hairline border-primary/10 z-20"
      />
    </motion.div>
  );
}
