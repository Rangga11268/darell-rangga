"use client";

import { useLanguage } from "@/app/providers/language-provider";

interface HistoryItem {
  title?: string;
  company?: string;
  period: string;
  description: string;
  degree?: string;
  school?: string;
}

export function ExperienceSection() {
  const { t } = useLanguage();

  const jobs = t.about.history.jobs;
  const education = t.about.history.schools;

  return (
    <section id="experience" className="bg-paper border-b-rule-thick border-primary pb-8 pt-4">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="headline-md">Chronological Archive</h2>
          <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest">Career Path</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12">
            {[...jobs, ...education].map((item: HistoryItem, i) => (
              <div key={i} className="border-b hairline-b border-primary pb-6 mb-6 last:mb-0 last:border-0">
                <h3 className="headline-sm uppercase tracking-wide">
                  {item.title || item.degree}
                </h3>
                <div className="flex justify-between items-center text-on-surface-variant label-caps text-[10px] uppercase tracking-widest mb-4">
                  <span className="font-bold">{item.company || item.school}</span>
                  <span>{item.period}</span>
                </div>
                <p className="body-md text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
