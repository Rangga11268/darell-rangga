"use client";

import { useState, useEffect } from "react";

/**
 * Returns true if the device is mobile/tablet (touch device or screen < 768px).
 * Defaults to true on first render to prevent hydration flash on mobile.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };

    check();

    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", check);
    window.addEventListener("resize", check);

    return () => {
      mq.removeEventListener("change", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return isMobile;
}
