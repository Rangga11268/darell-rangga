"use client";

import { useState } from "react";
import { Project } from "@/app/data/projects";
import { ProjectCard } from "./project-card";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";

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
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 5);
  const hasMore = projects.length > 5;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <motion.div className="w-full space-y-12 lg:space-y-32 mb-16">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
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
