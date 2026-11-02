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
      {/* 1. Base Minimalist Solid Canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? "bg-[#050508]" : "bg-[#fafafa]"
        }`}
      />

      {/* 2. Soft Ambient Top Spotlight (Paco / Rauno standard: zero lag, pure focus) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120, 119, 198, 0.12), transparent 100%),
              radial-gradient(circle 600px at 50% 10%, rgba(255, 255, 255, 0.02), transparent 70%)
            `
            : `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99, 102, 241, 0.05), transparent 100%),
              radial-gradient(circle 600px at 50% 10%, rgba(0, 0, 0, 0.015), transparent 70%)
            `,
        }}
      />

      {/* 3. Subtle Film Grain Texture (Poster Quality, 0 KB external asset) */}
      <div
        className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
          isDark ? "opacity-[0.035]" : "opacity-[0.02]"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Top Specular Hairline Edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.08), transparent)",
        }}
      />
    </div>
  );
}
