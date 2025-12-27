"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";

export function LoadingScreen() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small delay at 100%
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      >
        <div className="w-64 space-y-4">
          {/* Logo / Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-end"
          >
            <span className="font-display font-bold text-2xl tracking-tighter">
              DARELL
            </span>
            <span className="font-mono text-xs text-primary">
              {Math.min(100, Math.round(progress))}%
            </span>
          </motion.div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            {progress < 100 ? t.loading.gathering : t.loading.sealBroken}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
