"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  colSpan: string;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-card/50 border border-white/5 hover:border-primary/50 transition-colors duration-500",
        project.colSpan
      )}
    >
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="flex flex-col h-full relative z-10">
        {/* Image Container with Reveal Effect */}
        <div className="relative flex-1 w-full overflow-hidden mask-gradient-b min-h-[200px]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 pt-0 shrink-0 flex flex-col justify-end">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Actions - Only visible on hover/focus to keep clean? Keeping always visible for UX */}
          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Navara Trans",
      description:
        "A modern transportation rental website with booking system and fleet management.",
      tags: ["React.js", "Tailwind"],
      imageUrl: "/img/navara.png",
      githubUrl: "https://github.com/Rangga11268/navara-trans",
      liveUrl: "https://navara-trans.vercel.app/",
      colSpan: "md:col-span-1",
    },
    {
      title: "PHD Trans",
      description:
        "Premium bus rental platform featuring cinematic fleet showcase.",
      tags: ["Next.js", "Framer Motion"],
      imageUrl: "/img/PhdTrans.png",
      githubUrl: "https://github.com/Rangga11268/phd-trans",
      liveUrl: "https://phd-trans.vercel.app/",
      colSpan: "md:col-span-1",
    },
    {
      title: "Apapesan",
      description:
        "Secure messaging platform focusing on privacy and real-time delivery.",
      tags: ["Laravel", "MySQL"],
      imageUrl: "/img/Apapesan.png",
      githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
      liveUrl: "#",
      colSpan: "md:col-span-2",
    },
    {
      title: "Personal Portfolio",
      description:
        "The digital garden you are currently exploring. Built to perform.",
      tags: ["Next.js 15", "R3F"],
      imageUrl: "/img/portfolio.png",
      githubUrl: "https://github.com/Rangga11268/darell-rangga",
      liveUrl: "/",
      colSpan: "md:col-span-1 md:row-span-2",
    },
    {
      title: "SRB MotorV2",
      description: "E-commerce solution for automotive parts and services.",
      tags: ["Laravel", "Inertia"],
      imageUrl: "/img/srb motor.png",
      githubUrl: "https://github.com/Rangga11268/SrbMotorV2",
      liveUrl: "#",
      colSpan: "md:col-span-1",
    },
    {
      title: "Janguleee Trans",
      description:
        "Transportation service platform with modern booking capabilities.",
      tags: ["Next.js", "Tailwind"],
      imageUrl: "/img/janguleee.png",
      githubUrl: "https://github.com/Rangga11268/janguleee-trans",
      liveUrl: "https://janguleee-trans.vercel.app/",
      colSpan: "md:col-span-1",
    },
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
