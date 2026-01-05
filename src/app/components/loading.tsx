"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING RANGGA-OS V3.0.0...",
  "CHECKING HARDWARE INTEGRITY... [OK]",
  "LOADING NEURAL INTERFACE... [OK]",
  "BYPASSING SECURITY FIREWALL... [DONE]",
  "ESTABLISHING SECURE CONNECTION...",
  "MOUNTING VIRTUAL FILE SYSTEM... [OK]",
  "ACCESS GRANTED. WELCOME, USER.",
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // 1. Progress Bar Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);

    // 2. Sys Logs Logic
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsFinishing(true), 800);
      }
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
        >
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="w-full max-w-lg space-y-8 relative z-10">
            {/* BIOS Header */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-primary text-[10px] md:text-xs">
                <span>RANGGA-AI BIOS (C) 2026</span>
                <span>SERIAL: DA-77-RP-11</span>
              </div>
              <div className="h-[2px] w-full bg-primary/20" />
            </div>

            {/* Terminal Logs */}
            <div className="space-y-2 h-40 overflow-hidden">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs md:text-sm text-green-500/80 flex items-center gap-2"
                >
                  <span className="text-primary/50">{">"}</span>
                  {log}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-primary inline-block"
              />
            </div>

            {/* Bottom Section: Progress & Logo */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 block">
                    SYSTEM BOOT PROGRESS
                  </span>
                  <div className="font-bold text-xl md:text-2xl text-white tracking-widest uppercase">
                    Darell <span className="text-primary">Rangga</span>
                  </div>
                </div>
                <span className="text-2xl font-bold font-mono text-primary">
                  {Math.min(100, Math.round(progress))}%
                </span>
              </div>

              {/* Futuristic Progress Bar */}
              <div className="h-2 w-full bg-white/5 rounded-none p-[2px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/50 to-primary relative shadow-[0_0_10px_var(--primary)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                >
                  <div className="absolute top-0 right-0 w-1 h-full bg-white shadow-[0_0_15px_#fff]" />
                </motion.div>
              </div>

              <div className="text-[10px] text-center text-white/20 uppercase tracking-[0.3em]">
                Initializing Neural Interface ...
              </div>
            </div>
          </div>

          {/* Grain Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
