"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { TabKey } from "../types";
import { motion } from "framer-motion";
import {
  EnvelopeOpen,
  ArrowRight,
  Trophy,
  CheckCircle,
  ChatCircleDots,
} from "@phosphor-icons/react";
import {
  LaravelIcon,
  NextjsIcon,
  FlutterIcon,
} from "@/components/ui/brand-icons";

interface SkillsTabProps {
  onSelectTab: (tab: TabKey) => void;
}

export function SkillsTab({ onSelectTab }: SkillsTabProps) {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* HR / Recruiter Friendly Summary */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-border/60">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              {isId ? "Kompetensi & Keahlian Teknis" : "Technical Skills & Competencies"}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-foreground font-display">
              {isId ? "Stack Teknologi & Kemampuan Rekayasa" : "Engineering Skills & Technology Stack"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {isId
                ? "Ringkasan keahlian praktis yang siap pakai untuk peran Fullstack Developer, Backend Engineer, Frontend Developer, maupun Mobile Developer di tim engineering Anda."
                : "Practical, ready-to-deploy skills tailored for Fullstack, Backend, Frontend, and Mobile Developer roles in modern engineering teams."}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectTab("contact")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              <EnvelopeOpen size={14} weight="bold" />
              <span>{isId ? "Hubungi Saya" : "Get In Touch"}</span>
              <ArrowRight size={13} weight="bold" />
            </button>
          </div>
        </div>

        {/* Ringkasan Cepat untuk HR / Recruiter Quick Scan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-mono block">
              {isId ? "Spesialisasi Utama" : "Core Role"}
            </span>
            <div className="text-sm sm:text-base font-black text-foreground font-display mt-0.5">
              Fullstack Dev
            </div>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              {isId ? "Web, API & Mobile" : "Web, APIs & Mobile"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-mono block">
              {isId ? "Backend Utama" : "Core Backend"}
            </span>
            <div className="text-sm sm:text-base font-black text-foreground font-display mt-0.5">
              Laravel & FastAPI
            </div>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              MySQL & PostgreSQL
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-mono block">
              {isId ? "Frontend Utama" : "Core Frontend"}
            </span>
            <div className="text-sm sm:text-base font-black text-foreground font-display mt-0.5">
              Next.js & React 19
            </div>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              TypeScript & Tailwind
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-mono block">
              {isId ? "Prestasi Kompetisi" : "Competition Honor"}
            </span>
            <div className="text-sm sm:text-base font-black text-foreground font-display mt-0.5 flex items-center gap-1">
              <Trophy size={14} weight="fill" className="text-foreground shrink-0" />
              <span>{isId ? "Juara 1 IT" : "1st Place IT"}</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              {isId ? "Bootcamp 2026 (Lead 11 Org)" : "Bootcamp 2026 (Led 11)"}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Card Utama: Backend, Frontend, Mobile, Tools & Database */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* 1. Backend & API Engineering */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-foreground/30 transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20 shadow-xs">
                <LaravelIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">
                  {isId ? "Sisi Server & Integrasi" : "Server-Side & Integration"}
                </span>
                <h4 className="text-base font-bold text-foreground font-display">
                  Backend & API Development
                </h4>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {isId
                ? "Mampu merancang REST API yang aman, arsitektur database relasional yang rapi, dan sistem real-time untuk kebutuhan bisnis produksi."
                : "Capable of designing secure REST APIs, clean relational database schemas, and real-time event systems for production businesses."}
            </p>

            <div className="space-y-2 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Framework & Bahasa:" : "Frameworks & Languages:"}
                </span>
                <span className="text-muted-foreground">
                  Laravel 12, PHP 8.3, Python (FastAPI & Flask), Node.js, Express.js.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Fitur & Pengalaman Nyata:" : "Key Capabilities:"}
                </span>
                <span className="text-muted-foreground">
                  {isId
                    ? "Broadcast WebSockets Real-Time (Laravel Reverb pada TitikAman), pencegahan transaksi ganda (Database Locking pada TUJAGO), dan integrasi Webhook Pembayaran Midtrans."
                    : "Real-time WebSockets (Laravel Reverb on TitikAman), database concurrency locks (TUJAGO), and Midtrans payment webhooks."}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {["Laravel 12", "PHP 8.3", "FastAPI", "Python", "Node.js", "REST API", "WebSockets", "Midtrans"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Frontend & Web Development */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-foreground/30 transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-foreground/10 text-foreground flex items-center justify-center shrink-0 border border-border/80 shadow-xs">
                <NextjsIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">
                  {isId ? "Tampilan Pengguna & Responsif" : "UI & Responsive Layouts"}
                </span>
                <h4 className="text-base font-bold text-foreground font-display">
                  Frontend Web Development
                </h4>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {isId
                ? "Membangun website modern yang cepat, mudah digunakan di HP (mobile-friendly), ramah SEO, dan siap deploy ke server produksi Vercel."
                : "Building fast, highly responsive mobile-friendly web portals optimized for SEO and deployed smoothly to Vercel."}
            </p>

            <div className="space-y-2 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Framework & Styling:" : "Core Libraries & Styling:"}
                </span>
                <span className="text-muted-foreground">
                  Next.js 16/15, React 19/18, TypeScript, Tailwind CSS v4, Framer Motion, Vue.js 3, Inertia.js.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Fitur & Pengalaman Nyata:" : "Key Capabilities:"}
                </span>
                <span className="text-muted-foreground">
                  {isId
                    ? "Berpengalaman merilis 6+ website aktif di Vercel (PHD Trans, Navara Trans, Janguleee Trans, SRB Motor, dll) dengan performa tinggi tanpa lag."
                    : "Shipped 6+ live websites on Vercel (PHD Trans, Navara Trans, Janguleee Trans, SRB Motor, etc) with smooth 60FPS UI and high performance."}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Vue 3", "Inertia.js", "Framer Motion", "SEO"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Mobile Application Development */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-foreground/30 transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20 shadow-xs">
                <FlutterIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">
                  {isId
                    ? "Aplikasi Ponsel (Android & iOS)"
                    : "Mobile Platforms (Android & iOS)"}
                </span>
                <h4 className="text-base font-bold text-foreground font-display">
                  Mobile App Development
                </h4>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {isId
                ? "Mengembangkan aplikasi mobile multiplatform yang terhubung mulus dengan backend API, database lokal, dan layanan pembayaran."
                : "Developing cross-platform mobile applications integrated with backend REST APIs, local storage, and payment SDKs."}
            </p>

            <div className="space-y-2 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Teknologi Mobile:" : "Mobile Technologies:"}
                </span>
                <span className="text-muted-foreground">
                  React Native (Expo + TypeScript), Flutter (Dart), SQLite lokal, Provider state management.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Implementasi Proyek Nyata:" : "Real Project Implementations:"}
                </span>
                <span className="text-muted-foreground">
                  {isId
                    ? "Aplikasi mobile Makarya (React Native Expo untuk UMKM) & aplikasi dealer SRB Motor Mobile (Flutter + Dart dengan pembayaran Midtrans SDK)."
                    : "Makarya mobile app (React Native Expo for SMEs) & SRB Motor Mobile (Flutter/Dart with native Midtrans SDK)."}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {["React Native", "Expo", "Flutter", "Dart", "Android", "iOS Ready", "Mobile API", "SQLite"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Database, DevOps & QA Workflow */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-foreground/30 transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <CheckCircle size={18} weight="bold" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">
                  {isId
                    ? "Database, QA & Kolaborasi"
                    : "Database, QA & Collaboration"}
                </span>
                <h4 className="text-base font-bold text-foreground font-display">
                  Database, QA & Engineering Workflow
                </h4>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {isId
                ? "Terbiasa bekerja dengan alur kerja modern: manajemen kode via Git, pengujian perangkat lunak (testing) agar minim bug, dan memimpin tim developer."
                : "Experienced with professional workflows: Git version control, black-box QA testing for zero bugs, and technical team leadership."}
            </p>

            <div className="space-y-2 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Database & Cloud:" : "Database & Cloud:"}
                </span>
                <span className="text-muted-foreground">
                  MySQL, PostgreSQL, MongoDB, Vercel, Supabase, Cloudinary.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-bold text-foreground block mb-0.5">
                  {isId ? "Kualitas & Kepemimpinan Tim:" : "Quality & Team Leadership:"}
                </span>
                <span className="text-muted-foreground">
                  {isId
                    ? "Memimpin tim 11 orang pada TitikAman hingga meraih Juara 1 IT Bootcamp 2026, lolos 54 skenario Black-Box Testing tanpa cacat."
                    : "Led an 11-person developer team on TitikAman to win 1st Place at IT Bootcamp 2026, passing 54 Black-Box test scenarios."}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {["MySQL", "PostgreSQL", "MongoDB", "Git & GitHub", "Black-Box QA", "Team Leadership", "Vercel", "Figma"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action untuk HR / Recruiter */}
      <div className="p-4 sm:p-5 rounded-3xl bg-muted/50 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-foreground block font-display">
            {isId
              ? "Sedang membuka lowongan Fullstack, Backend, atau Frontend Developer?"
              : "Hiring for Fullstack, Backend, or Frontend Developer roles?"}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {isId
              ? "Siap bergabung untuk posisi Full-Time, Kontrak, maupun Freelance."
              : "Available for Full-Time, Contract, or Freelance opportunities."}
          </span>
        </div>
        <button
          onClick={() => onSelectTab("contact")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all shrink-0 cursor-pointer"
        >
          <ChatCircleDots size={14} weight="bold" />
          <span>
            {isId ? "Kirim Pesan (DM)" : "Direct Message"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
