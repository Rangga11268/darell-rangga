"use client";

import { useEffect, useRef } from "react";

export function VisualizerWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const bars = 20;
    const barWidth = canvas.width / bars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get Primary Color from CSS variable for syncing with theme
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor =
        computedStyle.getPropertyValue("--primary").trim() || "#8b5cf6";

      // Since OKLCH isn't supported directly in Canvas fillStyle in all browsers yet (or properly parsed here from var),
      // we'll stick to a safe fallback or try to respect the theme if possible.
      // For now, let's use a purple-ish gradient that matches the default theme feel.

      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)"); // Violet
      gradient.addColorStop(1, "rgba(56, 189, 248, 0)"); // Cyan (transparent at top)

      ctx.fillStyle = gradient;

      for (let i = 0; i < bars; i++) {
        // Simulate random audio data
        const height =
          Math.random() * (canvas.height * 0.8) + canvas.height * 0.1;
        const x = i * barWidth;
        const y = canvas.height - height;

        // Draw bar
        ctx.fillRect(x, y, barWidth - 2, height);
      }

      // Slower animation frame rate or just run every frame
      // To make it less jittery, we could smooth it, but for "glitch" effect random is fine.
      // Let's throttle it slightly to 15fps for a retro feel?
      // For now, smooth 60fps is cleaner.

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-full w-full bg-card/10 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col justify-end overflow-hidden group hover:border-primary/50 transition-colors duration-500 relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          Audio Input
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}
