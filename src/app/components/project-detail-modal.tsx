"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Project } from "@/app/data/projects";

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  const labels = {
    about: language === "en" ? "Technical Briefing" : "Briefing Teknis",
    story: language === "en" ? "Developer's Log" : "Catatan Pengembang",
    challenges: language === "en" ? "Obstacles" : "Hambatan",
    solutions: language === "en" ? "Resolutions" : "Solusi",
    tech: language === "en" ? "Index of Technologies" : "Indeks Teknologi",
    team: language === "en" ? "Personnel" : "Personel",
    year: language === "en" ? "Archive Year" : "Tahun Arsip",
    role: language === "en" ? "Designation" : "Jabatan",
    liveDemo: language === "en" ? "External Link" : "Tautan Luar",
    sourceCode: language === "en" ? "Source Files" : "File Sumber",
  };

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
            className="fixed inset-0 bg-black/90 z-[200] transform-gpu"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[210] flex justify-center items-center pointer-events-none p-4 md:p-12 transform-gpu"
          >
            <div className="w-full max-w-6xl h-full bg-paper border-rule-thick border-primary overflow-hidden pointer-events-auto relative flex flex-col md:flex-row shadow-[20px_20px_0px_rgba(0,0,0,0.2)]">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 bg-primary text-primary-foreground hover:scale-110 transition-transform"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" weight="bold" />
              </button>

              {/* Sidebar: Image & Lead Info */}
              <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r hairline-r border-primary flex flex-col">
                <div className="relative aspect-video md:aspect-[3/4] w-full border-b hairline-b border-primary bg-black/5">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover grayscale contrast-125 sepia-[.1]"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground label-caps px-3 py-1">
                    Vol. {project.year}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col gap-6">
                  <div>
                    <h2 className="headline-lg uppercase mb-2 leading-[0.85] break-words">{project.title}</h2>
                    <p className="editor-note text-on-surface-variant italic">
                      {project.shortDescription[language]}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 border-y hairline-t hairline-b border-primary py-6">
                    <div className="flex justify-between items-center label-caps">
                      <span className="opacity-60">{labels.year}</span>
                      <span className="font-bold">{project.year}</span>
                    </div>
                    <div className="flex justify-between items-center label-caps">
                      <span className="opacity-60">{labels.role}</span>
                      <span className="font-bold">{project.role}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground label-caps text-center py-4 hover:opacity-90 transition-opacity"
                      >
                        {labels.liveDemo}
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-primary label-caps text-center py-4 hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        {labels.sourceCode}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content: The Article */}
              <div
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6 md:p-12 bg-paper custom-scrollbar"
              >
                <div className="max-w-2xl mx-auto space-y-12">
                  <section>
                    <h3 className="headline-md border-b hairline-b border-primary pb-4 mb-6">{labels.about}</h3>
                    <p className="body-lg leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-2">
                      {project.fullDescription[language]}
                    </p>
                  </section>

                  {project.story && (
                    <section className="bg-black/5 p-8 border-l-4 border-primary">
                      <div className="label-caps mb-4 flex items-center gap-2">
                        <span className="w-4 h-4 bg-primary inline-block"></span>
                        {labels.story}
                      </div>
                      <p className="editor-note italic text-xl">
                        &quot;{project.story[language]}&quot;
                      </p>
                    </section>
                  )}

                  {(project.challenges || project.solutions) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t hairline-t border-primary">
                      {project.challenges && (
                        <section>
                          <h4 className="label-caps mb-6 text-primary">{labels.challenges}</h4>
                          <ul className="space-y-4">
                            {project.challenges?.[language]?.map((item, i) => (
                              <li key={i} className="body-md flex gap-4">
                                <span className="font-bold font-serif opacity-30 italic">{String(i + 1).padStart(2, '0')}</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                      {project.solutions && (
                        <section>
                          <h4 className="label-caps mb-6 text-primary">{labels.solutions}</h4>
                          <ul className="space-y-4">
                            {project.solutions?.[language]?.map((item, i) => (
                              <li key={i} className="body-md flex gap-4">
                                <span className="font-bold font-serif opacity-30 italic">{String(i + 1).padStart(2, '0')}</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                  )}

                  <section className="pt-12 border-t-rule-thick border-primary">
                    <h4 className="label-caps mb-8">{labels.tech}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
                      {project.techStack.map((tech, idx) => (
                        <div key={idx} className="flex justify-between items-end border-b hairline-b border-primary/20 pb-2">
                          <span className="body-md font-bold text-sm uppercase tracking-tight">{tech.name}</span>
                          <span className="body-md opacity-40 text-[10px]">INC-0{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
