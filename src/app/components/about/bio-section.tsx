"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { User, Code, Briefcase, Trophy } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { useRef } from "react";

const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <motion.p
      className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.015 } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.2em] -mb-[0.2em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: 0,
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export function BioSection() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
      ref={containerRef}
    >
      {/* Background Typography (Parallax) */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 will-change-transform"
      >
        <span className="text-[15vw] md:text-[20vw] font-black text-foreground/5 whitespace-nowrap select-none">
          THE STORY
        </span>
      </motion.div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      {/* Modern Skills Marquee - Horizontal Scrolling */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-6 border-y border-foreground/5 bg-background/50 backdrop-blur-sm z-10">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND",
            "GSAP",
            "FRAMER MOTION",
            "NODE.JS",
            "LARAVEL",
            "FIGMA",
            "UI/UX",
            "THREE.JS",
            "WEBGL",
          ].map((skill, i) => (
            <span
              key={i}
              className="text-lg md:text-xl font-display font-medium text-muted-foreground/60 flex items-center gap-12"
            >
              {skill} <span className="w-2 h-2 rounded-full bg-primary/40" />
            </span>
          ))}
          {/* Duplicate for loop */}
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND",
            "GSAP",
            "FRAMER MOTION",
            "NODE.JS",
            "LARAVEL",
            "FIGMA",
            "UI/UX",
            "THREE.JS",
            "WEBGL",
          ].map((skill, i) => (
            <span
              key={`dup-${i}`}
              className="text-lg md:text-xl font-display font-medium text-muted-foreground/60 flex items-center gap-12"
            >
              {skill} <span className="w-2 h-2 rounded-full bg-primary/40" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Title Area */}
          <div className="md:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6"
            >
              <User className="w-4 h-4" weight="fill" />
              <span className="uppercase tracking-wide">{t.about.title}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold font-display leading-[1.1] mb-6"
            >
              {t.about.journeyTitle}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              viewport={{ once: true }}
              className="w-24 h-1.5 bg-primary origin-left rounded-full"
            />
          </div>

          {/* Text Content */}
          <div className="md:col-span-8 space-y-8 pl-0 md:pl-12">
            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {[
                {
                  icon: Briefcase,
                  value: "2+",
                  label: language === "id" ? "Tahun Exp" : "Years Exp",
                  color: "text-primary",
                },
                {
                  icon: Code,
                  value: "10+",
                  label: language === "id" ? "Proyek" : "Projects",
                  color: "text-blue-500",
                },
                {
                  icon: Trophy,
                  value: "4.00",
                  label: "GPA",
                  color: "text-amber-500",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <stat.icon
                    className={`w-5 h-5 mb-2 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                    weight="duotone"
                  />
                  <span
                    className={`text-2xl md:text-3xl font-black font-display ${stat.color}`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground font-medium mt-0.5 uppercase tracking-wider text-center">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <TextReveal text={t.about.journeyText} />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-3 left-5 text-6xl font-black text-primary/10 leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-lg md:text-xl text-muted-foreground m-0 relative z-10 pl-4">
                  {t.about.journeyDesc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
