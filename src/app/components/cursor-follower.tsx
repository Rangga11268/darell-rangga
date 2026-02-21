"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash on mobile
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Optimized: Use event delegation instead of attaching listeners to every element
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-hover",
      );
      if (interactive) setLinkHovered(true);
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-hover",
      );
      if (interactive) setLinkHovered(false);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      // Event delegation is much more efficient than MutationObserver
      document.body.addEventListener("mouseover", handleOver);
      document.body.addEventListener("mouseout", handleOut);

      // Hide default cursor
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", checkMobile);
        document.body.removeEventListener("mouseover", handleOver);
        document.body.removeEventListener("mouseout", handleOut);
        document.documentElement.style.cursor = "auto";
        document.body.style.cursor = "auto";
      };
    } else {
      // Ensure default cursor is restored if switching to mobile view
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    }
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot - exact mouse position */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Ring - smooth follow */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: linkHovered ? 1 : 0.5,
          backgroundColor: linkHovered ? "white" : "transparent",
          color: linkHovered ? "black" : "transparent", // For potential text
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
