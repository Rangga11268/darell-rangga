"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
      {/* 1. Base Canvas Tone */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? "bg-[#07080e]" : "bg-[#f5f6fa]"
        }`}
      />

      {/* 2. Official macOS Dark Mode Silk Architectural Wave Wallpaper */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/wallpaper/macos-dark.png"
          alt="macOS Pro Studio Wallpaper Dark"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform-gpu scale-[1.02]"
        />
        {/* Deep Obsidian Overlay to ensure 100% WCAG AAA Text Contrast */}
        <div className="absolute inset-0 bg-[#07080f]/50 backdrop-contrast-[1.05]" />
      </div>

      {/* 3. Official macOS Light Mode Champagne Titanium Wave Wallpaper */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          !isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/wallpaper/macos-light.png"
          alt="macOS Pro Studio Wallpaper Light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform-gpu scale-[1.02]"
        />
        {/* Soft Crisp Glaze Overlay to ensure perfect typography legibility */}
        <div className="absolute inset-0 bg-white/45 backdrop-contrast-[1.02]" />
      </div>

      {/* 4. Precision macOS Dot Matrix Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.14) 1.1px, transparent 1.1px)"
            : "radial-gradient(rgba(15, 23, 42, 0.10) 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* 5. Top Specular Edge Horizon Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.4), rgba(167, 139, 250, 0.4), transparent)"
            : "linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.3), rgba(99, 102, 241, 0.3), transparent)",
        }}
      />
    </div>
  );
}
