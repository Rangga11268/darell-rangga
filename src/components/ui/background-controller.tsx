"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function BackgroundController() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (resolvedTheme || theme || "dark") : "dark";
  const isDark = currentTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Base Deep Canvas Background */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark ? "bg-[#080911]" : "bg-[#f6f7fb]"
        }`}
      />

      {/* 2. Custom Bespoke macOS Vector Waves & Glowing Ribbons */}
      {isDark ? (
        // DARK MODE: Deep Obsidian & Cyber Wave Sculptures
        <div className="absolute inset-0 transition-opacity duration-700 opacity-100">
          
          {/* Ambient Luminescent Spotlights (Depth Glows) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle 800px at 15% 15%, rgba(99, 102, 241, 0.22), transparent 70%),
                radial-gradient(circle 750px at 85% 25%, rgba(16, 185, 129, 0.18), transparent 65%),
                radial-gradient(circle 900px at 70% 85%, rgba(168, 85, 247, 0.15), transparent 70%),
                radial-gradient(circle 600px at 10% 75%, rgba(14, 165, 233, 0.16), transparent 65%)
              `,
            }}
          />

          {/* Mathematical Multi-layered Vector Ribbon Waves */}
          <svg
            className="absolute inset-0 w-full h-full object-cover"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Wave Gradient 1: Deep Indigo to Violet Ribbon */}
              <linearGradient id="darkWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#311042" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>

              {/* Wave Gradient 2: Emerald-Cyan Flow Ribbon */}
              <linearGradient id="darkWave2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#0f766e" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0.75" />
              </linearGradient>

              {/* Wave Gradient 3: Obsidian Surface Layer */}
              <linearGradient id="darkWave3" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#131522" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#0d0e17" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#06070c" stopOpacity="0.95" />
              </linearGradient>

              {/* Specular Edge Line Gradients */}
              <linearGradient id="darkStroke1" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="darkStroke2" x1="100%" y1="20%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
              </linearGradient>

              <linearGradient id="darkStroke3" x1="0%" y1="30%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Layer 1: Background Deep Violet Ribbon */}
            <path
              d="M-100 0 C 300 220, 600 50, 1100 280 C 1300 380, 1500 250, 1600 300 L 1600 0 Z"
              fill="url(#darkWave1)"
            />
            <path
              d="M-100 0 C 300 220, 600 50, 1100 280 C 1300 380, 1500 250, 1600 300"
              stroke="url(#darkStroke1)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Layer 2: Middle Cascading Teal/Cyan Wave Ribbon */}
            <path
              d="M1600 900 C 1200 650, 950 820, 550 580 C 250 400, 100 550, -100 480 L -100 900 Z"
              fill="url(#darkWave2)"
            />
            <path
              d="M1600 900 C 1200 650, 950 820, 550 580 C 250 400, 100 550, -100 480"
              stroke="url(#darkStroke2)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Layer 3: Foreground Sculptural S-Curve Obsidian Wave */}
            <path
              d="M-50 950 C 200 600, 450 780, 800 480 C 1100 240, 1350 420, 1550 200 L 1550 950 Z"
              fill="url(#darkWave3)"
            />
            <path
              d="M-50 950 C 200 600, 450 780, 800 480 C 1100 240, 1350 420, 1550 200"
              stroke="url(#darkStroke3)"
              strokeWidth="1.75"
              fill="none"
            />

            {/* Elegant Ambient Accent Crest Wave */}
            <path
              d="M100 900 C 400 450, 700 650, 1200 350 C 1400 230, 1500 260, 1600 180"
              stroke="url(#darkStroke1)"
              strokeWidth="1"
              strokeDasharray="6 4"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>
        </div>
      ) : (
        // LIGHT MODE: Crisp Architectural Silver, Titanium & Champagne Waves
        <div className="absolute inset-0 transition-opacity duration-700 opacity-100">
          
          {/* Ambient Soft Daylight Glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle 800px at 15% 15%, rgba(99, 102, 241, 0.12), transparent 70%),
                radial-gradient(circle 750px at 85% 25%, rgba(20, 184, 166, 0.10), transparent 65%),
                radial-gradient(circle 900px at 70% 85%, rgba(245, 158, 11, 0.08), transparent 70%),
                radial-gradient(circle 600px at 10% 75%, rgba(59, 130, 246, 0.10), transparent 65%)
              `,
            }}
          />

          {/* Mathematical Multi-layered Vector Ribbon Waves in Light Mode */}
          <svg
            className="absolute inset-0 w-full h-full object-cover"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Wave Gradient 1: Soft Lavender to Sky Mist */}
              <linearGradient id="lightWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.8" />
              </linearGradient>

              {/* Wave Gradient 2: Warm Champagne / Titanium Wave */}
              <linearGradient id="lightWave2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#ccfbf1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.75" />
              </linearGradient>

              {/* Wave Gradient 3: Translucent Frosted Paper Wave */}
              <linearGradient id="lightWave3" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#f8f9fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#eef2f6" stopOpacity="0.9" />
              </linearGradient>

              {/* Specular Edge Line Gradients */}
              <linearGradient id="lightStroke1" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="lightStroke2" x1="100%" y1="20%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="lightStroke3" x1="0%" y1="30%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Layer 1: Background Soft Lavender Ribbon */}
            <path
              d="M-100 0 C 300 220, 600 50, 1100 280 C 1300 380, 1500 250, 1600 300 L 1600 0 Z"
              fill="url(#lightWave1)"
            />
            <path
              d="M-100 0 C 300 220, 600 50, 1100 280 C 1300 380, 1500 250, 1600 300"
              stroke="url(#lightStroke1)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Layer 2: Middle Champagne/Teal Wave Ribbon */}
            <path
              d="M1600 900 C 1200 650, 950 820, 550 580 C 250 400, 100 550, -100 480 L -100 900 Z"
              fill="url(#lightWave2)"
            />
            <path
              d="M1600 900 C 1200 650, 950 820, 550 580 C 250 400, 100 550, -100 480"
              stroke="url(#lightStroke2)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Layer 3: Foreground Sculptural Frosted Wave */}
            <path
              d="M-50 950 C 200 600, 450 780, 800 480 C 1100 240, 1350 420, 1550 200 L 1550 950 Z"
              fill="url(#lightWave3)"
            />
            <path
              d="M-50 950 C 200 600, 450 780, 800 480 C 1100 240, 1350 420, 1550 200"
              stroke="url(#lightStroke3)"
              strokeWidth="1.75"
              fill="none"
            />
          </svg>
        </div>
      )}


      {/* 4. Top Specular Edge Horizon Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.6), rgba(52, 211, 153, 0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.35), rgba(20, 184, 166, 0.35), transparent)",
        }}
      />
    </div>
  );
}
