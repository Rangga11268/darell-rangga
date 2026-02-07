"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  CodeBlock,
  Palette,
  Rocket,
  Lightning,
  BookOpen,
  User,
  Briefcase,
} from "@phosphor-icons/react";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import { ModernSkills } from "@/app/components/modern-skills";

export function AboutSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const highlights = [
    {
      icon: CodeBlock,
      title: t.about.highlights.cleanCode.title,
      desc: t.about.highlights.cleanCode.desc,
    },
    {
      icon: Palette,
      title: t.about.highlights.artistic.title,
      desc: t.about.highlights.artistic.desc,
    },
    {
      icon: Rocket,
      title: t.about.highlights.performance.title,
      desc: t.about.highlights.performance.desc,
    },
    {
      icon: Lightning,
      title: t.about.highlights.fastLearner.title,
      desc: t.about.highlights.fastLearner.desc,
    },
  ];

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Modern Skills Marquee - Horizontal Scrolling */}
      <div className="w-full overflow-hidden py-8 border-y border-foreground/10 mb-16">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* First set of skills */}
          {[
            "NEXT.JS",
            "REACT",
            "LARAVEL",
            "NODE.JS",
            "TYPESCRIPT",
            "TAILWIND CSS",
            "MYSQL",
            "POSTGRESQL",
            "FIGMA",
            "GIT",
          ].map((skill, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl font-display font-bold text-foreground/20 flex items-center gap-8"
            >
              {skill} <span className="text-primary">✦</span>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "NEXT.JS",
            "REACT",
            "LARAVEL",
            "NODE.JS",
            "TYPESCRIPT",
            "TAILWIND CSS",
            "MYSQL",
            "POSTGRESQL",
            "FIGMA",
            "GIT",
          ].map((skill, i) => (
            <span
              key={`dup-${i}`}
              className="text-4xl md:text-5xl font-display font-bold text-foreground/20 flex items-center gap-8"
            >
              {skill} <span className="text-primary">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-start">
          {/* Left: Bio & Timeline (Staggered Reveal) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="prose dark:prose-invert">
              <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                {t.about.journeyTitle}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.about.journeyText}
              </p>
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                {t.about.journeyDesc}
              </p>
            </div>

            {/* Timeline with animated line */}
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              <div className="space-y-8 pl-8 relative">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  {t.about.experience}
                </h4>

                {t.about.history.jobs.map((job, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="relative"
                  >
                    <span className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-[0_0_10px_var(--primary)]" />
                    <h5 className="font-bold text-lg">{job.title}</h5>
                    <p className="text-sm text-primary mb-2 font-medium bg-primary/10 w-fit px-2 py-0.5 rounded-full">
                      {job.company} • {job.period}
                    </p>
                    <p className="text-muted-foreground">{job.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-8 pl-8 relative">
                <h4 className="text-xl font-bold flex items-center gap-2 mt-8">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {t.about.education}
                </h4>

                {t.about.history.schools.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.2 }}
                    className="relative"
                  >
                    <span className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-[0_0_10px_var(--primary)]" />
                    <h5 className="font-bold text-lg">{edu.degree}</h5>
                    <p className="text-sm text-primary mb-2 font-medium bg-primary/10 w-fit px-2 py-0.5 rounded-full">
                      {edu.school} • {edu.period}
                    </p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Grid of Cards (3D Tilt & Stagger) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? -2 : 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-card/50 border-white/5 hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <h3 className="text-2xl font-bold mb-8 text-center">
                {t.about.incantations}
              </h3>
              <ModernSkills />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
