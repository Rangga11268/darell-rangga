"use client";

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
  CaretRight,
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
  if (!project) return null;

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="fixed inset-0 md:inset-10 z-[210] flex justify-center items-center pointer-events-none p-4 md:p-0"
          >
            <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 w-full max-w-6xl h-full md:h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto relative group/modal">
              {/* Close Button - Floating */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/5 hover:rotate-90 duration-300 backdrop-blur-md"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>

              {/* Left: Immersive Visuals */}
              <div className="w-full md:w-[45%] h-[35vh] md:h-full relative overflow-hidden group/image">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 md:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent md:hidden" />

                {/* Floating Tags Overlay */}
                <div className="absolute bottom-6 left-6 right-6 space-y-4 md:hidden">
                  <h2 className="text-3xl font-display font-bold text-white leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Content & Details */}
              <div className="w-full md:w-[55%] h-full relative bg-gradient-to-b from-zinc-950/50 to-zinc-950/90 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
                  <div className="space-y-10">
                    {/* Desktop Header */}
                    <div className="hidden md:block space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-primary backdrop-blur-md uppercase tracking-wider shadow-sm shadow-black/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-5xl lg:text-6xl font-display font-bold text-white leading-tight tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl">
                        {project.shortDescription[language]}
                      </p>
                    </div>
                    {/* Metadata Bento Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <span className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                          <Calendar className="w-3.5 h-3.5" /> Year
                        </span>
                        <p className="text-white font-mono font-bold">
                          {project.year}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors md:col-span-2">
                        <span className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                          <CodeBlock className="w-3.5 h-3.5" /> Role
                        </span>
                        <p className="text-white font-mono font-bold">
                          {project.role}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <span className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                          <Users className="w-3.5 h-3.5" /> Team
                        </span>
                        <p className="text-white font-mono font-bold">
                          {project.team?.length || 1} Members
                        </p>
                      </div>
                    </div>
                    {/* Story Section */}
                    {project.story && (
                      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-white/5 overflow-hidden group/story">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/story:opacity-20 transition-opacity">
                          <Cpu className="w-24 h-24" />
                        </div>
                        <div className="relative z-10 space-y-4">
                          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-purple-300">
                            <Cpu className="w-4 h-4" /> Dev Story
                          </h3>
                          <p className="text-lg md:text-xl text-white/90 italic font-light leading-relaxed">
                            &quot;{project.story[language]}&quot;
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Main Description */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        About Project
                        <div className="h-px flex-1 bg-white/10" />
                      </h3>
                      <p className="text-white/70 leading-relaxed text-base md:text-lg">
                        {project.fullDescription[language]}
                      </p>
                    </div>
                    {/* Challenges & Solutions */}
                    {(project.challenges || project.solutions) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.challenges && (
                          <div className="space-y-4 p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-wider">
                              <WarningCircle
                                className="w-4 h-4"
                                weight="fill"
                              />
                              {language === "en" ? "Challenges" : "Tantangan"}
                            </h4>
                            <ul className="space-y-3">
                              {project.challenges[language]?.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-white/70 flex gap-3 leading-relaxed"
                                >
                                  <span className="text-red-500/50 mt-0.5">
                                    •
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.solutions && (
                          <div className="space-y-4 p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-green-400 uppercase tracking-wider">
                              <CheckCircle className="w-4 h-4" weight="fill" />
                              {language === "en" ? "Solutions" : "Solusi"}
                            </h4>
                            <ul className="space-y-3">
                              {project.solutions[language]?.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-white/70 flex gap-3 leading-relaxed"
                                >
                                  <span className="text-green-500/50 mt-0.5">
                                    •
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Tech Stack Bubbles */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <div
                            key={idx}
                            className="group/tech flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-white/80 hover:bg-white/10 hover:border-primary/30 hover:text-white transition-all cursor-default"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/tech:bg-primary transition-colors" />
                            {tech.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Team Members List */}
                    {project.team && project.team.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <h3 className="text-sm text-white/50 uppercase tracking-widest font-bold">
                          Team Members
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {project.team.map((member, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-black">
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white">
                                  {member.name}
                                </div>
                                <div className="text-xs text-white/50">
                                  {member.role}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Mobile Description (Visible only on small screens) */}
                    <div className="md:hidden space-y-4 mb-8">
                      <p className="text-lg text-white/60 font-light leading-relaxed">
                        {project.shortDescription[language]}
                      </p>
                    </div>
                    <div className="h-32 md:h-40" />{" "}
                    {/* Spacer for Floating Footer */}
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pb-32 md:p-12 md:pb-12 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-12 flex gap-4">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <Button
                      asChild
                      className="flex-1 h-12 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-base shadow-lg shadow-white/5"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowSquareOut
                          className="w-5 h-5 mr-2"
                          weight="bold"
                        />{" "}
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 h-12 bg-white/5 text-white hover:bg-white/10 border-white/10 rounded-xl font-bold text-base backdrop-blur-md"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubLogo className="w-5 h-5 mr-2" weight="bold" />{" "}
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
