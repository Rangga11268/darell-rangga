"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TimeWidget() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !time) return null;

  return (
    <div className="relative h-full flex flex-col items-center justify-center p-6 bg-card/20 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/50 transition-colors duration-500">
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />

      {/* Time Display */}
      <motion.div
        key={time.getSeconds()}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        className="font-display font-bold text-5xl md:text-7xl tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50"
      >
        {time.toLocaleTimeString("en-US", { hour12: false })}
      </motion.div>

      {/* Date & Location */}
      <div className="mt-2 flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
        <span>{time.toLocaleDateString()}</span>
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        <span>JKT (GMT+7)</span>
      </div>

      {/* Uptime Simulation */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-primary/50">
        SYS.UPTIME:{" "}
        {Math.floor(
          typeof window !== "undefined" ? performance.now() / 1000 : 0
        )}
        s
      </div>
    </div>
  );
}
