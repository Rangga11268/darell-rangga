"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Palette,
  Rocket,
  Zap,
  BookOpen,
  Scroll,
  Feather,
  Map,
} from "lucide-react";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import { SkillsConstellation } from "./skills-constellation";

export function AboutSection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t.about.highlights.cleanCode.title,
      description: t.about.highlights.cleanCode.desc,
    },
    {
      icon: Palette,
      title: t.about.highlights.artistic.title,
      description: t.about.highlights.artistic.desc,
    },
    {
      icon: Rocket,
      title: t.about.highlights.performance.title,
      description: t.about.highlights.performance.desc,
    },
    {
      icon: Zap,
      title: t.about.highlights.fastLearner.title,
      description: t.about.highlights.fastLearner.desc,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[#2c241b]/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4 parchment p-8 relative">
              {/* Wax seal decoration */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-800 rounded-full shadow-lg flex items-center justify-center border-4 border-red-900/50">
                <Feather className="w-6 h-6 text-red-200" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3 font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                <Scroll className="w-8 h-8 text-primary" />
                {t.about.journeyTitle}
              </h3>
              <p className="text-lg leading-relaxed font-serif italic">
                {t.about.journeyText}
              </p>
              <p className="leading-relaxed">{t.about.journeyDesc}</p>
            </div>

            {/* Experience */}
            <div className="space-y-4 relative">
              {/* Journey Map Path - Dashed Line */}
              <div className="absolute left-[7px] top-10 bottom-0 w-1 bg-gradient-to-b from-[#c5a059] to-transparent opacity-30"></div>

              <h4 className="text-xl font-bold flex items-center gap-2 border-b border-primary/30 pb-2 relative z-10 bg-background/50 backdrop-blur-sm">
                <Map className="w-5 h-5 text-primary" />
                {t.about.experience}
              </h4>
              {t.about.history.jobs.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="parchment p-6 relative ml-6 border-l-4 border-l-primary/50 group"
                  style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                >
                  {/* Map Point Node */}
                  <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 border-[#c5a059] bg-[#2c241b] group-hover:bg-[#c5a059] group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_#c5a059]">
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#c5a059]/50 opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h5 className="font-bold text-lg font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                    {exp.title}
                  </h5>
                  <p className="text-sm text-primary mb-2 font-serif italic">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold flex items-center gap-2 border-b border-primary/30 pb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {t.about.education}
              </h4>
              {t.about.history.schools.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="parchment p-6 relative ml-4 border-l-4 border-l-primary/50"
                  style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                >
                  <h5 className="font-bold text-lg font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                    {edu.degree}
                  </h5>
                  <p className="text-sm text-primary mb-2 font-serif italic">
                    {edu.school} • {edu.period}
                  </p>
                  <p className="text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center lg:text-left font-sans">
              {t.about.arsenal}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-[#f4e4bc]/80 dark:bg-[#2c241b]/80 border-2 border-[#8d6e63] shadow-md hover:shadow-xl hover:bg-[#f4e4bc] dark:hover:bg-[#3e2723] transition-all duration-300 group">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full border-2 border-[#8d6e63] bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                        <highlight.icon className="w-6 h-6 text-[#3e2723] dark:text-[#d7ccc8]" />
                      </div>
                      <h4 className="font-bold text-lg font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-[#5d4037] dark:text-[#a1887f] font-serif">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-primary/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 font-sans">
                  {t.about.incantations}
                </h3>
              </div>

              <div className="relative w-full">
                <div className="absolute inset-0 bg-transparent z-0" />
                <SkillsConstellation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
