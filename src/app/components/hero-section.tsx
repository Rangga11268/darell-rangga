"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { useLanguage } from "@/app/providers/language-provider";
import Image from "next/image";

export function HeroSection() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yImage = useTransform(scrollY, [0, 500], [0, 50]);
  const yBadges = useTransform(scrollY, [0, 500], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-noise -z-50" />
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[150px] animate-blob mix-blend-screen -z-40" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#00f2ff]/5 rounded-full blur-[150px] animate-blob animation-delay-2000 mix-blend-screen -z-40" />

      <div className="container relative z-10 px-4 md:px-6 h-full flex flex-col items-center justify-center">
        {/* Main Composition */}
        <div className="relative w-full max-w-6xl flex flex-col items-center justify-center">
          {/* Layer 1: Names (Behind Image) - Mobile: Top, Desktop: Behind */}
          <motion.h1
            style={{ y: yText, opacity: opacityText }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] leading-[0.85] font-bold font-display tracking-tighter text-center sm:text-transparent sm:bg-clip-text sm:bg-gradient-to-b sm:from-foreground/20 sm:to-foreground/5 text-foreground/20 select-none z-0 mt-20 sm:mt-0"
          >
            DARELL
          </motion.h1>

          {/* Layer 2: Image (Center) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 -mt-[8vw] sm:-mt-[12vw] mb-[2vw]"
          >
            <div className="relative w-[300px] h-[400px] sm:w-[450px] sm:h-[600px] grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 ease-out">
              {/* Glow behind image */}
              <div className="absolute inset-4 bg-gradient-to-t from-primary/40 to-transparent blur-[50px] -z-10" />

              <Image
                src="/img/saya/saya1.png"
                alt="Darell Rangga"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />

              {/* Glass Card Floating 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-20 -left-10 sm:-left-24 bg-background/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Status
                    </p>
                    <p className="font-bold text-foreground">Open to Work</p>
                  </div>
                </div>
              </motion.div>

              {/* Glass Card Floating 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-32 -right-10 sm:-right-24 bg-background/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00f2ff]/20 flex items-center justify-center text-[#00f2ff]">
                    <span className="text-xl">💻</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Stack
                    </p>
                    <p className="font-bold text-foreground">Full Stack Dev</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Layer 3: Role (Front/Overlay) */}
          <motion.div
            style={{ y: yBadges }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="z-20 -mt-[8vw] text-center"
          >
            <h1 className="text-[12vw] leading-[0.85] font-bold font-display tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mix-blend-overlay sm:mix-blend-normal">
              RANGGA
            </h1>

            <div className="mt-8 flex flex-col items-center gap-6">
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105"
                  asChild
                >
                  <a href="#projects">
                    {t.hero.viewWork}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-12 text-base font-medium border-primary/20 hover:bg-primary/5 text-foreground transition-all hover:scale-105"
                  asChild
                >
                  <a
                    href="/img/saya/CV IND.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="mr-2 w-4 h-4" />
                    CV / Resume
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-4">
                {[
                  { icon: Github, href: "https://github.com/Rangga11268/" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
                  },
                  { icon: Mail, href: "mailto:darrelrangga@gmail.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-125 transform duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
