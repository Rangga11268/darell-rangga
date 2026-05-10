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
  CaretLeft,
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
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[80]"
            />
            
            {/* Right Side Editorial Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[90] bg-paper border-l-rule-thick border-primary shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="flex-1 p-8 overflow-y-auto">
                {/* Panel Header */}
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-1">
                    <span className="label-caps text-[9px] font-bold opacity-40">ARCHIVE INDEX</span>
                    <h2 className="headline-md text-3xl font-serif">Digital Archivist</h2>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
                  >
                    <X size={24} weight="bold" />
                  </button>
                </div>

                {/* Section: Main Navigation (Editions) */}
                <div className="space-y-6 mb-12">
                  <div className="border-b hairline-b border-primary/20 pb-2 flex justify-between items-end">
                    <span className="label-caps text-[10px] font-bold">THE EDITIONS</span>
                    <span className="text-[9px] italic opacity-40">Select Section</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {primaryItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between p-4 border hairline border-primary/10 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <item.icon size={20} weight="bold" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                          <span className="headline-sm text-lg uppercase tracking-tight group-hover:translate-x-1 transition-transform">{item.name}</span>
                        </div>
                        <span className="text-[10px] opacity-0 group-hover:opacity-40 transition-opacity font-serif italic">Go to page →</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Section: Special Supplements */}
                <div className="space-y-6 mb-12">
                  <div className="border-b hairline-b border-primary/20 pb-2 flex justify-between items-end">
                    <span className="label-caps text-[10px] font-bold">SUPPLEMENTS</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => { openFolder("certificates-folder"); setIsMenuOpen(false); }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <SealCheck size={16} className="opacity-40" />
                        <span className="label-caps text-[10px] font-bold">{t.nav.certificates}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { openFolder("system-files"); setIsMenuOpen(false); }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <FilePdf size={16} className="opacity-40" />
                        <span className="label-caps text-[10px] font-bold">{t.nav.curriculumVitae}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { setIsPlaygroundOpen(!isPlaygroundOpen); setIsMenuOpen(false); }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", isPlaygroundOpen ? "bg-primary animate-pulse" : "bg-primary/20")} />
                        <span className="label-caps text-[10px] font-bold">THE ARCHIVIST (AI)</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Settings Quick Bar */}
                <div className="grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-center gap-2 p-3 border hairline border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    <span className="label-caps text-[9px] font-bold">CONTRAST</span>
                  </button>
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center justify-center gap-2 p-3 border hairline border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <Translate size={14} />
                    <span className="label-caps text-[9px] font-bold">{language === "id" ? "BAHASA" : "LANGUAGE"}</span>
                  </button>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-8 border-t hairline-t border-primary/10 bg-primary/5">
                <div className="flex flex-col gap-2">
                  <span className="label-caps text-[8px] font-bold opacity-30">ARCHIVE DISPATCH</span>
                  <p className="text-[11px] font-serif italic opacity-60 leading-relaxed">
                    &quot;Documentation is a love letter that you write to your future self.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Vertical Editorial Tab (The Trigger) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[85]">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ x: -2 }}
          className={cn(
            "flex items-center gap-4 bg-primary text-primary-foreground shadow-[-4px_0_20px_rgba(0,0,0,0.2)] group transition-all h-[180px] w-10 md:w-12 relative",
            isMenuOpen && "opacity-0 pointer-events-none"
          )}
        >
          {/* Vertical Text Label */}
          <div 
            className="flex items-center gap-6 rotate-180 absolute inset-0 justify-center"
            style={{ writingMode: "vertical-rl" }}
          >
            <div className="flex items-center gap-2">
               <CaretLeft size={14} weight="bold" className="group-hover:-translate-y-1 transition-transform" />
               <span className="label-caps text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase">THE INDEX</span>
            </div>
          </div>
          
          {/* Decorative Edge Detail (Archive Stamp) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none flex flex-col items-center">
             <span className="text-[7px] font-bold leading-none">EDITION</span>
             <span className="text-[7px] font-bold leading-none">2025</span>
          </div>
        </motion.button>
      </div>

      {/* Floating Language Toggle (Outside) */}
      <div className="fixed bottom-32 left-4 md:bottom-32 md:left-8 z-50">
        <motion.button
          onClick={toggleLanguage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-paper border-rule-thick border-primary flex items-center justify-center shadow-[4px_4px_0px_#1a1c1c] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group overflow-hidden"
        >
          <div className="flex flex-col items-center">
            <Translate size={20} weight="bold" />
            <span className="text-[7px] font-bold mt-0.5">{language === "id" ? "IND" : "ENG"}</span>
          </div>
          {/* Tooltip */}
          <div className="absolute -top-10 left-0 bg-primary text-primary-foreground px-2 py-1 label-caps text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
             Switch Language
          </div>
        </motion.button>
      </div>
    </>
  );
}
