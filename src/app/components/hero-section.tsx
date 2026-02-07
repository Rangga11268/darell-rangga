"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

import { HeroIdCard } from "./hero-id-card";

export function HeroSection() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  // Parallax optimized for "Smooth/Ethereal" feel
  // Extended fade-out range for better mobile visibility
  const yText = useTransform(scrollY, [0, 600], [0, 80]);
  const opacityHero = useTransform(scrollY, [0, 700], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 1. Background: Grainy Mesh Gradient (Clean & Modern) */}
      <div className="absolute inset-0 w-full h-full bg-background">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <motion.div
        style={{ opacity: opacityHero }}
        className="container relative z-10 px-4 md:px-6 h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24"
      >
        {/* 2. Text Content (Left/Top) */}
        <motion.div
          style={{ y: yText }}
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 bg-primary/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              {t.hero.available}
            </span>
          </motion.div>

          {/* Headlines */}
          <div className="space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground"
              >
                DARELL
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50"
              >
                RANGGA
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 shadow-xl shadow-foreground/10"
              asChild
            >
              <a href="#projects">
                {t.hero.viewWork}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 h-14 text-base font-medium border-border hover:bg-secondary transition-all hover:scale-105 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <a
                  href="/img/saya/CV IND.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <DownloadSimple className="mr-2 w-4 h-4" weight="duotone" />
                  CV
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-14 h-14 border-border hover:bg-secondary transition-all hover:scale-105 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://github.com/Rangga11268/"
                  target="_blank"
                  aria-label="Github"
                >
                  <GithubLogo className="w-5 h-5" weight="duotone" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-14 h-14 border-border hover:bg-secondary transition-all hover:scale-105 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/darell-rangga-1320b634b/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo className="w-5 h-5" weight="duotone" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Visual (Right) - Clean Portrait in Glass Frame */}
        {/* 3. Visual (Right) - 3D Name Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full max-w-md flex justify-center"
        >
          <HeroIdCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
