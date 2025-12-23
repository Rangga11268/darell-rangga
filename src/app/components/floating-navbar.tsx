"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
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
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
          isScrolled ? "pt-2 pb-2" : "pt-6 pb-4"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative w-full max-w-7xl px-4">
          {/* Main Glass Container */}
          <nav
            className={cn(
              "relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
              isScrolled
                ? "bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5"
                : "bg-transparent border border-transparent"
            )}
          >
            {/* Glowing Bottom Line (Visible on Scroll) */}
            <div
              className={cn(
                "absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500",
                isScrolled ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Logo */}
            <a
              href="#"
              className="relative z-10 text-xl font-bold tracking-tighter flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute inset-0 border-2 border-primary rounded-lg rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                <span className="relative font-serif font-bold text-2xl text-primary">
                  D
                </span>
              </div>
              <span className="hidden sm:inline-block font-sans font-bold tracking-[0.2em] text-foreground text-xl xl:text-2xl uppercase group-hover:text-primary transition-colors duration-300">
                Darell
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-lg xl:text-xl font-bold tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 group overflow-hidden rounded-md block"
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Hover Glow Background */}
                    <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                    {/* Bottom Line Indicator */}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                onClick={toggleLanguage}
              >
                <span className="text-base xl:text-lg font-bold font-sans tracking-wider">
                  {language === "en" ? "EN" : "ID"}
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors relative"
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
                className="md:hidden rounded-full w-9 h-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
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
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - "Unrolling Scroll" Effect */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[80px] left-4 right-4 z-40 md:hidden overflow-hidden"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-xl p-2 flex flex-col relative">
              {/* Decorative Pattern Background */}
              <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />

              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  href={item.href}
                  className="px-4 py-3 text-center text-lg font-bold tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Decorative Rune Footer */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
