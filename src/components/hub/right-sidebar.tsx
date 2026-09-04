"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/providers/language-provider";
import { TabKey, ProjectFilterKey } from "./types";
import {
  MagnifyingGlass,
  CheckCircle,
  TrendUp,
  X,
  ArrowSquareOut,
  DotsThree,
} from "@phosphor-icons/react";

interface RightSidebarProps {
  onSelectTab: (tab: TabKey) => void;
  onFilterProjects?: (filter: ProjectFilterKey) => void;
  onSearchQuery?: (q: string) => void;
}

export function RightSidebar({
  onSelectTab,
  onFilterProjects,
  onSearchQuery,
}: RightSidebarProps) {
  const { language } = useLanguage();
  const isId = language === "id";
  const [search, setSearch] = useState("");
  const [dismissPremium, setDismissPremium] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQuery) onSearchQuery(search);
    onSelectTab("projects");
  };

  const trendingTopics = [
    {
      category: isId ? "Rekayasa Web · Trending" : "Web Engineering · Trending",
      title: "Laravel 12 & React 19 Monolith",
      posts: "14.8K posts",
      action: () => {
        if (onFilterProjects) onFilterProjects("systems");
        onSelectTab("projects");
      },
    },
    {
      category: isId
        ? "Prestasi Nasional · Bootcamp 2026"
        : "National Honor · Bootcamp 2026",
      title: "Juara 1 Proyek Akhir (11 Engineers Led)",
      posts: "9,395 posts",
      action: () => onSelectTab("experience"),
    },
    {
      category: isId
        ? "Akademik · S1 Sistem Informasi"
        : "Academic · Information Systems",
      title: "IPK 4.00 (Cum Laude Track UBSI)",
      posts: "4.00 GPA",
      action: () => onSelectTab("experience"),
    },
    {
      category: isId
        ? "Realtime Network · Arsitektur"
        : "Realtime Systems · Architecture",
      title: "TitikAman SOS & WebSockets",
      posts: "32K events/s",
      action: () => {
        if (onFilterProjects) onFilterProjects("systems");
        onSelectTab("projects");
      },
    },
    {
      category: isId
        ? "Kecerdasan Buatan · NLP & ML"
        : "Artificial Intelligence · NLP",
      title: "Faktanesia AI Hoax Detection",
      posts: "8,120 queries",
      action: () => {
        if (onFilterProjects) onFilterProjects("ai-ml");
        onSelectTab("projects");
      },
    },
  ];

  const featuredApps = [
    {
      name: "TitikAman",
      handle: "@titikaman",
      category: isId ? "Jaringan Darurat & SOS" : "Emergency & SOS Network",
      image: "/img/logo-titikaman.png",
      url: "/projects/titik-aman",
      filter: "systems" as ProjectFilterKey,
    },
    {
      name: "TUJAGO",
      handle: "@tujago_bus",
      category: isId ? "Tiket Bus Modern Monolith" : "Enterprise Bus Platform",
      image: "/img/phd.webp",
      url: "/projects/tujago",
      filter: "web" as ProjectFilterKey,
    },
    {
      name: "Makarya",
      handle: "@makarya_id",
      category: isId
        ? "Platform Rekber & Freelance"
        : "Escrow & Freelance Platform",
      image: "/img/makarya-logo.webp",
      url: "/projects/makarya",
      filter: "systems" as ProjectFilterKey,
    },
    {
      name: "Faktanesia",
      handle: "@faktanesia_ai",
      category: isId
        ? "Deteksi Hoaks Realtime AI"
        : "Realtime Fact-Check Engine",
      image: "/img/logo_faktanesia.png",
      url: "/projects/faktanesia",
      filter: "ai-ml" as ProjectFilterKey,
    },
  ];

  return (
    <aside className="w-[320px] xl:w-[360px] shrink-0 hidden lg:block px-4 xl:px-6 py-3 sticky top-0 h-screen overflow-y-auto no-scrollbar space-y-4">
      {/* 1. Search Bar */}
      <form
        onSubmit={handleSearch}
        className="sticky top-0 bg-background/80 backdrop-blur-md pt-1 pb-2 z-10"
      >
        <div className="relative group">
          <MagnifyingGlass
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isId
                ? "Cari karya, stack, atau topik..."
                : "Search projects, skills, stack..."
            }
            className="w-full bg-muted/60 hover:bg-muted focus:bg-background border border-transparent focus:border-primary/80 rounded-full pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground cursor-pointer"
            >
              <X size={13} weight="bold" />
            </button>
          )}
        </div>
      </form>

      {/* 2. Hire Me Card */}
      {!dismissPremium && (
        <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 relative">
          <button
            onClick={() => setDismissPremium(true)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
            title="Tutup"
          >
            <X size={14} />
          </button>
          <div className="flex items-center gap-1.5 mb-1.5">
            <h2 className="font-extrabold text-[15px] text-foreground font-display">
              {isId
                ? "Tersedia untuk Rekrutmen"
                : "Open for Full-time & Contract"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {isId
              ? "Full Stack Developer & AI Engineer. Eksekusi cepat, arsitektur kokoh, dan siap kontribusi ke tim engineering Anda."
              : "High-velocity Full Stack & AI Engineer. Production-ready code, scalable systems, and zero-breaking bug delivery."}
          </p>
          <button
            onClick={() => onSelectTab("contact")}
            className="w-full py-2 px-4 rounded-full bg-foreground text-background font-bold text-xs hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            {isId ? "Buka Diskusi (DM)" : "Get in Touch"}
          </button>
        </div>
      )}

      {/* 3. Trending Engineering Topics */}
      <div className="rounded-2xl bg-muted/30 border border-border/60 overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b border-border/40">
          <h2 className="font-extrabold text-[16px] text-foreground font-display flex items-center gap-2">
            <TrendUp size={18} weight="bold" className="text-primary" />
            {isId ? "Tren Rekayasa Darell" : "Trending Engineering"}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            Live Feed
          </span>
        </div>

        <div className="divide-y divide-border/30">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              onClick={topic.action}
              className="px-4 py-2.5 hover:bg-muted/50 transition-colors cursor-pointer group flex items-start justify-between"
            >
              <div className="min-w-0 pr-2">
                <span className="text-[11px] text-muted-foreground block truncate">
                  {topic.category}
                </span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block mt-0.5 leading-snug">
                  {topic.title}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono mt-0.5 block">
                  {topic.posts}
                </span>
              </div>
              <DotsThree
                size={18}
                className="text-muted-foreground/60 group-hover:text-muted-foreground shrink-0 mt-1"
              />
            </div>
          ))}
        </div>

        <div
          onClick={() => onSelectTab("projects")}
          className="px-4 py-3 text-xs text-primary hover:bg-muted/50 transition-colors cursor-pointer font-semibold block"
        >
          {isId ? "Tampilkan semua portofolio →" : "Show all portfolio →"}
        </div>
      </div>

      {/* 4. Featured Applications (Real Logos, No Emojis) */}
      <div className="rounded-2xl bg-muted/30 border border-border/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-border/40">
          <h2 className="font-extrabold text-[16px] text-foreground font-display">
            {isId ? "Aplikasi & Solusi Pilihan" : "Featured Applications"}
          </h2>
        </div>

        <div className="divide-y divide-border/30">
          {featuredApps.map((app, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-muted/50 transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-background border border-border/80 overflow-hidden relative shrink-0 p-1">
                  <Image
                    src={app.image}
                    alt={app.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-foreground truncate">
                      {app.name}
                    </span>
                    <CheckCircle
                      size={13}
                      weight="fill"
                      className="text-primary shrink-0"
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground block truncate font-mono">
                    {app.handle}
                  </span>
                  <span className="text-[10px] text-muted-foreground block truncate">
                    {app.category}
                  </span>
                </div>
              </div>

              <Link
                href={app.url}
                className="shrink-0 py-1.5 px-3 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
              >
                <span>{isId ? "Lihat" : "View"}</span>
                <ArrowSquareOut size={12} weight="bold" />
              </Link>
            </div>
          ))}
        </div>

        <div
          onClick={() => {
            if (onFilterProjects) onFilterProjects("all");
            onSelectTab("projects");
          }}
          className="px-4 py-3 text-xs text-primary hover:bg-muted/50 transition-colors cursor-pointer font-semibold block"
        >
          {isId ? "Jelajahi seluruh karya →" : "Explore all works →"}
        </div>
      </div>

      {/* 5. Micro Footer */}
      <div className="px-3 pt-2 pb-6 text-[11px] text-muted-foreground space-y-1 select-none">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/privacy" className="hover:underline">
            Terms of Service
            {isId ? "Ketentuan Layanan" : "Terms of Service"}
          </Link>
          <span>·</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
            {isId ? "Kebijakan Privasi" : "Privacy Policy"}
          </Link>
          <span>·</span>
          <a
            href="https://github.com/Rangga11268"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://www.linkedin.com/in/darellrangga/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-[11px] pt-1">
          &copy; {new Date().getFullYear()} Darell Rangga Portfolio. Built for
          High Performance. &copy; {new Date().getFullYear()} Darell Rangga
          Portfolio.{" "}
          {isId
            ? "Dibangun untuk performa tinggi."
            : "Built for high performance."}
        </p>
      </div>
    </aside>
  );
}
