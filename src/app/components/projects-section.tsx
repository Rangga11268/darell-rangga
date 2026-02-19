"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";

import { useState } from "react";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import { projects, Project } from "@/app/data/projects";
import { ProjectDetailModal } from "./project-detail-modal";
import { ProjectList } from "./project-list";

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const langKey = language === "id" ? "id" : "en";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20 md:py-32 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="mb-12"
          >
            <SectionTitle
              title={t.projects.title}
              subtitle={t.projects.subtitle}
              className="mb-0"
            />
          </motion.div>

          {/* New Holographic List Layout */}
          <div className="mt-12 md:mt-24">
            <ProjectList
              projects={projects}
              onSelect={setSelectedProject}
              language={langKey}
            />
          </div>
        </div>
      </section>

      {/* Detail Modal — rendered OUTSIDE section to avoid contain:layout/stacking issues */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        language={langKey}
      />
    </>
  );
}
