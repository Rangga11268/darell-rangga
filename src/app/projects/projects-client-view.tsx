"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import {
  MagnifyingGlass,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Moon,
  Sun,
  Trophy,
} from "@phosphor-icons/react";
import { GithubIcon } from "@/components/ui/brand-icons";

interface ProjectsClientViewProps {
  initialProjects: Project[];
}

export function ProjectsClientView({
  initialProjects,
}: ProjectsClientViewProps) {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  const allTags = Array.from(
    new Set(initialProjects.flatMap((p) => p.tags)),
  ).filter((tag) => tag && tag !== "Open Source");

  const filterCategories = ["All", ...allTags.slice(0, 6)];

  const filteredProjects = initialProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription[language]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTag =
      selectedTag === "All" || project.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans antialiased selection:bg-foreground selection:text-background flex flex-col items-center">
      {/* 1. Minimalist Top Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 py-3 px-4 sm:px-6 transition-colors">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
            <span>{isId ? "Kembali ke Beranda" : "Back to Home"}</span>
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

      {/* 2. Main Content Canvas */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-10">
        
        {/* Header & Bio */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
            {isId ? "Arsip Portofolio" : "Portfolio Archive"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display">
            {isId ? "Semua Proyek & Repositori" : "All Projects & Repositories"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {isId
              ? "Koleksi lengkap aplikasi produksi, arsitektur backend, aplikasi mobile Flutter, dan repositori yang telah saya kembangkan."
              : "A complete directory of production web systems, backend architectures, mobile apps, and repositories I have built."}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder={
                isId
                  ? "Cari nama proyek, teknologi, atau kata kunci..."
                  : "Search projects, technologies, or keywords..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/80 focus:border-foreground/50 rounded-xl pl-10 pr-4 py-2 text-xs text-foreground outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {filterCategories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List: Text-First Editorial Rows */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              {isId ? "Daftar Proyek" : "Projects Directory"} ({filteredProjects.length})
            </h2>
          </div>

          <div className="divide-y divide-border/60">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="py-5 sm:py-6 first:pt-2 last:pb-2 group hover:bg-muted/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transition-colors flex flex-col gap-3"
              >
                {/* Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0">
                      {project.year}
                    </span>

                    <Link
                      href={`/projects/${project.id}`}
                      className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight group-hover:text-foreground group-hover:underline underline-offset-4 flex items-center gap-1.5"
                    >
                      <span>{project.title}</span>
                    </Link>

                    {project.id === "titik-aman" && (
                      <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground text-[10px] font-mono font-bold flex items-center gap-1 border border-foreground/15">
                        <Trophy size={11} weight="fill" />
                        Juara 1
                      </span>
                    )}

                    {project.isLive && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs shrink-0">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={12} weight="bold" />
                      </a>
                    )}

                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                        title="GitHub Source Code"
                      >
                        <span>Code</span>
                        <ArrowUpRight size={12} weight="bold" />
                      </a>
                    )}

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline"
                    >
                      <span>{isId ? "Studi Kasus" : "Case Study"}</span>
                      <ArrowRight size={12} weight="bold" />
                    </Link>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed sm:pl-14">
                  {project.shortDescription[language]}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:pl-14 pt-0.5">
                  <span className="text-[11px] font-mono text-muted-foreground/80 mr-1">
                    {project.role} &middot;
                  </span>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 rounded-md bg-muted text-foreground text-[11px] font-mono font-medium"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
