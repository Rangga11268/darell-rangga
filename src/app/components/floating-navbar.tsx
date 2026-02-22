"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  User,
  Code,
  Envelope,
  Moon,
  Sun,
  SquaresFour,
  X,
  Translate,
  FolderOpen,
  Terminal,
  Sparkle,
  IconWeight,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers/language-provider";
import { useCustomization } from "@/app/providers/customization-provider";
import { useFileSystem } from "@/app/providers/file-system-provider";
import { cn } from "@/lib/utils";

export function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const { openFolders, openFolder, closeFolder } = useFileSystem();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const primaryItems = [
    { name: t.nav.home, href: "#home", icon: House },
    { name: t.nav.about, href: "#about", icon: User },
    { name: t.nav.projects, href: "#projects", icon: Code },
    { name: t.nav.contact, href: "#contact", icon: Envelope },
  ];

  return (
    <>
      {/* Expanded Quick Actions Menu — Liquid Glass Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-28 inset-x-4 md:w-[340px] md:left-1/2 md:-translate-x-1/2 z-40 rounded-3xl p-5 flex flex-col gap-4 liquid-glass-panel"
          >
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-foreground/60 uppercase tracking-widest">
                Quick Actions
              </span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5 text-foreground/50 hover:text-foreground transition-colors" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MenuItem
                icon={theme === "dark" ? Moon : Sun}
                label="Theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <MenuItem
                icon={Translate}
                label={language === "id" ? "IND" : "ENG"}
                onClick={toggleLanguage}
                active={language === "id"}
              />
              <MenuItem
                icon={Terminal}
                label="Terminal"
                onClick={() => setIsPlaygroundOpen(!isPlaygroundOpen)}
                active={isPlaygroundOpen}
                badge={
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] font-bold text-white shadow-lg shadow-purple-500/40 animate-pulse">
                    <Sparkle weight="fill" className="w-3 h-3" />
                    AI
                  </span>
                }
              />
              <MenuItem
                icon={FolderOpen}
                label="Files"
                onClick={() =>
                  openFolders.includes("system-files")
                    ? closeFolder("system-files")
                    : openFolder("system-files")
                }
                active={openFolders.includes("system-files")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Dock — Liquid Glass */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="pointer-events-auto liquid-glass-dock"
        >
          {primaryItems.map((item) => (
            <DockLink
              key={item.name}
              href={item.href}
              icon={item.icon}
              label={item.name}
            />
          ))}

          <div className="liquid-glass-divider" />

          <DockButton
            icon={SquaresFour}
            label="More"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isActive={isMenuOpen}
            badge={
              !isMenuOpen && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="hidden md:animate-ping md:absolute md:inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border border-white dark:border-zinc-900"></span>
                </div>
              )
            }
          />
        </motion.nav>
      </div>

      {/* SVG filter for glass refraction — rendered once, used by CSS */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-glass-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

function DockLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      className="liquid-glass-icon group flex-col !gap-0.5"
      aria-label={label}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6" weight="duotone" />
      <span className="text-[9px] font-medium opacity-70 leading-none">
        {label}
      </span>
    </a>
  );
}

function DockButton({
  icon: Icon,
  label,
  onClick,
  isActive,
  badge,
}: {
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "liquid-glass-icon group relative flex-col !gap-0.5",
        isActive && "liquid-glass-icon-active",
      )}
      aria-label={label}
    >
      {badge}
      <Icon
        className="w-5 h-5 md:w-6 md:h-6"
        weight={isActive ? "fill" : "duotone"}
      />
      <span className="text-[9px] font-medium opacity-70 leading-none">
        {label}
      </span>
    </button>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  active,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  active?: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="w-full text-left relative group/item">
      {badge && (
        <div className="absolute top-2 right-2 z-10 pointer-events-none">
          {badge}
        </div>
      )}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all cursor-pointer group backdrop-blur-sm h-24",
          active
            ? "bg-primary/10 border-primary/20"
            : "bg-foreground/[0.04] hover:bg-foreground/[0.08] border-foreground/[0.06] hover:border-foreground/[0.12]",
        )}
      >
        <div
          className={cn(
            "p-2 rounded-xl border transition-all",
            active
              ? "bg-primary/20 border-primary/30 text-primary"
              : "bg-foreground/[0.06] border-foreground/[0.08] group-hover:border-primary/40 text-muted-foreground",
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={cn(
            "text-xs font-bold",
            active ? "text-primary" : "text-foreground/60",
          )}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
