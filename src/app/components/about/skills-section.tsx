"use client";

import { Lightning } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { SkillGalaxy } from "@/app/components/skill-galaxy";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="py-32 bg-paper relative overflow-hidden"
    >
      <div className="container px-margin-mobile md:px-margin-desktop mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b hairline border-foreground/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-1 label-caps">
              <Lightning size={14} weight="bold" />
              <span>{t.about.arsenal}</span>
            </div>
            <h2 className="headline-lg text-foreground uppercase">
              {t.about.incantations}
            </h2>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="label-caps text-[10px] text-foreground/40 leading-relaxed uppercase tracking-widest">
              Catalog of technical apparatus and conceptual frameworks utilized in the production of high-fidelity digital experiences.
            </p>
          </div>
        </div>

        <SkillGalaxy />
      </div>

      {/* Decorative Archival Marks */}
      <div className="absolute bottom-8 right-8 pointer-events-none opacity-5">
         <span className="text-8xl font-serif font-black italic">INDEX</span>
      </div>
    </section>
  );
}
