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

  const tools = [
    {
      name: "Theme",
      icon: theme === "dark" ? Moon : Sun,
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      active: false,
    },
    {
      name: "Language",
      icon: Translate,
      onClick: toggleLanguage,
      active: language === "id",
    },
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
                icon={Terminal}
                label="Terminal"
                onClick={() => setIsPlaygroundOpen(!isPlaygroundOpen)}
                active={isPlaygroundOpen}
              />
              <MenuItem
                icon={FolderOpen}
                label="System Files"
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
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
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

          {tools.map((item) => (
            <DockButton
              key={item.name}
              icon={item.icon}
              label={item.name}
              onClick={item.onClick}
              isActive={item.active}
            />
          ))}

          <DockButton
            icon={SquaresFour}
            label="More"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isActive={isMenuOpen}
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
    <a href={href} className="liquid-glass-icon group" aria-label={label}>
      <Icon className="w-5 h-5 md:w-6 md:h-6" weight="duotone" />
      <span className="sr-only">{label}</span>
      {/* Tooltip could go here */}
    </a>
  );
}

function DockButton({
  icon: Icon,
  label,
  onClick,
  isActive,
}: {
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "liquid-glass-icon group",
        isActive && "liquid-glass-icon-active",
      )}
      aria-label={label}
    >
      <Icon
        className="w-5 h-5 md:w-6 md:h-6"
        weight={isActive ? "fill" : "duotone"}
      />
    </button>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button onClick={onClick} className="w-full text-left">
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
