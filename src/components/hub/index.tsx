"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Code,
  Rows,
  SquaresFour,
  PaperPlaneRight,
  Cpu,
  CaretDown,
  CaretUp,
  CheckCircle,
  TerminalWindow,
  FolderSimple,
  Globe,
  Clock,
  Sparkle,
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
  const [currentTime, setCurrentTime] = useState<string>("");

  // macOS Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // macOS Terminal.app Sandbox State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    {
      command: "neofetch --engineer",
      output: isId
        ? "Darell Rangga OS (Darwin/macOS 15.4 Sonoma Edition). Ketik 'help' atau klik chip perintah di bawah."
        : "Darell Rangga OS (Darwin/macOS 15.4 Sonoma Edition). Type 'help' or click command chips below.",
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
          ? "Perintah: whoami, stack, projects, awards, system, contact, clear"
          : "Commands: whoami, stack, projects, awards, system, contact, clear";
        break;
      case "whoami":
        res = isId
          ? "Darell Rangga — Fullstack Software Engineer & System Architect. Spesialisasi Laravel 12, React 19, Next.js 15, WebSockets, dan transaksi database atomik berkecepatan sub-50ms."
          : "Darell Rangga — Fullstack Software Engineer & System Architect. Specializing in Laravel 12, React 19, Next.js 15, WebSockets, and sub-50ms atomic database concurrency.";
        break;
      case "stack":
        res = "Core: TypeScript, React 19, Next.js 15, Laravel 12, Vue 3, Python FastAPI | Data: PostgreSQL, MySQL, Redis | Infra: WebSockets, Docker, Tailwind CSS v4";
        break;
      case "projects":
        res = "1. TitikAman (Juara 1 IT Bootcamp 2026) | 2. Tunggal Jaya (TUJAGO) | 3. Makarya Ecosystem | 4. SRB Motor V3 | 5. Faktanesia AI";
        break;
      case "awards":
        res = isId
          ? "🏆 Juara 1 IT Bootcamp 2026 (Lead Developer, memimpin 11 engineer) | 🎓 IPK 4.00/4.00 S1 Sistem Informasi UBSI"
          : "🏆 1st Place Winner IT Bootcamp 2026 (Lead Developer, 11 engineers) | 🎓 4.00/4.00 GPA in Information Systems at UBSI";
        break;
      case "system":
        res = "Darell's MacBook Pro M3 Max — Node.js v24.x — Next.js 15.5.9 — React 19 — Tailwind CSS v4 — Status: 100% Operational";
        break;
      case "contact":
        res = "Email: darellrangga@gmail.com | WA: +62 897-8638-973 | GitHub: github.com/Rangga11268 | LinkedIn: linkedin.com/in/darellrangga";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "":
        return;
      default:
        res = isId
          ? `zsh: command not found: ${cmd}. Ketik 'help' untuk daftar perintah.`
          : `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
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
      
      {/* ========================================================================= */}
      {/* 1. macOS Top Menu Bar (Global Header)                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/70 py-2.5 px-4 sm:px-6 lg:px-8 transition-colors shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Left Menu Section ( Apple Mark / Brand / Status) */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              {/* Apple-style macOS Squircle Badge */}
              <div className="w-6 h-6 rounded-[7px] bg-foreground text-background flex items-center justify-center font-bold text-[11px] font-mono tracking-tight group-hover:scale-105 transition-transform shadow-xs">
                DR
              </div>
              <span className="text-xs font-bold text-foreground tracking-tight hidden sm:inline">
                Darell Rangga
              </span>
            </Link>

            <span className="text-muted-foreground/50 text-xs hidden sm:inline">/</span>

            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
              <span className="text-foreground font-semibold">macOS Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[10.5px]">Online</span>
            </div>
          </div>

          {/* Right Menu Section (macOS Navigation & System Controls) */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-muted-foreground">
            <nav className="flex items-center gap-1 sm:gap-2">
              <a
                href="#about"
                className="px-2.5 py-1 rounded-md hover:bg-muted/70 hover:text-foreground transition-colors hidden sm:inline"
              >
                {isId ? "Profil" : "About"}
              </a>
              <a
                href="#projects"
                className="px-2.5 py-1 rounded-md hover:bg-muted/70 hover:text-foreground transition-colors"
              >
                {isId ? "Finder" : "Works"}
              </a>
              <a
                href="#experience"
                className="px-2.5 py-1 rounded-md hover:bg-muted/70 hover:text-foreground transition-colors hidden md:inline"
              >
                {isId ? "Riwayat" : "Milestones"}
              </a>
              <a
                href="#contact"
                className="px-2.5 py-1 rounded-md hover:bg-muted/70 hover:text-foreground transition-colors"
              >
                {isId ? "Mail" : "Contact"}
              </a>
            </nav>

            <div className="h-3.5 w-px bg-border/80" />

            {/* macOS Input Source (Language Toggle) */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-muted/60 hover:bg-muted text-foreground border border-border/60 transition-colors cursor-pointer"
              title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              {language.toUpperCase()}
            </button>

            {/* macOS Appearance Toggle (Dark/Light Mode) */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-1.5 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
              title={isDark ? "Switch to Light" : "Switch to Dark"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
            </button>

            {/* macOS Clock Widget */}
            {currentTime && (
              <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/50">
                <Clock size={12} weight="bold" />
                <span>{currentTime}</span>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. Main Studio Canvas (Split-Pane macOS Architecture)                     */}
      {/* ========================================================================= */}
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT PANE: macOS User Profile, Photo, Proof Matrix & Terminal.zsh     */}
          {/* ===================================================================== */}
          <aside className="w-full lg:sticky lg:top-18 flex flex-col gap-5" id="about">
            
            {/* macOS Window: Profile Card & Photo */}
            <div className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md overflow-hidden shadow-lg dark:shadow-2xl transition-all">
              
              {/* macOS Window Titlebar with Traffic Lights */}
              <div className="px-4 py-3 bg-muted/60 border-b border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs" />
                </div>
                <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                  profile.app — Darell Rangga
                </span>
                <div className="w-10" />
              </div>

              {/* Profile Body with Darell's Photo */}
              <div className="p-5 sm:p-6 flex flex-col gap-5">
                
                {/* Photo & Header Row */}
                <div className="flex items-center gap-4">
                  
                  {/* Darell's Photo in macOS Squircle Frame */}
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-muted to-background p-1 border border-border/80 shadow-md overflow-hidden flex items-end justify-center">
                      <Image
                        src="/img/saya/saya1.webp"
                        alt="Darell Rangga - Fullstack Software Engineer"
                        width={180}
                        height={180}
                        className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                    {/* Active Status Badge */}
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card shadow-xs"
                      title="Available for Engineering Roles"
                    />
                  </div>

                  {/* Title & Role */}
                  <div className="flex flex-col space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/20 w-fit">
                      <Sparkle size={11} weight="fill" />
                      <span>Ready to Deploy</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display leading-tight">
                      Darell Rangga
                    </h1>

                    <p className="text-[11.5px] font-mono text-muted-foreground font-medium">
                      Fullstack Software Engineer
                    </p>
                  </div>
                </div>

                {/* macOS Precision Bio */}
                <p className="text-xs sm:text-[12.5px] text-muted-foreground leading-relaxed">
                  {isId
                    ? "Merancang dan membangun arsitektur web performa tinggi, transaksi database atomik, dan sistem real-time terdistribusi dengan Laravel 12, React 19, dan Next.js 15."
                    : "Designing and engineering high-throughput web systems, atomic transaction pipelines, and real-time distributed architecture with Laravel 12, React 19, and Next.js 15."}
                </p>

                {/* macOS Proof Points Matrix */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-muted/50 border border-border/70">
                  <div className="p-2 rounded-xl bg-background border border-border/50 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-foreground block">Juara 1</span>
                    <span className="text-[10px] text-muted-foreground font-sans">Bootcamp 2026</span>
                  </div>
                  <div className="p-2 rounded-xl bg-background border border-border/50 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-foreground block">12+</span>
                    <span className="text-[10px] text-muted-foreground font-sans">{isId ? "Sistem Prod" : "Prod Systems"}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-background border border-border/50 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-foreground block">4.00</span>
                    <span className="text-[10px] text-muted-foreground font-sans">IPK UBSI</span>
                  </div>
                </div>

                {/* macOS Action Buttons */}
                <div className="flex flex-col gap-2">
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
                      title="WhatsApp Direct Chat"
                    >
                      <WhatsappLogo size={17} weight="bold" />
                    </a>

                    <a
                      href="/pdf/Resume_Darell_Rangga_EN.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
                      title="Download CV (PDF)"
                    >
                      <FilePdf size={17} weight="bold" />
                    </a>
                  </div>

                  {/* macOS Dock-styled Social Strip */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-background border border-border/60 text-xs">
                    <span className="text-muted-foreground font-mono text-[10.5px]">Socials & Dock:</span>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/Rangga11268"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        title="GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/darellrangga/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-muted-foreground hover:text-[#0a66c2] hover:bg-muted transition-all"
                        title="LinkedIn"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://x.com/ranggsdarell"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        title="X"
                      >
                        <XTwitterIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.instagram.com/darellrangga17/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-muted-foreground hover:text-[#E4405F] hover:bg-muted transition-all"
                        title="Instagram"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* macOS Window: Terminal.app Sandbox */}
            <div className="rounded-3xl border border-border/90 bg-card/90 backdrop-blur-md overflow-hidden text-xs shadow-lg dark:shadow-2xl font-mono">
              
              {/* Terminal Titlebar */}
              <div className="px-4 py-2.5 bg-muted/70 border-b border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-[10.5px]">
                  <FolderSimple size={12} weight="fill" />
                  <span>darell — -zsh — 80×24</span>
                </div>
                <TerminalWindow size={13} className="text-muted-foreground" />
              </div>

              {/* Terminal Output Log */}
              <div className="p-3.5 max-h-48 overflow-y-auto space-y-2 text-[11px] leading-relaxed bg-background/50">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">darell@macbook ~ %</span>
                      <span className="text-foreground font-semibold">{item.command}</span>
                    </div>
                    <div className="text-foreground/90 pl-3 text-[10.5px] border-l border-emerald-500/40">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Quick Command Chips */}
              <div className="px-3.5 py-2 bg-muted/40 border-t border-border/50 flex flex-wrap gap-1.5 text-[10.5px]">
                {["whoami", "stack", "projects", "awards", "system", "contact", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2.5 py-1 min-h-[26px] rounded-md bg-background border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Prompt Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(terminalInput);
                }}
                className="px-3.5 py-2 border-t border-border/60 flex items-center gap-2 bg-background/80"
              >
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px] shrink-0">
                  darell@macbook ~ %
                </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={isId ? "Ketik perintah..." : "Type command..."}
                  className="w-full bg-transparent outline-none text-[11px] text-foreground placeholder:text-muted-foreground/60 font-mono"
                />
              </form>
            </div>

            {/* macOS System Info / Hardware Specs Widget */}
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 space-y-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                <span>{isId ? "Spesifikasi Arsitektur" : "System Specs"}</span>
                <Globe size={12} weight="bold" />
              </div>
              <div className="space-y-1 text-muted-foreground text-[10.5px]">
                <div className="flex justify-between">
                  <span>Architecture:</span>
                  <span className="text-foreground font-semibold">Atomic & Concurrency</span>
                </div>
                <div className="flex justify-between">
                  <span>Frameworks:</span>
                  <span className="text-foreground font-semibold">Laravel 12 · React 19 · Next 15</span>
                </div>
                <div className="flex justify-between">
                  <span>Real-time:</span>
                  <span className="text-foreground font-semibold">WebSockets / Reverb</span>
                </div>
              </div>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* RIGHT PANE: macOS Finder Studio, Works, Quick Look & Mail             */}
          {/* ===================================================================== */}
          <main className="w-full flex flex-col gap-10 lg:gap-12">
            
            {/* macOS Window: Finder Selected Works */}
            <section id="projects" className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md overflow-hidden shadow-lg dark:shadow-2xl">
              
              {/* Finder Titlebar & View Switcher */}
              <div className="px-4 py-3 bg-muted/60 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs" />
                  <h2 className="text-xs font-mono font-bold text-foreground ml-2">
                    Finder &mdash; {isId ? "Karya & Sistem Produksi" : "Selected Works & Systems"}
                  </h2>
                </div>

                {/* macOS Segmented View Controller (List vs Bento vs Code) */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-background border border-border/80 self-start sm:self-auto shadow-xs">
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
                    title="Bento View"
                  >
                    <SquaresFour size={13} weight="bold" />
                    <span>Bento</span>
                  </button>
                  <button
                    onClick={() => setViewMode("architecture")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "architecture" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Code Inspector"
                  >
                    <Code size={13} weight="bold" />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Bar */}
              <div className="px-5 py-3 border-b border-border/60 bg-muted/20 flex flex-wrap items-center gap-1.5">
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
                        ? "bg-background text-foreground border border-border shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* VIEW 1: macOS FINDER LIST VIEW WITH INLINE QUICK LOOK ACCORDION */}
              {viewMode === "list" && (
                <div className="p-4 sm:p-5 divide-y divide-border/60">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <article
                        key={project.id}
                        className="py-4 sm:py-5 first:pt-1 last:pb-1 group hover:bg-muted/30 px-3 rounded-2xl transition-colors flex flex-col gap-3"
                      >
                        {/* Row Header */}
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

                          {/* Action Buttons */}
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
                              <span>{isExpanded ? (isId ? "Tutup" : "Close") : (isId ? "Quick Look" : "Quick Look")}</span>
                              {isExpanded ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                            </button>
                          </div>
                        </div>

                        {/* Short Summary */}
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed sm:pl-14">
                          {project.shortDescription[language]}
                        </p>

                        {/* Tech Stack Chips */}
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

                        {/* macOS Quick Look Inspector Accordion */}
                        {isExpanded && (
                          <div className="mt-2 p-4 sm:p-5 rounded-2xl bg-background border border-border sm:ml-14 space-y-4 text-xs shadow-inner animate-in fade-in duration-200">
                            
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

                            {/* Links Row */}
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
                                    <span>Lihat Source Code</span>
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

              {/* VIEW 2: macOS BENTO GRID VIEW */}
              {viewMode === "bento" && (
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <div
                        key={project.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                          isExpanded
                            ? "bg-background border-foreground/30 shadow-md md:col-span-2"
                            : "bg-background/70 border-border/80 hover:border-foreground/30 hover:bg-background"
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
                            <span>{isExpanded ? (isId ? "Tutup Detail" : "Close") : (isId ? "Buka Studi Kasus" : "Quick Look")}</span>
                            {isExpanded ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
                          </button>
                        </div>

                        {/* Inline Expand for Bento */}
                        {isExpanded && (
                          <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3 text-xs">
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

              {/* VIEW 3: macOS XCODE CODE INSPECTOR VIEW */}
              {viewMode === "architecture" && (
                <div className="p-4 sm:p-5 space-y-5">
                  {filteredProjects.slice(0, 4).map((project) => (
                    <div key={project.id} className="p-5 rounded-2xl border border-border bg-background space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu size={18} className="text-emerald-700 dark:text-emerald-400" />
                          <h3 className="text-sm font-bold text-foreground font-mono">{project.title} &middot; Spec</h3>
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">{project.role}</span>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border border-border/80 font-mono text-[11px] space-y-2 text-muted-foreground">
                        <div className="text-foreground font-bold">{"// Production Architecture Spec"}</div>
                        <div>Role: {project.role}</div>
                        <div>Stack: {project.techStack.map((t) => t.name).join(" + ")}</div>
                        <div className="text-foreground/90 pt-1">{"// Core Logic & Architecture:"}</div>
                        <p className="text-xs text-foreground/80 leading-relaxed font-sans">{project.fullDescription[language]}</p>
                      </div>

                      {project.solutions && (
                        <div className="p-3 rounded-xl bg-muted/20 border border-border/60 text-xs space-y-1">
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

            {/* macOS Window: Timeline & Experience */}
            <section id="experience" className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md overflow-hidden shadow-lg dark:shadow-2xl">
              
              <div className="px-4 py-3 bg-muted/60 border-b border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <h2 className="text-xs font-mono font-bold text-foreground ml-2">
                    Time Machine &mdash; {isId ? "Rekam Jejak Rekayasa" : "Career Track & Milestones"}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-7 relative border-l border-border/80 pl-6 ml-6 space-y-8 my-2">
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
                        ? "Mengembangkan lebih dari 12 sistem produksi untuk klien korporat dan logistik transportasi (TUJAGO, PHD Trans, SRB Motor, Makarya), mengimplementasikan antrian transaksi atomik dan integrasi payment gateway."
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

            {/* macOS Window: Mail.app Compose Inquiry */}
            <section id="contact" className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md overflow-hidden shadow-lg dark:shadow-2xl">
              
              {/* Mail Compose Titlebar */}
              <div className="px-4 py-3 bg-muted/60 border-b border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <h2 className="text-xs font-mono font-bold text-foreground ml-2">
                    Mail.app &mdash; {isId ? "Kirim Pesan Langsung" : "New Message"}
                  </h2>
                </div>
                <span className="text-[10.5px] font-mono text-muted-foreground">To: darellrangga@gmail.com</span>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
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
                          ? "Ceritakan mengenai posisi, timeline, atau proyek yang ingin Anda bangun..."
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
