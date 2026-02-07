"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  User,
  Briefcase,
  Code,
  Envelope,
  Moon,
  Sun,
  SquaresFour,
  X,
  Translate,
  FolderOpen,
  Terminal,
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

  const toolsItems = [
    {
      name: "Terminal",
      icon: Terminal,
      onClick: () => setIsPlaygroundOpen(!isPlaygroundOpen),
      highlight: isPlaygroundOpen,
    },
    {
      name: "Files",
      icon: FolderOpen,
      onClick: () => {
        if (openFolders.includes("system-files")) {
          closeFolder("system-files");
        } else {
          openFolder("system-files");
        }
      },
      highlight: openFolders.includes("system-files"),
    },
  ];

  return (
    <>
      {/* 2. Expanded Menu (Grid) - Clean Glass */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-24 inset-x-4 md:w-[320px] md:left-1/2 md:-translate-x-1/2 z-40 glass-card rounded-3xl p-4 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Quick Actions
              </span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MenuItem
                icon={theme === "dark" ? Moon : Sun}
                label={theme === "dark" ? "Dark Mode" : "Light Mode"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <MenuItem
                icon={Translate}
                label={language === "en" ? "Bahasa" : "English"}
                onClick={toggleLanguage}
                badge={language.toUpperCase()}
              />
            </div>
            <div className="h-px bg-border/50 my-1" />
            <div className="grid grid-cols-2 gap-3">
              <MenuItem
                icon={Briefcase}
                label={t.nav.services}
                href="#services"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Main Floating Dock (Island) */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="pointer-events-auto h-14 md:h-16 px-2 md:px-4 bg-background/80 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-full flex items-center gap-1 md:gap-4"
        >
          {/* Navigation Links */}
          <div className="flex items-center gap-0.5 md:gap-2">
            {primaryItems.map((item) => (
              <DockLink
                key={item.name}
                href={item.href}
                icon={item.icon}
                label={item.name}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Tools */}
          <div className="flex items-center gap-0.5 md:gap-2">
            {toolsItems.map((item) => (
              <DockButton
                key={item.name}
                onClick={item.onClick}
                icon={item.icon}
                label={item.name}
                highlight={item.highlight}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Menu Toggle */}
          <DockButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            icon={SquaresFour}
            label="More"
            highlight={isMenuOpen}
          />
        </motion.nav>
      </div>
    </>
  );
}

// --- Components ---

function DockLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative p-2 md:p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 group",
        "hover:scale-110",
      )}
      aria-label={label}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

function DockButton({
  onClick,
  icon: Icon,
  label,
  highlight,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 md:p-3 rounded-full transition-all duration-300 group hover:scale-110",
        highlight
          ? "bg-primary/10 text-primary hover:bg-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
      aria-label={label}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  href,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all cursor-pointer group">
      <div className="p-2 rounded-full bg-background border border-border group-hover:border-primary/50 transition-colors">
        <Icon className="w-4 h-4 text-foreground" />
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground flex-1">
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">
          {badge}
        </span>
      )}
    </div>
  );

  return href ? (
    <a href={href} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
