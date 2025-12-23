"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Scroll,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { HeroArtifact } from "./hero-artifact";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Elements - Warm Ancient Glows */}
      <div className="absolute inset-0 w-full h-full bg-background pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#c5a059]/10 blur-[100px] animate-float" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#8d6e63]/10 blur-[100px] animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#8d6e63] bg-[#f4e4bc] text-[#3e2723] text-sm font-bold font-serif tracking-wide shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>{t.hero.available}</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t.hero.greeting}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#8d6e63] drop-shadow-sm">
                  Darell
                </span>
                <br />
                <span className="text-[#a1887f]">{t.hero.role}</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-[#8d6e63] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t.hero.description}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-sm text-lg px-8 h-12 shadow-lg shadow-[#c5a059]/20 hover:shadow-[#c5a059]/40 transition-all bg-[#c5a059] text-[#2c241b] hover:bg-[#d4af37] font-serif font-bold border-2 border-[#8d6e63]"
                asChild
              >
                <a href="#projects">{t.hero.viewWork}</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-sm text-lg px-8 h-12 border-2 border-[#8d6e63] text-[#8d6e63] hover:bg-[#8d6e63]/10 hover:text-[#c5a059] font-serif font-bold"
                asChild
              >
                <a href="#contact">{t.hero.contactMe}</a>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Github, href: "https://github.com/Rangga11268/" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
                },
                { icon: Mail, href: "mailto:darrelrangga@gmail.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-[#8d6e63] hover:text-[#d4af37] transition-all transform hover:scale-110 duration-200 hover:-translate-y-1"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* 3D Artifact Background - Subtle Magic Behind Portrait */}
              <div className="absolute inset-[-50%] z-0 opacity-60 pointer-events-none">
                <HeroArtifact />
              </div>

              {/* Ancient Runes Rings */}
              {/* Outer Ring */}
              <div className="absolute inset-[-20px] rounded-full border border-[#8d6e63]/30 animate-[spin_20s_linear_infinite] z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c5a059] rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c5a059] rounded-full"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#c5a059] rounded-full"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#c5a059] rounded-full"></div>
              </div>

              {/* Middle Ring (Dashed) */}
              <div className="absolute inset-[-10px] rounded-full border border-dashed border-[#c5a059]/40 animate-[spin_15s_linear_infinite_reverse] z-10" />

              {/* Inner Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#8d6e63] shadow-2xl overflow-hidden group z-20">
                {/* Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/img/me3.jpeg"
                    alt="Darell Rangga"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 sepia-[0.3]"
                    priority
                  />
                  {/* Overlay for vintage feel */}
                  <div className="absolute inset-0 bg-[#c5a059]/10 mix-blend-overlay pointer-events-none"></div>
                </div>

                {/* Inner Border Texture */}
                <div className="absolute inset-0 border-[8px] border-[#2c241b]/50 rounded-full pointer-events-none z-10"></div>
              </div>

              {/* Floating Parchment Badges */}
              <motion.div
                className="absolute -right-8 top-10 bg-[#f4e4bc] border-2 border-[#8d6e63] px-4 py-2 rounded-sm flex items-center gap-2 shadow-xl rotate-[5deg] z-30"
                animate={{ y: [0, -8, 0], rotate: [5, 3, 5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xl">⚡</span>
                <span className="text-xs font-bold font-serif text-[#3e2723]">
                  {t.hero.badgeFast}
                </span>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-16 bg-[#f4e4bc] border-2 border-[#8d6e63] px-4 py-2 rounded-sm flex items-center gap-2 shadow-xl -rotate-[3deg] z-30"
                animate={{ y: [0, 8, 0], rotate: [-3, -5, -3] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="text-[#3e2723]">
                  <Scroll size={20} />
                </div>
                <span className="text-xs font-bold font-serif text-[#3e2723]">
                  {t.hero.badgeFull}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#8d6e63] hover:text-[#d4af37] transition-colors group"
          >
            <span className="text-sm font-serif font-bold tracking-widest uppercase">
              {t.hero.scrollText}
            </span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
