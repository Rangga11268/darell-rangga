"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, BookOpen, Calendar, Circle } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

interface HistoryItem {
  title?: string;
  company?: string;
  period: string;
  description: string;
  degree?: string;
  school?: string;
  logo?: string;
  tech?: string[];
}

interface TimelineItemProps {
  data: HistoryItem;
  index: number;
  type: "job" | "education";
}

const TimelineItem = ({ data, index, type }: TimelineItemProps) => {
  const isLeft = index % 2 === 0;
  const Icon = type === "job" ? Briefcase : BookOpen;
  const accentGradient =
    type === "job" ? "from-primary to-blue-600" : "from-purple-500 to-pink-500";
  const accentColor = type === "job" ? "text-primary" : "text-purple-400";
  const borderColor =
    type === "job" ? "border-primary/20" : "border-purple-500/20";

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-20 md:mb-32 ${isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Empty space for opposite side */}
      <div className="hidden md:block w-5/12" />

      {/* Axis Node - Enhanced Pulsing */}
      <div className="absolute left-4 md:left-1/2 -translate-x-[19px] md:-translate-x-1/2 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative z-10"
        >
          {/* Pulsing Outer Ring */}
          <div
            className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r ${accentGradient}`}
          />
          {/* Main Node */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-background`}
          >
            <Icon weight="bold" className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Content Card - Premium Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full pl-12 md:pl-0 md:w-5/12 perspective-1000"
      >
        <div
          className={`relative p-8 rounded-[2rem] bg-white/60 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 backdrop-blur-xl shadow-xl dark:shadow-2xl hover:shadow-primary/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-500 group overflow-hidden ${isLeft ? "md:text-left" : "md:text-left"}`}
        >
          {/* Cinematic Glow Effect */}
          <div
            className={`absolute -inset-0.5 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-700 bg-gradient-to-r ${accentGradient}`}
          />

          <div className="relative z-10">
            {/* Type Badge */}
            <div className={`flex items-center gap-2 mb-4`}>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-black/5 dark:bg-white/5 border ${borderColor} ${accentColor}`}
              >
                <Circle weight="fill" className="w-1.5 h-1.5" />
                {type === "job" ? "Experience" : "Education"}
              </span>
            </div>

            {/* Title & Role */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-colors">
              {type === "job" ? data.title : data.degree}
            </h3>

            <div className={`text-lg font-medium mb-4 ${accentColor}`}>
              {type === "job" ? data.company : data.school}
            </div>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6 uppercase tracking-wider">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/5 dark:bg-white/5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{data.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6 font-light">
              {data.description}
            </p>

            {/* Tech Stack Tags */}
            {data.tech && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                {data.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-bold text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function ExperienceSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const allItems = [
    ...t.about.history.jobs.map((item: HistoryItem) => ({
      ...item,
      type: "job" as const,
    })),
    ...t.about.history.schools.map((item: HistoryItem) => ({
      ...item,
      type: "education" as const,
    })),
  ];

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Modern Section Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.about.journeyTitle}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
          >
            {t.about.experience}{" "}
            <span className="text-muted-foreground">&</span> {t.about.education}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Thread */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-purple-500 to-blue-500 origin-top shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              style={{ scaleY, height: "100%" }}
            />
          </div>

          <div className="relative z-10">
            {allItems.map((item, index) => (
              <TimelineItem
                key={index}
                data={item}
                index={index}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
