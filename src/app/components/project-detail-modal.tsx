"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GithubLogo,
  ArrowSquareOut,
  Calendar,
  CodeBlock,
  Cpu,
  Users,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "id";
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  language,
}: ProjectDetailModalProps) {
  // All hooks MUST be called before any early return (Rules of Hooks)
  const contentRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    savedScrollY.current = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Use overflow:hidden instead of position:fixed to avoid page jumping to top
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!project) return null;

  const hasChallenges = Boolean(project.challenges?.en?.length);
  const hasSolutions = Boolean(project.solutions?.en?.length);
  const hasTeam = Boolean(project.team?.length);

  const labels = {
    about: language === "en" ? "About This Project" : "Tentang Proyek",
    story: language === "en" ? "Dev Story" : "Cerita Dev",
    challenges: language === "en" ? "Challenges" : "Tantangan",
    solutions: language === "en" ? "Solutions" : "Solusi",
    tech: language === "en" ? "Tech Stack" : "Tech Stack",
    team: language === "en" ? "Team" : "Tim",
    year: language === "en" ? "Year" : "Tahun",
    role: language === "en" ? "Role" : "Peran",
    liveDemo: language === "en" ? "Live Demo" : "Live Demo",
    sourceCode: language === "en" ? "Source Code" : "Source Code",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm md:backdrop-blur-md z-[200]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.18 }}
            className="fixed inset-0 z-[210] flex justify-center items-end md:items-center pointer-events-none px-0 pt-16 md:p-8"
          >
            <div className="w-full md:max-w-4xl h-[88dvh] md:h-[88vh] bg-white dark:bg-zinc-900 text-slate-900 dark:text-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 shadow-sm transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>

              {/* Image Header */}
              <div className="relative h-64 sm:h-72 md:h-80 w-full flex-shrink-0 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end gap-2 text-white">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10px] font-semibold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.05] tracking-tight drop-shadow-md">
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/75 max-w-xl leading-snug">
                    {project.shortDescription[language]}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                      <Calendar className="w-3.5 h-3.5" /> {labels.year}:{" "}
                      {project.year}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                      <CodeBlock className="w-3.5 h-3.5" /> {labels.role}:{" "}
                      {project.role}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                      <Users className="w-3.5 h-3.5" />{" "}
                      {project.team?.length || 1} Members
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <Button
                        asChild
                        className="h-10 rounded-full bg-white text-black hover:bg-white/90"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowSquareOut
                            className="w-4 h-4 mr-2"
                            weight="bold"
                          />
                          {labels.liveDemo}
                        </a>
                      </Button>
                    )}
                    {(!project.liveUrl || project.liveUrl === "#") &&
                      project.githubUrl &&
                      project.githubUrl !== "#" && (
                        <Button
                          asChild
                          variant="outline"
                          className="h-10 rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GithubLogo
                              className="w-4 h-4 mr-2"
                              weight="bold"
                            />
                            {labels.sourceCode}
                          </a>
                        </Button>
                      )}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white dark:bg-zinc-900"
              >
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    {labels.about}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.fullDescription[language]}
                  </p>
                </div>

                {project.story && (
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 md:p-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      <Cpu className="w-4 h-4" /> {labels.story}
                    </div>
                    <p className="mt-3 text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      &quot;{project.story[language]}&quot;
                    </p>
                  </div>
                )}

                {(hasChallenges || hasSolutions) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.challenges && (
                      <div className="rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 p-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                          <WarningCircle className="w-4 h-4" weight="fill" />
                          {labels.challenges}
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-rose-700 dark:text-rose-300">
                          {project.challenges[language]?.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 text-rose-400 dark:text-rose-500">
                                •
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.solutions && (
                      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-4 h-4" weight="fill" />
                          {labels.solutions}
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                          {project.solutions[language]?.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 text-emerald-400">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    {labels.tech}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-white/10"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {hasTeam && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {labels.team}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.team?.map((member, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3"
                        >
                          <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white/15 text-white flex items-center justify-center text-xs font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {member.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
