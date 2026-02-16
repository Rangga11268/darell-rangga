"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth out the progress value
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-40 right-4 md:bottom-28 md:right-8 z-[90] cursor-pointer group"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ y: -5 }}
          onClick={scrollToTop}
        >
          {/* Progress Ring Container */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Background Circle */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 text-background"
              viewBox="0 0 36 36"
            >
              <path
                className="text-muted/30"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Progress Circle */}
              <motion.path
                className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="100, 100"
                style={{ pathLength: scrollProgress }}
              />
            </svg>

            {/* Inner Button */}
            <div
              className={cn(
                "absolute inset-[6px] rounded-full flex items-center justify-center transition-all duration-300 shadow-inner",
                "bg-background/80 backdrop-blur-sm border border-border",
                "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
              )}
            >
              <ArrowUp
                className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
                weight="bold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
