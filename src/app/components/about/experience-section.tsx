/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, BookOpen, Calendar, MapPin } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

interface TimelineItemProps {
  data: any;
  index: number;
  type: "job" | "education";
}

const TimelineItem = ({ data, index, type }: TimelineItemProps) => {
  const isLeft = index % 2 === 0;
  const Icon = type === "job" ? Briefcase : BookOpen;

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-16 md:mb-24 ${isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Empty space for opposite side */}
      <div className="hidden md:block w-5/12" />

      {/* Axis Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-[19px] md:-translate-x-1/2 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`w-10 h-10 rounded-full border-4 border-background flex items-center justify-center z-10 shadow-lg ${
            type === "job"
              ? "bg-primary text-black"
              : "bg-purple-500 text-white"
          }`}
        >
          <Icon weight="bold" className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full pl-12 md:pl-0 md:w-5/12"
      >
        <div
          className={`relative p-8 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-md shadow-xl hover:bg-card/60 transition-colors duration-300 group ${isLeft ? "md:text-left" : "md:text-left"}`}
        >
          {/* Card Glow */}
          <div
            className={`absolute -inset-0.5 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${type === "job" ? "bg-primary" : "bg-purple-500"}`}
          />

          <div className="relative">
            <span
              className={`inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 border border-white/10 ${type === "job" ? "text-primary" : "text-purple-400"}`}
            >
              {type === "job" ? "Experience" : "Education"}
            </span>

            <h3 className="text-2xl font-bold font-display text-foreground mb-1">
              {type === "job" ? data.title : data.degree}
            </h3>

            <div
              className={`text-lg font-medium mb-4 ${type === "job" ? "text-primary" : "text-purple-400"}`}
            >
              {type === "job" ? data.company : data.school}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{data.period}</span>
              </div>
              {/* Optional Location if available in data, or generic styling */}
            </div>

            <p className="text-muted-foreground/90 leading-relaxed text-sm md:text-base">
              {data.description}
            </p>
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
    ...t.about.history.jobs.map((item: any) => ({
      ...item,
      type: "job" as const,
    })),
    ...t.about.history.schools.map((item: any) => ({
      ...item,
      type: "education" as const,
    })),
  ];

  // Sort or interleave if needed, currently sequential

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
            {t.about.experience} & {t.about.education}
          </h2>
          <div className="mt-4 w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-purple-500 to-blue-500 origin-top"
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
