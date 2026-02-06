"use client";

import { motion } from "framer-motion";
import { Briefcase, BookOpen } from "lucide-react";
import { useLanguage } from "@/app/providers/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Work */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold font-display">
                {t.about.experience}
              </h3>
            </div>

            <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
              {t.about.history.jobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30" />

                  <h4 className="text-xl font-bold">{job.title}</h4>
                  <div className="text-sm font-semibold text-primary mb-2 mt-1">
                    {job.company}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-wider">
                    {job.period}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold font-display">
                {t.about.education}
              </h3>
            </div>

            <div className="relative border-l-2 border-secondary pl-8 space-y-12">
              {t.about.history.schools.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.2 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 h-5 w-5 rounded-full border-4 border-background bg-secondary shadow-lg" />

                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <div className="text-sm font-semibold text-secondary-foreground mb-2 mt-1">
                    {edu.school}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-wider">
                    {edu.period}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
