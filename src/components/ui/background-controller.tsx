"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function BackgroundController() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default dark styling prior to mount to prevent hydration flash
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Base Canvas Background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? "bg-[#08090f]" : "bg-[#f8f9fc]"
        }`}
      />

      {/* 2. Zero-Lag Static Hardware-Accelerated Cyber Aurora Ambient Gradients */}
      {isDark ? (
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `
              radial-gradient(circle 900px at 50% -100px, rgba(99, 102, 241, 0.24), transparent 70%),
              radial-gradient(circle 700px at 95% 20%, rgba(16, 185, 129, 0.16), transparent 60%),
              radial-gradient(circle 750px at 5% 55%, rgba(59, 130, 246, 0.16), transparent 60%),
              radial-gradient(circle 800px at 85% 90%, rgba(245, 158, 11, 0.12), transparent 65%)
            `,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `
              radial-gradient(circle 900px at 50% -100px, rgba(99, 102, 241, 0.15), transparent 70%),
              radial-gradient(circle 700px at 95% 20%, rgba(20, 184, 166, 0.12), transparent 60%),
              radial-gradient(circle 750px at 5% 55%, rgba(168, 85, 247, 0.10), transparent 60%),
              radial-gradient(circle 800px at 85% 90%, rgba(249, 115, 22, 0.08), transparent 65%)
            `,
          }}
        />
      )}

      {/* 3. Ultra-Crisp macOS Dot Matrix Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.16) 1.2px, transparent 1.2px)"
            : "radial-gradient(rgba(15, 23, 42, 0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* 4. Top Horizon Edge Line Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), rgba(16, 185, 129, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), rgba(20, 184, 166, 0.3), transparent)",
        }}
      />
    </div>
  );
}
