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

    const handleLinkHoverEvents = () => {
      // Select all interactive elements
      const selectors =
        "a, button, input, textarea, select, [role='button'], .cursor-hover";
      document.querySelectorAll(selectors).forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      handleLinkHoverEvents();
      // Observer for dynamic content (modals, new elements)
      const observer = new MutationObserver(handleLinkHoverEvents);
      observer.observe(document.body, { childList: true, subtree: true });

      // Hide default cursor
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", checkMobile);
        observer.disconnect();
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
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Ring - smooth follow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[9998] pointer-events-none bg-primary/5"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 2 : 1,
          borderColor: linkHovered ? "transparent" : "var(--primary)",
          backgroundColor: linkHovered ? "var(--primary)" : "transparent",
          opacity: 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
