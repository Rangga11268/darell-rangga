"use client";

import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle,
  Users,
  Briefcase,
  GraduationCap,
  Code,
} from "@phosphor-icons/react";

export function ExperienceTab() {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Flagship Achievement Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/60 shrink-0">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-foreground font-display">
                  Darell Rangga
                </span>
                <CheckCircle size={13} weight="fill" className="text-foreground" />
                <CheckCircle
                  size={13}
                  weight="fill"
                  className="text-foreground"
                />
                <CheckCircle
                  size={13}
                  weight="fill"
                  className="text-foreground"
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                @darellrangga • Pengumuman Prestasi 2026
                @darellrangga • Pengumuman Prestasi 2026 @darellrangga •{" "}
                {isId ? "Pengumuman Prestasi 2026" : "Honors & Milestones 2026"}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-foreground/10 text-foreground text-xs font-bold font-display border border-foreground/15 flex items-center gap-1">
            <Trophy size={13} weight="fill" />
            <span>Juara 1 IT Bootcamp 2026</span>
            <span>
              {isId ? "Juara 1 IT Bootcamp 2026" : "1st Place IT Bootcamp 2026"}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 shadow-md group">
              <Image
                src="/img/saya/trophy-juara.jpg"
                alt="Darell Rangga - Juara 1 IT Bootcamp 2026"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                <Trophy
                  size={16}
                  weight="fill"
                  className="text-foreground shrink-0"
                />
                <span className="truncate">
                  Darell Rangga • Juara 1
                  Darell Rangga • Juara 1 Darell Rangga •{" "}
                  {isId ? "Juara 1" : "1st Place"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-foreground text-[11px] font-mono font-bold">
                  <Users size={12} weight="bold" />
                  <span>Lead Developer (Tim 11 Orang)</span>
                  <span>
                    {isId
                      ? "Lead Developer (Tim 11 Orang)"
                      : "Lead Developer (11 Engineers)"}
                  </span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-bold">
                  100% Black-Box Tested
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-display">
                Lead Developer & System Architect — TitikAman
              </h3>
              <div className="text-xs text-muted-foreground font-mono mt-0.5 mb-3">
                IT Bootcamp 2026 • Platform Keselamatan Warga & SOS Real-Time
                {isId
                  ? "IT Bootcamp 2026 • Platform Keselamatan Warga & SOS Real-Time"
                  : "IT Bootcamp 2026 • Citizen Safety & Real-Time SOS Platform"}
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {isId
                  ? "Sebagai lead developer, memimpin tim beranggotakan 11 orang dan sukses membangun arsitektur sistemnya menggunakan Laravel 12, MySQL, dan Laravel Reverb untuk memastikan fitur darurat (SOS) berjalan mulus secara real-time. Aplikasi ini lolos uji black-box testing secara menyeluruh dan keluar sebagai Juara 1 di IT Bootcamp 2026, membuktikan kapabilitas rekayasa full-stack dan kepemimpinan teknis nyata."
                  : "As Lead Developer, led an 11-member cross-functional engineering team, architecting the system using Laravel 12, MySQL, and Laravel Reverb WebSockets to ensure real-time emergency SOS broadcast. Fully passed comprehensive black-box testing and won 1st Place / Champion at IT Bootcamp 2026, validating real-world full-stack leadership."}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {[
                  "Laravel 12",
                  "Laravel Reverb",
                  "MySQL",
                  "WebSockets",
                  "Black-Box Testing",
                  "Team Lead (11)",
                  "Real-Time SOS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-card border border-border/80 text-foreground text-xs font-semibold font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle
                  size={15}
                  weight="fill"
                  className="text-emerald-500"
                />
                Validasi Kepemimpinan & Rekayasa Skala Nyata
                {isId
                  ? "Validasi Kepemimpinan & Rekayasa Skala Nyata"
                  : "Proven Leadership & Real-Scale Engineering"}
              </span>
              <a
                href="https://github.com/Rangga11268/titikAman"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all shadow-xs"
              >
                <Code size={14} weight="bold" />
                <span>Lihat Repositori TitikAman</span>
                <span>
                  {isId
                    ? "Lihat Repositori TitikAman"
                    : "View TitikAman Repository"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Academics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 font-display">
            <Briefcase
              size={16}
              weight="bold"
              className="text-foreground"
            />
            <Briefcase size={16} weight="bold" className="text-foreground" />
            <Briefcase size={16} weight="bold" className="text-foreground" />
            <span>
              {isId
                ? "Pengalaman Kerja Produksi"
                : "Production Work History"}
              {isId ? "Pengalaman Kerja Produksi" : "Production Work History"}
              {isId ? "Pengalaman Kerja Produksi" : "Production Work History"}
            </span>
          </div>

          <div className="space-y-5">
            <div className="border-l-2 border-foreground/20 pl-4 relative">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground absolute -left-[6px] top-1.5" />
              <div className="text-xs font-mono text-muted-foreground">
                2024 - {isId ? "Sekarang" : "Present"}
              </div>
              <h4 className="text-sm font-bold text-foreground mt-0.5">
                Fullstack Web Developer
              </h4>
              <div className="text-xs text-muted-foreground font-medium mb-1.5">
                Freelance & Software Production
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isId
                  ? "Membangun lebih dari 10 aplikasi produksi dari nol menggunakan Next.js 15, React 19, dan Laravel 12. Menangani arsitektur database, integrasi payment gateway Midtrans, dan optimasi performa web."
                  : "Engineered 10+ production applications end-to-end using Next.js 15, React 19, and Laravel 12. Handled schema design, Midtrans payment integration, and core performance tuning."}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {["Next.js 15", "React 19", "Laravel 12", "Midtrans"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 font-display">
              <GraduationCap
                size={16}
                weight="bold"
                className="text-foreground"
              />
              <span>
                {isId
                  ? "Pendidikan & Akademik"
                  : "Education & Academics"}
                {isId ? "Pendidikan & Akademik" : "Education & Academics"}
                {isId ? "Pendidikan & Akademik" : "Education & Academics"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  2024 - {isId ? "Sekarang" : "Present"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold font-display">
                  IPK 4.00 / 4.00
                  {isId ? "IPK 4.00 / 4.00" : "4.00 / 4.00 GPA"}
                </span>
              </div>
              <h4 className="text-sm font-bold text-foreground mt-1 font-display">
                S1 Sistem Informasi
                {isId ? "S1 Sistem Informasi" : "B.S. Information Systems"}
              </h4>
              <div className="text-xs text-muted-foreground">
                Universitas Bina Sarana Informatika (UBSI)
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isId
                  ? "Mempertahankan nilai sempurna (IPK 4.00) selama 4 semester berturut-turut pada mata kuliah Algoritma, Rekayasa Perangkat Lunak, Basis Data, dan Arsitektur Sistem."
                  : "Maintained a perfect 4.00 GPA across 4 consecutive semesters focusing on Software Engineering, Relational Database Systems, and Discrete Mathematics."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider font-display">
                {isId
                  ? "Kredensial Terverifikasi"
                  : "Verified Credentials"}
                {isId ? "Kredensial Terverifikasi" : "Verified Credentials"}
                {isId ? "Kredensial Terverifikasi" : "Verified Credentials"}
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground font-semibold">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="text-emerald-500"
                />
                <span>
                  {isId
                    ? "Lulusan Terbaik (Top Graduate) Bootcamp"
                    : "Top Graduate Bootcamp"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground font-semibold">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="text-emerald-500"
                />
                <span>
                  {isId
                    ? "Sertifikasi Dicoding: Web & AI Track"
                    : "Certified Dicoding: Web & AI Track"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {isId ? "Status Kelulusan" : "Graduation Track"}
            </span>
            <span className="font-bold text-foreground">
              Cum Laude Track
            </span>
            <span className="font-bold text-foreground">Cum Laude Track</span>
            <span className="font-bold text-foreground">Cum Laude Track</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
