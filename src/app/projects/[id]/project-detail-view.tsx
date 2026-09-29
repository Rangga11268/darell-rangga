"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, projects } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Trophy,
  Sun,
  Moon,
  CheckCircle,
} from "@phosphor-icons/react";
import { GithubIcon } from "@/components/ui/brand-icons";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  // Find next project for seamless bottom navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const featuresList = project.features?.[language] || [];
  const challengesList = project.challenges?.[language] || [];
  const solutionsList = project.solutions?.[language] || [];

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans antialiased selection:bg-foreground selection:text-background flex flex-col items-center">
      {/* 1. Minimalist Top Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 py-3 px-4 sm:px-6 transition-colors">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
            <span>{isId ? "Kembali ke Karya" : "Back to Work"}</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-md text-[11px] font-mono font-bold hover:bg-muted text-foreground transition-colors cursor-pointer"
              title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              {language.toUpperCase()}
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-1.5 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Case Study Canvas */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-10">
        
        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="font-bold text-foreground">{project.year}</span>
              <span>/</span>
              <span>{project.role}</span>
            </div>

            <div className="flex items-center gap-2">
              {project.isLive && (
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </span>
              )}
              {project.id === "titik-aman" && (
                <span className="px-2.5 py-0.5 rounded-md bg-foreground/10 text-foreground text-xs font-mono font-bold flex items-center gap-1.5 border border-foreground/15">
                  <Trophy size={13} weight="fill" />
                  {isId ? "Juara 1 IT Bootcamp 2026" : "1st Place Champion"}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {project.shortDescription[language]}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground text-xs font-semibold active:scale-95 transition-all shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>{isId ? "Repositori GitHub" : "Source Code"}</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            )}
          </div>
        </div>

        {/* Media Preview Container */}
        {project.imageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/80 bg-zinc-950/40 shadow-xs">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Detailed Case Study Sections */}
        <div className="space-y-10 pt-4">
          
          {/* Overview & Core Scope */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-display">
              {isId ? "Gambaran Umum & Latar Belakang" : "Overview & Background"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.fullDescription?.[language] || project.shortDescription[language]}
            </p>
          </section>

          {/* Key Engineering Features / Highlights */}
          {featuresList.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-foreground font-display">
                {isId ? "Fitur & Kapabilitas Sistem" : "Core Engineering Capabilities"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border/70 bg-card/60 flex items-start gap-3"
                  >
                    <CheckCircle size={18} weight="fill" className="text-foreground shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Solutions if present */}
          {challengesList.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-foreground font-display">
                {isId ? "Tantangan & Solusi Rekayasa" : "Engineering Challenges & Solutions"}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {challengesList.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2"
                  >
                    <div className="text-xs font-mono font-bold text-foreground">
                      {isId ? `Tantangan #${idx + 1}` : `Challenge #${idx + 1}`}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {challenge}
                    </p>
                    {solutionsList[idx] && (
                      <div className="pt-2 border-t border-border/50 text-xs sm:text-sm text-foreground/90 font-medium">
                        <span className="font-bold text-foreground">{isId ? "Solusi: " : "Solution: "}</span>
                        {solutionsList[idx]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack Breakdown */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-display">
              {isId ? "Arsitektur Teknologi" : "Technology Stack"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="px-3 py-1.5 rounded-lg border border-border/70 bg-card text-xs font-mono font-medium text-foreground flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Next Project / Back Link */}
          <div className="pt-8 border-t border-border/60 flex items-center justify-between">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={13} weight="bold" />
              <span>{isId ? "Semua Proyek" : "All Projects"}</span>
            </Link>

            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:underline"
              >
                <span>{isId ? "Proyek Berikutnya: " : "Next: "} {nextProject.title}</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            )}
          </div>

        </div>

      </main>

      {/* 3. Minimalist Footer */}
      <footer className="w-full border-t border-border/60 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground">Darell Rangga</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <a href="https://github.com/Rangga11268" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/darellrangga" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
