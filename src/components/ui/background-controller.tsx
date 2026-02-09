"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundController() {
  const { scrollYProgress } = useScroll();

  // Interpolate background color based on scroll position
  // 0-20% (Hero): Default Background (usually dark/black)
  // 30-50% (About/Exp): Deep Purple Tint
  // 60-80% (Projects): Dark Blue Tint
  // 90-100% (Contact): Back to Default or Darker
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(10, 10, 10, 0)", // Top: Transparent (let base bg show)
      "rgba(20, 10, 30, 0.8)", // About: Deep Purple hint
      "rgba(10, 20, 40, 0.8)", // Projects: Deep Blue hint
      "rgba(20, 10, 20, 0.6)", // Skills: Mixed
      "rgba(5, 5, 5, 0.9)", // Bottom: Very Dark
    ],
  );

  return (
    <motion.div
      className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-500"
      style={{ backgroundColor }}
    />
  );
}
