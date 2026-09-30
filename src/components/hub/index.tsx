"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import {
  Check,
  EnvelopeSimple,
  WhatsappLogo,
  FilePdf,
  ArrowUpRight,
  Trophy,
  Sun,
  Moon,
  Rows,
  SquaresFour,
  PaperPlaneRight,
  CaretDown,
  CaretUp,
  CheckCircle,
  Sparkle,
} from "@phosphor-icons/react";
import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
  InstagramIcon,
} from "@/components/ui/brand-icons";
import {
  MacCpuIcon,
  MacGaugeIcon,
  MacTrophyIcon,
  MacQuickLookIcon,
} from "@/components/ui/macos-icons";
import { LiveClock } from "@/components/ui/live-clock";

type ProjectCategory = "all" | "web" | "systems" | "mobile" | "ai";
type ViewMode = "list" | "bento";

export function ExecutiveHub() {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("titik-aman");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const email = "darellrangga@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const toggleProjectExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "all") return true;
    const tagStr = p.tags.join(" ").toLowerCase();
    const techStr = p.techStack.map((t) => t.name).join(" ").toLowerCase();
    const combined = `${tagStr} ${techStr} ${p.role.toLowerCase()} ${p.id.toLowerCase()}`;

    if (selectedCategory === "web") {
      return combined.includes("laravel") || combined.includes("react") || combined.includes("vue") || combined.includes("next");
    }
    if (selectedCategory === "systems") {
      return combined.includes("laravel") || combined.includes("websocket") || combined.includes("redis") || combined.includes("fastapi") || combined.includes("backend");
    }
    if (selectedCategory === "mobile") {
      return p.hasMobileApp || combined.includes("mobile") || combined.includes("flutter") || combined.includes("android");
    }
    if (selectedCategory === "ai") {
      return combined.includes("ai") || combined.includes("gemini") || combined.includes("gpt") || combined.includes("faktanesia");
    }
    return true;
  });

  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const remainingCount = Math.max(0, filteredProjects.length - 4);

  return (
    <div className="w-full min-h-screen selection:bg-foreground selection:text-background font-sans antialiased text-foreground">
      
      {/* ========================================================================= */}
      {/* 1. TOP FLOATING ISLAND NAVIGATION (Minimal, Distraction-Free)             */}
      {/* ========================================================================= */}
      <header className="sticky top-4 z-50 w-full max-w-2xl sm:max-w-[700px] mx-auto px-4">
        <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-card/85 dark:bg-card/75 backdrop-blur-xl border border-border/80 shadow-sm transition-all">
          
          {/* Logo & Availability Status */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="w-7 h-7 rounded-xl bg-foreground text-background font-bold text-xs flex items-center justify-center tracking-tight shadow-xs hover:opacity-90 transition-opacity"
              title="Darell Rangga"
            >
              DR
            </a>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-mono font-medium text-emerald-700 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isId ? "Tersedia untuk Rekrutmen" : "Available for Roles"}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Clock, Lang, Theme */}
          <div className="flex items-center gap-1.5">
            <LiveClock className="hidden sm:flex items-center gap-1 text-[10.5px] font-mono text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border/60" />

            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-muted/70 hover:bg-muted text-foreground border border-border/70 transition-colors cursor-pointer min-h-[28px]"
              title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              aria-label="Toggle Language"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-muted text-foreground border border-border/70 transition-colors cursor-pointer min-h-[28px] min-w-[28px] flex items-center justify-center"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN SINGLE-COLUMN RIVER FLOW (Paco Coursey / Rauno Freiberg Standard)  */}
      {/* ========================================================================= */}
      <main className="w-full max-w-2xl sm:max-w-[700px] mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-16 sm:space-y-20">
        
        {/* ----------------------------------------------------------------------- */}
        {/* HERO / PROFILE & PROOF POINTS                                           */}
        {/* ----------------------------------------------------------------------- */}
        <section id="top" className="space-y-6 pt-2">
          
          {/* Avatar & Title Row */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-muted/80 p-1 border border-border/80 shadow-sm overflow-hidden flex items-end justify-center">
                <Image
                  src="/img/saya/saya1.webp"
                  alt="Darell Rangga"
                  width={180}
                  height={180}
                  className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background shadow-xs"
                title="Active & Ready"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display">
                Darell Rangga
              </h1>
              <p className="text-xs sm:text-sm font-mono text-muted-foreground font-medium">
                Fullstack Software Engineer &middot; Jakarta, ID
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkle size={13} className="text-amber-500 shrink-0" weight="fill" />
                <span>{isId ? "Spesialisasi Web Performa Tinggi & Arsitektur Atomik" : "High-throughput web systems & atomic architecture"}</span>
              </div>
            </div>
          </div>

          {/* Concise Bio Statement */}
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
            {isId
              ? "Mahasiswa Sistem Informasi (IPK 4.00/4.00) di Universitas Bina Sarana Informatika. Merancang arsitektur backend berkecepatan tinggi dengan transaksi database atomik (Laravel 12, PostgreSQL), antrean Redis, dan frontend reaktif sub-milidetik (React 19, Next.js 15, TypeScript)."
              : "Information Systems scholar (4.00/4.00 GPA) at Universitas Bina Sarana Informatika. Architecting high-throughput backend infrastructure with atomic database locks (Laravel 12, PostgreSQL), asynchronous queues (Redis), and sub-millisecond reactive frontends (React 19, Next.js 15, TypeScript)."}
          </p>

          {/* 3 Proof Metric Chips */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 rounded-2xl bg-card border border-border/70 text-center shadow-xs">
              <span className="text-xs sm:text-sm font-mono font-bold text-foreground block">Juara 1</span>
              <span className="text-[10.5px] text-muted-foreground font-sans">{isId ? "IT Bootcamp 2026" : "Bootcamp 2026"}</span>
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border/70 text-center shadow-xs">
              <span className="text-xs sm:text-sm font-mono font-bold text-foreground block">12+</span>
              <span className="text-[10.5px] text-muted-foreground font-sans">{isId ? "Aplikasi Produksi" : "Prod Systems"}</span>
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border/70 text-center shadow-xs">
              <span className="text-xs sm:text-sm font-mono font-bold text-foreground block">4.00 / 4.00</span>
              <span className="text-[10.5px] text-muted-foreground font-sans">{isId ? "IPK S1 UBSI" : "GPA UBSI"}</span>
            </div>
          </div>

          {/* Action CTAs & Social Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="/pdf/Resume_Darell_Rangga_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
            >
              <FilePdf size={15} weight="bold" />
              <span>Download CV</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-foreground text-xs font-bold active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
            >
              {copied ? <Check size={14} weight="bold" className="text-emerald-500" /> : <EnvelopeSimple size={14} weight="bold" />}
              <span className="font-mono">{copied ? (isId ? "Email Tersalin!" : "Copied to Clipboard!") : "darellrangga@gmail.com"}</span>
            </button>

            <a
              href="https://wa.me/628978638973"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-card hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 border border-border text-foreground transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="WhatsApp Direct"
            >
              <WhatsappLogo size={17} weight="bold" />
            </a>

            <div className="flex items-center gap-1.5 ml-auto">
              <a
                href="https://github.com/Rangga11268"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/darellrangga/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-[#0a66c2] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ranggsdarell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/darellrangga17/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-[#E4405F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SELECTED WORKS (Paco Coursey / Rauno Freiberg Minimalist List)          */}
        {/* ----------------------------------------------------------------------- */}
        <section id="projects" className="space-y-5">
          
          {/* Section Header with Category & View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/70">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight">
                {isId ? "Karya & Sistem Produksi Pilihan" : "Selected Works & Systems"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isId ? "Arsitektur aplikasi teruji dengan beban nyata" : "Production-grade systems architected for high concurrency"}
              </p>
            </div>

            {/* View Switcher: List vs Bento */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-muted/60 border border-border/80 self-start sm:self-auto">
              <button
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "list" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                title="List View"
              >
                <Rows size={13} weight="bold" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode("bento")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "bento" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Bento View"
              >
                <SquaresFour size={13} weight="bold" />
                <span>Cards</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {([
              { key: "all", label: isId ? "Semua" : "All" },
              { key: "web", label: "Fullstack" },
              { key: "systems", label: "Backend & Systems" },
              { key: "mobile", label: "Mobile" },
              { key: "ai", label: "AI & Data" },
            ] as { key: ProjectCategory; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.key
                    ? "bg-foreground text-background font-bold shadow-xs"
                    : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* VIEW 1: PACO-STYLE MINIMALIST LIST ROWS */}
          {viewMode === "list" && (
            <div className="divide-y divide-border/60">
              {displayedProjects.map((project) => {
                const isExpanded = expandedProjectId === project.id;
                return (
                  <article
                    key={project.id}
                    className="py-4.5 sm:py-5 first:pt-2 last:pb-2 group transition-all rounded-2xl hover:bg-card/60 px-2 sm:px-3 -mx-2 sm:-mx-3 flex flex-col gap-2.5"
                  >
                    {/* Main Row Line */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0">
                          {project.year}
                        </span>

                        <h3 className="text-sm sm:text-base font-bold text-foreground font-display tracking-tight group-hover:text-foreground">
                          {project.title}
                        </h3>

                        {project.id === "titik-aman" && (
                          <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground text-[10px] font-mono font-bold flex items-center gap-1 border border-foreground/15">
                            <Trophy size={11} weight="fill" />
                            Juara 1
                          </span>
                        )}

                        {project.isLive && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>

                      {/* Action Links & Quick Look */}
                      <div className="flex items-center gap-2.5 self-end sm:self-auto text-xs shrink-0 pt-1 sm:pt-0">
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors"
                          >
                            <span>Demo</span>
                            <ArrowUpRight size={12} weight="bold" />
                          </a>
                        )}

                        {project.githubUrl && project.githubUrl !== "#" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors"
                            title="Source Code"
                          >
                            <span>Code</span>
                            <ArrowUpRight size={12} weight="bold" />
                          </a>
                        )}

                        <button
                          onClick={() => toggleProjectExpand(project.id)}
                          className="inline-flex items-center gap-1 font-semibold text-foreground bg-muted hover:bg-muted/80 px-2 py-0.5 rounded-lg transition-colors cursor-pointer text-xs"
                        >
                          <MacQuickLookIcon className="w-3 h-3" />
                          <span>{isExpanded ? (isId ? "Tutup" : "Close") : "Detail"}</span>
                          {isExpanded ? <CaretUp size={11} weight="bold" /> : <CaretDown size={11} weight="bold" />}
                        </button>
                      </div>
                    </div>

                    {/* 1-Line Impact Summary */}
                    <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed sm:pl-13">
                      {project.shortDescription[language]}
                    </p>

                    {/* Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:pl-13 pt-0.5">
                      <span className="text-[10.5px] font-mono text-muted-foreground mr-1">
                        {project.role} &middot;
                      </span>
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2 py-0.5 rounded-md bg-muted text-foreground text-[10.5px] font-mono border border-border/50"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    {/* Inline Quick Look Inspector */}
                    {isExpanded && (
                      <div className="mt-2 p-4 sm:p-5 rounded-2xl bg-card border border-border sm:ml-13 space-y-3.5 text-xs shadow-xs animate-in fade-in duration-150">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                            {isId ? "Masalah & Solusi Arsitektur" : "Problem & Architectural Solution"}
                          </span>
                          <p className="text-foreground/90 leading-relaxed text-xs sm:text-[12.5px]">
                            {project.fullDescription[language]}
                          </p>
                        </div>

                        {project.features && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                              {isId ? "Fitur Utama" : "Key Capabilities"}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {project.features[language]?.map((f, i) => (
                                <div key={i} className="flex items-start gap-1.5 text-muted-foreground text-[11.5px]">
                                  <CheckCircle size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" weight="fill" />
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.challenges && project.solutions && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase block">
                                {isId ? "Tantangan" : "Engineering Challenge"}
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                {project.challenges[language]?.map((ch, i) => (
                                  <li key={i}>{ch}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase block">
                                {isId ? "Solusi" : "Solution"}
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                {project.solutions[language]?.map((sol, i) => (
                                  <li key={i}>{sol}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </article>
                );
              })}
            </div>
          )}

          {/* VIEW 2: RAUNO-STYLE MINIMAL CARDS */}
          {viewMode === "bento" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {displayedProjects.map((project) => {
                const isExpanded = expandedProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 bg-card ${
                      isExpanded ? "border-foreground/30 shadow-md sm:col-span-2" : "border-border/80 hover:border-foreground/30"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-muted-foreground">
                          {project.year}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors"
                              title="Live Demo"
                            >
                              <ArrowUpRight size={12} weight="bold" />
                            </a>
                          )}
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors"
                              title="Source Code"
                            >
                              <GithubIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-foreground font-display">
                        {project.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {project.shortDescription[language]}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-border/60">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-0.5 rounded bg-muted text-foreground text-[10.5px] font-mono"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleProjectExpand(project.id)}
                        className="w-full py-1 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <MacQuickLookIcon className="w-3 h-3" />
                        <span>{isExpanded ? (isId ? "Tutup Detail" : "Close") : (isId ? "Lihat Detail" : "Quick Look")}</span>
                        {isExpanded ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
                        <p className="text-foreground/90 leading-relaxed text-xs">
                          {project.fullDescription[language]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More / Show Less Toggle Button */}
          {filteredProjects.length > 4 && (
            <div className="pt-2 flex items-center justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-foreground/40 text-foreground text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>
                  {showAllProjects
                    ? (isId ? "Tampilkan 4 Unggulan Saja" : "Show Top 4 Only")
                    : (isId ? `Tampilkan Semua Proyek (${filteredProjects.length})` : `Show All Works (${filteredProjects.length})`)}
                </span>
                {!showAllProjects && (
                  <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground text-[10.5px] font-mono">
                    +{remainingCount}
                  </span>
                )}
                {showAllProjects ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
              </button>
            </div>
          )}

        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* ENGINEERING FOCUS / 3 PILLARS                                          */}
        {/* ----------------------------------------------------------------------- */}
        <section id="about" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight">
              {isId ? "Fokus Rekayasa & Standar Kualitas" : "Engineering Focus & Quality Standard"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isId ? "Prinsip arsitektur yang selalu saya pegang teguh" : "Core architectural principles applied across every system"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                <MacCpuIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">
                Concurrency & Systems
              </h3>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                Atomic DB locks, Redis queues, and sub-50ms WebSockets for high throughput.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                <MacGaugeIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">
                Quality & Performance
              </h3>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                Type-safe TypeScript, clean architecture, and strict 100/100 Lighthouse scores.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-xs">
                <MacTrophyIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-foreground">
                Leadership & Delivery
              </h3>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                Led 11 engineers (1st Place Winner Bootcamp 2026) and delivered 12+ prod apps.
              </p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Core Stack:
            </span>
            {["Laravel 12", "React 19", "Next.js 15", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "MySQL", "Redis", "WebSockets"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-card text-foreground font-mono text-[10.5px] border border-border/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* CAREER TRACK & MILESTONES (Lee Robinson Minimal Timeline)               */}
        {/* ----------------------------------------------------------------------- */}
        <section id="experience" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight">
              {isId ? "Rekam Jejak & Pengalaman" : "Career Track & Milestones"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isId ? "Jejak kepemimpinan dan pengiriman sistem nyata" : "Leadership milestones and production delivery track"}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 space-y-6 shadow-xs">
            
            {/* Milestone 1 */}
            <div className="relative pl-5 border-l-2 border-foreground space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-foreground">2026</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  Juara 1 IT Bootcamp 2026 & Lead Developer
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                  TitikAman Platform
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isId
                  ? "Memimpin 11 engineer membangun platform keamanan warga berbasis Laravel 12, Laravel Reverb (WebSockets), dan geolokasi berkecepatan sub-50ms. Meraih Juara 1 Nasional."
                  : "Led 11 engineers building a citizen safety broadcasting network powered by Laravel 12, Laravel Reverb (WebSockets), and sub-50ms geolocation SOS. Awarded 1st Place."}
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="relative pl-5 border-l-2 border-muted-foreground/40 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-foreground">2024 &ndash; Sekarang</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  Fullstack Software Engineer & Technical Consultant
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isId
                  ? "Mengembangkan lebih dari 12 sistem produksi untuk klien korporat dan logistik transportasi (TUJAGO, PHD Trans, SRB Motor, Makarya), mengimplementasikan antrian transaksi atomik dan payment gateway."
                  : "Delivered 12+ production web platforms for corporate and transport logistics clients (TUJAGO, PHD Trans, SRB Motor, Makarya), implementing atomic transaction queues and payment gateways."}
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="relative pl-5 border-l-2 border-muted-foreground/40 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-foreground">2024 &ndash; 2028 (Expected)</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  S1 Sistem Informasi &middot; Universitas Bina Sarana Informatika
                </span>
                <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-mono font-bold">
                  IPK 4.00 / 4.00
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isId
                  ? "Fokus mendalam pada Rekayasa Perangkat Lunak, Perancangan Basis Data Terdistribusi, dan Manajemen Sistem Informasi."
                  : "Specializing in Software Engineering, Distributed Database Architecture, and Enterprise Information Systems."}
              </p>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* DIRECT INQUIRY & CONTACT (Zero Friction)                                */}
        {/* ----------------------------------------------------------------------- */}
        <section id="contact" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight">
              {isId ? "Hubungi Langsung" : "Direct Inquiry & Contact"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isId ? "Kirim pesan untuk tawaran pekerjaan, proyek, atau kolaborasi teknis" : "Send a message for roles, contract projects, or technical consulting"}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold text-muted-foreground">
                    {isId ? "Nama Anda" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isId ? "Budi Santoso" : "Sarah Jenkins"}
                    className="w-full bg-background border border-border focus:border-foreground/60 rounded-xl px-3.5 py-2 text-xs text-foreground outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold text-muted-foreground">
                    {isId ? "Email Anda" : "Your Email"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-background border border-border focus:border-foreground/60 rounded-xl px-3.5 py-2 text-xs text-foreground outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-semibold text-muted-foreground">
                  {isId ? "Pesan / Kebutuhan" : "Message / Technical Scope"}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    isId
                      ? "Ceritakan tentang posisi, proyek, atau kebutuhan arsitektur Anda..."
                      : "Tell me about the role, project timeline, or system objectives..."
                  }
                  className="w-full bg-background border border-border focus:border-foreground/60 rounded-xl p-3 text-xs text-foreground outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <PaperPlaneRight size={14} weight="bold" />
                  <span>{formSent ? (isId ? "Pesan Terkirim!" : "Message Sent!") : (isId ? "Kirim Pesan" : "Send Message")}</span>
                </button>

                <span className="text-xs text-muted-foreground font-mono">
                  {isId ? "Balasan < 24 jam" : "Replies within 24h"}
                </span>
              </div>
            </form>
          </div>
        </section>

      </main>

    </div>
  );
}
