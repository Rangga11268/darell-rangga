"use client";

import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import { TabKey } from "./types";
import {
  House,
  Code,
  Trophy,
  Cpu,
  ChatCircleDots,
  FilePdf,
  Translate,
  Moon,
  Sun,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";

interface LeftSidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export function LeftSidebar({ activeTab, onSelectTab }: LeftSidebarProps) {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isId = language === "id";
  const isDark = resolvedTheme === "dark";

  const navItems = [
    { key: "why-hire" as TabKey, label: isId ? "Utas Utama" : "Feed", icon: House },
    { key: "projects" as TabKey, label: isId ? "Karya Terpilih" : "Projects", icon: Code, badge: "12" },
    { key: "experience" as TabKey, label: isId ? "Pencapaian" : "Highlights", icon: Trophy, badge: "Juara 1" },
    { key: "skills" as TabKey, label: isId ? "Keahlian" : "Tech Radar", icon: Cpu },
    { key: "contact" as TabKey, label: isId ? "Hubungi Saya" : "Get in Touch", icon: ChatCircleDots },
    {
      key: "why-hire" as TabKey,
      label: isId ? "Utas Utama" : "Feed",
      icon: House,
    },
    {
      key: "projects" as TabKey,
      label: isId ? "Karya Terpilih" : "Projects",
      icon: Code,
      badge: "12",
    },
    {
      key: "experience" as TabKey,
      label: isId ? "Pencapaian" : "Highlights",
      icon: Trophy,
      badge: "Juara 1",
    },
    {
      key: "skills" as TabKey,
      label: isId ? "Keahlian" : "Tech Radar",
      icon: Cpu,
    },
    {
      key: "contact" as TabKey,
      label: isId ? "Hubungi Saya" : "Get in Touch",
      icon: ChatCircleDots,
    },
    {
      key: "why-hire" as TabKey,
      label: isId ? "Utas Utama" : "Feed",
      icon: House,
    },
    {
      key: "projects" as TabKey,
      label: isId ? "Karya Terpilih" : "Projects",
      icon: Code,
      badge: "12",
    },
    {
      key: "experience" as TabKey,
      label: isId ? "Pencapaian" : "Highlights",
      icon: Trophy,
    },
    {
      key: "skills" as TabKey,
      label: isId ? "Keahlian" : "Tech Radar",
      icon: Cpu,
    },
    {
      key: "contact" as TabKey,
      label: isId ? "Hubungi Saya" : "Get in Touch",
      icon: ChatCircleDots,
    },
  ];

  return (
    <aside className="w-16 xl:w-[260px] shrink-0 hidden md:flex flex-col justify-between py-4 px-2 xl:px-4 sticky top-0 h-screen select-none border-r border-border/60 bg-background/50 backdrop-blur-md z-30">
      {/* Top Brand & Navigation */}
      <div className="space-y-4">
        {/* Brand Header with Darell Rangga Logo */}
        <div
          onClick={() => onSelectTab("why-hire")}
          className="flex items-center gap-3 px-2 py-1.5 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer group"
          title="Darell Rangga Portfolio"
        >
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden shrink-0 border border-border/80 p-1.5 bg-card shadow-xs group-hover:scale-105 transition-transform">
            <Image
              src="/img/saya/logo-white.webp"
              alt="Darell Rangga Logo"
              fill
              className="object-contain p-1 dark:block hidden"
            />
            <Image
              src="/img/saya/logo-new.webp"
              alt="Darell Rangga Logo"
              fill
              className="object-contain p-1 dark:hidden block"
            />
          </div>
          <div className="hidden xl:block min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-black font-display text-foreground block truncate">
                Darell Rangga
              </span>
              <CheckCircle size={14} weight="fill" className="text-primary shrink-0" />
              <CheckCircle
                size={14}
                weight="fill"
                className="text-primary shrink-0"
              />
              <CheckCircle
                size={14}
                weight="fill"
                className="text-primary shrink-0"
              />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground block truncate">
              Fullstack Engineer
            </span>
          </div>
        </div>

        {/* Navigation Rail Items (M3 Navigation Item with pill indicator) */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl transition-all cursor-pointer group relative ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
                }`}
              >
                {/* M3 Active Indicator Pill */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "group-hover:bg-muted text-current"
                  }`}
                >
                  <Icon size={20} weight={isActive ? "fill" : "regular"} />
                  {item.badge === "Juara 1" && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-primary absolute -top-0.5 -right-0.5 ring-2 ring-background" />
                  )}
                  {item.key === "projects" && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 ring-2 ring-background" />
                  )}
                </div>

                <span className="hidden xl:inline text-sm grow text-left truncate">
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    className={`hidden xl:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      item.badge === "Juara 1"
                        ? "bg-foreground/10 text-foreground font-bold border border-foreground/15"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Download Resume / CV Link */}
          <a
            href={
              isId
                ? "/pdf/Resume_Darell_Rangga_ID.pdf"
                : "/pdf/Resume_Darell_Rangga_EN.pdf"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer group font-medium"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl group-hover:bg-muted transition-colors text-current">
              <FilePdf size={20} />
            </div>
            <span className="hidden xl:inline text-sm truncate">
              {isId ? "Unduh CV" : "Download CV"}
            </span>
          </a>
        </nav>

        {/* Primary Action Button (M3 Filled Button) */}
        <div className="pt-2">
          <button
            onClick={() => onSelectTab("contact")}
            className="w-full py-3 px-3 rounded-2xl bg-foreground text-background font-extrabold text-sm shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PaperPlaneTilt size={18} weight="bold" />
            <span className="hidden xl:inline">
              {isId ? "Kirim Tawaran" : "Contact Me"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Profile & Utilities */}
      <div className="space-y-3 pt-4 border-t border-border/50">
        {/* Quick Utility Switchers (Language & Theme) */}
        <div className="flex items-center gap-1.5 justify-center xl:justify-between px-1">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-xs font-bold text-foreground transition-all cursor-pointer"
            title="Ganti Bahasa / Toggle Language"
          >
            <Translate size={15} weight="bold" className="text-primary" />
            <span className="font-mono text-xs font-extrabold uppercase hidden xl:inline">
              {language}
            </span>
          </button>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 text-foreground transition-all cursor-pointer"
            title={isDark ? "Mode Terang" : "Mode Gelap"}
          >
            {isDark ? (
              <Sun size={16} weight="bold" className="text-foreground" />
            ) : (
              <Moon size={16} weight="bold" className="text-foreground" />
            )}
          </button>
        </div>

        {/* Current User Card */}
        <div
          onClick={() => onSelectTab("why-hire")}
          className="flex items-center gap-2.5 p-2 rounded-2xl hover:bg-muted/60 transition-colors cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-border/80 shrink-0">
            <Image
              src="/img/saya/saya1.webp"
              alt="Darell Rangga"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden xl:block min-w-0">
            <span className="text-xs font-bold text-foreground truncate block">
              Darell Rangga
            </span>
            <span className="text-[11px] text-muted-foreground font-mono truncate block">
              IPK 4.00 UBSI
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
