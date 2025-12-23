"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessengerPigeonProps {
  isSending: boolean;
}

export function MessengerPigeon({ isSending }: MessengerPigeonProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "returned">("idle");

  useEffect(() => {
    if (isSending) {
      setStatus("sending");
    } else if (status === "sending") {
      // Return much later to allow full fly away animation
      const timer = setTimeout(() => {
        setStatus("returned");
        setTimeout(() => setStatus("idle"), 2500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSending, status]);

  // Pigeon SVG Parts - More Realistic Design
  const PigeonBody = () => (
    <svg width="60" height="50" viewBox="0 0 60 50" className="drop-shadow-md">
      <defs>
        <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c4dff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00bfa5" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Legs (Pinkish) */}
      <path
        d="M28 42 L28 48 L26 50 M34 42 L34 48 L32 50"
        stroke="#ff8a80"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Tail (Dark Grey) */}
      <path d="M5 32 L0 38 L12 40 Z" fill="#424242" />
      {/* Body (Light Grey) */}
      <path
        d="M10 35 Q10 44 28 44 L42 44 Q56 44 58 28 Q58 12 42 12 L28 16 Q18 16 10 35 Z"
        fill="#cfd8dc"
      />
      {/* Neck Iridescence */}
      <path d="M42 12 Q48 16 46 22 Q40 24 38 18 Z" fill="url(#neckGradient)" />
      {/* Beak (Dark Grey + White cere) */}
      <path d="M57 19 L62 21 L57 23 Z" fill="#37474f" />
      <path d="M56 18 Q58 18 57 21" fill="#eceff1" /> {/* Cere */}
      {/* Head Details */}
      <circle cx="50" cy="19" r="2.5" fill="#ff7043" />{" "}
      {/* Eye Ring (Orange) */}
      <circle cx="50" cy="19" r="1" fill="#000" /> {/* Pupil */}
    </svg>
  );

  const Wing = ({ isFlapping = false }) => (
    <motion.svg
      width="38"
      height="30"
      viewBox="0 0 38 30"
      className="absolute top-[12px] left-[12px] origin-top-left"
      animate={
        isFlapping
          ? { rotate: [0, 25, -15, 0], scaleY: [1, 0.8, 1] }
          : { rotate: 0 }
      }
      transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
    >
      {/* Wing Shape (Grey with Wing Bars) */}
      <path
        d="M0 8 Q18 30 38 8 Q20 0 0 8 Z"
        fill="#b0bec5"
        stroke="#78909c"
        strokeWidth="1"
      />

      {/* Wing Bars (Black stripes) */}
      <path
        d="M15 18 Q25 22 30 15"
        stroke="#37474f"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M18 22 Q28 26 33 19"
        stroke="#37474f"
        strokeWidth="2"
        fill="none"
      />
    </motion.svg>
  );

  const Scroll = () => (
    <div className="absolute top-[35px] right-[5px] w-4 h-4 bg-yellow-100 border border-[#8d6e63] rounded-sm rotate-12 flex items-center justify-center transform scale-75">
      <div className="w-full h-[1px] bg-[#8d6e63] mb-[1px]"></div>
      <div className="w-2/3 h-[1px] bg-[#8d6e63]"></div>
      <div className="absolute -right-1 -top-1 w-2 h-2 bg-red-700 rounded-full border border-red-900"></div>
    </div>
  );

  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} // Simple fade out to transition to sending
            className="relative"
          >
            {/* Idle Animation: Bobbing and slight wing twitch */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <PigeonBody />
                <Wing isFlapping={false} />
                {/* Perch */}
                <div className="absolute top-[48px] left-[15px] w-[50px] h-[4px] bg-[#5d4037] rounded-full opacity-80" />
              </div>
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -left-8 bg-[#f4e4bc] border border-[#8d6e63] px-2 py-1 rounded-sm text-[10px] text-[#3e2723] whitespace-nowrap shadow-sm font-serif"
            >
              Ready for dispatch
            </motion.div>
          </motion.div>
        )}

        {status === "sending" && (
          <motion.div
            key="sending"
            initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={{
              x: [0, 50, 200, 800],
              y: [0, -50, -150, -600],
              rotate: [0, -10, -5, 0],
              scale: [1, 1, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              times: [0, 0.2, 0.5, 1],
              ease: "easeIn",
            }}
            className="relative"
          >
            <div className="relative transform -scale-x-100">
              {" "}
              {/* Flip to face fly direction (right) */}
              <PigeonBody />
              <Wing isFlapping={true} />
              <Scroll />
            </div>
            {/* Speed lines */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: [0, 1, 0], width: 100 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute top-1/2 right-full h-[2px] bg-white blur-[1px]"
            />
          </motion.div>
        )}

        {status === "returned" && (
          <motion.div
            key="returned"
            initial={{ x: -200, y: -100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <PigeonBody />
              <Wing />
              <div className="absolute -top-8 left-0 bg-green-100/90 border border-green-300 rounded-sm px-2 py-1 shadow-sm">
                <span className="text-[10px] font-bold text-green-700 font-serif">
                  Message Delivered!
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
