"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SocialIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per browser tab session
    const hasSeen = sessionStorage.getItem("dr_social_splash");
    if (!hasSeen) {
      setVisible(true);
      sessionStorage.setItem("dr_social_splash", "1");
      const timer = setTimeout(() => {
        setVisible(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="executive-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center select-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-xs text-center px-4"
          >
            {/* Minimalist Monogram / Logo Mark */}
            <div className="relative w-12 h-12 rounded-2xl bg-card border border-border/80 p-2 shadow-xs mb-5 flex items-center justify-center">
              <Image
                src="/img/saya/logo-new.webp"
                alt="Darell Rangga Logo"
                fill
                priority
                className="object-contain p-1.5 dark:invert-0 invert"
              />
            </div>

            {/* Typography: Precision Kerning, Zero Slop */}
            <h1 className="text-sm font-extrabold tracking-[0.2em] uppercase font-display text-foreground leading-tight">
              Darell Rangga
            </h1>
            <p className="text-[11px] font-mono text-muted-foreground tracking-wider mt-1 uppercase">
              Fullstack Software Engineer
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-1.5 mt-3.5 px-2.5 py-1 rounded-full bg-muted/50 border border-border/60 text-[10px] font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire • Bekasi, ID</span>
            </div>

            {/* Architectural Hairline Progress Loader */}
            <div className="w-28 h-[1.5px] bg-border/60 rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-foreground rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
