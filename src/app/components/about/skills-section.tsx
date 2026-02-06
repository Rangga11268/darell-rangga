"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useLanguage } from "@/app/providers/language-provider";
import { ModernSkills } from "@/app/components/modern-skills";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-accent text-foreground text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>{t.about.arsenal}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            {t.about.incantations}
          </h2>
        </div>

        <ModernSkills />
      </div>
    </section>
  );
}
