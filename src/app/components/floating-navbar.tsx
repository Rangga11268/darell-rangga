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
  X,
  Translate,
  List,
  FilePdf,
  SealCheck,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers/language-provider";
import { useCustomization } from "@/app/providers/customization-provider";
import { cn } from "@/lib/utils";
import { useFileSystem } from "@/app/providers/file-system-provider";

export function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const { openFolder } = useFileSystem();

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
      {/* Archive Controls Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 inset-x-margin-mobile md:w-[350px] md:left-auto md:right-margin-desktop z-[60] bg-paper border-rule-thick border-primary shadow-[8px_8px_0px_#1a1c1c] overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b hairline-b border-primary bg-primary text-primary-foreground">
              <span className="label-caps font-bold tracking-widest text-[10px]">
                Archive Settings
              </span>
              <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="grid grid-cols-1 divide-y hairline-t divide-primary/10">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-between p-4 hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <span className="label-caps font-bold">Contrast Mode</span>
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                onClick={() => {
                  setIsPlaygroundOpen(!isPlaygroundOpen);
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between p-4 hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <span className="label-caps font-bold">The Archivist</span>
                <span className="body-md italic">{isPlaygroundOpen ? "Active" : "Launch"}</span>
              </button>

              <div className="bg-primary/5 px-4 py-2 border-b hairline-b border-primary/10">
                <span className="label-caps font-bold text-[9px] opacity-40 italic">Special Supplements</span>
              </div>

              <button 
                onClick={() => {
                  openFolder("certificates-folder");
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between p-4 hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <span className="label-caps font-bold">{t.nav.certificates}</span>
                <SealCheck size={20} />
              </button>

              <button 
                onClick={() => {
                  openFolder("system-files");
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between p-4 hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <span className="label-caps font-bold">{t.nav.curriculumVitae}</span>
                <FilePdf size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section Index (Bottom Bar) */}
      <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto flex items-stretch bg-paper border-rule-thick border-primary shadow-[6px_6px_0px_#1a1c1c] h-16 md:h-20"
        >
          {primaryItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center px-4 md:px-10 border-r hairline-r border-primary hover:bg-primary hover:text-primary-foreground transition-all group relative overflow-hidden"
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6 mb-1 group-hover:scale-110 transition-transform" weight="bold" />
              <span className="label-caps text-[8px] md:text-[10px] font-bold tracking-widest">{item.name}</span>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex flex-col items-center justify-center px-4 md:px-10 transition-all group relative",
              isMenuOpen ? "bg-primary text-primary-foreground" : "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <List className="w-5 h-5 md:w-6 md:h-6 mb-1" weight="bold" />
            <span className="label-caps text-[8px] md:text-[10px] font-bold tracking-widest">Index</span>
          </button>

          <button
            onClick={toggleLanguage}
            className="flex flex-col items-center justify-center px-4 md:px-8 border-l hairline-l border-primary hover:bg-primary hover:text-primary-foreground transition-all group relative"
          >
            <Translate className="w-5 h-5 md:w-6 md:h-6 mb-1 group-hover:rotate-12 transition-transform" weight="bold" />
            <span className="label-caps text-[8px] md:text-[10px] font-bold tracking-widest">{language === "id" ? "IND" : "ENG"}</span>
          </button>
        </motion.nav>
      </div>
    </>
  );
}
