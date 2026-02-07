"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CodeBlock,
  MusicNotes,
  GameController,
  Lightning,
} from "@phosphor-icons/react";

import { useLanguage } from "@/app/providers/language-provider";

type Activity = "coding" | "listening" | "gaming";

export function LiveStatusWidget() {
  const { t } = useLanguage();
  const [currentActivity, setCurrentActivity] = useState(0);

  const ACTIVITIES: {
    id: Activity;
    icon: React.ElementType;
    label: string;
    detail: string;
    color: string;
  }[] = [
    {
      id: "coding",
      icon: CodeBlock,
      label: t.commandCenter.status.coding,
      detail: "B-Side Project",
      color: "text-blue-400",
    },
    {
      id: "listening",
      icon: MusicNotes,
      label: t.commandCenter.status.listening,
      detail: "Metalcore Mix",
      color: "text-green-400",
    },
    {
      id: "gaming",
      icon: GameController,
      label: t.commandCenter.status.gaming,
      detail: "FC 25",
      color: "text-purple-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % ACTIVITIES.length);
    }, 8000); // Simulate status change every 8 seconds

    return () => clearInterval(interval);
  }, [ACTIVITIES.length]);

  const activity = ACTIVITIES[currentActivity];

  return (
    <div className="h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
      {/* Pulse Indicator */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {t.commandCenter.status.title}
        </span>
        <Lightning className="w-3 h-3 text-yellow-500/50" weight="duotone" />
      </div>

      {/* Content Transition */}
      <div className="relative h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 absolute inset-0"
          >
            <div
              className={`p-2 rounded-lg bg-white/5 border border-white/5 ${activity.color}`}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">
                {activity.label}
              </div>
              <div className="text-sm font-bold text-white tracking-wide">
                {activity.detail}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    </div>
  );
}
