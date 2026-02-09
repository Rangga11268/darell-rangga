/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { skills } from "@/app/data/skills";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";

export function SkillGalaxy() {
  const { language } = useLanguage();
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const selectedSkill = skills.find((s) => s.id === selectedSkillId);
  const relatedProjects = selectedSkill
    ? projects.filter((p) => selectedSkill.relatedProjectIds.includes(p.id))
    : [];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full flex items-center justify-center perspective-1000"
    >
      <motion.div
        style={{ rotateX, scale, opacity }}
        className="relative w-full flex items-center justify-center transform-style-3d will-change-transform"
      >
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-full opacity-50 blur-3xl" />

        {/* Galaxy Container */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[600px] flex items-center justify-center z-10">
          {/* Orbit Rings (Background Structure) */}
          {[600, 450, 300].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/5"
              style={{ width: size, height: size }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Constellation Lines (Connecting Skills) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <motion.path
              d="M100,300 Q400,100 700,300 T1000,300"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="2"
              animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient
                id="gradient-line"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#8b5cf6" /> {/* Primary Color */}
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Skills Layout - Distributed Organically */}
          <div className="relative flex flex-wrap justify-center content-center gap-12 md:gap-20 max-w-4xl p-10">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                layoutId={`skill-${skill.id}`}
                className="relative group cursor-pointer"
                onClick={() => setSelectedSkillId(skill.id)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0], // Enhanced floating
                  x: [0, Math.sin(idx) * 10, 0], // Organic drift
                }}
                transition={{
                  y: {
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  },
                  x: {
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.5, delay: idx * 0.05 },
                }}
                whileHover={{ scale: 1.3, zIndex: 50 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Connection Lines (Visual Flair) - Individual Stars */}
                <div className="absolute -inset-8 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-card/40 backdrop-blur-sm border border-white/5 p-4 rounded-full shadow-lg ring-1 ring-white/5 group-hover:ring-primary/50 group-hover:bg-card/90 transition-all duration-300 flex items-center justify-center">
                  {skill.id === "framer" ? (
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 md:w-10 md:h-10 text-zinc-900 dark:text-white"
                        fill="currentColor"
                      >
                        <path
                          d="M4 0h16v8h-8zM4 8h8l8 8h-8v8z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 16l-8 8h8v-8z"
                          fill="url(#framer-gradient-main)"
                          opacity="0.8"
                        />
                        <defs>
                          <linearGradient
                            id="framer-gradient-main"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#0055FF" />
                            <stop offset="100%" stopColor="#0099FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
                        alt={skill.name}
                        className="w-10 h-10 md:w-12 md:h-12 block dark:hidden"
                      />
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        className="w-10 h-10 md:w-12 md:h-12 hidden dark:block"
                      />
                    </>
                  )}
                </div>

                {/* Floating Label on Hover */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold tracking-wider duration-300 text-center whitespace-nowrap">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkillId(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[50]"
            />

            {/* Holographic Card */}
            <motion.div
              layoutId={`skill-${selectedSkill.id}`}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-lg p-6 outline-none"
            >
              <div className="relative bg-card/90 border border-primary/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden">
                {/* Decorative Holographic Glint */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/50 rounded-2xl border border-white/10 flex items-center justify-center">
                      {selectedSkill.id === "framer" ? (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-10 h-10 text-foreground"
                            fill="currentColor"
                          >
                            <path
                              d="M4 0h16v8h-8zM4 8h8l8 8h-8v8z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 16l-8 8h8v-8z"
                              fill="url(#framer-gradient-modal)"
                              opacity="0.8"
                            />
                            <defs>
                              <linearGradient
                                id="framer-gradient-modal"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                              >
                                <stop offset="0%" stopColor="#0055FF" />
                                <stop offset="100%" stopColor="#0099FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={`https://skillicons.dev/icons?i=${selectedSkill.icon}&theme=dark`}
                          alt={selectedSkill.name}
                          className="w-12 h-12"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold">
                        {selectedSkill.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                          {selectedSkill.level}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {selectedSkill.years} Years Exp.
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSkillId(null)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {language === "id"
                    ? selectedSkill.description.id
                    : selectedSkill.description.en}
                </p>

                {relatedProjects.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                      {language === "id" ? "Digunakan di:" : "Used in:"}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {relatedProjects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-colors group/project"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-sm truncate">
                              {project.title}
                            </h5>
                          </div>
                          {project.liveUrl !== "#" && (
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/project:text-primary transition-colors" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
