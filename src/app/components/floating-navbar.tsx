"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers/language-provider";

export function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-4 px-4",
          isScrolled ? "pt-2" : "pt-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-lg transition-all duration-300 w-full max-w-5xl",
            isScrolled || isMobileMenuOpen
              ? "bg-[#2c241b]/90 dark:bg-[#1a1614]/90 backdrop-blur-md border-[3px] border-[#8d6e63] shadow-xl"
              : "bg-transparent border-transparent"
          )}
          style={{
            boxShadow: isScrolled
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)"
              : "none",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tighter flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-sm bg-primary border-2 border-[#3e2723] flex items-center justify-center text-[#3e2723] font-serif font-bold text-2xl rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-md">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                D
              </span>
            </div>
            <span className="hidden sm:inline-block font-sans tracking-widest text-primary drop-shadow-md">
              DARELL
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="px-4 py-2 relative group overflow-hidden"
                >
                  <span className="relative z-10 text-sm font-bold text-[#d4c5a9] group-hover:text-[#3e2723] transition-colors duration-300 font-sans tracking-wide uppercase">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#d4c5a9] hover:bg-primary/20 hover:text-primary font-bold font-serif w-10 h-10 border border-transparent hover:border-[#d4af37]/50"
              onClick={toggleLanguage}
            >
              <span className="text-xs">{language === "en" ? "EN" : "ID"}</span>
              <span className="sr-only">Toggle language</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#d4c5a9] hover:bg-primary/20 hover:text-primary"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-[#d4c5a9] hover:bg-primary/20 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden"
          >
            <div className="bg-[#2c241b] border-2 border-[#8d6e63] rounded-lg shadow-2xl p-4 flex flex-col gap-2 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-center text-[#d4c5a9] hover:bg-[#3e2723] hover:text-primary border-b border-[#3e2723] last:border-0 transition-colors font-sans uppercase tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
