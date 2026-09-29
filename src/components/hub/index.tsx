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
  ArrowRight,
  Trophy,
  Sun,
  Moon,
  Code,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
  InstagramIcon,
  LaravelIcon,
  NextjsIcon,
  FlutterIcon,
} from "@/components/ui/brand-icons";

type ProjectCategory = "all" | "web" | "systems" | "mobile" | "ai";

export function ExecutiveHub() {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
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
      {/* 1. Ultra-Minimalist Floating Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 py-3 px-4 sm:px-6 transition-colors">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono tracking-tight group-hover:scale-105 transition-transform">
              DR
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Darell Rangga
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors hidden sm:inline">
              {isId ? "Tentang" : "About"}
            </a>
            <a href="#projects" className="hover:text-foreground transition-colors">
              {isId ? "Karya" : "Work"}
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors hidden sm:inline">
              {isId ? "Riwayat" : "Experience"}
            </a>
            <a href="#stack" className="hover:text-foreground transition-colors hidden sm:inline">
              {isId ? "Stack" : "Stack"}
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

      {/* 2. Main Content Canvas */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
        
        {/* SECTION 1: HERO & STATEMENT */}
        <section id="about" className="flex flex-col gap-6 pt-2">
          {/* Live Status Pill */}
          <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card text-xs font-mono text-muted-foreground shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isId
                ? "Tersedia untuk Rekrutmen Fullstack & Kontrak"
                : "Available for full-time roles & engineering contracts"}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display leading-[1.15]">
              Darell Rangga
            </h1>
            <p className="text-base sm:text-lg font-medium text-foreground/80 font-mono">
              Fullstack Software Engineer & System Architect
            </p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {isId
              ? "Saya merancang dan membangun sistem web performa tinggi, transaksi database atomik, dan arsitektur real-time. Spesialis Laravel 12, React 19, dan Next.js 15. Lead Developer Juara 1 IT Bootcamp 2026 (TitikAman, memimpin tim 11 orang). Mahasiswa S1 Sistem Informasi di Universitas Bina Sarana Informatika dengan IPK 4.00/4.00."
              : "I design and build high-performance web systems, atomic database transactions, and real-time architectures. Specializing in Laravel 12, React 19, and Next.js 15. Lead Developer Champion at IT Bootcamp 2026 (TitikAman, led 11 engineers). Studying Information Systems at Universitas Bina Sarana Informatika with a perfect 4.00/4.00 GPA."}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {copied ? <Check size={14} weight="bold" /> : <EnvelopeSimple size={14} weight="bold" />}
              <span>{copied ? (isId ? "Email Disalin!" : "Email Copied!") : "darellrangga@gmail.com"}</span>
            </button>

            <a
              href="https://wa.me/628978638973"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground text-xs font-semibold active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <WhatsappLogo size={15} weight="fill" className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <a
              href={isId ? "/pdf/Resume_Darell_Rangga_ID.pdf" : "/pdf/Resume_Darell_Rangga_EN.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground text-xs font-semibold active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <FilePdf size={14} weight="bold" />
              <span>{isId ? "Unduh CV" : "Download CV"}</span>
            </a>

            <div className="flex items-center gap-1 border-l border-border/70 pl-2">
              <a
                href="https://github.com/Rangga11268"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/darellrangga/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-[#0a66c2] hover:bg-muted transition-colors cursor-pointer"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ranggsdarell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/darellrangga17/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-[#E4405F] hover:bg-muted transition-colors cursor-pointer"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURED WORKS / PROJECTS (100% TEXT-FIRST EDITORIAL ROWS, ZERO IMAGE CLUTTER) */}
        <section id="projects" className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-border/60">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                {isId ? "Karya Pilihan" : "Selected Works"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                {isId ? "Proyek & Sistem Produksi" : "Projects & Production Systems"}
              </h2>
            </div>

            {/* Filter Tabs */}
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
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text-First Editorial Rows */}
          <div className="divide-y divide-border/60">
            {filteredProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="py-5 sm:py-6 first:pt-2 last:pb-2 group hover:bg-muted/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transition-colors flex flex-col gap-3"
                >
                  {/* Row Header: Year, Title, Badges, Direct Actions */}
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

                    {/* Action Links */}
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

                  {/* Concise Description */}
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
              );
            })}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all shadow-xs"
            >
              <span>{isId ? "Buka Direktori Lengkap 12+ Proyek" : "View Full 12+ Projects Directory"}</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE & ACADEMICS */}
        <section id="experience" className="flex flex-col gap-6">
          <div className="pb-3 border-b border-border/60">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              {isId ? "Riwayat & Pengalaman" : "Experience & Milestones"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              {isId ? "Pencapaian & Pendidikan" : "Career History & Education"}
            </h2>
          </div>

          <div className="space-y-6">
            {/* Flagship Milestone */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-foreground">2026</span>
                <span className="px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground text-xs font-bold font-display border border-foreground/15 inline-flex items-center gap-1">
                  <Trophy size={13} weight="fill" />
                  {isId ? "Juara 1 IT Bootcamp 2026" : "1st Place IT Bootcamp 2026"}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground font-display">
                Lead Developer & System Architect: TitikAman
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isId
                  ? "Memimpin tim rekayasa lintas disiplin beranggotakan 11 orang dalam membangun platform keselamatan warga real-time. Mengembangkan arsitektur Laravel 12, MySQL, dan Laravel Reverb WebSockets untuk broadcast darurat instan. Lolos 100% black-box testing secara menyeluruh."
                  : "Led an 11-member cross-functional engineering team architecting an emergency citizen safety broadcast network using Laravel 12, MySQL, and Laravel Reverb WebSockets. Passed 100% comprehensive black-box testing."}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Laravel 12", "WebSockets", "Laravel Reverb", "Team Lead (11)", "Black-Box QA"].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-muted text-[11px] font-mono text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Work History */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-foreground">2024 - {isId ? "Sekarang" : "Present"}</span>
                <span className="text-xs font-mono text-muted-foreground">Production Experience</span>
              </div>
              <h3 className="text-base font-bold text-foreground font-display">
                Fullstack Software Engineer
              </h3>
              <div className="text-xs text-muted-foreground font-mono">Freelance & Software Production</div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isId
                  ? "Membangun lebih dari 10 aplikasi produksi dari nol menggunakan Next.js 15, React 19, dan Laravel 12. Menangani perancangan skema database relasional, integrasi payment gateway Midtrans, dan optimasi performa web."
                  : "Engineered 10+ production applications end-to-end using Next.js 15, React 19, and Laravel 12. Handled relational schema design, Midtrans payment integration, and core performance tuning."}
              </p>
            </div>

            {/* Education */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/70 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-foreground">2024 - {isId ? "Sekarang" : "Present"}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                  {isId ? "IPK 4.00 / 4.00" : "4.00 / 4.00 GPA"}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground font-display">
                {isId ? "S1 Sistem Informasi" : "B.S. Information Systems"}
              </h3>
              <div className="text-xs text-muted-foreground font-mono">Universitas Bina Sarana Informatika</div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isId
                  ? "Fokus riset & komputasi pada Sistem Informasi Enterprise, Rekayasa Perangkat Lunak Terdistribusi, dan Manajemen Basis Data Tingkat Lanjut."
                  : "Focused on Enterprise Information Systems, Distributed Software Engineering, and Advanced Relational Database Architectures."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: TECH STACK & ARCHITECTURE */}
        <section id="stack" className="flex flex-col gap-6">
          <div className="pb-3 border-b border-border/60">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              {isId ? "Keahlian Teknis" : "Technical Arsenal"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              {isId ? "Stack & Alat Pengembangan" : "Stack & Engineering Tools"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 space-y-3">
              <div className="flex items-center gap-2">
                <LaravelIcon className="w-5 h-5 text-[#FF2D20]" />
                <h3 className="text-sm font-bold text-foreground font-display">Backend & Systems</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Laravel 12, PHP 8.3+, RESTful APIs, WebSockets (Reverb), Queues & Jobs, Python (FastAPI).
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 space-y-3">
              <div className="flex items-center gap-2">
                <NextjsIcon className="w-5 h-5" />
                <h3 className="text-sm font-bold text-foreground font-display">Frontend & React</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 space-y-3">
              <div className="flex items-center gap-2">
                <FlutterIcon className="w-5 h-5 text-[#02569B]" />
                <h3 className="text-sm font-bold text-foreground font-display">Mobile Development</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flutter, Dart, Provider / Bloc State Management, Cross-platform iOS & Android builds.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 space-y-3">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-foreground" />
                <h3 className="text-sm font-bold text-foreground font-display">Database & DevOps</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                MySQL, PostgreSQL, Redis Caching, Docker, Git, CI/CD Actions, Midtrans Gateway.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="flex flex-col gap-6">
          <div className="pb-3 border-b border-border/60">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              {isId ? "Hubungi Saya" : "Get In Touch"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              {isId ? "Mari Membangun Sesuatu yang Luar Biasa" : "Let's Build Something Exceptional"}
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/70 space-y-6">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isId
                ? "Tertarik mendiskusikan posisi Fullstack Engineer, proyek konsultasi, atau pengembangan sistem skala besar? Kirim pesan langsung di bawah ini atau hubungi via WhatsApp."
                : "Interested in discussing a Fullstack Engineer role, technical consulting, or custom high-performance web architecture? Send a direct note below or reach out via WhatsApp."}
            </p>

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
                      ? "Ceritakan mengenai proyek, timeline, atau peran yang Anda tawarkan..."
                      : "Tell me about the role, technical scope, timeline, or objectives..."
                  }
                  className="w-full bg-background border border-border/80 focus:border-foreground/50 rounded-xl p-3.5 text-xs text-foreground outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <PaperPlaneRight size={14} weight="bold" />
                  <span>{formSent ? (isId ? "Pesan Terkirim!" : "Message Sent!") : (isId ? "Kirim Pesan" : "Send Inquiry")}</span>
                </button>

                <div className="text-xs text-muted-foreground font-mono">
                  {isId ? "Respons dalam 24 jam" : "Replies within 24h"}
                </div>
              </div>
            </form>
          </div>
        </section>

      </main>

      {/* 3. Minimalist Footer */}
      <footer className="w-full border-t border-border/60 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground">Darell Rangga</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
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
