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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
          isScrolled ? "pt-4" : "pt-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-auto">
          {/* Main Glass Pill */}
          <nav
            className={cn(
              "relative flex items-center gap-2 px-2 py-2 rounded-full transition-all duration-300",
              isScrolled
                ? "bg-background/70 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/5"
                : "bg-background/40 backdrop-blur-md border border-white/5"
            )}
          >
            {/* Logo */}
            <a
              href="#"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group ml-1"
            >
              <span className="font-display font-bold text-xl text-primary group-hover:scale-110 transition-transform">
                D
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-6 w-[1px] bg-border mx-2 hidden md:block" />

            {/* Actions */}
            <div className="flex items-center gap-1 pr-1">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5"
                onClick={toggleLanguage}
              >
                <div className="relative w-5 h-5 flex items-center justify-center font-bold text-[10px]">
                  {language === "en" ? "EN" : "ID"}
                </div>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full w-9 h-9 text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={item.href}
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
