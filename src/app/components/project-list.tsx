"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Project } from "@/app/data/projects";

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  language: "en" | "id";
}

export function ProjectList({
  projects,
  onSelect,
  language,
}: ProjectListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-[600px] flex flex-col md:flex-row gap-8 md:gap-16">
      {/* Background/Preview Area - Sticky on Desktop */}
      <div className="hidden md:block absolute md:fixed inset-0 top-0 left-0 w-full h-full pointer-events-none -z-10">
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && (
            <motion.div
              key={projects[hoveredIndex].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={projects[hoveredIndex].imageUrl}
                alt="Preview"
                fill
                sizes="100vw"
                className="object-cover blur-sm opacity-50 dark:opacity-100" // Reduced opacity in light mode to not be overwhelming
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main List */}
      <div className="w-full max-w-4xl mx-auto space-y-3 md:space-y-4 z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelect(project)}
            className="group relative flex items-center justify-between p-5 md:p-8 rounded-2xl border border-foreground/5 hover:border-primary/30 bg-card/30 hover:bg-card/50 backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
          >
            {/* Hover Glitch/Fill Effect */}
            <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <div className="relative flex items-center gap-4 md:gap-12 flex-1">
              {/* Index Number */}
              <span className="text-sm md:text-xl font-mono text-muted-foreground/30 group-hover:text-primary transition-colors duration-300 min-w-[24px]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title & info */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 flex-1 mr-2">
                <h3 className="text-xl md:text-4xl font-display font-bold text-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                  {project.title}
                </h3>

                <span className="hidden md:inline-block w-px h-4 bg-foreground/10" />

                <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-1 max-w-xs md:max-w-md">
                  {project.shortDescription[language]}
                </p>
              </div>
            </div>

            {/* Right Side: Tags & Arrow */}
            <div className="relative flex items-center gap-3 md:gap-6">
              <div className="hidden md:flex gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 rounded bg-secondary/30 border border-foreground/5 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-colors whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="p-2 md:p-3 rounded-full border border-foreground/10 bg-secondary/20 text-muted-foreground group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" weight="bold" />
              </div>
            </div>

            {/* Mobile-only Preview (Subtle background image on active) */}
            <div className="md:hidden absolute inset-0 -z-10 opacity-0 group-active:opacity-10 transition-opacity pointer-events-none">
              <Image
                src={project.imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/90" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Preview Card (Desktop Only) */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden lg:block fixed top-1/2 right-12 -translate-y-1/2 w-[400px] h-[300px] rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl z-20 pointer-events-none"
          >
            <Image
              src={projects[hoveredIndex].imageUrl}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 mb-2 flex-wrap">
                {projects[hoveredIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold px-2 py-1 bg-primary text-black rounded-md shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Always white text because background is dark image overlay */}
              <p className="text-white/90 text-sm line-clamp-2 font-medium drop-shadow-sm">
                {projects[hoveredIndex].shortDescription[language]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
