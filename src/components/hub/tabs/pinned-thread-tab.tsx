"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { TabKey } from "../types";
import { motion } from "framer-motion";
import {
  PushPin,
  BookmarkSimple,
  CheckCircle,
  ChatCircle,
  Repeat,
  Heart,
  ChartBar,
  Trophy,
  GraduationCap,
  Cpu,
  FilePdf,
  WhatsappLogo,
  PaperPlaneTilt,
  Lightning,
} from "@phosphor-icons/react";

interface PinnedThreadTabProps {
  profileLikes: number;
  hasLikedProfile: boolean;
  onLikeProfile: () => void;
  onSelectTab: (tab: TabKey) => void;
}

// Optimized, isolated Reply Box component to avoid re-rendering entire thread while typing
const ThreadReplyBox = memo(function ThreadReplyBox({
  isId,
  onSelectTab,
}: {
  isId: boolean;
  onSelectTab: (tab: TabKey) => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText("");
      onSelectTab("contact");
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-5 border-t border-border/60 bg-muted/20">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs shrink-0">
          HR
        </div>
        <form onSubmit={handleSubmit} className="grow min-w-0">
          <div className="relative">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                isId
                  ? "Kirim pesan / pertanyaan rekrutmen ke @darellrangga..."
                  : "Send recruitment inquiry to @darellrangga..."
              }
              className="w-full bg-background border border-border/80 focus:border-foreground/50 rounded-2xl pl-3.5 pr-24 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-xl bg-foreground text-background text-[11px] font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>
                {replySent
                  ? isId
                    ? "Terkirim!"
                    : "Sent!"
                  : isId
                    ? "Kirim"
                    : "Reply"}
              </span>
              <PaperPlaneTilt size={12} weight="bold" />
            </button>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono mt-1.5 block">
            {isId
              ? "Balasan akan membuka ruang obrolan teknis dan kontak langsung dengan Darell Rangga."
              : "Replies initiate a direct technical discussion and contact channel with Darell."}
          </span>
        </form>
      </div>
    </div>
  );
});

