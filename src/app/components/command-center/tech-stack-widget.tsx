"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Database, Globe, Layers } from "lucide-react";

const modules = [
  {
    name: "Next.js 15 (App Router)",
    status: "OPERATIONAL",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    name: "React 19 (RC)",
    status: "OPTIMIZED",
    icon: Cpu,
    color: "text-cyan-400",
  },
  {
    name: "Tailwind CSS v4",
    status: "STABLE",
    icon: Layers,
    color: "text-purple-400",
  },
  {
    name: "Framer Motion 11",
    status: "ANIMATING",
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    name: "PostgreSQL / Prisma",
    status: "CONNECTED",
    icon: Database,
    color: "text-emerald-400",
  },
];

export function TechStackWidget() {
  return (
    <div className="h-full bg-card/10 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col relative overflow-hidden group">
      {/* Scanning Line Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-primary/30 z-10"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          Core Modules
        </h3>
        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <mod.icon className={`w-4 h-4 ${mod.color}`} />
              <span className="text-xs font-bold text-foreground/80">
                {mod.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground">
                {mod.status}
              </span>
              <div className="w-1 h-3 bg-primary/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative footer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>MEM: 64GB</span>
        <span>CPU: 12%</span>
      </div>
    </div>
  );
}
