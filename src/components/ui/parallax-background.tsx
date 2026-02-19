"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({
  children,
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Always call hooks unconditionally — React rules of hooks
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {isMobile ? (
        // Mobile: static, no GPU layer
        <div className="absolute inset-0 w-full h-full">{children}</div>
      ) : (
        // Desktop: subtle parallax
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          {children}
        </motion.div>
      )}
    </div>
  );
}