export function PinnedThreadTab({
  profileLikes,
  hasLikedProfile,
  onLikeProfile,
  onSelectTab,
}: PinnedThreadTabProps) {
  const { language } = useLanguage();
  const [bookmarked, setBookmarked] = useState(false);
  const isId = language === "id";

  return (
    <motion.div
      key="why-hire"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-0 divide-y divide-border/60"
    >
      {/* Thread Header Bar */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-border/60 flex items-center justify-between gap-2 bg-muted/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <PushPin size={15} weight="fill" />
          </span>
          <div className="min-w-0">
            <span className="text-xs font-bold text-foreground font-display block">
              {isId ? "Utas Disematkan" : "Pinned Thread"}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono truncate block">
              Fullstack Architecture & Leadership
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold whitespace-nowrap">
            Verified Thread
          </span>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title={isId ? "Simpan Utas" : "Bookmark Thread"}
          >
            <BookmarkSimple
              size={16}
              weight={bookmarked ? "fill" : "bold"}
              className={bookmarked ? "text-primary" : ""}
            />
          </button>
        </div>
      </div>

      {/* POST 1: ROOT TWEET (HOOK) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                priority
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground hover:underline cursor-pointer">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  {isId ? "Terbaru" : "Latest"}
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  Kenapa memilih saya sebagai{" "}
                  <strong className="text-foreground font-semibold">
                    Full-Stack Engineer
                  </strong>{" "}
                  atau{" "}
                  <strong className="text-foreground font-semibold">
                    Tech Lead
                  </strong>{" "}
                  untuk tim Anda?
                  <br className="my-1" />
                  Berikut adalah rekap ringkas berbasis fakta rekam jejak,
                  capaian kompetisi, dan arsitektur sistem riil yang telah saya
                  bangun:
                </>
              ) : (
                <>
                  Why hire me as your next{" "}
                  <strong className="text-foreground font-semibold">
                    Full-Stack Engineer
                  </strong>{" "}
                  or{" "}
                  <strong className="text-foreground font-semibold">
                    Tech Lead
                  </strong>
                  ?
                  <br className="my-1" />
                  Here is a concise breakdown based on verified academic track
                  records, competition victories, and production-grade
                  architectures:
                </>
              )}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center gap-1.5">
                <GraduationCap size={14} weight="bold" /> IPK 4.00 / 4.00
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-foreground/5 text-foreground border border-border/70 font-mono text-xs font-bold flex items-center gap-1.5">
                <Trophy size={14} weight="bold" /> Juara 1 IT Bootcamp 2026
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <Lightning size={14} weight="bold" /> 11 Engineers Led
              </span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <button
                type="button"
                onClick={() => onSelectTab("contact")}
                className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
              >
                <ChatCircle size={15} /> <span>18</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer"
              >
                <Repeat size={15} /> <span>34</span>
              </button>
              <button
                type="button"
                onClick={onLikeProfile}
                className={
                  "flex items-center gap-1.5 hover:text-rose-700 dark:text-rose-400 transition-colors cursor-pointer " +
                  (hasLikedProfile
                    ? "text-rose-700 dark:text-rose-400 font-bold"
                    : "")
                }
              >
                <Heart
                  size={15}
                  weight={hasLikedProfile ? "fill" : "regular"}
                />
                <span>{profileLikes}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <ChartBar size={15} /> <span>1.8k</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 2: TWEET 1/6 (PENDIDIKAN & AKADEMIK) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  1/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  🎓 <strong>Pendidikan & Disiplin Akademik</strong>
                  <br />
                  Menempuh studi{" "}
                  <strong className="text-foreground">
                    S1 Sistem Informasi di Universitas Bina Sarana Informatika
                    (UBSI)
                  </strong>{" "}
                  (Sep 2024 – Sekarang) dengan konsistensi nilai sempurna:{" "}
                  <strong className="text-foreground font-bold">
                    IPK 4.00 / 4.00 (Cum Laude Track)
                  </strong>
                  .
                  <br className="my-1.5" />
                  Bagi saya, IPK sempurna bukan sekadar teori di kelas,
                  melainkan cerminan determinasi, kedisiplinan kerja, dan
                  pemahaman fundamental arsitektur komputasi yang solid.
                </>
              ) : (
                <>
                  🎓 <strong>Academics & Rigorous Discipline</strong>
                  <br />
                  Currently pursuing a{" "}
                  <strong className="text-foreground">
                    Bachelor of Information Systems at Universitas Bina Sarana
                    Informatika (UBSI)
                  </strong>{" "}
                  (Sep 2024 – Present) with an unblemished academic record:{" "}
                  <strong className="text-foreground font-bold">
                    GPA 4.00 / 4.00 (Cum Laude Track)
                  </strong>
                  .
                  <br className="my-1.5" />
                  Academic excellence reflects disciplined work ethics,
                  resilience, and a firm grasp of software engineering
                  fundamentals.
                </>
              )}
            </p>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>6</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>14</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>52</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 3: TWEET 2/6 (PRESTASI JUARA 1 IT BOOTCAMP 2026) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  2/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  🏆{" "}
                  <strong>
                    Juara 1 IT Bootcamp 2026 & Kepemimpinan 11 Engineer
                  </strong>
                  <br />
                  Dianugerahi{" "}
                  <strong className="text-foreground">Juara 1</strong> pada
                  kompetisi bergengsi{" "}
                  <em>
                    &quot;Futurecode: AI-Driven Software Engineering&quot;
                  </em>{" "}
                  oleh Universitas Bina Sarana Informatika (UBSI).
                  <br className="my-1" />
                  Sebagai{" "}
                  <strong className="text-foreground">
                    Project Manager & Lead Developer
                  </strong>{" "}
                  proyek <strong>TitikAman</strong>, saya mengarahkan{" "}
                  <strong className="text-foreground">
                    11 engineer lintas divisi
                  </strong>
                  , merancang arsitektur sistem, memimpin code review, dan
                  menerapkan 59 unit test (200 assertions PHPUnit) dengan
                  tingkat kelulusan 100% pada pengujian Black Box.
                </>
              ) : (
                <>
                  🏆{" "}
                  <strong>
                    1st Place Winner IT Bootcamp 2026 & Leading 11 Engineers
                  </strong>
                  <br />
                  Awarded <strong className="text-foreground">
                    1st Place
                  </strong>{" "}
                  at{" "}
                  <em>
                    &quot;Futurecode: AI-Driven Software Engineering&quot;
                  </em>{" "}
                  by Universitas Bina Sarana Informatika (UBSI).
                  <br className="my-1" />
                  As{" "}
                  <strong className="text-foreground">
                    Project Manager & Lead Developer
                  </strong>{" "}
                  for <strong>TitikAman</strong>, I orchestrated{" "}
                  <strong className="text-foreground">
                    11 cross-functional engineers
                  </strong>
                  , conducted strict code reviews, and implemented 59 unit tests
                  (200 PHPUnit assertions) with 100% QA pass rate.
                </>
              )}
            </p>

            {/* Photo Attachment */}
            <div className="mt-3.5 relative rounded-2xl overflow-hidden border border-border/80 max-w-sm aspect-[4/3] bg-zinc-900 shadow-sm group">
              <Image
                src="/img/saya/trophy-juara.jpg"
                alt="Trofi Juara 1 IT Bootcamp 2026 - Darell Rangga"
                fill
                sizes="(max-width: 640px) 100vw, 384px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-bold font-display">
                <Trophy
                  size={16}
                  weight="fill"
                  className="text-foreground shrink-0"
                />
                <span className="truncate">
                  Juara 1 IT Bootcamp 2026 • Tim 11 Orang
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>12</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>28</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>96</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 4: TWEET 3/6 (PENGALAMAN KERJA MANDIRI & INFRASTRUCTURE) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  3/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  ⚡{" "}
                  <strong>
                    Full-Stack Developer Mandiri (Desember 2024 – Sekarang)
                  </strong>
                  <br />
                  Fokus pada rekayasa backend berdaya tahan tinggi,
                  containerization, dan performa database:
                  <br className="my-1" />• Kontainerisasi aplikasi menggunakan{" "}
                  <strong className="text-foreground">Docker & Nginx</strong>{" "}
                  untuk isolasi environment dev, staging, dan production.
                  <br />• Optimasi skema relasional, indexing, serta query
                  database kompleks yang memangkas waktu pemrosesan transaksi
                  hingga{" "}
                  <strong className="text-foreground font-semibold">
                    30% lebih cepat
                  </strong>
                  .
                  <br />• Implementasi middleware autentikasi berbasis role
                  (RBAC) dengan proteksi brute-force dan rate-limiting teruji.
                </>
              ) : (
                <>
                  ⚡{" "}
                  <strong>
                    Independent Full-Stack Developer (Dec 2024 – Present)
                  </strong>
                  <br />
                  Specializing in high-reliability backend workflows, modern
                  containerization, and database query optimization:
                  <br className="my-1" />• Application containerization using{" "}
                  <strong className="text-foreground">Docker & Nginx</strong>{" "}
                  for isolated environments.
                  <br />• Streamlined relational schemas, indexing, and complex
                  queries, cutting transaction latency by{" "}
                  <strong className="text-foreground font-semibold">30%</strong>
                  .
                  <br />• Role-based access control (RBAC) middleware with rate
                  limiting and brute-force defenses.
                </>
              )}
            </p>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>4</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>9</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>41</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 5: TWEET 4/6 (PORTFOLIO PROYEK UNGGULAN) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  4/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  🛠️ <strong>Ekosistem Proyek Nyata & Berdampak</strong>
                  <br />
                  Bukan proyek tutorial, melainkan sistem fungsional:
                </>
              ) : (
                <>
                  🛠️ <strong>High-Impact Production Ecosystems</strong>
                  <br />
                  Engineered real-world applications solving actual operational
                  bottlenecks:
                </>
              )}
            </p>

            {/* Project List Cards */}
            <div className="mt-3 space-y-2">
              <div
                onClick={() => onSelectTab("projects")}
                className="p-3 rounded-2xl border border-border/70 bg-background hover:border-foreground/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    TitikAman — Disaster Early Warning
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Laravel 11 • Leaflet.js • PHPUnit
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {isId
                    ? "Sistem mitigasi bencana, pemetaan zona risiko interaktif, dan pelaporan real-time dengan 59 unit test."
                    : "Disaster mitigation platform with interactive hazard mapping and 59 unit tests."}
                </p>
              </div>

              <div
                onClick={() => onSelectTab("projects")}
                className="p-3 rounded-2xl border border-border/70 bg-background hover:border-foreground/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    TUJAGO (Tunggal Jaya)
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Next.js • Tailwind • PostgreSQL
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {isId
                    ? "Sistem reservasi armada pariwisata terintegrasi dengan kalkulator rute otomatis dan manajemen jadwal armada."
                    : "Integrated fleet reservation engine with route cost estimation and dynamic schedule management."}
                </p>
              </div>

              <div
                onClick={() => onSelectTab("projects")}
                className="p-3 rounded-2xl border border-border/70 bg-background hover:border-foreground/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground" />
                    SRB Motor POS & ERP
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Laravel • MySQL • RBAC
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {isId
                    ? "Sistem ERP bengkel motor untuk pelacakan inventaris suku cadang, rekam servis mekanik, dan laporan keuangan."
                    : "Motorcycle service ERP tracking spare parts inventory, mechanic workflows, and real-time ledger."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>7</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>19</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>68</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 6: TWEET 5/6 (EDGE AI & DATA SCIENCE) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="w-0.5 bg-border/80 grow my-2.5 h-16 sm:h-20" />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  5/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  🤖{" "}
                  <strong>Inovasi Edge AI & Machine Learning di Browser</strong>
                  <br />
                  Tidak hanya mengandalkan API pihak ketiga, saya mengembangkan
                  model inferensi client-side menggunakan{" "}
                  <strong className="text-foreground">
                    ONNX Runtime Web (Wasm)
                  </strong>
                  :
                  <br className="my-1" />• <strong>TirtaSense AI</strong>:
                  Deteksi kelayakan air bersih secara instan di peramban web
                  tanpa pengiriman data ke server luar.
                  <br />• <strong>BansosTarget AI</strong>: Klasifikasi
                  kelayakan penerima bantuan sosial berbasis pohon keputusan
                  yang transparan dan akuntabel.
                  <br />
                  Menghasilkan latensi{" "}
                  <strong className="text-foreground font-semibold">
                    &lt;10ms
                  </strong>
                  , biaya server Rp0 untuk inferensi, dan perlindungan privasi
                  data pengguna 100%.
                </>
              ) : (
                <>
                  🤖{" "}
                  <strong>
                    Client-Side Edge AI & In-Browser Machine Learning
                  </strong>
                  <br />
                  Beyond standard API wrappers, I deploy client-side inference
                  via{" "}
                  <strong className="text-foreground">
                    ONNX Runtime Web (Wasm)
                  </strong>
                  :
                  <br className="my-1" />• <strong>TirtaSense AI</strong>:
                  Instant water quality classification directly in-browser.
                  <br />• <strong>BansosTarget AI</strong>: Transparent social
                  assistance entitlement decision tree classifier.
                  <br />
                  Achieving sub-10ms latency, zero inference server overhead,
                  and total data privacy.
                </>
              )}
            </p>

            <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs font-mono">
              <Cpu size={18} className="text-primary shrink-0" />
              <span className="text-muted-foreground truncate">
                ONNX WebAssembly • Sub-10ms Latency • Zero-Cloud Cost
              </span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>11</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>22</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>83</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* POST 7: TWEET 6/6 (KESIAPAN KOLABORASI & CTA) */}
      <article className="p-4 sm:p-5 relative transition-colors hover:bg-muted/10">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border/80 shadow-xs">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-sm text-foreground">
                  Darell Rangga
                </span>
                <CheckCircle size={15} weight="fill" className="text-primary" />
                <span className="text-muted-foreground text-xs font-mono">
                  @darellrangga
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs font-mono">
                  6/6
                </span>
              </div>
            </div>

            <p className="mt-2 text-[13px] sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {isId ? (
                <>
                  🚀{" "}
                  <strong>
                    Siap Berkontribusi untuk Sasaran Strategis Perusahaan Anda
                  </strong>
                  <br />
                  Saya siap bergabung dalam perancangan sistem baru, memimpin
                  squad teknis, atau mengoptimalkan arsitektur perangkat lunak
                  Anda saat ini.
                  <br className="my-1.5" />
                  Unduh CV resmi saya atau mari jadwalkan diskusi teknis:
                </>
              ) : (
                <>
                  🚀{" "}
                  <strong>
                    Ready to Drive Engineering Impact for Your Organization
                  </strong>
                  <br />
                  Available for full-time software engineering roles, tech
                  leadership, or technical consultancy.
                  <br className="my-1.5" />
                  Download my official CV or schedule an exploratory discussion:
                </>
              )}
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              <a
                href="/pdf/Resume_Darell_Rangga_ID.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs"
              >
                <FilePdf size={16} weight="bold" />
                <span>
                  {isId ? "Unduh CV Resmi (PDF)" : "Download Resume (PDF)"}
                </span>
              </a>

              <a
                href="https://wa.me/628978638973"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 active:scale-95 transition-all"
              >
                <WhatsappLogo size={16} weight="bold" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectTab("contact")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 bg-background text-foreground font-bold text-xs hover:bg-muted active:scale-95 transition-all cursor-pointer"
              >
                <PaperPlaneTilt size={16} weight="bold" />
                <span>{isId ? "Buka Tab Kontak" : "Open Contact"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 mt-3 border-t border-border/40 max-w-xs">
              <div className="flex items-center gap-1">
                <ChatCircle size={15} /> <span>15</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat size={15} /> <span>31</span>
              </div>
              <div className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <Heart size={15} weight="fill" /> <span>112</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* TWEET REPLY BOX (INTERACTIVE SOCIAL ENGAGEMENT) */}
      <ThreadReplyBox isId={isId} onSelectTab={onSelectTab} />
    </motion.div>
  );
}
