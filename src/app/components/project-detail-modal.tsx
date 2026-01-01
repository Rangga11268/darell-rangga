"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Code2, Cpu } from "lucide-react";
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-4 md:inset-10 z-[70] flex justify-center items-center pointer-events-none"
          >
            <div className="bg-black/90 border border-white/10 w-full max-w-5xl h-full md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white/70 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: Visuals */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative bg-zinc-900/50">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 md:opacity-60" />

                {/* Float Info */}
                <div className="absolute bottom-6 left-6 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-primary backdrop-blur-md uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-10 bg-zinc-950/80 backdrop-blur-xl">
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-lg text-white/50 font-light">
                      {project.shortDescription[language]}
                    </p>
                  </div>

                  {/* Meta Grid */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                    <div className="space-y-1">
                      <span className="flex items-center gap-2 text-xs text-primary uppercase tracking-widest font-bold">
                        <Calendar className="w-3 h-3" /> Year
                      </span>
                      <p className="text-white/80 font-mono">{project.year}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="flex items-center gap-2 text-xs text-primary uppercase tracking-widest font-bold">
                        <Code2 className="w-3 h-3" /> Role
                      </span>
                      <p className="text-white/80 font-mono">{project.role}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      About Project
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base">
                      {project.fullDescription[language]}
                    </p>
                  </div>

                  {/* Story */}
                  {project.story && (
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Cpu className="w-4 h-4" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">
                          Dev Story
                        </h3>
                      </div>
                      <p className="text-white/60 leading-relaxed text-sm italic">
                        &quot;{project.story[language]}&quot;
                      </p>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.features[language].map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-white/70"
                        >
                          <span className="text-primary mt-1">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Expanded */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white/80 hover:bg-white/10 transition-colors"
                        >
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 sticky bottom-0 bg-zinc-950 pb-4 md:pb-0 z-10 border-t border-white/5 md:border-none mt-auto">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 bg-white/5 hover:bg-white/10 hover:text-white border-white/10 rounded-xl"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" /> Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
