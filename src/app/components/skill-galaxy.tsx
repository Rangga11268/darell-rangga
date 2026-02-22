/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/app/data/skills";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

export function SkillGalaxy() {
  const { language } = useLanguage();
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const selectedSkill = skills.find((s) => s.id === selectedSkillId);
  const relatedProjects = selectedSkill
    ? projects.filter((p) => selectedSkill.relatedProjectIds.includes(p.id))
    : [];

  return (
    <div className="relative min-h-[400px] w-full flex items-center justify-center">
      <div className="relative w-full flex items-center justify-center">
        {/* Background Ambience - Static, no animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-full opacity-30" />

        {/* Galaxy Container */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[400px] flex items-center justify-center z-10">
          {/* Static Orbit Rings - CSS only, no framer motion */}
          {[600, 450, 300].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/5 hidden md:block"
              style={{ width: size, height: size }}
            />
          ))}

          {/* Skills Layout */}
          <div className="relative flex flex-wrap justify-center content-center gap-8 md:gap-16 max-w-4xl p-6 md:p-10">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedSkillId(skill.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.03,
                  ease: "easeOut",
                }}
                whileHover={!isMobile ? { scale: 1.2, zIndex: 50 } : undefined}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative bg-card/80 border border-border p-4 rounded-full shadow-md group-hover:border-primary/40 group-hover:bg-card transition-colors duration-200 flex items-center justify-center">
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
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 md:w-12 md:h-12 block dark:hidden"
                      />
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
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
      </div>

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

            {/* Detail Card - simple scale/fade, no layoutId */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-lg p-6 outline-none"
            >
              <div className="relative bg-card border border-primary/20 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden">
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
