"use client";

import { motion } from "framer-motion";
import { TimeWidget } from "./time-widget";
import { TechStackWidget } from "./tech-stack-widget";
import { VisualizerWidget } from "./visualizer-widget";
import { GithubWidget } from "./github-widget";
import { SectionTitle } from "@/app/components/section-title";

export function CommandCenter() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          {/* Main Control Panel (GitHub Dashboard) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 flex flex-col gap-6"
          >
            {/* Header inside the HUD */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse box-shadow-green" />
                COMMAND CENTER
              </h2>
              <div className="text-xs font-mono text-muted-foreground">
                ONLINE // {new Date().getFullYear()}
              </div>
            </div>

            {/* GitHub Widget (Main Focus) */}
            <div className="flex-1 min-h-[400px]">
              <GithubWidget />
            </div>
          </motion.div>

          {/* Sidebar Panels (Time & Audio) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 flex flex-col gap-6 h-full"
          >
            {/* 1. Time Widget */}
            <div className="h-[200px]">
              <TimeWidget />
            </div>

            {/* 2. Visualizer (Visual candy) */}
            <div className="flex-1 min-h-[150px]">
              <VisualizerWidget />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
