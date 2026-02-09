"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number; // 0.5 = half speed, -0.5 = reverse half speed
  className?: string;
}

export function ParallaxBackground({
  children,
  speed = 0.5,
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // subtle movement

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
