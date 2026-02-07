"use client";

import { motion } from "framer-motion";
import { User } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { useRef } from "react";

export function BioSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Modern Skills Marquee - Horizontal Scrolling */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-4 border-b border-foreground/10">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND CSS",
            "LARAVEL",
            "NODE.JS",
            "MONGODB",
            "VUE.JS",
            "INERTIA.JS",
            "FRAMER MOTION",
            "ZUSTAND",
            "SOCKET.IO",
            "FIGMA",
            "VERCEL",
            "VITE",
            "GIT",
            "GLASSMORPHISM",
            "NEO BRUTALISM",
          ].map((skill, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/40 dark:text-foreground/15 flex items-center gap-6"
            >
              {skill} <span className="text-primary text-lg">✦</span>
            </span>
          ))}
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND CSS",
            "LARAVEL",
            "NODE.JS",
            "MONGODB",
            "VUE.JS",
            "INERTIA.JS",
            "FRAMER MOTION",
            "ZUSTAND",
            "SOCKET.IO",
            "FIGMA",
            "VERCEL",
            "VITE",
            "GIT",
            "GLASSMORPHISM",
            "NEO BRUTALISM",
          ].map((skill, i) => (
            <span
              key={`dup-${i}`}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/40 dark:text-foreground/15 flex items-center gap-6"
            >
              {skill} <span className="text-primary text-lg">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Title Area */}
          <div className="md:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <User className="w-4 h-4" />
              <span>{t.about.title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
              {t.about.journeyTitle}
            </h2>
          </div>

          {/* Text Content */}
          <div className="md:w-2/3 prose dark:prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.journeyText}
            </p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
              {t.about.journeyDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
