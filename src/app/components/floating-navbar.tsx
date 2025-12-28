"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  Moon,
  Sun,
  Languages,
  Settings,
  Terminal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers/language-provider";
import { useCustomization } from "@/app/providers/customization-provider";

export function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const { setIsPlaygroundOpen } = useCustomization();

  const navItems = [
    { name: t.nav.home, href: "#home", icon: Home },
    { name: t.nav.about, href: "#about", icon: User },
    { name: t.nav.services, href: "#services", icon: Briefcase },
    { name: t.nav.projects, href: "#projects", icon: Code },
    { name: t.nav.contact, href: "#contact", icon: Mail },
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-1 md:gap-2 px-2 md:px-3 pb-2 pt-2 md:pb-3 md:pt-3 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl relative max-w-[calc(100vw-32px)] overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth"
        >
          {/* Neon Glow Line (Theme Aware) */}
          <div className="absolute -top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primary to-transparent opacity-50" />

          {/* Navigation Items */}
          <ul className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <DockItem key={item.name} href={item.href} label={item.name}>
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors" />
              </DockItem>
            ))}
          </ul>

          {/* Separator */}
          <div className="w-[1px] h-6 md:h-8 bg-black/10 dark:bg-white/10 mx-1 md:mx-2 flex-shrink-0" />

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            <DockItem
              onClick={() => setIsPlaygroundOpen(true)}
              label="Dev Mode"
            >
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors" />
            </DockItem>
            <DockItem
              onClick={toggleLanguage}
              label={language === "en" ? "English" : "Indonesia"}
            >
              <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold text-[8px] md:text-[10px] bg-black/5 dark:bg-white/10 rounded-md text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                {language === "en" ? "EN" : "ID"}
              </div>
            </DockItem>

            <DockItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              label={theme === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors" />
              ) : (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors" />
              )}
            </DockItem>
          </div>
        </motion.nav>
      </div>
    </>
  );
}

function DockItem({
  children,
  href,
  onClick,
  label,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Wrapper for Link or Button
  const Content = () => (
    <div className="relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300">
      {children}

      {/* Active/Hover Indicator */}
      {isHovered && (
        <motion.div
          layoutId="dock-glow"
          className="absolute inset-0 rounded-xl bg-primary/10 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] shadow-primary/30"
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
      {/* Tooltip (CSS Hover) */}
      <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 dark:bg-black/90 border border-white/10 rounded-xl text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-50 shadow-xl">
        {label}
        {/* Arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10" />
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
