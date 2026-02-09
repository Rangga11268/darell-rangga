"use client";

import { Lightning } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { SkillGalaxy } from "@/app/components/skill-galaxy";

import { ParallaxBackground } from "@/components/ui/parallax-background";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="py-24 bg-secondary/30 relative overflow-hidden"
    >
      <ParallaxBackground
        className="absolute inset-0 z-0 opacity-30"
        speed={0.2}
      >
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </ParallaxBackground>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-accent text-foreground text-sm font-medium">
            <Lightning className="w-4 h-4" weight="duotone" />
            <span>{t.about.arsenal}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            {t.about.incantations}
          </h2>
        </div>

        <SkillGalaxy />
      </div>
    </section>
  );
}
