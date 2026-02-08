"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  language: "en" | "id";
}

export function ProjectCard({
  project,
  index,
  onSelect,
  language,
}: ProjectCardProps) {
  const isEven = index % 2 === 0;

  // 3D Tilt Logic
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movements
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = event.clientX - rect.left - width / 2;
      const mouseYFromCenter = event.clientY - rect.top - height / 2;

      // Calculate rotation based on mouse position
      // Max rotation 15 degrees
      const xPct = mouseXFromCenter / (width / 2);
      const yPct = mouseYFromCenter / (height / 2);

      x.set(xPct);
      y.set(yPct);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Map mouse values to rotation
  const rotateX = useTransform(mouseY, [-1, 1], ["5deg", "-5deg"]); // Inverse Y for natural tilt
  const rotateY = useTransform(mouseX, [-1, 1], ["-5deg", "5deg"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center mb-24 last:mb-0`}
    >
      {/* Visual Side (Tilt Card) */}
      <div className="w-full lg:w-3/5 perspective-1000">
        <motion.div
          ref={ref}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(project)}
          className="relative group w-full aspect-video rounded-3xl cursor-pointer bg-card/10 border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Base Image */}
          <div className="absolute inset-0 transform-style-3d group-hover:scale-105 transition-transform duration-500">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={index < 2}
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Glare Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Floating Element (Parallax) - Optional Tech Badges */}
          <motion.div
            style={{ translateZ: 50 }}
            className="absolute bottom-6 left-6 flex flex-wrap gap-2 pointer-events-none"
          >
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-6">
        {/* Number & Role */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="font-mono text-4xl font-light opacity-30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="h-px w-12 bg-border" />
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            {project.role}
          </span>
        </div>

        {/* Title & Desc */}
        <div>
          <h3
            onClick={() => onSelect(project)}
            className="text-3xl lg:text-5xl font-display font-bold mb-4 cursor-pointer hover:text-primary transition-colors"
          >
            {project.title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {project.fullDescription[language].length > 180
              ? project.fullDescription[language].substring(0, 180) + "..."
              : project.fullDescription[language]}
          </p>
        </div>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/60 font-mono">
          {project.techStack.map((tech) => (
            <span key={tech.name} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {tech.name}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={() => onSelect(project)}
            className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium"
          >
            <span>View Case Study</span>
            <ArrowUpRight
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>

          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground"
            >
              <GithubLogo weight="fill" className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
