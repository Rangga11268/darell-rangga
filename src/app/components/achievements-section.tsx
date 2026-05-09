"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Star,
  GitBranch,
} from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

interface Milestone {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  span?: string;
}

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  const display = value % 1 !== 0 ? count.toFixed(1) : count;

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function MilestoneCard({
  milestone,
  index,
  inView,
}: {
  milestone: Milestone;
  index: number;
  inView: boolean;
}) {
  const Icon = milestone.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className={`group relative border-r border-b hairline-r hairline-b border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors ${milestone.span || ""}`}
    >
      <div className="p-8 h-full flex flex-col justify-between gap-8 relative overflow-hidden">
        {/* Background Label */}
        <div className="absolute top-2 right-2 text-[8px] label-caps opacity-20 group-hover:opacity-100 font-bold">
          RECORD_ID: 00{index + 1}
        </div>

        <div className="flex items-start justify-between">
          <div className="w-10 h-10 border hairline border-primary/20 flex items-center justify-center group-hover:border-paper group-hover:bg-paper group-hover:text-primary transition-all">
            <Icon size={20} weight="bold" />
          </div>
          <div className="text-right">
            <div className="headline-lg text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none group-hover:text-paper">
              <AnimatedCounter
                value={milestone.value}
                suffix={milestone.suffix}
                inView={inView}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="label-caps text-xs font-bold tracking-widest border-b hairline-b border-primary/10 pb-1 inline-block">
            {milestone.label}
          </h3>
          <p className="body-md text-xs opacity-60 group-hover:opacity-100 leading-tight">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const milestones: Milestone[] =
    language === "id"
      ? [
          {
            icon: Briefcase,
            value: 10,
            suffix: "+",
            label: "Proyek Selesai",
            description: "Solusi perangkat lunak yang berhasil diterapkan secara penuh.",
            span: "md:col-span-2",
          },
          {
            icon: GraduationCap,
            value: 4.0,
            suffix: "",
            label: "Indeks Prestasi",
            description: "Bina Sarana Informatika University — Akademik Semester 3.",
            span: "md:col-span-2",
          },
          {
            icon: GitBranch,
            value: 500,
            suffix: "+",
            label: "Kontribusi Kode",
            description: "Aktivitas repositori terbuka melalui GitHub (Commits & PRs).",
            span: "md:col-span-1",
          },
          {
            icon: Star,
            value: 6,
            suffix: "+",
            label: "Teknologi Inti",
            description: "Ekosistem JS, PHP, dan Cloud Infrastructure.",
            span: "md:col-span-1",
          },
          {
            icon: Trophy,
            value: 99,
            suffix: "",
            label: "Skor Performa",
            description: "Audit Lighthouse rata-rata pada proyek yang dioptimalkan.",
            span: "md:col-span-2",
          },
        ]
      : [
          {
            icon: Briefcase,
            value: 10,
            suffix: "+",
            label: "Projects Completed",
            description: "Full-cycle software solutions successfully deployed.",
            span: "md:col-span-2",
          },
          {
            icon: GraduationCap,
            value: 4.0,
            suffix: "",
            label: "Academic Score",
            description: "Bina Sarana Informatika University — Semester 3 Records.",
            span: "md:col-span-2",
          },
          {
            icon: GitBranch,
            value: 500,
            suffix: "+",
            label: "Code Contributions",
            description: "Open repository activity via GitHub (Commits & PRs).",
            span: "md:col-span-1",
          },
          {
            icon: Star,
            value: 6,
            suffix: "+",
            label: "Core Tech",
            description: "JS Ecosystem, PHP, and Cloud Infrastructure.",
            span: "md:col-span-1",
          },
          {
            icon: Trophy,
            value: 99,
            suffix: "",
            label: "Performance Score",
            description: "Lighthouse audit average on optimized deployments.",
            span: "md:col-span-2",
          },
        ];

  return (
    <section
      id="achievements"
      className="bg-paper border-b-rule-thick border-primary py-16 md:py-24"
    >
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header - Editorial Style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12 border-b-rule-thick border-primary pb-8">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-paper px-2 py-0.5 text-[10px] label-caps font-bold">STATISTICAL DATA</div>
              <span className="label-caps text-[10px] opacity-40">INDEX NO. 2025-ACH-01</span>
            </div>
            <h2 className="headline-lg mb-4 uppercase tracking-tighter leading-[0.85]">
              {language === "id" ? "Angka Berbicara" : "Numbers In Archive"}
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="editor-note text-sm italic border-l hairline-l border-primary pl-6">
              {language === "id"
                ? "Ringkasan pencapaian dan milestone yang terdokumentasi selama perjalanan karir profesional."
                : "A documented summary of achievements and career milestones recorded throughout the professional journey."}
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t hairline-t border-l hairline-l border-primary/20 mb-20"
        >
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={index}
              milestone={milestone}
              index={index}
              inView={isInView}
            />
          ))}
        </div>

        {/* Single Featured Certificate - Authentic Newspaper Cutout */}
        <div className="pt-12 border-t-rule-thick border-primary">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
               <h3 className="headline-md uppercase tracking-tight italic mb-4">
                {language === "id" ? "Sertifikasi Unggulan" : "Featured Certification"}
              </h3>
              <p className="body-md text-on-surface-variant mb-6 italic font-serif">
                {language === "id" 
                  ? "Pengakuan resmi atas kompetensi teknis dan dedikasi dalam pengembangan perangkat lunak modern." 
                  : "Official recognition of technical competence and dedication in modern software development."}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-primary" />
                <span className="label-caps text-[10px] font-bold">Verified Professional</span>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div 
                className="relative group p-8 bg-paper border hairline border-primary/20 shadow-lg transition-transform hover:scale-[1.05] -rotate-1 cursor-default max-w-sm w-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
                }}
              >
                {/* Torn edge effect simulation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-primary/5 to-transparent" />
                
                <div className="border-2 border-primary/10 p-8 flex flex-col h-full bg-white/20 dark:bg-black/10">
                  <div className="flex justify-between items-start mb-8">
                    <Star size={32} weight="fill" className="text-primary opacity-20" />
                    <span className="label-caps text-[8px] border border-primary/20 px-2 py-0.5">EXCEPTIONAL_RECORD</span>
                  </div>
                  
                  <h4 className="headline-sm mb-3 uppercase leading-tight tracking-tight text-xl">
                    Uji Kompetensi Basis Data
                  </h4>
                  <p className="label-caps text-[10px] font-bold mb-10 text-primary/60">
                    ISSUED BY: PHPID COMMUNITY X BSI
                  </p>
                  
                  <div className="mt-auto flex justify-between items-center pt-6 border-t hairline-t border-primary/10">
                    <span className="label-caps text-[10px] opacity-40">JULY 2025</span>
                    <button className="text-[11px] font-bold underline underline-offset-4 hover:text-primary transition-colors uppercase">
                      View Certificate
                    </button>
                  </div>
                </div>

                {/* Pin/Clip simulation */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary/10 rounded-full border hairline border-primary/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-inner" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer of section */}
        <div className="mt-8 flex justify-between items-center opacity-40">
          <div className="label-caps text-[9px] font-bold">END OF STATISTICAL REPORT</div>
          <div className="flex gap-4">
            <span className="label-caps text-[9px]">REF: DAR-2025</span>
            <span className="label-caps text-[9px]">CERTIFIED_RECORD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
