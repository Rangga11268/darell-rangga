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

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "PHP",
  "Laravel",
  "MySQL",
  "Git",
  "RESTful APIs",
  "Responsive Design",
  "Framer Motion",
];

const experiences = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2023 - Present",
    description:
      "Forging responsive websites and web applications for various patrons using modern artifacts like React, Next.js, and Tailwind CSS.",
  },
];

const education = [
  {
    degree: "Bachelor of Information Systems",
    school: "Bina Sarana Informatika University",
    period: "2024 - Present",
    description:
      "Currently pursuing knowledge in Information Systems with a focus on web development and software engineering.",
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description:
        "Scribing maintainable and scalable runes following best practices",
    },
    {
      icon: Palette,
      title: "Artistic Design",
      description:
        "Creating beautiful, user-friendly interfaces with attention to detail",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and efficiency in every project",
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quickly adapting to new technologies and frameworks",
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
            <div className="space-y-4">
              <h4 className="text-xl font-bold flex items-center gap-2 border-b border-primary/30 pb-2">
                <Map className="w-5 h-5 text-primary" />
                {t.about.experience}
              </h4>
              {experiences.map((exp, index) => (
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
              {education.map((edu, index) => (
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

            {/* Skills Marquee */}
            <div className="mt-8 pt-8 border-t border-primary/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 font-sans">
                  {t.about.incantations}
                </h3>
              </div>

              <div className="relative overflow-hidden py-4 bg-[#2c241b]/10 rounded-lg border border-[#8d6e63]/30">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f4e4bc] dark:from-[#1a1614] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f4e4bc] dark:from-[#1a1614] to-transparent z-10" />

                <div className="flex gap-4 animate-marquee whitespace-nowrap">
                  {[...skills, ...skills].map((skill, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-6 py-2 rounded-sm border-2 border-[#8d6e63] bg-[#f4e4bc] dark:bg-[#2c241b] text-[#3e2723] dark:text-[#d7ccc8] text-sm font-bold font-serif tracking-wider shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
