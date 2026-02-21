"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
  trigger?: "hover" | "always";
  active?: boolean;
}

export function TextScramble({
  text,
  className,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  speed = 50,
  trigger = "hover",
  active = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling || !active) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3; // Controls how fast it resolves
    }, speed);
  }, [text, characters, speed, isScrambling]);

  // Auto trigger on mount if 'always'
  useEffect(() => {
    if (trigger === "always" && active) {
      scramble();
    }
  }, [trigger, scramble, active]);

  return (
    <motion.span
      className={cn(
        "inline-block whitespace-pre-wrap cursor-default",
        className,
      )}
      onHoverStart={trigger === "hover" ? scramble : undefined}
      onClick={scramble}
    >
      {displayText}
    </motion.span>
  );
}
