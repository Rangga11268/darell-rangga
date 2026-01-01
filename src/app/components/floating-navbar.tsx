"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  Moon,
  Sun,
  Mic,
  MicOff,
  Bot,
  LayoutGrid,
  X,
  Languages,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers/language-provider";
import { useCustomization } from "@/app/providers/customization-provider";
import { useVoiceControl } from "@/app/providers/voice-control-provider";

export function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const { setIsPlaygroundOpen } = useCustomization();
  const { isListening, toggleListening } = useVoiceControl();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Primary Items (Always visible in Dock)
  const primaryItems = [
    { name: t.nav.home, href: "#home", icon: Home },
    { name: t.nav.projects, href: "#projects", icon: Code },
    {
      name: "AI Terminal",
      icon: Bot,
      onClick: () => setIsPlaygroundOpen(true),
      special: true,
    },
    { name: t.nav.contact, href: "#contact", icon: Mail },
  ];

  // Secondary Items (Hidden in Grid Menu)
  const menuItems = [
    { name: t.nav.about, href: "#about", icon: User },
    { name: t.nav.services, href: "#services", icon: Briefcase },
    {
      name: isListening ? "Listening..." : "Voice Control",
      icon: isListening ? Mic : MicOff,
      onClick: toggleListening,
      active: isListening,
      activeColor: "text-red-500",
    },
    {
      name: language === "en" ? "Bahasa Indonesia" : "English",
      icon: Languages,
      onClick: toggleLanguage,
      badge: language.toUpperCase(),
    },
    {
      name: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon: theme === "dark" ? Moon : Sun,
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ];

  return (
    <>
      {/* 1. Holographic Grid Menu (Overlay) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed bottom-24 inset-x-4 md:inset-x-auto md:w-[320px] md:bottom-24 md:right-8 z-40 p-4 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                Control Center
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {menuItems.map((item, idx) => (
                <GridItem
                  key={idx}
                  icon={item.icon}
                  label={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  active={item.active}
                  activeColor={item.activeColor}
                  badge={item.badge}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Compact Dock (Bottom Bar) */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-2 md:gap-3 px-3 py-3 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl relative"
        >
          {/* Neon Glow Line */}
          <div className="absolute -top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primary to-transparent opacity-50" />

          {/* Primary Icons */}
          {primaryItems.map((item) => (
            <DockItem
              key={item.name}
              href={item.href}
              onClick={item.onClick}
              label={item.name}
              isSpecial={item.special}
            >
              <item.icon
                className={`w-5 h-5 ${
                  item.special
                    ? "text-primary animate-pulse"
                    : "text-neutral-600 dark:text-neutral-400 group-hover:text-primary"
                } transition-colors`}
              />
            </DockItem>
          ))}

          {/* Separator */}
          <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-1" />

          {/* Menu Trigger */}
          <DockItem
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            label="More Apps"
          >
            <LayoutGrid
              className={`w-5 h-5 transition-colors ${
                isMenuOpen
                  ? "text-primary rotate-90"
                  : "text-neutral-600 dark:text-neutral-400 group-hover:text-primary"
              }`}
            />
          </DockItem>
        </motion.nav>
      </div>
    </>
  );
}

// --- Sub Components ---

function DockItem({
  children,
  href,
  onClick,
  label,
  isSpecial,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  label: string;
  isSpecial?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const Content = () => (
    <div
      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
        isSpecial
          ? "bg-primary/10 border border-primary/50 shadow-[0_0_15px_-3px_var(--primary)] text-primary"
          : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-primary/50"
      }`}
    >
      {children}
      {isHovered && (
        <motion.div
          layoutId="dock-glow"
          className="absolute inset-0 rounded-xl bg-primary/10 shadow-[0_0_20px_-5px_var(--primary)]"
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );

  return (
    <div
      className="relative group flex flex-col items-center flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div className="hidden md:block absolute -top-12 px-2 py-1 bg-black/90 border border-white/10 rounded-lg text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </div>

      {href ? (
        <a href={href} onClick={onClick}>
          <Content />
        </a>
      ) : (
        <button onClick={onClick}>
          <Content />
        </button>
      )}
    </div>
  );
}

function GridItem({
  icon: Icon,
  label,
  href,
  onClick,
  active,
  activeColor,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  activeColor?: string;
  badge?: string;
}) {
  const content = (
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group h-full">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          active
            ? "bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse"
            : "bg-black/20 text-white/70 group-hover:text-primary group-hover:bg-primary/10"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            active ? activeColor : ""
          } transition-transform group-hover:scale-110`}
        />
      </div>
      <span className="text-[10px] text-center font-medium text-white/70 group-hover:text-white leading-tight">
        {label}
      </span>
      {badge && (
        <span className="absolute top-2 right-2 text-[8px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );

  return href ? (
    <a href={href} className="block h-full relative" onClick={onClick}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="block w-full h-full relative">
      {content}
    </button>
  );
}
