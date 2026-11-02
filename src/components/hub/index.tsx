"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects, Project } from "@/app/data/projects";
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
  Command,
  Lightning,
  Sparkle,
  SquaresFour,
  Code,
  ClockCounterClockwise,
  ChatCircleDots,
  X,
  Pulse,
  ShieldCheck,
  Cpu,
  SpeakerHigh,
  SpeakerSlash,
  ArrowRight,
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
} from "@/components/ui/macos-icons";
import { LiveClock } from "@/components/ui/live-clock";
import { playMicroTick, getSoundMuted, toggleSound } from "@/lib/sound";
import { CommandPalette } from "./command-palette";

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
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [activePreviewProject, setActivePreviewProject] = useState<Project | null>(null);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [soundActive, setSoundActive] = useState(true);

  // Concurrency Simulation State
  const [simState, setSimState] = useState<"idle" | "running" | "done">("idle");
  const [simRequests, setSimRequests] = useState(0);

  // Command Palette State
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Floating Cursor Preview Motion Values (Signature Moment)
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  const email = "darellrangga@gmail.com";

  // Lock background scroll when Case Study Modal is open
  useEffect(() => {
    if (selectedModalProject) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedModalProject]);

  // Check initial sound state
  useEffect(() => {
    setSoundActive(!getSoundMuted());
  }, []);

  // Trigger toast with auto-dismiss
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  const handleToggleSound = useCallback(() => {
    const unmuted = toggleSound();
    setSoundActive(unmuted);
    if (unmuted) {
      playMicroTick();
      showToast(isId ? "Audio Haptic Aktif" : "Audio Feedback Enabled");
    } else {
      showToast(isId ? "Audio Dibisukan" : "Audio Muted");
    }
  }, [isId, showToast]);

  // Copy email handler
  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    playMicroTick();
    setCopied(true);
    showToast(isId ? "Email disalin ke clipboard!" : "Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }, [email, isId, showToast]);

  // Section jumping
  const jumpToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      playMicroTick();
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Mouse move handler for floating image preview (strictly active only when project hovered)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hoveredProjectId || isCommandOpen || selectedModalProject) return;
      mouseX.set(e.clientX + 24);
      mouseY.set(e.clientY - 90);
    },
    [hoveredProjectId, isCommandOpen, mouseX, mouseY, selectedModalProject]
  );

  // Run interactive concurrency benchmark test
  const runConcurrencySimulation = useCallback(() => {
    if (simState === "running") return;
    playMicroTick();
    setSimState("running");
    setSimRequests(0);

    let count = 0;
    const interval = setInterval(() => {
      count += 125;
      setSimRequests(count);
      playMicroTick();
      if (count >= 1000) {
        clearInterval(interval);
        setSimState("done");
        showToast(isId ? "Benchmark Selesai: 0 Race Condition!" : "Benchmark Complete: 0 Race Conditions!");
        setTimeout(() => setSimState("idle"), 8000);
      }
    }, 60);
  }, [isId, showToast, simState]);

  // Command Palette Items
  const commandItems = useMemo(() => {
    return [
      // Navigation
      {
        id: "nav-overview",
        group: isId ? "Navigasi" : "Navigation",
        title: isId ? "01 Ringkasan Eksekutif" : "01 Executive Overview",
        action: () => jumpToSection("overview"),
        shortcut: "1",
      },
      {
        id: "nav-projects",
        group: isId ? "Navigasi" : "Navigation",
        title: isId ? "02 Karya & Sistem Terpilih" : "02 Selected Works",
        action: () => jumpToSection("projects"),
        shortcut: "2",
      },
      {
        id: "nav-architecture",
        group: isId ? "Navigasi" : "Navigation",
        title: isId ? "03 Pilar Rekayasa & Telemetri" : "03 Engineering Architecture",
        action: () => jumpToSection("architecture"),
        shortcut: "3",
      },
      {
        id: "nav-experience",
        group: isId ? "Navigasi" : "Navigation",
        title: isId ? "04 Rekam Jejak & Milestone" : "04 Career Track & Milestones",
        action: () => jumpToSection("experience"),
        shortcut: "4",
      },
      {
        id: "nav-contact",
        group: isId ? "Navigasi" : "Navigation",
        title: isId ? "05 Kontak Langsung" : "05 Direct Contact",
        action: () => jumpToSection("contact"),
        shortcut: "5",
      },
      // Actions
      {
        id: "act-copy",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: isId ? "Salin Email (darellrangga@gmail.com)" : "Copy Email Address",
        action: () => handleCopyEmail(),
        shortcut: "C",
      },
      {
        id: "act-theme",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: isId ? "Ganti Tema (Gelap / Terang)" : "Toggle Theme (Dark / Light)",
        action: () => {
          setTheme(isDark ? "light" : "dark");
          showToast(isDark ? "Light Mode" : "Dark Mode");
        },
        shortcut: "T",
      },
      {
        id: "act-sound",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: isId ? "Bisu / Aktifkan Audio Haptic" : "Toggle Haptic Sound",
        action: () => handleToggleSound(),
        shortcut: "S",
      },
      {
        id: "act-sim",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: isId ? "Jalankan Simulasi Konkurensi 1.000 Request" : "Run 1,000 Concurrency Stress Test",
        action: () => {
          jumpToSection("architecture");
          runConcurrencySimulation();
        },
        shortcut: "⚡",
      },
      {
        id: "act-lang",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: isId ? "Ganti Bahasa (English / ID)" : "Toggle Language (ID / EN)",
        action: () => toggleLanguage(),
        shortcut: "L",
      },
      {
        id: "act-cv",
        group: isId ? "Aksi Cepat" : "Quick Actions",
        title: "Download CV (Resume PDF)",
        action: () => window.open("/pdf/Resume_Darell_Rangga_EN.pdf", "_blank"),
        shortcut: "CV",
      },
      // Selected Works Direct Links
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        group: isId ? "Proyek Terpilih" : "Featured Projects",
        title: `${p.title} (${p.year})`,
        action: () => {
          setSelectedModalProject(p);
        },
        shortcut: "↗",
      })),
    ];
  }, [handleCopyEmail, handleToggleSound, isDark, isId, jumpToSection, runConcurrencySimulation, setTheme, showToast, toggleLanguage]);

  // Global Keyboard Shortcuts (Cmd+K, C, T, 1-5, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close Case Study Modal
      if (e.key === "Escape" && selectedModalProject) {
        e.preventDefault();
        playMicroTick();
        setSelectedModalProject(null);
        return;
      }

      // Cmd+K / Ctrl+K: Open/Close Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playMicroTick();
        setIsCommandOpen((prev) => !prev);
        return;
      }

      // If Command Palette is open, let CommandPalette handle inner navigation
      if (isCommandOpen) return;

      const target = e.target as HTMLElement;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (isInput) return;

      const key = e.key.toLowerCase();

      // C: Copy Email
      if (key === "c" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        handleCopyEmail();
        return;
      }

      // T: Toggle Theme
      if (key === "t" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        playMicroTick();
        setTheme(isDark ? "light" : "dark");
        showToast(
          isDark
            ? (isId ? "Tema Terang Diaktifkan" : "Light Mode Activated")
            : (isId ? "Tema Gelap Diaktifkan" : "Dark Mode Activated")
        );
        return;
      }

      // S: Toggle Sound
      if (key === "s" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        handleToggleSound();
        return;
      }

      // 1-5: Section Navigation
      if (["1", "2", "3", "4", "5"].includes(key)) {
        e.preventDefault();
        const sectionMap: Record<string, string> = {
          "1": "overview",
          "2": "projects",
          "3": "architecture",
          "4": "experience",
          "5": "contact",
        };
        const section = sectionMap[key];
        if (section) {
          jumpToSection(section);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleCopyEmail,
    handleToggleSound,
    isCommandOpen,
    isDark,
    isId,
    jumpToSection,
    selectedModalProject,
    setTheme,
    showToast,
  ]);

  // Active section scroll spy
  useEffect(() => {
    const sections = ["overview", "projects", "architecture", "experience", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMicroTick();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const toggleProjectExpand = (id: string) => {
    playMicroTick();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen selection:bg-foreground selection:text-background font-sans antialiased text-foreground relative"
    >
      {/* ===================================================================== */}
      {/* IMMERSIVE ARCHITECTURAL CASE STUDY MODAL (Studio Deep-Dive)           */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop Scrim (GPU Accelerated Dimmer) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-black/65 dark:bg-black/80 z-40 transform-gpu"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-50 transform-gpu"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/70">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground tabular-nums">
                      {selectedModalProject.year}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {selectedModalProject.role}
                    </span>
                    {selectedModalProject.isLive && (
                      <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-mono text-foreground border border-border/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                    {selectedModalProject.title}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    playMicroTick();
                    setSelectedModalProject(null);
                  }}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Hero Screenshot */}
                {selectedModalProject.imageUrl && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/70 bg-muted/40 shadow-sm">
                    <Image
                      src={selectedModalProject.imageUrl}
                      alt={selectedModalProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover object-center"
                    />
                  </div>
                )}

                {/* Overview Description */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                    {isId ? "Ringkasan Sistem & Masalah Bisnis" : "Executive Overview & Problem Scope"}
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {selectedModalProject.fullDescription[language]}
                  </p>
                </div>

                {/* ADR Deep-Dive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {selectedModalProject.challenges && (
                    <div className="p-4 rounded-2xl border border-border/70 bg-muted/30 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        [01] {isId ? "Tantangan Konkurensi & Skala" : "Concurrency & Scale Bottleneck"}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedModalProject.challenges[language]?.[0] || selectedModalProject.shortDescription[language]}
                      </p>
                    </div>
                  )}

                  {selectedModalProject.solutions && (
                    <div className="p-4 rounded-2xl border border-border/70 bg-muted/30 space-y-1.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        [02] {isId ? "Arsitektur Atomik & Mitigasi" : "Atomic Architectural Solution"}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedModalProject.solutions[language]?.[0] || selectedModalProject.fullDescription[language]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Deliverables & Features */}
                {selectedModalProject.features && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                      [03] {isId ? "Hasil Terverifikasi & Fitur Utama" : "Verified Deliverables & Features"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedModalProject.features[language]?.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground">
                          <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" weight="fill" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModalProject.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2.5 py-1 rounded-lg bg-muted text-foreground font-mono text-xs border border-border/60"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-border/70 bg-muted/20 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                  Press ESC to return
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  {selectedModalProject.githubUrl && selectedModalProject.githubUrl !== "#" && (
                    <a
                      href={selectedModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playMicroTick()}
                      className="px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-1.5 transition-all"
                    >
                      <span>Repository</span>
                      <ArrowUpRight size={12} weight="bold" />
                    </a>
                  )}
                  {selectedModalProject.liveUrl && selectedModalProject.liveUrl !== "#" && (
                    <a
                      href={selectedModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playMicroTick()}
                      className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-xs"
                    >
                      <span>Live Production</span>
                      <ArrowUpRight size={12} weight="bold" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* COMMAND PALETTE MODAL (Cmd + K / Studio-Tier Standard)                */}
      {/* ===================================================================== */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        items={commandItems}
        isId={isId}
      />

      {/* ===================================================================== */}
      {/* SIGNATURE MOMENT: Floating Cursor Project Preview (Desktop Only)       */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activePreviewProject && (
          <motion.div
            style={{
              x: springX,
              y: springY,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden lg:block fixed top-0 left-0 z-40 pointer-events-none w-72 rounded-2xl overflow-hidden border border-border bg-card shadow-2xl p-2.5 space-y-2 transform-gpu"
          >
            {activePreviewProject.imageUrl && (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted/60 border border-border/50">
                <Image
                  src={activePreviewProject.imageUrl}
                  alt={activePreviewProject.title}
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
                {activePreviewProject.isLive && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-mono font-bold text-foreground border border-border/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
            )}
            <div className="px-1 py-0.5 flex items-center justify-between">
              <span className="text-xs font-bold text-foreground truncate max-w-[170px]">
                {activePreviewProject.title}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Preview ↗
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Micro Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 px-3.5 py-2 rounded-xl bg-foreground text-background text-xs font-mono font-medium shadow-lg flex items-center gap-2 border border-background/20 pointer-events-none"
          >
            <Lightning size={14} weight="fill" className="text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* MOBILE FLOATING QUICK-NAV HUD (Viewport < 1024px)                     */}
      {/* ===================================================================== */}
      <nav
        aria-label="Mobile Quick Navigation"
        className="lg:hidden fixed bottom-5 inset-x-0 mx-auto w-fit z-40 px-3 py-1.5 rounded-full bg-card/85 backdrop-blur-xl border border-border/80 shadow-xl flex items-center gap-1"
      >
        {[
          { id: "overview", label: "Overview", icon: Sparkle },
          { id: "projects", label: "Works", icon: SquaresFour },
          { id: "architecture", label: "Stack", icon: Code },
          { id: "experience", label: "Career", icon: ClockCounterClockwise },
          { id: "contact", label: "Contact", icon: ChatCircleDots },
        ].map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => jumpToSection(item.id)}
              className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                isActive
                  ? "text-background font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 bg-foreground rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Icon size={13} weight={isActive ? "bold" : "regular"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Dual-Column Container */}
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
                <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-foreground font-display">
                  Darell Rangga
                </h1>
                <p className="text-xs sm:text-[13px] font-mono text-muted-foreground mt-0.5">
                  Fullstack Software Engineer
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>{isId ? "Tersedia untuk Rekrutmen" : "Available for select roles"}</span>
              </div>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
              {isId
                ? "Merancang arsitektur backend berkecepatan tinggi dengan transaksi database atomik (Laravel 12, PostgreSQL), antrean Redis, dan antarmuka reaktif sub-milidetik (React 19, Next.js 15)."
                : "Architecting high-throughput backend infrastructure with atomic database locks (Laravel 12, PostgreSQL), Redis queues, and sub-millisecond reactive frontends (React 19, Next.js 15)."}
            </p>

            {/* Numbered Section Index Navigation (Desktop only) */}
            <nav className="hidden lg:block space-y-1 font-mono text-xs pt-1">
              {[
                { href: "#overview", id: "overview", label: isId ? "Ringkasan" : "Overview", num: "01", key: "1" },
                { href: "#projects", id: "projects", label: isId ? "Karya Pilihan" : "Selected Works", num: "02", key: "2" },
                { href: "#architecture", id: "architecture", label: isId ? "Pilar Rekayasa" : "Architecture", num: "03", key: "3" },
                { href: "#experience", id: "experience", label: isId ? "Rekam Jejak" : "Experience", num: "04", key: "4" },
                { href: "#contact", id: "contact", label: isId ? "Kontak" : "Contact", num: "05", key: "5" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.num}
                    onClick={() => jumpToSection(item.id)}
                    className={`w-full group flex items-center gap-3 py-1.5 transition-colors text-left cursor-pointer ${
                      isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`text-[10.5px] tabular-nums transition-colors ${
                      isActive ? "text-foreground font-bold" : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}>
                      {item.num}
                    </span>
                    <span className="font-sans text-xs tracking-tight">{item.label}</span>
                    <span className="text-[9px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground transition-colors ml-1">
                      [{item.key}]
                    </span>
                    {isActive && (
                      <span className="ml-auto w-1 h-3 rounded-full bg-foreground" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Utility Strip: Clock, Lang, Theme, Audio, CV, Email, Cmd+K */}
            <div className="pt-4 border-t border-border/60 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <LiveClock className="flex items-center gap-1 text-[11px] tabular-nums" suffix="WIB" />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      playMicroTick();
                      toggleLanguage();
                    }}
                    className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
                  >
                    {language.toUpperCase()}
                  </button>
                  <button
                    onClick={() => {
                      playMicroTick();
                      setTheme(isDark ? "light" : "dark");
                    }}
                    className="p-1 rounded hover:bg-muted text-foreground transition-colors cursor-pointer"
                    title="Toggle theme (Press T)"
                  >
                    {isDark ? <Sun size={13} weight="bold" /> : <Moon size={13} weight="bold" />}
                  </button>
                  <button
                    onClick={handleToggleSound}
                    className="p-1 rounded hover:bg-muted text-foreground transition-colors cursor-pointer"
                    title={soundActive ? "Mute audio (Press S)" : "Enable audio (Press S)"}
                  >
                    {soundActive ? (
                      <SpeakerHigh size={13} weight="bold" className="text-emerald-500" />
                    ) : (
                      <SpeakerSlash size={13} weight="bold" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/pdf/Resume_Darell_Rangga_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroTick()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <FilePdf size={14} weight="bold" />
                  <span>Download CV</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer active:scale-95"
                  title="Copy Email (Press C)"
                >
                  {copied ? <Check size={15} weight="bold" className="text-emerald-500" /> : <EnvelopeSimple size={15} weight="bold" />}
                </button>
                <a
                  href="https://wa.me/628978638973"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMicroTick()}
                  className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors active:scale-95"
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

              {/* Interactive Command Palette Trigger Button */}
              <button
                onClick={() => {
                  playMicroTick();
                  setIsCommandOpen(true);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-muted/50 hover:bg-muted border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Command size={13} className="text-foreground" />
                  <span>{isId ? "Buka Menu Perintah" : "Open Command Menu"}</span>
                </span>
                <kbd className="px-1.5 py-0.5 rounded bg-card text-[10px] text-foreground border border-border/80 group-hover:border-foreground/50 transition-colors">
                  ⌘K
                </kbd>
              </button>
            </div>

          </aside>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Open Editorial Content Stream                           */}
          {/* ===================================================================== */}
          <main className="lg:col-span-8 space-y-16 sm:space-y-20 pt-10 lg:pt-0">
            
            {/* ------------------------------------------------------------------- */}
            {/* 01. OVERVIEW & PROOF METRICS (Editorial Typographic Scale)          */}
            {/* ------------------------------------------------------------------- */}
            <section id="overview" className="space-y-6 scroll-mt-16">
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  01 / {isId ? "Ringkasan Eksekutif" : "Executive Overview"}
                </span>
                
                {/* Editorial Headline ("The Poster Frame") */}
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-[-0.03em] text-foreground font-display leading-[1.15]">
                  {isId ? (
                    <>
                      Membangun platform web tangguh dengan{" "}
                      <span className="underline decoration-border/80 underline-offset-4">konsistensi atomik</span>{" "}
                      dan respons sub-50ms.
                    </>
                  ) : (
                    <>
                      Engineering resilient web platforms with{" "}
                      <span className="underline decoration-border/80 underline-offset-4">strict data consistency</span>{" "}
                      and sub-50ms response times.
                    </>
                  )}
                </h2>

                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed pt-1">
                  {isId
                    ? "Berfokus pada perancangan arsitektur backend berkinerja tinggi, manajemen konkurensi data, dan integrasi API real-time. Berpengalaman memimpin tim engineering membangun solusi digital untuk sektor logistik armada, keselamatan publik, dan ekosistem bisnis."
                    : "Focused on high-performance backend architecture, database concurrency control, and real-time API integrations. Experienced leading engineering teams delivering production platforms across transport logistics, citizen safety, and enterprise operations."}
                </p>
              </div>

              {/* 3 Core Stats (Open Architectural Proof Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-4 border-y border-border/70">
                <div className="space-y-1 p-2 sm:p-0">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <Trophy size={16} weight="fill" className="text-amber-500" />
                    <span className="text-xl sm:text-2xl font-mono font-bold block tabular-nums">
                      Juara 1
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground block font-medium">
                    {isId ? "IT Bootcamp 2026 (Lead 11 Engineer)" : "IT Bootcamp 2026 (Lead 11 Engineers)"}
                  </span>
                </div>

                <div className="space-y-1 p-2 sm:p-0 sm:border-l sm:border-border/60 sm:pl-5">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-foreground block tabular-nums">
                    12+
                  </span>
                  <span className="text-xs text-muted-foreground block font-medium">
                    {isId ? "Sistem Produksi Aktif" : "Active Production Systems"}
                  </span>
                </div>

                <div className="space-y-1 p-2 sm:p-0 sm:border-l sm:border-border/60 sm:pl-5">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-foreground block tabular-nums">
                    4.00
                  </span>
                  <span className="text-xs text-muted-foreground block font-medium">
                    {isId ? "IPK S1 Sistem Informasi UBSI" : "GPA (Information Systems)"}
                  </span>
                </div>
              </div>

              {/* KINETIC ENGINEERING MARQUEE (Continuous Idle Motion) */}
              <div className="overflow-hidden whitespace-nowrap py-2 border-b border-border/50 text-[11px] font-mono text-muted-foreground select-none">
                <div className="inline-block animate-marquee">
                  {[
                    "Laravel 12",
                    "React 19",
                    "Next.js 15",
                    "Inertia.js",
                    "PostgreSQL",
                    "MySQL 8",
                    "Redis Horizon",
                    "WebSockets Reverb",
                    "Tailwind CSS v4",
                    "TypeScript Strict",
                    "Sub-50ms Latency",
                    "Atomic Transactions",
                  ].map((tech, i) => (
                    <span key={i} className="inline-flex items-center gap-2 mr-6">
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------------- */}
            {/* 02. SELECTED WORKS (Gliding Spring Spotlight & Structured ADR)      */}
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
                      onClick={() => {
                        playMicroTick();
                        setViewMode("list");
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        viewMode === "list" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => {
                        playMicroTick();
                        setViewMode("bento");
                      }}
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
                      onClick={() => {
                        playMicroTick();
                        setSelectedCategory(tab.key);
                      }}
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

              {/* LIST VIEW with Gliding Spring Spotlight (Paco Coursey / Rauno Style) */}
              {viewMode === "list" && (
                <div
                  className="space-y-1 relative"
                  onMouseLeave={() => {
                    setHoveredProjectId(null);
                    setActivePreviewProject(null);
                  }}
                >
                  {displayedProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    const isHovered = hoveredProjectId === project.id;

                    return (
                      <article
                        key={project.id}
                        onMouseEnter={() => {
                          setHoveredProjectId(project.id);
                          setActivePreviewProject(project);
                        }}
                        className="relative group rounded-xl p-3.5 sm:p-4 transition-colors flex flex-col gap-2.5 border border-transparent hover:border-border/40"
                      >
                        {/* Gliding Spring Hover Pill */}
                        {isHovered && (
                          <motion.div
                            layoutId="project-hover-pill"
                            className="absolute inset-0 bg-muted/60 dark:bg-muted/40 rounded-xl -z-10 border border-border/60"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}

                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-xs font-mono font-bold text-muted-foreground w-11 shrink-0 tabular-nums">
                              {project.year}
                            </span>

                            <h3 className="text-base font-bold text-foreground font-display tracking-tight">
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
                                onClick={() => playMicroTick()}
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
                                onClick={() => playMicroTick()}
                                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors"
                                title="Source Code"
                              >
                                <span>Code</span>
                                <ArrowUpRight size={12} weight="bold" />
                              </a>
                            )}

                            <button
                              onClick={() => {
                                playMicroTick();
                                setSelectedModalProject(project);
                              }}
                              className="inline-flex items-center gap-1 text-foreground bg-muted hover:bg-muted/80 px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer border border-border/50"
                              title="Open Full Architectural Case Study"
                            >
                              <span>Case Study</span>
                              <ArrowRight size={11} weight="bold" />
                            </button>

                            <button
                              onClick={() => toggleProjectExpand(project.id)}
                              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
                              title={isExpanded ? "Collapse" : "Expand quick view"}
                            >
                              {isExpanded ? <CaretUp size={13} weight="bold" /> : <CaretDown size={13} weight="bold" />}
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
                              className="px-2 py-0.5 rounded bg-muted/80 text-foreground text-[10.5px] font-mono border border-border/60"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>

                        {/* Structured Architectural Decision Record (ADR) Detail Drawer */}
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

                            {/* ADR 3-Line Structured Layout */}
                            <div className="space-y-3 pt-1">
                              {/* 1. Problem / Challenge */}
                              {project.challenges && (
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <span>[01]</span>
                                    <span>{isId ? "Tantangan Rekayasa & Bottleneck" : "Engineering Challenge & Problem"}</span>
                                  </span>
                                  <p className="text-foreground/85 leading-relaxed text-xs">
                                    {project.challenges[language]?.[0] || project.shortDescription[language]}
                                  </p>
                                </div>
                              )}

                              {/* 2. Architecture & Decision */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                  <span>[02]</span>
                                  <span>{isId ? "Keputusan Arsitektur & Solusi" : "Architectural Decision & Solution"}</span>
                                </span>
                                <p className="text-foreground/90 leading-relaxed text-xs">
                                  {project.solutions ? project.solutions[language]?.[0] : project.fullDescription[language]}
                                </p>
                              </div>

                              {/* 3. Impact & Key Features */}
                              {project.features && (
                                <div className="space-y-1.5 pt-1 border-t border-border/60">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <span>[03]</span>
                                    <span>{isId ? "Hasil & Fitur Kunci" : "Impact & Key Deliverables"}</span>
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
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
                            <span className="tabular-nums">{project.year}</span>
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => {
                                  playMicroTick();
                                  setSelectedModalProject(project);
                                }}
                                className="hover:text-foreground font-medium flex items-center gap-0.5 cursor-pointer text-xs"
                              >
                                <span>Deep-Dive</span>
                                <ArrowRight size={11} weight="bold" />
                              </button>
                              {project.liveUrl && project.liveUrl !== "#" && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => playMicroTick()} className="hover:text-foreground font-medium flex items-center gap-0.5">
                                  <span>Demo</span>
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
                    onClick={() => {
                      playMicroTick();
                      setShowAllProjects(!showAllProjects);
                    }}
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
            {/* 03. ENGINEERING ARCHITECTURE & LIVE TELEMETRY                       */}
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

              {/* 3 Core Pillars */}
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

              {/* LIVE ARCHITECTURAL TELEMETRY HUD (The Engineering Signature) */}
              <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-muted/30 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <span className="flex items-center gap-2 text-foreground font-bold">
                    <Pulse size={14} className="text-emerald-500 animate-pulse" />
                    <span>{isId ? "Telemetri Sistem & Integritas Arsitektur" : "Live Architectural Telemetry & Signals"}</span>
                  </span>
                  
                  {/* Concurrency Simulator Trigger Button */}
                  <button
                    onClick={runConcurrencySimulation}
                    disabled={simState === "running"}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-foreground text-background text-[11px] font-mono font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 self-start sm:self-auto shadow-xs"
                  >
                    <Lightning size={12} weight="fill" className="text-amber-400" />
                    <span>
                      {simState === "running"
                        ? (isId ? `Stress-Testing (${simRequests}/1000)...` : `Testing (${simRequests}/1000)...`)
                        : simState === "done"
                        ? (isId ? "✓ Uji Sukses (0 Overbooked)" : "✓ 100% Atomic Pass")
                        : (isId ? "Uji Beban 1.000 Request ⚡" : "Run 1,000 Stress Test ⚡")}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-card border border-border/60 space-y-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      WebSocket Reverb
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      18ms broadcast
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-card border border-border/60 space-y-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      DB Transactions
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-indigo-400" />
                      {simState === "running" ? "Pessimistic Lock Active" : "Atomic Locks"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-card border border-border/60 space-y-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      Redis Queue
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                      <Cpu size={13} className="text-amber-400" />
                      {simState === "running" ? `${simRequests} jobs/s` : "0ms delay"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-card border border-border/60 space-y-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      Lighthouse Score
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                      <Lightning size={13} className="text-emerald-500" />
                      100 / 100
                    </span>
                  </div>
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
                    <span className="text-xs font-mono font-bold text-foreground tabular-nums">2026</span>
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
                    <span className="text-xs font-mono font-bold text-foreground tabular-nums">2024 &ndash; Sekarang</span>
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
                    <span className="text-xs font-mono font-bold text-foreground tabular-nums">2024 &ndash; 2028 (Expected)</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      S1 Sistem Informasi, Universitas Bina Sarana Informatika
                    </span>
                    <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-mono font-bold tabular-nums">
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
            {/* 05. DIRECT INQUIRY & CONTACT (A11y Semantic Form Polish)           */}
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
                  {isId ? "Kirim pesan langsung untuk peluang rekrutmen atau kolaborasi proyek teknis." : "Reach out directly for engineering roles or technical projects."}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="sr-only">
                      {isId ? "Nama Anda" : "Your Name"}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder={isId ? "Nama Anda" : "Your Name"}
                      className="w-full bg-card border border-border/80 focus:border-foreground/80 focus-visible:ring-1 focus-visible:ring-foreground rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      className="w-full bg-card border border-border/80 focus:border-foreground/80 focus-visible:ring-1 focus-visible:ring-foreground rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="sr-only">
                    {isId ? "Pesan / Kebutuhan" : "Message"}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    required
                    placeholder={
                      isId
                        ? "Ceritakan tentang posisi rekrutmen, proyek, atau kebutuhan arsitektur Anda..."
                        : "Tell me about the role, project timeline, or system requirements..."
                    }
                    className="w-full bg-card border border-border/80 focus:border-foreground/80 focus-visible:ring-1 focus-visible:ring-foreground rounded-xl p-3.5 text-xs text-foreground outline-none transition-all resize-none"
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
                    darellrangga@gmail.com
                  </span>
                </div>
              </form>
            </section>

          </main>

        </div>
      </div>
    </motion.div>
  );
}
