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
} from "@phosphor-icons/react";
import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
} from "@/components/ui/brand-icons";

type ProjectCategory = "all" | "web" | "systems" | "mobile" | "ai";
type ViewMode = "list" | "bento" | "architecture";
type CodeTab = "titikaman" | "makarya" | "tujago";

export function ExecutiveHub() {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("titikaman");

  // Interactive Mini Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "whoami",
      output: "Darell Rangga — Fullstack Software Engineer & System Architect. Champion IT Bootcamp 2026 (Led 11 Engineers).",
    },
  ]);

  const email = "darellrangga@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpandProject = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const executeTerminalCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    switch (cmd) {
      case "help":
        output = "Available commands: whoami, stack, projects, awards, contact, clear";
        break;
      case "whoami":
        output = "Darell Rangga — Fullstack Software Engineer & System Architect (Laravel 12, React 19, Next.js 15, Flutter). IPK 4.00/4.00 UBSI.";
        break;
      case "stack":
        output = "Backend: Laravel 12, PHP 8.3, WebSockets, Reverb, MySQL. Frontend: Next.js 15, React 19, TypeScript, Tailwind v4. Mobile: Flutter.";
        break;
      case "projects":
        output = "12+ Production Systems: TitikAman (Emergency Broadcast), TUJAGO (Fleet Logistics), Makarya (Escrow Platform), SRB Motor V3, Satya Hub, AussieRain AI.";
        break;
      case "awards":
        output = "Juara 1 IT Bootcamp 2026 (National Winner - TitikAman Citizen Safety Network).";
        break;
      case "contact":
        output = "Email: darellrangga@gmail.com | WhatsApp: +62 897-8638-973 | GitHub: github.com/Rangga11268";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = `Command not found: "${cmd}". Type "help" for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setTerminalInput("");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTerminalCommand(terminalInput);
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
      
      {/* 1. Global Floating Glass Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 py-3 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono tracking-tight group-hover:scale-105 transition-transform">
              DR
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight leading-none">
                Darell Rangga
              </span>
              <span className="text-[10px] font-mono text-muted-foreground leading-tight hidden sm:block">
                Fullstack Software Engineer
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-muted-foreground">
              <a href="#about" className="hover:text-foreground transition-colors">
                {isId ? "Profil" : "Profile"}
              </a>
              <a href="#projects" className="hover:text-foreground transition-colors">
                {isId ? "Karya" : "Projects"}
              </a>
              <a href="#experience" className="hover:text-foreground transition-colors">
                {isId ? "Pengalaman" : "Experience"}
              </a>
              <a href="#architecture" className="hover:text-foreground transition-colors">
                {isId ? "Arsitektur" : "Architecture"}
              </a>
              <a href="#contact" className="hover:text-foreground transition-colors">
                {isId ? "Kontak" : "Contact"}
              </a>
            </nav>

            <div className="h-3.5 w-px bg-border/80 hidden sm:block" />

            <div className="flex items-center gap-2">
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-md text-[11px] font-mono font-bold hover:bg-muted text-foreground transition-colors cursor-pointer"
                title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              >
                {language.toUpperCase()}
              </button>

              {/* Dark/Light Mode Switch */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-1.5 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Multi-Pane Studio Layout */}
      <main className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col lg:flex-row gap-12 lg:gap-14">
        
        {/* LEFT COLUMN: Sticky Profile, Proof Matrix & Interactive Terminal */}
        <aside className="w-full lg:w-[42%] flex flex-col gap-8 lg:sticky lg:top-20 lg:self-start">
          
          {/* Hero Profile Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-muted border border-border/80 flex items-center justify-center font-bold text-lg font-mono text-foreground shadow-xs">
                DR
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display">
                  Darell Rangga
                </h1>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                  Fullstack Engineer & System Architect
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isId
                ? "Merancang dan merekayasa sistem web skala tinggi, arsitektur WebSockets real-time, dan transaksi database atomik. Lead Developer Juara 1 IT Bootcamp 2026 (TitikAman, memimpin tim 11 orang). Mahasiswa S1 Sistem Informasi UBSI dengan IPK 4.00/4.00."
                : "Architecting high-concurrency web systems, real-time WebSockets networks, and atomic database transactions. Champion Lead Developer at IT Bootcamp 2026 (TitikAman, led 11 engineers). Studying Information Systems at UBSI with a 4.00/4.00 GPA."}
            </p>
          </div>

          {/* 3-Proof Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-foreground">
                <Trophy size={13} weight="fill" className="text-amber-500" />
                <span>Juara 1</span>
              </div>
              <span className="text-[10px] text-muted-foreground leading-tight">
                IT Bootcamp 2026 (Lead 11 Devs)
              </span>
            </div>

            <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-foreground">
                <Cpu size={13} weight="bold" />
                <span>12+ Apps</span>
              </div>
              <span className="text-[10px] text-muted-foreground leading-tight">
                Production Systems Shipped
              </span>
            </div>

            <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-foreground">
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">4.00</span>
              </div>
              <span className="text-[10px] text-muted-foreground leading-tight">
                IPK / 4.00 (UBSI S1 SI)
              </span>
            </div>
          </div>

          {/* Direct CTA Action Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {copied ? <Check size={14} weight="bold" /> : <EnvelopeSimple size={14} weight="bold" />}
              <span>{copied ? (isId ? "Disalin!" : "Copied!") : "darellrangga@gmail.com"}</span>
            </button>

            <a
              href="https://wa.me/628978638973"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground text-xs font-semibold active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <WhatsappLogo size={14} weight="fill" className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <a
              href={isId ? "/pdf/Resume_Darell_Rangga_ID.pdf" : "/pdf/Resume_Darell_Rangga_EN.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground text-xs font-semibold active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <FilePdf size={14} weight="bold" />
              <span>CV</span>
            </a>

            <div className="flex items-center gap-1 pl-1">
              <a
                href="https://github.com/Rangga11268"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/darellrangga/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-[#0a66c2] hover:bg-muted transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ranggsdarell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive Engineering Terminal Sandbox */}
          <div className="rounded-2xl border border-border/80 bg-card/80 overflow-hidden shadow-xs">
            <div className="px-3.5 py-2 border-b border-border/60 bg-muted/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-1 text-foreground font-semibold">terminal.sh</span>
              </div>
              <span className="text-[10px]">interactive</span>
            </div>

            <div className="p-3.5 space-y-2.5 font-mono text-xs max-h-48 overflow-y-auto">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">$</span>
                    <span className="text-foreground">{item.cmd}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed pl-3 border-l border-border/70">
                    {item.output}
                  </div>
                </div>
              ))}

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 pt-1">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help', 'stack', 'awards'..."
                  className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 outline-none"
                />
              </form>
            </div>

            {/* Quick Command Pills */}
            <div className="px-3 py-2 border-t border-border/50 bg-muted/20 flex flex-wrap gap-1">
              {["whoami", "stack", "projects", "awards", "contact", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeTerminalCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Interactive Work Studio & In-Place Deep Dives */}
        <section className="w-full lg:w-[58%] flex flex-col gap-12">
          
          {/* Works Header with Interactive View Switcher */}
          <div id="projects" className="flex flex-col gap-4 pb-2 border-b border-border/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  {isId ? "Karya & Arsitektur" : "Engineering Showcase"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                  {isId ? "Proyek & Sistem Produksi" : "Projects & Production Systems"}
                </h2>
              </div>

              {/* View Switcher */}
              <div className="inline-flex items-center p-1 rounded-xl border border-border/80 bg-card self-start sm:self-auto">
                <button
                  onClick={() => setViewMode("list")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="List View"
                >
                  <Rows size={13} weight="bold" />
                  <span>List</span>
                </button>

                <button
                  onClick={() => setViewMode("bento")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === "bento"
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Bento Grid View"
                >
                  <SquaresFour size={13} weight="bold" />
                  <span>Bento</span>
                </button>

                <button
                  onClick={() => setViewMode("architecture")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === "architecture"
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Architecture & Code"
                >
                  <Code size={13} weight="bold" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {([
                { key: "all", label: isId ? "Semua" : "All" },
                { key: "web", label: "Fullstack" },
                { key: "systems", label: "Backend" },
                { key: "mobile", label: "Mobile" },
                { key: "ai", label: "AI & Data" },
              ] as { key: ProjectCategory; label: string }[]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === tab.key
                      ? "bg-muted text-foreground font-bold border border-border/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC VIEW CONTAINER */}
          <div>
            {/* 1. LIST VIEW (In-Place Interactive Accordion Stream) */}
            {viewMode === "list" && (
              <div className="divide-y divide-border/60">
                {filteredProjects.map((project) => {
                  const isExpanded = expandedProjectId === project.id;
                  const features = project.features?.[language] || [];
                  const challenges = project.challenges?.[language] || [];
                  const solutions = project.solutions?.[language] || [];

                  return (
                    <div
                      key={project.id}
                      className="py-4 first:pt-1 last:pb-1 group hover:bg-muted/20 px-3.5 -mx-3.5 rounded-2xl transition-colors flex flex-col gap-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0">
                            {project.year}
                          </span>

                          <button
                            onClick={() => toggleExpandProject(project.id)}
                            className="text-base font-bold text-foreground font-display tracking-tight hover:underline underline-offset-4 flex items-center gap-1.5 cursor-pointer text-left"
                          >
                            <span>{project.title}</span>
                          </button>

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

                        {/* Direct Action Links */}
                        <div className="flex items-center gap-2.5 self-end sm:self-auto text-xs shrink-0">
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <span>Live</span>
                              <ArrowUpRight size={12} weight="bold" />
                            </a>
                          )}

                          {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                              title="GitHub Code"
                            >
                              <span>Code</span>
                              <ArrowUpRight size={12} weight="bold" />
                            </a>
                          )}

                          <button
                            onClick={() => toggleExpandProject(project.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              isExpanded
                                ? "bg-foreground text-background"
                                : "text-foreground bg-muted hover:bg-muted/80"
                            }`}
                          >
                            <span>{isExpanded ? (isId ? "Tutup" : "Close") : (isId ? "Detail" : "Details")}</span>
                            {isExpanded ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed sm:pl-14">
                        {project.shortDescription[language]}
                      </p>

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

                      {/* IN-PLACE EXPANDED CASE STUDY ACCORDION */}
                      {isExpanded && (
                        <div className="mt-3 sm:ml-14 p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/90 space-y-4 text-xs transition-all shadow-xs">
                          {/* Full Overview */}
                          <div className="space-y-1.5">
                            <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-muted-foreground block">
                              {isId ? "Arsitektur & Gambaran Sistem" : "System Architecture & Overview"}
                            </span>
                            <p className="text-foreground/90 leading-relaxed text-xs sm:text-sm">
                              {project.fullDescription?.[language] || project.shortDescription[language]}
                            </p>
                          </div>

                          {/* Core Engineering Features */}
                          {features.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-border/50">
                              <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-muted-foreground block">
                                {isId ? "Kapabilitas & Fitur Utama" : "Key Engineering Capabilities"}
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {features.map((f, idx) => (
                                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-muted/40 border border-border/40">
                                    <CheckCircle size={14} weight="fill" className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="text-foreground/90 leading-tight">{f}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Challenges & Solutions */}
                          {challenges.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-border/50">
                              <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-muted-foreground block">
                                {isId ? "Tantangan & Solusi Rekayasa" : "Engineering Challenges & Solutions"}
                              </span>
                              <div className="space-y-2">
                                {challenges.map((ch, idx) => (
                                  <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/40 space-y-1">
                                    <div className="font-bold text-foreground">
                                      {isId ? `Tantangan #${idx + 1}: ` : `Challenge #${idx + 1}: `}
                                      <span className="font-normal text-muted-foreground">{ch}</span>
                                    </div>
                                    {solutions[idx] && (
                                      <div className="text-foreground/90 font-medium">
                                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">{isId ? "Solusi: " : "Solution: "}</span>
                                        {solutions[idx]}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick Bottom Actions inside Accordion */}
                          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                            <span className="font-mono text-muted-foreground text-[11px]">
                              {project.year} &middot; {project.role}
                            </span>

                            <div className="flex items-center gap-2">
                              {project.liveUrl && project.liveUrl !== "#" && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-foreground text-background font-bold text-[11px] hover:opacity-90"
                                >
                                  <span>Live Demo</span>
                                  <ArrowUpRight size={11} weight="bold" />
                                </a>
                              )}
                              {project.githubUrl && project.githubUrl !== "#" && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-border/80 bg-card hover:bg-muted font-semibold text-foreground text-[11px]"
                                >
                                  <GithubIcon className="w-3.5 h-3.5" />
                                  <span>Source Code</span>
                                  <ArrowUpRight size={11} weight="bold" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. BENTO GRID VIEW */}
            {viewMode === "bento" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl border border-border/80 bg-card/70 hover:border-foreground/30 hover:shadow-xs transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-muted-foreground">{project.year}</span>
                        <div className="flex items-center gap-1">
                          {project.id === "titik-aman" && (
                            <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground text-[10px] font-mono font-bold">
                              Juara 1
                            </span>
                          )}
                          {project.isLive && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                              Live
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-foreground font-display tracking-tight group-hover:underline">
                        <button onClick={() => { setViewMode("list"); setExpandedProjectId(project.id); }} className="text-left cursor-pointer">
                          {project.title}
                        </button>
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {project.shortDescription[language]}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border/50">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-foreground"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          onClick={() => {
                            setViewMode("list");
                            setExpandedProjectId(project.id);
                          }}
                          className="font-semibold text-foreground hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isId ? "Buka Kasus" : "Case Study"}</span>
                          <CaretDown size={12} weight="bold" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Live Demo"
                            >
                              <ArrowUpRight size={14} weight="bold" />
                            </a>
                          )}
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Source Code"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. ARCHITECTURE & CODE LAB VIEW */}
            {viewMode === "architecture" && (
              <div id="architecture" className="space-y-5">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  {([
                    { key: "titikaman", label: "TitikAman WebSockets (Laravel 12)" },
                    { key: "makarya", label: "Makarya Escrow Engine (FastAPI)" },
                    { key: "tujago", label: "TUJAGO Fleet Cache (Next.js 15)" },
                  ] as { key: CodeTab; label: string }[]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCodeTab(tab.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        activeCodeTab === tab.key
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Code Snippet Box */}
                <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
                  <div className="px-4 py-2.5 bg-muted/40 border-b border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>
                      {activeCodeTab === "titikaman" && "app/Events/EmergencyBroadcastEvent.php"}
                      {activeCodeTab === "makarya" && "app/services/escrow_state_machine.py"}
                      {activeCodeTab === "tujago" && "app/api/fleet/schedule-cache.ts"}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">100% Tested Production</span>
                  </div>

                  <pre className="p-4 text-xs font-mono text-foreground/90 overflow-x-auto leading-relaxed bg-neutral-950 text-neutral-100 dark:bg-black">
                    {activeCodeTab === "titikaman" && (
`namespace App\\Events;

use App\\Models\\EmergencyAlert;
use Illuminate\\Broadcasting\\Channel;
use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcastNow;

class EmergencyBroadcastEvent implements ShouldBroadcastNow
{
    public function __construct(public EmergencyAlert $alert) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('emergency.region.' . $this->alert->district_code),
            new Channel('emergency.global')
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->alert->id,
            'level' => $this->alert->severity_level,
            'coordinates' => [
                'lat' => $this->alert->latitude,
                'lng' => $this->alert->longitude
            ],
            'timestamp' => now()->toIso8601String()
        ];
    }
}`
                    )}

                    {activeCodeTab === "makarya" && (
`class EscrowStateMachine:
    def __init__(self, transaction_id: str, db: Session):
        self.tx = db.query(Transaction).filter_by(id=transaction_id).first()
        self.db = db

    def release_to_freelancer(self, client_verified: bool):
        if not client_verified or self.tx.status != EscrowStatus.HELD_IN_ESCROW:
            raise InvalidStateTransitionException("Escrow funds locked")
            
        with self.db.begin_nested():
            self.tx.status = EscrowStatus.RELEASED
            self.tx.payout_dispatched_at = datetime.utcnow()
            dispatch_webhook_notification(self.tx.student_id, "FUNDS_RELEASED")
        self.db.commit()
        return {"status": "SUCCESS", "tx_id": self.tx.id}`
                    )}

                    {activeCodeTab === "tujago" && (
`import { revalidateTag, unstable_cache } from "next/cache";

export const getCachedFleetSchedules = unstable_cache(
  async (routeId: string) => {
    const schedules = await db.busSchedule.findMany({
      where: { routeId, active: true },
      include: { busUnit: true, driver: true },
      orderBy: { departureTime: "asc" }
    });
    return schedules;
  },
  ["fleet-schedules"],
  { revalidate: 60, tags: ["fleet"] }
);`
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* SECTION: EXPERIENCE & MILESTONES */}
          <div id="experience" className="space-y-6 pt-4 border-t border-border/60">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                {isId ? "Pencapaian & Riwayat" : "Milestones & Career"}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-foreground font-display">
                {isId ? "Rekam Jejak & Pendidikan" : "Track Record & Education"}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Flagship */}
              <div className="p-5 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-foreground">2026</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground text-xs font-bold font-display border border-foreground/15 inline-flex items-center gap-1">
                    <Trophy size={13} weight="fill" />
                    {isId ? "Juara 1 IT Bootcamp 2026" : "1st Place Winner"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground font-display">
                  Lead Developer & System Architect: TitikAman
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isId
                    ? "Memimpin tim rekayasa lintas disiplin beranggotakan 11 orang membangun platform keselamatan warga real-time. Mengembangkan arsitektur Laravel 12, MySQL, dan Laravel Reverb WebSockets."
                    : "Led an 11-member engineering team architecting an emergency citizen safety broadcast network using Laravel 12, MySQL, and Laravel Reverb WebSockets."}
                </p>
              </div>

              {/* Fullstack Experience */}
              <div className="p-5 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-foreground">2024 - {isId ? "Sekarang" : "Present"}</span>
                  <span className="font-mono text-muted-foreground">Production Systems</span>
                </div>
                <h3 className="text-base font-bold text-foreground font-display">
                  Fullstack Software Engineer
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isId
                    ? "Membangun lebih dari 10 aplikasi produksi dari nol menggunakan Next.js 15, React 19, dan Laravel 12. Menangani perancangan skema database relasional, payment gateway Midtrans, dan optimasi performa."
                    : "Engineered 10+ production applications end-to-end using Next.js 15, React 19, and Laravel 12. Handled relational schema design, Midtrans payment integration, and core performance tuning."}
                </p>
              </div>

              {/* Education */}
              <div className="p-5 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-foreground">2024 - {isId ? "Sekarang" : "Present"}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                    {isId ? "IPK 4.00 / 4.00" : "4.00 / 4.00 GPA"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground font-display">
                  {isId ? "S1 Sistem Informasi" : "B.S. Information Systems"}
                </h3>
                <div className="text-xs text-muted-foreground font-mono">Universitas Bina Sarana Informatika</div>
              </div>
            </div>
          </div>

          {/* SECTION: CONTACT FORM */}
          <div id="contact" className="space-y-6 pt-4 border-t border-border/60">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                {isId ? "Hubungi Saya" : "Get In Touch"}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-foreground font-display">
                {isId ? "Mari Berdiskusi & Berkolaborasi" : "Let's Build Something Exceptional"}
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
                    {isId ? "Pesan / Detail Kebutuhan" : "Message / Project Scope"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      isId
                        ? "Ceritakan mengenai posisi, timeline, atau proyek yang ingin Anda bangun..."
                        : "Tell me about the role, technical scope, timeline, or objectives..."
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
          </div>

        </section>
      </main>

      {/* 3. Minimalist Footer */}
      <footer className="w-full border-t border-border/60 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground">Darell Rangga</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="https://github.com/Rangga11268" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/darellrangga" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://x.com/ranggsdarell" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">X</a>
            <a href="mailto:darellrangga@gmail.com" className="hover:text-foreground transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
