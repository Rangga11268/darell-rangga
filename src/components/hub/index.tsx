"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Code,
  Rows,
  SquaresFour,
  PaperPlaneRight,
  Cpu,
  CaretDown,
  CaretUp,
  CheckCircle,
  TerminalWindow,
} from "@phosphor-icons/react";
import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
  InstagramIcon,
} from "@/components/ui/brand-icons";

type ProjectCategory = "all" | "web" | "systems" | "mobile" | "ai";
type ViewMode = "list" | "bento" | "architecture";

interface TerminalHistory {
  command: string;
  output: string | React.ReactNode;
}

export function ExecutiveHub() {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("titik-aman");
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Terminal Sandbox State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    {
      command: "welcome",
      output: isId
        ? "Darell Rangga OS v2.6. Ketik 'help' atau klik tombol di bawah untuk melihat ringkasan kapabilitas."
        : "Darell Rangga OS v2.6. Type 'help' or tap quick actions below to inspect capabilities.",
    },
  ]);

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

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    let res: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        res = isId
          ? "Perintah tersedia: whoami, stack, projects, awards, contact, clear"
          : "Available commands: whoami, stack, projects, awards, contact, clear";
        break;
      case "whoami":
        res = isId
          ? "Darell Rangga | Fullstack Software Engineer & System Architect. Spesialis Laravel 12, React 19, Next.js 15, atomic transactions & real-time WebSockets."
          : "Darell Rangga | Fullstack Software Engineer & System Architect. Specializing in Laravel 12, React 19, Next.js 15, atomic transactions & real-time WebSockets.";
        break;
      case "stack":
        res = "TypeScript · React 19 · Next.js 15 · Laravel 12 · Vue 3 · Python FastAPI · PostgreSQL · MySQL · Redis · WebSockets · Tailwind CSS";
        break;
      case "projects":
        res = "1. TitikAman (Juara 1 IT Bootcamp) | 2. Tunggal Jaya (TUJAGO) | 3. Makarya Ecosystem | 4. SRB Motor V3 | 5. Faktanesia AI";
        break;
      case "awards":
        res = isId
          ? "🏆 Juara 1 IT Bootcamp 2026 (Lead Developer, memimpin 11 engineer) · 🎓 IPK 4.00/4.00 S1 Sistem Informasi UBSI"
          : "🏆 1st Place Winner IT Bootcamp 2026 (Lead Developer, 11 engineers) · 🎓 4.00/4.00 GPA in Information Systems at UBSI";
        break;
      case "contact":
        res = "Email: darellrangga@gmail.com | WA: +62 897-8638-973 | GitHub: github.com/Rangga11268";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "":
        return;
      default:
        res = isId
          ? `Perintah '${cmd}' tidak dikenali. Ketik 'help' untuk daftar perintah.`
          : `Command '${cmd}' not recognized. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { command: cmdStr, output: res }]);
    setTerminalInput("");
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "web") {
      return ["titik-aman", "tujago", "makarya", "phd-trans", "navara-trans", "janguleee-trans", "srb-motor-v3", "have-a-treat"].includes(p.id);
    }
    if (selectedCategory === "systems") {
      return ["titik-aman", "tujago", "makarya", "srb-motor-v3", "satya-hub"].includes(p.id);
    }
    if (selectedCategory === "mobile") {
      return ["makarya", "tujago", "srb-motor-app"].includes(p.id) || Boolean(p.hasMobileApp);
    }
    if (selectedCategory === "ai") {
      return ["faktanesia", "tirtasense", "aussie-rain-ai"].includes(p.id);
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans antialiased selection:bg-foreground selection:text-background flex flex-col items-center">
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/85 border-b border-border/60 py-3 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono tracking-tight group-hover:scale-105 transition-transform">
              DR
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground tracking-tight leading-none">
                Darell Rangga
              </span>
              <span className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                Engineer Studio
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors hidden sm:inline">
              {isId ? "Tentang" : "About"}
            </a>
            <a href="#projects" className="hover:text-foreground transition-colors">
              {isId ? "Karya" : "Work"}
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors hidden md:inline">
              {isId ? "Riwayat" : "Milestones"}
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              {isId ? "Kontak" : "Contact"}
            </a>

            <div className="h-3.5 w-px bg-border/80" />

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
          </nav>
        </div>
      </header>

      {/* 2. Main Studio Canvas: Desktop Split-Pane Layout */}
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT PANE: Sticky Profile, Proof Matrix, Action Cluster & Terminal       */}
          {/* ========================================================================= */}
          <aside className="w-full lg:sticky lg:top-20 flex flex-col gap-6" id="about">
            
            {/* Bio Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Fullstack Software Engineer</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display leading-[1.1]">
                Darell Rangga
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isId
                  ? "Merancang dan membangun arsitektur web performa tinggi, transaksi database atomik, dan sistem real-time terdistribusi dengan Laravel 12, React 19, dan Next.js 15."
                  : "Designing and engineering high-throughput web systems, atomic transaction pipelines, and real-time distributed architecture with Laravel 12, React 19, and Next.js 15."}
              </p>
            </div>

            {/* Proof Points Metric Grid */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-card border border-border/80">
              <div className="p-2 rounded-xl bg-background border border-border/60 text-center">
                <span className="text-xs font-mono font-bold text-foreground block">Juara 1</span>
                <span className="text-[10px] text-muted-foreground font-sans">Bootcamp 2026</span>
              </div>
              <div className="p-2 rounded-xl bg-background border border-border/60 text-center">
                <span className="text-xs font-mono font-bold text-foreground block">12+</span>
                <span className="text-[10px] text-muted-foreground font-sans">{isId ? "Sistem Prod" : "Prod Systems"}</span>
              </div>
              <div className="p-2 rounded-xl bg-background border border-border/60 text-center">
                <span className="text-xs font-mono font-bold text-foreground block">4.00</span>
                <span className="text-[10px] text-muted-foreground font-sans">IPK UBSI</span>
              </div>
            </div>

            {/* Direct Action Cluster */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  {copied ? <Check size={14} weight="bold" /> : <EnvelopeSimple size={14} weight="bold" />}
                  <span className="font-mono">{copied ? (isId ? "Email Tersalin!" : "Copied to Clipboard!") : "darellrangga@gmail.com"}</span>
                </button>

                <a
                  href="https://wa.me/628978638973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border/80 bg-card hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 text-foreground transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <WhatsappLogo size={18} weight="bold" />
                </a>

                <a
                  href="/pdf/Resume_Darell_Rangga_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
                  title="Download CV (PDF)"
                >
                  <FilePdf size={18} weight="bold" />
                </a>
              </div>

              {/* Socials Link Row */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 border border-border/60 text-xs">
                <span className="text-muted-foreground font-mono text-[11px]">Links & Profiles:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Rangga11268"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/darellrangga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#0a66c2] transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/ranggsdarell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="X"
                  >
                    <XTwitterIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/darellrangga17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#E4405F] transition-colors"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Sandbox */}
            <div className="rounded-2xl border border-border/80 bg-card/90 overflow-hidden text-xs shadow-xs font-mono">
              <div className="px-3 py-2 bg-muted/70 border-b border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-[10px] text-muted-foreground ml-1.5 font-bold">terminal.sh</span>
                </div>
                <TerminalWindow size={13} className="text-muted-foreground" />
              </div>

              <div className="p-3 max-h-44 overflow-y-auto space-y-2 text-[11px] leading-relaxed">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">&gt;</span>
                      <span>{item.command}</span>
                    </div>
                    <div className="text-foreground pl-3 text-[10.5px] border-l border-border/60">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Quick Command Pills */}
              <div className="px-3 py-1.5 bg-muted/30 border-t border-border/50 flex flex-wrap gap-1 text-[10px]">
                {["whoami", "stack", "projects", "awards", "contact", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-1.5 py-0.5 rounded bg-background border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(terminalInput);
                }}
                className="px-3 py-2 border-t border-border/60 flex items-center gap-1.5 bg-background/50"
              >
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={isId ? "Ketik perintah..." : "Type command..."}
                  className="w-full bg-transparent outline-none text-[11px] text-foreground placeholder:text-muted-foreground/60"
                />
              </form>
            </div>

            {/* Core Competencies Matrix */}
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 space-y-2.5">
              <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                {isId ? "Fokus Rekayasa" : "Engineering Core"}
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                {["Laravel 12", "React 19", "Next.js 15", "FastAPI", "WebSockets", "MySQL", "PostgreSQL", "Redis", "Tailwind v4"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-muted text-foreground border border-border/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </aside>

          {/* ========================================================================= */}
          {/* RIGHT PANE: Interactive Works, In-Place Case Studies & Experience         */}
          {/* ========================================================================= */}
          <main className="w-full flex flex-col gap-12 lg:gap-16">
            
            {/* SECTION: SELECTED WORKS */}
            <section id="projects" className="flex flex-col gap-5">
              
              {/* Header with View Switcher & Category Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-border/60">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    {isId ? "Karya Pilihan" : "Selected Works"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                    {isId ? "Proyek & Sistem Produksi" : "Projects & Production Systems"}
                  </h2>
                </div>

                {/* View Switcher: List vs Bento vs Code */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-card border border-border/70 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="List View"
                  >
                    <Rows size={13} weight="bold" />
                    <span>List</span>
                  </button>
                  <button
                    onClick={() => setViewMode("bento")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "bento" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Bento Grid View"
                  >
                    <SquaresFour size={13} weight="bold" />
                    <span>Bento</span>
                  </button>
                  <button
                    onClick={() => setViewMode("architecture")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "architecture" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Architecture View"
                  >
                    <Code size={13} weight="bold" />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
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
                        ? "bg-muted text-foreground border border-foreground/30 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* VIEW 1: REFINED LIST VIEW WITH INLINE CASE STUDY ACCORDION */}
              {viewMode === "list" && (
                <div className="divide-y divide-border/60">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <article
                        key={project.id}
                        className="py-5 first:pt-1 last:pb-1 group hover:bg-muted/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transition-colors flex flex-col gap-3"
                      >
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0">
                              {project.year}
                            </span>

                            <h3 className="text-base sm:text-lg font-bold text-foreground font-display tracking-tight">
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

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-3 self-end sm:self-auto text-xs shrink-0">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                                className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                                title="Source Code"
                              >
                                <span>Code</span>
                                <ArrowUpRight size={12} weight="bold" />
                              </a>
                            )}

                            <button
                              onClick={() => toggleProjectExpand(project.id)}
                              className="inline-flex items-center gap-1 font-semibold text-foreground bg-muted hover:bg-muted/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              <span>{isExpanded ? (isId ? "Tutup" : "Close") : (isId ? "Detail" : "Deep Dive")}</span>
                              {isExpanded ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                            </button>
                          </div>
                        </div>

                        {/* Short Summary */}
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
                              className="px-2 py-0.5 rounded-md bg-muted text-foreground text-[11px] font-mono font-medium border border-border/50"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>

                        {/* INLINE CASE STUDY ACCORDION (0ms latency, zero reload) */}
                        {isExpanded && (
                          <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-card border border-border sm:ml-14 space-y-4 text-xs animate-in fade-in duration-200">
                            
                            {/* Problem Statement */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                                {isId ? "Latar Belakang & Masalah" : "Problem Statement & Objective"}
                              </span>
                              <p className="text-foreground/90 leading-relaxed">
                                {project.fullDescription[language]}
                              </p>
                            </div>

                            {/* Features Grid */}
                            {project.features && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                                  {isId ? "Fitur Utama & Arsitektur" : "Key Engineering Capabilities"}
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {project.features[language]?.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-muted-foreground">
                                      <CheckCircle size={14} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" weight="fill" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Challenges & Solutions */}
                            {project.challenges && project.solutions && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/60">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                                    {isId ? "Tantangan Rekayasa" : "Engineering Challenges"}
                                  </span>
                                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {project.challenges[language]?.map((ch, i) => (
                                      <li key={i}>{ch}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                                    {isId ? "Solusi Arsitektur" : "Architectural Solutions"}
                                  </span>
                                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {project.solutions[language]?.map((sol, i) => (
                                      <li key={i}>{sol}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                            {/* Direct External Links */}
                            <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                              <span className="text-muted-foreground font-mono">
                                Role: <strong className="text-foreground">{project.role}</strong>
                              </span>
                              <div className="flex items-center gap-3">
                                {project.liveUrl && project.liveUrl !== "#" && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-bold text-foreground hover:underline"
                                  >
                                    <span>Buka Live App</span>
                                    <ArrowUpRight size={13} weight="bold" />
                                  </a>
                                )}
                                {project.githubUrl && project.githubUrl !== "#" && (
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-bold text-foreground hover:underline"
                                  >
                                    <span>Lihat Repositori</span>
                                    <ArrowUpRight size={13} weight="bold" />
                                  </a>
                                )}
                              </div>
                            </div>

                          </div>
                        )}

                      </article>
                    );
                  })}
                </div>
              )}

              {/* VIEW 2: MODULAR BENTO GRID VIEW */}
              {viewMode === "bento" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <div
                        key={project.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                          isExpanded
                            ? "bg-card border-foreground/30 shadow-md md:col-span-2"
                            : "bg-card/70 border-border/80 hover:border-foreground/30 hover:bg-card"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono font-bold text-muted-foreground">
                                {project.year}
                              </span>
                              {project.id === "titik-aman" && (
                                <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-mono font-bold flex items-center gap-1">
                                  <Trophy size={11} weight="fill" />
                                  Juara 1
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {project.liveUrl && project.liveUrl !== "#" && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors"
                                  title="Live Demo"
                                >
                                  <ArrowUpRight size={13} weight="bold" />
                                </a>
                              )}
                              {project.githubUrl && project.githubUrl !== "#" && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors"
                                  title="Source Code"
                                >
                                  <Code size={13} weight="bold" />
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

                        <div className="space-y-3 pt-2 border-t border-border/60">
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
                            className="w-full py-1.5 rounded-xl bg-muted/80 hover:bg-muted text-foreground text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>{isExpanded ? (isId ? "Tutup Detail" : "Close Details") : (isId ? "Buka Studi Kasus" : "View Case Study")}</span>
                            {isExpanded ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
                          </button>
                        </div>

                        {/* Inline Expand for Bento */}
                        {isExpanded && (
                          <div className="p-4 rounded-xl bg-background border border-border space-y-3 text-xs">
                            <p className="text-foreground/90 leading-relaxed">
                              {project.fullDescription[language]}
                            </p>
                            {project.features && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {project.features[language]?.map((f, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                                    <CheckCircle size={13} className="text-emerald-700 dark:text-emerald-400 shrink-0" weight="fill" />
                                    <span>{f}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW 3: ARCHITECTURE & CODE INSPECTOR VIEW */}
              {viewMode === "architecture" && (
                <div className="space-y-6">
                  {filteredProjects.slice(0, 4).map((project) => (
                    <div key={project.id} className="p-5 rounded-2xl border border-border bg-card/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu size={18} className="text-emerald-700 dark:text-emerald-400" />
                          <h3 className="text-sm font-bold text-foreground font-mono">{project.title} &middot; Architecture</h3>
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">{project.role}</span>
                      </div>

                      <div className="p-4 rounded-xl bg-background border border-border/80 font-mono text-[11px] space-y-2 text-muted-foreground">
                        <div className="text-foreground font-bold">{"// Production Architecture Spec"}</div>
                        <div>Role: {project.role}</div>
                        <div>Stack: {project.techStack.map((t) => t.name).join(" + ")}</div>
                        <div className="text-foreground/90 pt-1">{"// Core Logic:"}</div>
                        <p className="text-xs text-foreground/80 leading-relaxed font-sans">{project.fullDescription[language]}</p>
                      </div>

                      {project.solutions && (
                        <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">Architecture Highlights:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                            {project.solutions[language]?.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </section>

            {/* SECTION: EXPERIENCE & MILESTONES */}
            <section id="experience" className="flex flex-col gap-6 pt-4 border-t border-border/60">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  {isId ? "Rekam Jejak" : "Career Track"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                  {isId ? "Pengalaman & Prestasi Rekayasa" : "Experience & Engineering Milestones"}
                </h2>
              </div>

              <div className="relative border-l border-border/80 pl-6 ml-3 space-y-8">
                {/* Milestone 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-foreground border-2 border-background" />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-foreground">
                        2026
                      </span>
                      <span className="text-xs font-semibold text-foreground">
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
                </div>

                {/* Milestone 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-muted-foreground border-2 border-background" />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-foreground">
                        2024 &ndash; Sekarang
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        Fullstack Software Engineer & Technical Consultant
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isId
                        ? "Mengembangkan lebih dari 12 sistem produksi untuk klien korporat dan transportasi publik (TUJAGO, PHD Trans, SRB Motor, Makarya), mengimplementasikan transaksi atomik dan integrasi payment gateway."
                        : "Delivered 12+ production web platforms for corporate and transport logistics clients (TUJAGO, PHD Trans, SRB Motor, Makarya), implementing atomic transaction queues and payment gateways."}
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-muted-foreground border-2 border-background" />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-foreground">
                        2024 &ndash; 2028 (Expected)
                      </span>
                      <span className="text-xs font-semibold text-foreground">
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
              </div>
            </section>

            {/* SECTION: CONTACT & PROJECT INQUIRY */}
            <section id="contact" className="flex flex-col gap-6 pt-4 border-t border-border/60">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  {isId ? "Inisiasi Kolaborasi" : "Direct Inquiry"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                  {isId ? "Mari Bangun Solusi Rekayasa Bersama" : "Let's Build Robust Systems Together"}
                </h2>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl border border-border/80 bg-card/70 space-y-5">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold text-muted-foreground">
                        {isId ? "Nama Anda" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isId ? "Budi Santoso" : "Sarah Jenkins"}
                        className="w-full bg-background border border-border/80 focus:border-foreground/50 rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-colors"
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
                        className="w-full bg-background border border-border/80 focus:border-foreground/50 rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-semibold text-muted-foreground">
                      {isId ? "Pesan / Kebutuhan Teknis" : "Message / Technical Scope"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={
                        isId
                          ? "Ceritakan mengenai proyek, arsitektur yang dibutuhkan, atau posisi yang Anda tawarkan..."
                          : "Tell me about the role, technical requirements, or system objectives..."
                      }
                      className="w-full bg-background border border-border/80 focus:border-foreground/50 rounded-xl p-3.5 text-xs text-foreground outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      <PaperPlaneRight size={14} weight="bold" />
                      <span>{formSent ? (isId ? "Pesan Terkirim!" : "Message Sent!") : (isId ? "Kirim Pesan" : "Send Inquiry")}</span>
                    </button>

                    <span className="text-xs text-muted-foreground font-mono">
                      {isId ? "Respons < 24 jam" : "Replies within 24h"}
                    </span>
                  </div>
                </form>
              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
