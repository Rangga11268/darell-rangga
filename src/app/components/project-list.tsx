"use client";

import { useState } from "react";
import { Project } from "@/app/data/projects";
import { ProjectCard } from "./project-card";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

import { motion, Variants } from "framer-motion";
import { viewportConfig } from "@/lib/animations";

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  language: "en" | "id";
}

const cardVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.3, // Added bounce for liveliness
    },
  },
};

export function ProjectList({
  projects,
  onSelect,
  language,
}: ProjectListProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 5);
  const hasMore = projects.length > 5;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <motion.div className="w-full space-y-12 lg:space-y-32 mb-16 overflow-hidden px-4 md:px-0 py-10">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <ProjectCard
              project={project}
              index={index}
              onSelect={onSelect}
              language={language}
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          onClick={() => setShowAll(!showAll)}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all">
            {showAll ? (
              <ArrowUp weight="bold" className="w-5 h-5" />
            ) : (
              <ArrowDown weight="bold" className="w-5 h-5 animate-bounce" />
            )}
          </div>
          <span className="text-sm font-medium tracking-widest uppercase">
            {showAll
              ? language === "id"
                ? "Tutup"
                : "Show Less"
              : language === "id"
                ? "Lihat Lainnya"
                : "See More"}
          </span>
        </motion.button>
      )}
    </div>
  );
}
