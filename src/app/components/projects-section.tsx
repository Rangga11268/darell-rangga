"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import { Button } from "@/components/ui/button";

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
        "group relative rounded-3xl overflow-hidden bg-card/50 border border-white/5 hover:border-primary/50 transition-colors duration-500 h-[400px] md:h-auto",
        project.colSpan
      )}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient Overlay - Darker on mobile for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* Content Container - Always visible on mobile, slide-up on desktop */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-0 md:translate-y-[30%] md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {/* Title area */}
        <div className="mb-2">
          <h3 className="text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-primary/20 text-white border border-white/10 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description & Buttons (Always visible on mobile, reveal on desktop) */}
        <div className="space-y-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Site
                </a>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/20 text-white hover:text-white backdrop-blur-md transition-all"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Top Right Icon (Decorative or Quick Link) */}
      <a
        href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-[-10px] md:group-hover:translate-y-0"
      >
        <ArrowUpRight className="w-5 h-5" />
      </a>
    </motion.div>
  );
};

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Navara Trans",
      description:
        "A modern transportation rental website with booking system and fleet management. Features real-time availability and dynamic pricing.",
      tags: ["React.js", "Tailwind", "Vite"],
      imageUrl: "/img/navara.png",
      githubUrl: "https://github.com/Rangga11268/navara-trans",
      liveUrl: "https://navara-trans.vercel.app/",
      colSpan: "md:col-span-1",
    },
    {
      title: "PHD Trans",
      description:
        "Premium bus rental platform featuring cinematic fleet showcase with immersive animations and detailed specification filtering.",
      tags: ["Next.js", "Framer Motion", "TypeScript"],
      imageUrl: "/img/PhdTrans.png",
      githubUrl: "https://github.com/Rangga11268/phd-trans",
      liveUrl: "https://phd-trans.vercel.app/",
      colSpan: "md:col-span-1",
    },
    {
      title: "Apapesan",
      description:
        "Secure messaging platform focusing on privacy and real-time delivery. Implements end-to-end encryption and ephemeral messages.",
      tags: ["Laravel", "MySQL", "Pusher"],
      imageUrl: "/img/Apapesan.png",
      githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
      liveUrl: "#",
      colSpan: "md:col-span-2",
    },
    {
      title: "Portfolio",
      description:
        "The digital garden you are currently exploring. Built to perform with highly interactive elements and modern web technologies.",
      tags: ["Next.js 15", "R3F", "Tailwind v4"],
      imageUrl: "/img/portfolio.png",
      githubUrl: "https://github.com/Rangga11268/darell-rangga",
      liveUrl: "/",
      colSpan: "md:col-span-1 md:row-span-2",
    },
    {
      title: "SRB MotorV2",
      description:
        "E-commerce solution for automotive parts and services. Features inventory management, service booking, and payment gateway integration.",
      tags: ["Laravel", "Inertia", "Vue"],
      imageUrl: "/img/srb motor.png",
      githubUrl: "https://github.com/Rangga11268/SrbMotorV2",
      liveUrl: "#",
      colSpan: "md:col-span-1",
    },
    {
      title: "Janguleee Trans",
      description:
        "Transportation service platform with modern booking capabilities. Focused on simplified user flow and mobile responsiveness.",
      tags: ["Next.js", "Tailwind", "Supabase"],
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

        {/* Increased row height for better visual impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
