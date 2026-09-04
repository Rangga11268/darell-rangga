"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/language-provider";
import { Project } from "@/app/data/projects";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Heart,
  ShareNetwork,
  Check,
  Browser,
  SealCheck,
  ChatCircleDots,
  PaperPlaneTilt,
  ArrowUpRight,
  BookmarkSimple,
  CheckCircle,
  Moon,
  Sun,
  Translate,
} from "@phosphor-icons/react";
import { GithubIcon } from "@/components/ui/brand-icons";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const isId = language === "id";
  const isDark = resolvedTheme === "dark";

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`dr_like_${project.id}`);
      if (stored) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
      const bStored = localStorage.getItem(`dr_bm_${project.id}`);
      if (bStored) setBookmarked(true);
    } catch {
      // Ignore
    }
  }, [project.id]);

  const handleToggleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    try {
      if (nextLiked) {
        localStorage.setItem(`dr_like_${project.id}`, "1");
      } else {
        localStorage.removeItem(`dr_like_${project.id}`);
      }
    } catch {
      // Ignore
    }
  };

  const handleToggleBookmark = () => {
    const nextBm = !bookmarked;
    setBookmarked(nextBm);
    try {
      if (nextBm) {
        localStorage.setItem(`dr_bm_${project.id}`, "1");
      } else {
        localStorage.removeItem(`dr_bm_${project.id}`);
      }
    } catch {
      // Ignore
    }
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/#hub");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background flex flex-col">
      {/* Top Medsos Sticky Bar - Full Width Responsive */}
      <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md border-b border-border/80 px-4 sm:px-6 lg:px-8 py-3 transition-colors">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all active:scale-95 cursor-pointer shadow-xs"
              aria-label={isId ? "Kembali ke Feed" : "Back to Feed"}
            >
              <ArrowLeft size={14} weight="bold" />
              <span>{isId ? "Kembali ke Profil" : "Back to Profile"}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-border text-xs">/</span>
              <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px] md:max-w-sm">
                utas • {project.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Translate Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full border border-border/80 bg-card hover:bg-muted text-xs font-bold text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
              title={isId ? "Switch to English" : "Ganti ke Indonesia"}
            >
              <Translate size={14} weight="bold" className="text-primary" />
              <span className="font-mono text-[11px]">
                {isId ? "ID" : "EN"}
              </span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border/80 bg-card hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun size={15} weight="fill" className="text-amber-400" />
              ) : (
                <Moon size={15} weight="fill" className="text-indigo-500" />
              )}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" className="text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">
                    {isId ? "Tersalin!" : "Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <ShareNetwork size={14} />
                  <span className="hidden sm:inline">
                    {isId ? "Bagikan" : "Share"}
                  </span>
                </>
              )}
            </button>

            <Link
              href="/#hub"
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-all shadow-xs"
            >
              Feed
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container: Generous Responsive Width (max-w-4xl lg:max-w-5xl) */}
      <main className="flex-1 w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        {/* Main Post Card */}
        <article className="p-5 sm:p-7 md:p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col gap-6">
          {/* Post Header: Author Identity */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-border/80 shrink-0 bg-background shadow-xs">
                <Image
                  src="/img/saya/saya1.webp"
                  alt="Darell Rangga"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-base sm:text-lg font-bold text-foreground font-display">
                    Darell Rangga
                  </h1>
                  <SealCheck
                    size={18}
                    weight="fill"
                    className="text-primary shrink-0"
                  />
                  <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-mono font-semibold">
                    Author
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5">
                  <span>@darellrangga</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <span>·</span>
                  <span className="text-foreground font-semibold">
                    {project.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-muted/80 text-foreground text-xs font-semibold border border-border/60">
                {project.year} Shipped
              </span>
            </div>
          </div>

          {/* Project Headline & Core Pitch */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight font-display mb-3">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
              {project.shortDescription[language]}
            </p>
          </div>

          {/* Project Media: Direct Screenshot / Clean Media (NO DEVICE MOCKUP FRAME) */}
          {project.imageUrl && (
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border/80 bg-zinc-950/60 shadow-xs group">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1080px"
                className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md font-mono text-[11px] font-semibold border border-white/10">
                  {project.title}
                </span>
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-bold text-xs shadow-md hover:bg-white/90 active:scale-95 transition-all"
                  >
                    <Browser size={14} weight="bold" />
                    <span>Live Web</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-semibold font-mono"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Medsos Interaction Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <button
                onClick={handleToggleLike}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  liked
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent"
                }`}
                aria-label="Suka Utas"
              >
                <Heart size={16} weight={liked ? "fill" : "regular"} />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleToggleBookmark}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  bookmarked
                    ? "bg-foreground/10 text-foreground border border-border"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent"
                }`}
                aria-label="Simpan Utas"
              >
                <BookmarkSimple
                  size={16}
                  weight={bookmarked ? "fill" : "regular"}
                />
                <span className="hidden sm:inline">
                  {bookmarked
                    ? isId
                      ? "Tersimpan"
                      : "Saved"
                    : isId
                      ? "Simpan"
                      : "Bookmark"}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                aria-label="Salin Tautan Utas"
              >
                <ShareNetwork size={16} />
                <span>{isId ? "Salin Link" : "Copy"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 bg-background hover:bg-muted text-xs font-bold text-foreground transition-all shadow-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all shadow-xs"
                >
                  <Browser size={15} weight="bold" />
                  <span>{isId ? "Buka Aplikasi" : "Open App"}</span>
                </a>
              )}
            </div>
          </div>
        </article>

        {/* Connected Thread Posts (Utas Bersambung Khas Medsos) */}
        <div className="relative pl-0 sm:pl-8 space-y-6 sm:space-y-8 before:hidden sm:before:block before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-border/80">
          {/* Thread 1: Engineering Architecture */}
          <section className="relative p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border/50">
              <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono shrink-0">
                1
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground font-display block">
                  {isId
                    ? "Arsitektur Sistem & Rekayasa"
                    : "System Architecture & Engineering"}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  @darellrangga •{" "}
                  {isId ? "Detail Rekayasa" : "Technical Breakdown"}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
              {project.fullDescription[language]
                .split("\n\n")
                .map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
            </div>
          </section>

          {/* Thread 2: Tech Specs & Key Features */}
          <section className="relative p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border/50">
              <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono shrink-0">
                2
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground font-display block">
                  {isId
                    ? "Stack Teknologi & Fitur Unggulan"
                    : "Tech Stack & Key Deliverables"}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  @darellrangga •{" "}
                  {isId ? "Spesifikasi Produksi" : "Production Specs"}
                </span>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground block mb-2.5">
                {isId ? "Spesifikasi Teknologi:" : "Engineered with:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1.5 rounded-xl border border-border/80 bg-background text-foreground text-xs font-bold font-mono"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            {project.features &&
              project.features[language] &&
              project.features[language].length > 0 && (
                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground block mb-2.5">
                    {isId
                      ? "Fitur Utama yang Dibangun:"
                      : "Core Built Capabilities:"}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                    {project.features[language].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </section>

          {/* Thread 3: Challenges & Solutions */}
          {project.challenges &&
            project.challenges[language] &&
            project.challenges[language].length > 0 && (
              <section className="relative p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground font-display block">
                      {isId
                        ? "Tantangan Rekayasa & Solusi"
                        : "Technical Challenges & Solutions"}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      @darellrangga •{" "}
                      {isId ? "Troubleshooting" : "Problem Solving"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-background border border-border/80">
                    <span className="text-xs font-bold text-rose-500 block mb-2.5 font-display flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {isId ? "Tantangan Teknis" : "Challenges"}
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {project.challenges[language].map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/70 shrink-0 mt-2" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.solutions && project.solutions[language] && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-background border border-border/80">
                      <span className="text-xs font-bold text-emerald-500 block mb-2.5 font-display flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {isId ? "Solusi Implementasi" : "Implemented Solutions"}
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {project.solutions[language].map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shrink-0 mt-2" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

          {/* Thread 4: Recruiter Connection & Direct Message Callout */}
          <section className="relative p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0 border border-border/70">
                <ChatCircleDots size={22} weight="bold" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground font-display">
                  {isId
                    ? "Tertarik dengan arsitektur sistem proyek ini?"
                    : "Interested in the architecture of this project?"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {isId
                    ? "Saya terbuka untuk mendiskusikan implementasi teknis lebih dalam atau peluang kerja full-stack."
                    : "Available for deep technical discussions or full-stack software engineering roles."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <Link
                href="/#hub"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/80 bg-background hover:bg-muted text-xs font-bold text-foreground transition-all shadow-xs"
              >
                <PaperPlaneTilt size={15} weight="bold" />
                <span>{isId ? "Kirim DM" : "Send DM"}</span>
              </Link>
              <a
                href="https://wa.me/628978638973"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all shadow-xs"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </section>
        </div>

        {/* Minimalist Social Profile Footer */}
        <footer className="pt-6 pb-12 text-center text-xs text-muted-foreground flex flex-col items-center gap-2 border-t border-border/40">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span>Darell Rangga</span>
            <span>·</span>
            <span>@darellrangga</span>
            <span>·</span>
            <span>Bekasi, Indonesia</span>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            {isId
              ? "Semua karya diarsiteki dengan standar rekayasa bersih & teruji."
              : "Crafted with clean engineering architecture and verified execution."}
          </p>
        </footer>
      </main>
    </div>
  );
}
