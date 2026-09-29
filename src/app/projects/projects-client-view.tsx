"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Code,
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

  const featuredProjects = initialProjects.filter((p) => p.imageUrl !== "");
  const minorProjects = initialProjects.filter((p) => p.imageUrl === "");

  const allTags = Array.from(
    new Set(initialProjects.flatMap((p) => p.tags)),
  ).filter((tag) => tag && tag !== "Open Source");

  const filterCategories = ["All", ...allTags.slice(0, 6)];

  const matchesSearchAndTag = (project: Project) => {
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
  };

  const filteredFeatured = featuredProjects.filter(matchesSearchAndTag);
  const filteredMinor = minorProjects.filter(matchesSearchAndTag);

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
              ? "Koleksi lengkap aplikasi produksi, arsitektur backend, aplikasi mobile Flutter, dan repositori open-source yang telah saya kembangkan."
              : "A complete directory of production web systems, backend architectures, mobile apps, and open-source packages I have built."}
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

        {/* Featured Projects */}
        {filteredFeatured.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                {isId ? "Proyek Utama" : "Featured Applications"} ({filteredFeatured.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredFeatured.map((project) => (
                <div
                  key={project.id}
                  className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/60 hover:border-foreground/30 transition-all flex flex-col gap-4 group"
                >
                  {project.imageUrl && (
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border/80 bg-zinc-950/40">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-foreground">
                          {project.year}
                        </span>
                        <span className="text-border text-xs">/</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {project.role}
                        </span>
                      </div>

                      {project.isLive && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground tracking-tight font-display">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {project.shortDescription[language]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
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

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-semibold text-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isId ? "Detail Studi Kasus" : "Case Study"}</span>
                      <ArrowRight size={12} weight="bold" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity"
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
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="GitHub Source Code"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Repositories / Experiments */}
        {filteredMinor.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                {isId ? "Modul & Repositori Tambahan" : "Additional Modules & Repositories"} ({filteredMinor.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMinor.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card/60 hover:border-foreground/30 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{project.year}</span>
                      <Code size={14} />
                    </div>
                    <h3 className="text-sm font-bold text-foreground font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {project.shortDescription[language]}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{isId ? "Lihat Repositori" : "View Repository"}</span>
                      <ArrowUpRight size={11} weight="bold" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
