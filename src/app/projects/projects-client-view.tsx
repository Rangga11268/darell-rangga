"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  ArrowUpRight,
  Folder,
  BookOpen,
  BracketsCurly,
  Gear,
  ArrowLeft,
  Moon,
  Sun,
  Translate,
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
  const router = useRouter();
  const isDark = resolvedTheme === "dark";

  // Divide into Featured (have image & detail) and Minor (pure GitHub repos)
  const featuredProjects = initialProjects.filter((p) => p.imageUrl !== "");
  const minorProjects = initialProjects.filter((p) => p.imageUrl === "");

  // Collect top tags for filtering
  const allTags = Array.from(
    new Set(initialProjects.flatMap((p) => p.tags)),
  ).filter((tag) => tag && tag !== "Open Source");

  const filterCategories = ["All", ...allTags.slice(0, 7)];

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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary pb-24">
      {/* Social-style Top Bar */}
      <div className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/80 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-foreground/80 hover:text-foreground bg-muted/70 hover:bg-muted px-3 py-1.5 rounded-full border border-border/70 transition-all shadow-xs shrink-0"
          >
            <ArrowLeft size={14} weight="bold" />
            <span className="hidden sm:inline">
              {language === "id" ? "Kembali ke Profil" : "Back to Profile"}
            </span>
            <span className="sm:hidden">
              {language === "id" ? "Profil" : "Back"}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold bg-muted/70 hover:bg-muted text-foreground border border-border/70 transition-all cursor-pointer"
              title="Ganti Bahasa / Switch Language"
            >
              <Translate size={14} weight="bold" className="text-primary" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-full bg-muted/70 hover:bg-muted text-foreground border border-border/70 transition-all cursor-pointer"
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? (
                <Sun size={15} weight="fill" className="text-amber-400" />
              ) : (
                <Moon size={15} weight="fill" className="text-indigo-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="pt-12 pb-10 text-center relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            PORTFOLIO ARCHIVE
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-3 font-display">
            {language === "id"
              ? "Koleksi Proyek & Repositori"
              : "Curated Works & Repositories"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {language === "id"
              ? "Daftar lengkap aplikasi produksi, sistem web & mobile, serta repositori open-source yang telah saya kembangkan."
              : "A comprehensive showcase of production applications, web & mobile systems, and open-source contributions."}
          </p>
        </div>
      </header>

      {/* Filter and Search Bar Container */}
      <div className="max-w-5xl mx-auto px-4 mb-10 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3.5 rounded-2xl bg-card border border-border/80 backdrop-blur-md shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 flex items-center">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 text-muted-foreground"
            />
            <input
              type="text"
              placeholder={
                language === "id"
                  ? "Cari nama proyek, teknologi, atau deskripsi..."
                  : "Search projects, technologies, or keywords..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border/80 focus:border-foreground/40 rounded-xl pl-10 pr-4 py-2.5 outline-none text-xs font-medium transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {filterCategories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <main className="max-w-5xl mx-auto px-4 relative z-10">
        {filteredFeatured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground font-display">
                {language === "id"
                  ? "Proyek Utama Unggulan"
                  : "Featured Flagship Projects"}
              </h2>
              <span className="text-xs font-semibold text-muted-foreground">
                {filteredFeatured.length}{" "}
                {language === "id" ? "Proyek" : "Projects"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeatured.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl bg-card border border-border/70 hover:border-foreground/30 flex flex-col justify-between overflow-hidden transition-all shadow-xs hover:shadow-lg group"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    {/* Project Preview Image */}
                    <div className="relative aspect-[16/10] bg-muted/60 overflow-hidden border-b border-border/60">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-foreground text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10 shadow-xs border border-border/50">
                        {project.year}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {project.role}
                        </span>
                        <div className="flex gap-1.5">
                          {project.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1.5 font-display">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.shortDescription[language]}
                      </p>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-4 py-3 border-t border-border/60 flex items-center justify-between text-xs bg-muted/20">
                    <button
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className="inline-flex items-center gap-1 font-bold text-foreground hover:underline cursor-pointer"
                    >
                      <BookOpen size={14} />
                      <span>
                        {language === "id" ? "Lihat Detail" : "View Details"}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-foreground text-background transition-opacity hover:opacity-90"
                          title="Live Preview"
                        >
                          <ArrowUpRight size={14} weight="bold" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Repositories List */}
        {filteredMinor.length > 0 && (
          <section>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display">
                {language === "id"
                  ? "Repositori & Eksperimen Lainnya"
                  : "Other Repositories & Modules"}
              </h2>
              <span className="text-xs font-semibold text-muted-foreground">
                {filteredMinor.length} {language === "id" ? "Repo" : "Repos"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMinor.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="rounded-2xl bg-card border border-border/70 hover:border-foreground/30 p-5 transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground">
                        <Folder size={16} />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {project.shortDescription[language]}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-border/50 pt-3 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Gear size={12} /> Repo
                      </span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-foreground hover:underline"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code →</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {filteredFeatured.length === 0 && filteredMinor.length === 0 && (
          <div className="text-center py-24 border border-border/60 rounded-3xl bg-card p-8 flex flex-col items-center justify-center">
            <BracketsCurly size={44} className="opacity-30 mb-3" />
            <p className="text-sm font-semibold text-muted-foreground">
              {language === "id"
                ? "Tidak ada proyek yang sesuai dengan pencarian."
                : "No projects found matching your criteria."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
