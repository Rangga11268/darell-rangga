"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import { projects, Project } from "@/app/data/projects";
import { ProjectDetailModal } from "./project-detail-modal";

const ProjectCard = ({
  project,
  index,
  onClick,
  language,
}: {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  language: "en" | "id";
}) => {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer hover:border-primary/50 transition-all duration-500",
        project.colSpan, // This handles the bento grid sizing
        "h-[300px] md:h-auto min-h-[300px]",
      )}
    >
      {/* Background Image with Cinematic Desaturation -> Color on Hover */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
        {/* Spotlight Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Header (Top Right) */}
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
              {project.year}
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="mb-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.shortDescription[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const langKey = language === "id" ? "id" : "en";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px] grid-flow-dense">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group relative rounded-3xl overflow-hidden bg-card border border-border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20",
                project.colSpan,
                "h-[300px] md:h-auto min-h-[300px]",
              )}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Spotlight Effect */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 40%)`,
                }}
              />

              {/* Border Highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 border border-primary/50" />

              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
                    <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.shortDescription[langKey]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        language={langKey}
      />
    </section>
  );
}
