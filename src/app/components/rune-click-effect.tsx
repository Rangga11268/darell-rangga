"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export function RuneClickEffect() {
  const [clicks, setClicks] = useState<ClickEffect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);

      // Cleanup to prevent memory leaks
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 1, scale: 0.2, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.5, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-24 h-24 -ml-12 -mt-12 flex items-center justify-center"
            style={{ left: click.x, top: click.y }}
          >
            {/* Rune Ring */}
            <div className="absolute inset-0 border-2 border-[#ffd700] rounded-full opacity-60" />
            <div className="absolute inset-2 border border-[#c5a059] rounded-full border-dashed opacity-40" />

            {/* Center Glow */}
            <div className="w-2 h-2 bg-[#ffd700] rounded-full blur-[2px] shadow-[0_0_10px_#ffd700]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
