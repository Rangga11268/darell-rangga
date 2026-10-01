"use client";

import React, { useState, useEffect } from "react";
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
  PaperPlaneRight,
  CaretDown,
  CaretUp,
  CheckCircle,
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
  const [activeSection, setActiveSection] = useState<string>("overview");

  const email = "darellrangga@gmail.com";

  // Active section scroll spy
  useEffect(() => {
    const sections = ["overview", "projects", "architecture", "experience", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Asymmetric Sticky Identity & Navigation                  */}
          {/* ===================================================================== */}
          <aside className="lg:col-span-4 lg:sticky lg:top-12 space-y-7">
            
            {/* Identity & Photo Header */}
            <div className="space-y-4">
              <div className="relative group w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-muted/60 p-1 border border-border/70 overflow-hidden flex items-end justify-center shadow-xs">
                <Image
                  src="/img/saya/saya1.webp"
                  alt="Darell Rangga"
                  width={180}
                  height={180}
                  className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground font-display">
                  Darell Rangga
                </h1>
                <p className="text-xs sm:text-[13px] font-mono text-muted-foreground mt-0.5">
                  Fullstack Software Engineer
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isId ? "Tersedia untuk Rekrutmen" : "Available for select roles"}</span>
              </div>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
              {isId
                ? "Merancang dan membangun arsitektur backend berkecepatan tinggi dengan transaksi database atomik (Laravel 12, PostgreSQL), antrean Redis, dan frontend reaktif sub-milidetik (React 19, Next.js 15)."
                : "Architecting high-throughput backend infrastructure with atomic database locks (Laravel 12, PostgreSQL), Redis queues, and sub-millisecond reactive frontends (React 19, Next.js 15)."}
            </p>

            {/* Numbered Section Index Navigation (Desktop only) */}
            <nav className="hidden lg:block space-y-1 font-mono text-xs pt-1">
              {[
                { href: "#overview", id: "overview", label: isId ? "Ringkasan" : "Overview", num: "01" },
                { href: "#projects", id: "projects", label: isId ? "Karya Pilihan" : "Selected Works", num: "02" },
                { href: "#architecture", id: "architecture", label: isId ? "Pilar Rekayasa" : "Architecture", num: "03" },
                { href: "#experience", id: "experience", label: isId ? "Rekam Jejak" : "Experience", num: "04" },
                { href: "#contact", id: "contact", label: isId ? "Kontak" : "Contact", num: "05" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.num}
                    href={item.href}
                    className={`group flex items-center gap-3 py-1.5 transition-colors ${
                      isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`text-[10.5px] transition-colors ${
                      isActive ? "text-foreground font-bold" : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}>
                      {item.num}
                    </span>
                    <span className="font-sans text-xs tracking-tight">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1 h-3 rounded-full bg-foreground" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Utility Strip: Clock, Lang, Theme, CV, Email */}
            <div className="pt-4 border-t border-border/60 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <LiveClock className="flex items-center gap-1 text-[11px]" suffix="WIB" />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleLanguage}
                    className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
                  >
                    {language.toUpperCase()}
                  </button>
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="p-1 rounded hover:bg-muted text-foreground transition-colors cursor-pointer"
                    title="Toggle theme"
                  >
                    {isDark ? <Sun size={13} weight="bold" /> : <Moon size={13} weight="bold" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/pdf/Resume_Darell_Rangga_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <FilePdf size={14} weight="bold" />
                  <span>Download CV</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copied ? <Check size={15} weight="bold" className="text-emerald-500" /> : <EnvelopeSimple size={15} weight="bold" />}
                </button>
                <a
                  href="https://wa.me/628978638973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-border bg-card hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-foreground transition-colors"
                  title="WhatsApp"
                >
                  <WhatsappLogo size={15} weight="bold" />
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 text-muted-foreground pt-0.5">
                <a href="https://github.com/Rangga11268" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" title="GitHub">
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a href="https://www.linkedin.com/in/darellrangga/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] transition-colors" title="LinkedIn">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a href="https://x.com/ranggsdarell" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" title="X (Twitter)">
                  <XTwitterIcon className="w-3.5 h-3.5" />
                </a>
                <a href="https://www.instagram.com/darellrangga17/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors" title="Instagram">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Open Editorial Content Stream (Zero Nested Card Slop)   */}
          {/* ===================================================================== */}
          <main className="lg:col-span-8 space-y-16 sm:space-y-20 pt-10 lg:pt-0">
            
            {/* ------------------------------------------------------------------- */}
            {/* 01. OVERVIEW & PROOF METRICS                                        */}
            {/* ------------------------------------------------------------------- */}
            <section id="overview" className="space-y-6 scroll-mt-16">
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  01 / {isId ? "Ringkasan Eksekutif" : "Executive Overview"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display leading-snug">
                  {isId
                    ? "Membangun sistem web tangguh dengan konsistensi data mutlak dan respons sub-50ms."
                    : "Engineering resilient web platforms with strict data consistency and sub-50ms response times."}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isId
                    ? "Saya berfokus pada perancangan arsitektur backend berkinerja tinggi, manajemen konkurensi data, dan integrasi API real-time. Berpengalaman memimpin tim engineering membangun solusi digital untuk sektor logistik, keselamatan publik, dan ekosistem bisnis."
                    : "Focused on high-performance backend architecture, database concurrency control, and real-time API integrations. Experienced leading engineering teams delivering production platforms across transport logistics, citizen safety, and enterprise operations."}
                </p>
              </div>

              {/* 3 Core Stats (Open Editorial Layout, High Contrast) */}
              <div className="grid grid-cols-3 gap-4 pt-3 pb-4 border-y border-border/70">
                <div className="space-y-0.5">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-foreground block">
                    Juara 1
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    {isId ? "IT Bootcamp 2026 (Lead)" : "IT Bootcamp 2026 (Lead)"}
                  </span>
                </div>
                <div className="space-y-0.5 sm:border-l sm:border-border/60 sm:pl-4">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-foreground block">
                    12+
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    {isId ? "Aplikasi Produksi" : "Production Systems"}
                  </span>
                </div>
                <div className="space-y-0.5 sm:border-l sm:border-border/60 sm:pl-4">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-foreground block">
                    4.00
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    {isId ? "IPK S1 UBSI" : "GPA (Information Systems)"}
                  </span>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------------- */}
            {/* 02. SELECTED WORKS (Paco Coursey / Pedro Duarte Typographic Stream) */}
            {/* ------------------------------------------------------------------- */}
            <section id="projects" className="space-y-6 scroll-mt-16">
              
              {/* Header & Category Filter Bar */}
              <div className="space-y-3.5 pb-2 border-b border-border/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      02 / {isId ? "Karya & Sistem" : "Selected Works"}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground font-display">
                      {isId ? "Sistem & Aplikasi Terpilih" : "Featured Production Systems"}
                    </h2>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/60 border border-border/70 self-start sm:self-auto">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        viewMode === "list" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("bento")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        viewMode === "bento" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Grid
                    </button>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
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
                      className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        selectedCategory === tab.key
                          ? "bg-foreground text-background font-bold"
                          : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIST VIEW (Paco / Pedro Duarte Craft Style) */}
              {viewMode === "list" && (
                <div className="divide-y divide-border/60">
                  {displayedProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <article
                        key={project.id}
                        className="py-5 first:pt-0 last:pb-0 group transition-all flex flex-col gap-2.5"
                      >
                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0">
                              {project.year}
                            </span>

                            <h3 className="text-base font-bold text-foreground font-display tracking-tight group-hover:text-foreground">
                              {project.title}
                            </h3>

                            {project.id === "titik-aman" && (
                              <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-mono font-bold flex items-center gap-1">
                                <Trophy size={11} weight="fill" />
                                Juara 1
                              </span>
                            )}

                            {project.isLive && (
                              <span className="px-2 py-0.5 rounded bg-muted text-foreground text-[10px] font-mono font-medium flex items-center gap-1 border border-border/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                              </span>
                            )}
                          </div>

                          {/* Quick Action Links */}
                          <div className="flex items-center gap-3 self-end sm:self-auto text-xs shrink-0">
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
                              className="inline-flex items-center gap-1 text-foreground bg-muted hover:bg-muted/80 px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer"
                            >
                              <MacQuickLookIcon className="w-3 h-3" />
                              <span>{isExpanded ? (isId ? "Tutup" : "Close") : "Detail"}</span>
                              {isExpanded ? <CaretUp size={11} weight="bold" /> : <CaretDown size={11} weight="bold" />}
                            </button>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed sm:pl-13.5">
                          {project.shortDescription[language]}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:pl-13.5 pt-0.5">
                          <span className="text-[10.5px] font-mono text-muted-foreground mr-1">
                            {project.role} :
                          </span>
                          {project.techStack.map((tech) => (
                            <span
                              key={tech.name}
                              className="px-2 py-0.5 rounded bg-muted/60 text-foreground text-[10.5px] font-mono border border-border/50"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>

                        {/* Inline Case Details (with screenshot preview) */}
                        {isExpanded && (
                          <div className="mt-2.5 p-4 sm:p-5 rounded-xl bg-card border border-border sm:ml-13.5 space-y-4 text-xs shadow-xs animate-in fade-in duration-150">
                            
                            {/* Visual Thumbnail Preview */}
                            {project.imageUrl && (
                              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-lg overflow-hidden border border-border/60 bg-muted/40">
                                <Image
                                  src={project.imageUrl}
                                  alt={project.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 600px"
                                  className="object-cover object-center"
                                />
                              </div>
                            )}

                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                                {isId ? "Arsitektur & Solusi" : "Architecture & Solution"}
                              </span>
                              <p className="text-foreground/90 leading-relaxed text-xs sm:text-[12.5px]">
                                {project.fullDescription[language]}
                              </p>
                            </div>

                            {project.features && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                                  {isId ? "Fitur Utama" : "Key Features"}
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
                          </div>
                        )}

                      </article>
                    );
                  })}
                </div>
              )}

              {/* GRID VIEW */}
              {viewMode === "bento" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between transition-all hover:border-foreground/40 shadow-xs"
                    >
                      {/* Card Thumbnail */}
                      {project.imageUrl && (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border/60">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                          {project.isLive && (
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-card/90 backdrop-blur-md text-foreground text-[10px] font-mono font-medium flex items-center gap-1 border border-border/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live
                            </span>
                          )}
                        </div>
                      )}

                      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                            <span>{project.year}</span>
                            <div className="flex items-center gap-2.5">
                              {project.liveUrl && project.liveUrl !== "#" && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground font-medium flex items-center gap-0.5">
                                  <span>Demo</span>
                                  <ArrowUpRight size={11} weight="bold" />
                                </a>
                              )}
                              {project.githubUrl && project.githubUrl !== "#" && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground font-medium flex items-center gap-0.5">
                                  <span>Code</span>
                                  <ArrowUpRight size={11} weight="bold" />
                                </a>
                              )}
                            </div>
                          </div>

                          <h3 className="text-base font-bold text-foreground font-display">
                            {project.title}
                          </h3>

                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {project.shortDescription[language]}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-2.5 border-t border-border/60">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span key={tech.name} className="px-2 py-0.5 rounded bg-muted text-foreground text-[10px] font-mono">
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Show More / Show Less Toggle */}
              {filteredProjects.length > 4 && (
                <div className="pt-2 flex items-center justify-start">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:underline cursor-pointer"
                  >
                    <span>
                      {showAllProjects
                        ? (isId ? "Tampilkan 4 Proyek Saja" : "Show 4 Projects Only")
                        : (isId ? `Lihat Semua Proyek (+${remainingCount} Lainnya)` : `View All Works (+${remainingCount} More)`)}
                    </span>
                    {showAllProjects ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                  </button>
                </div>
              )}

            </section>

            {/* ------------------------------------------------------------------- */}
            {/* 03. ENGINEERING ARCHITECTURE & 3 PILLARS                            */}
            {/* ------------------------------------------------------------------- */}
            <section id="architecture" className="space-y-6 scroll-mt-16">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  03 / {isId ? "Pilar Rekayasa" : "Engineering Architecture"}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-foreground font-display">
                  {isId ? "Standar Mutu & Filosofi Rekayasa" : "Quality Standards & Core Pillars"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pillar 1 */}
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-muted text-foreground flex items-center justify-center border border-border/60">
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
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-muted text-foreground flex items-center justify-center border border-border/60">
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
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-muted text-foreground flex items-center justify-center border border-border/60">
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

              {/* Core Stack */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mr-1">
                  Core Technologies:
                </span>
                {["Laravel 12", "React 19", "Next.js 15", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "MySQL", "Redis", "WebSockets"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-muted/60 text-foreground font-mono text-[10.5px] border border-border/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------------------------- */}
            {/* 04. EXPERIENCE & MILESTONES (Lee Robinson Minimal Timeline)         */}
            {/* ------------------------------------------------------------------- */}
            <section id="experience" className="space-y-6 scroll-mt-16">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  04 / {isId ? "Rekam Jejak" : "Career Track"}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-foreground font-display">
                  {isId ? "Pengalaman & Kepemimpinan" : "Experience & Milestones"}
                </h2>
              </div>

              <div className="space-y-6 pl-4 border-l-2 border-border/80">
                {/* 2026 Bootcamp */}
                <div className="space-y-1 relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-foreground">2026</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      Juara 1 IT Bootcamp 2026 & Lead Developer
                    </span>
                    <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-mono font-bold">
                      TitikAman Platform
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isId
                      ? "Memimpin 11 engineer membangun platform keamanan warga berbasis Laravel 12, Laravel Reverb (WebSockets), dan geolokasi berkecepatan sub-50ms. Meraih Juara 1 Nasional."
                      : "Led 11 engineers building a citizen safety broadcasting network powered by Laravel 12, Laravel Reverb (WebSockets), and sub-50ms geolocation SOS. Awarded 1st Place."}
                  </p>
                </div>

                {/* 2024 to Present */}
                <div className="space-y-1 relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground border-2 border-background" />
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

                {/* UBSI */}
                <div className="space-y-1 relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground border-2 border-background" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-foreground">2024 &ndash; 2028 (Expected)</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      S1 Sistem Informasi, Universitas Bina Sarana Informatika
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

            {/* ------------------------------------------------------------------- */}
            {/* 05. DIRECT INQUIRY & CONTACT                                        */}
            {/* ------------------------------------------------------------------- */}
            <section id="contact" className="space-y-5 scroll-mt-16">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  05 / {isId ? "Kontak Langsung" : "Direct Contact"}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-foreground font-display">
                  {isId ? "Kirim Pesan atau Pertanyaan" : "Get In Touch"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {isId ? "Kirim pesan langsung untuk peluang kerja sama atau proyek." : "Reach out directly for engineering roles or technical projects."}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={isId ? "Nama Anda" : "Your Name"}
                    className="w-full bg-card border border-border/80 focus:border-foreground/70 rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-card border border-border/80 focus:border-foreground/70 rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-colors"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    isId
                      ? "Ceritakan tentang posisi, proyek, atau kebutuhan arsitektur Anda..."
                      : "Tell me about the role, project timeline, or system requirements..."
                  }
                  className="w-full bg-card border border-border/80 focus:border-foreground/70 rounded-xl p-3.5 text-xs text-foreground outline-none transition-colors resize-none"
                />
                <div className="flex items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
                  >
                    <PaperPlaneRight size={14} weight="bold" />
                    <span>{formSent ? (isId ? "Pesan Terkirim!" : "Message Sent!") : (isId ? "Kirim Pesan" : "Send Message")}</span>
                  </button>
                  <span className="text-xs text-muted-foreground font-mono">
                    darellrangga@gmail.com
                  </span>
                </div>
              </form>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
