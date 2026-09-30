"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function BackgroundController() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
      
      {/* 1. Base Gradient Canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-[#08090d]"
            : "bg-gradient-to-b from-[#fbfbfe] via-[#f5f6fa] to-[#eceef5]"
        }`}
      />

      {/* 2. Ambient Aurora Orbs (macOS Glow Effect) */}
      {isDark ? (
        // DARK MODE: Rich Cyber/Aurora Glows
        <>
          {/* Top-Left Violet Aurora */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.45, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/25 via-purple-600/20 to-transparent blur-[130px] transform-gpu"
          />

          {/* Top-Right Emerald/Cyan Tech Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.42, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[5%] -right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-emerald-500/20 via-teal-500/15 to-transparent blur-[140px] transform-gpu"
          />

          {/* Center-Left Blue Precision Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.3, 0.2], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[45%] -left-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/15 via-indigo-500/10 to-transparent blur-[150px] transform-gpu"
          />

          {/* Bottom-Right Warm Amber / Crimson Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[10%] right-[5%] w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-amber-600/15 via-rose-600/10 to-transparent blur-[160px] transform-gpu"
          />
        </>
      ) : (
        // LIGHT MODE: Crisp Architectural macOS Paper with Radiant Pastel Glows
        <>
          {/* Top-Left Sky Blue Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.45, 0.6, 0.45], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/20 via-blue-300/15 to-transparent blur-[120px] transform-gpu"
          />

          {/* Top-Right Violet/Lavender Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.55, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[10%] -right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-400/18 via-indigo-300/12 to-transparent blur-[130px] transform-gpu"
          />

          {/* Center-Bottom Soft Emerald Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[50%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent blur-[140px] transform-gpu"
          />

          {/* Bottom-Right Soft Peach / Amber Refraction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-amber-300/20 via-orange-200/15 to-transparent blur-[150px] transform-gpu"
          />
        </>
      )}

      {/* 3. High-Precision macOS Dot Matrix Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.4) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* 4. Subtle Radial Spotlight Follower (Center Depth Vignette) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle 800px at 50% 20%, rgba(255,255,255,0.03), transparent 70%)"
            : "radial-gradient(circle 800px at 50% 20%, rgba(255,255,255,0.8), transparent 70%)",
        }}
      />

    </div>
  );
}
