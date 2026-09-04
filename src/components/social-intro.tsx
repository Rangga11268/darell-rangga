"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react";

export function SocialIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per browser tab session
    const hasSeen = sessionStorage.getItem("dr_social_splash");
    if (!hasSeen) {
      setVisible(true);
      sessionStorage.setItem("dr_social_splash", "1");
      const timer = setTimeout(() => {
        setVisible(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="social-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-zinc-950 text-white flex flex-col items-center justify-center select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.4,
            }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Social App Avatar Icon */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl p-1 bg-zinc-900">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/img/saya/saya1.webp"
                    alt="Darell Rangga"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-zinc-950 border border-white/20 text-white">
                <CheckCircle size={18} weight="fill" />
              </span>
            </div>

            {/* Handle & Title */}
            <h2 className="text-lg font-black tracking-tight font-display text-zinc-100 flex items-center gap-1.5">
              <span>Darell Rangga</span>
            </h2>
            <span className="text-xs font-mono text-zinc-400 mt-0.5">
              @darellrangga • dev feed
            </span>

            {/* Social App Native Loading Bar */}
            <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
