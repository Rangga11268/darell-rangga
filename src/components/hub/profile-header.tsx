"use client";

import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import {
  GraduationCap,
  FilePdf,
  Check,
  WhatsappLogo,
  Trophy,
  CheckCircle,
  MapPin,
  ShareNetwork,
  Users,
  Heart,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
  InstagramIcon,
} from "@/components/ui/brand-icons";

interface ProfileHeaderProps {
  profileLikes: number;
  hasLikedProfile: boolean;
  onLikeProfile: () => void;
  onCopyEmail: () => void;
  copied: boolean;
  onCopyLink: () => void;
  linkCopied: boolean;
}

export function ProfileHeader({
  profileLikes,
  hasLikedProfile,
  onLikeProfile,
  onCopyEmail,
  copied,
  onCopyLink,
  linkCopied,
}: ProfileHeaderProps) {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <div className="border-b border-border/60 bg-card/40">
      {/* 1. Profile Banner (Framer / Dribbble Clean Showcase) */}
      <div className="h-44 sm:h-56 md:h-64 w-full relative overflow-hidden bg-zinc-900">
        <Image
          src="/img/bannerLinkedin.png"
          alt="Darell Rangga Profile Banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* 2. Avatar & Action Buttons Row */}
      <div className="px-4 sm:px-6 pt-3 pb-5">
        <div className="flex items-end justify-between gap-3 -mt-16 sm:-mt-20 md:-mt-24 mb-3 sm:mb-4">
          {/* Avatar with live status */}
          <div className="relative shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-background shadow-lg bg-background">
              <Image
                src="/img/saya/saya1.webp"
                alt="Darell Rangga"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <span
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background shadow-xs"
              title="Aktif & Siap Wawancara"
            />
          </div>

          {/* Action Buttons (M3 Filled + Outlined Buttons) */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <a
              href={
                isId
                  ? "/pdf/Resume_Darell_Rangga_ID.pdf"
                  : "/pdf/Resume_Darell_Rangga_EN.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-border/80 bg-background hover:bg-muted text-xs font-bold text-foreground transition-all cursor-pointer shadow-xs"
            >
              <FilePdf size={16} weight="bold" />
              <span>{isId ? "Unduh CV" : "Download CV"}</span>
            </a>

            <a
              href="https://wa.me/6281292558509"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-foreground text-background text-xs font-extrabold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span>{isId ? "Kirim Tawaran" : "Contact / Hire"}</span>
            </a>

            <button
              onClick={onLikeProfile}
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                hasLikedProfile
                  ? "border-red-500/40 bg-red-500/10 text-red-500"
                  : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
              title={isId ? "Dukung Profil" : "Endorse Profile"}
            >
              <Heart
                size={17}
                weight={hasLikedProfile ? "fill" : "bold"}
                className={hasLikedProfile ? "text-red-500" : ""}
              />
            </button>

            <button
              onClick={onCopyEmail}
              className="w-10 h-10 rounded-2xl border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title={isId ? "Salin Email" : "Copy Email"}
            >
              {copied ? (
                <Check size={16} weight="bold" className="text-emerald-500" />
              ) : (
                <EnvelopeSimple size={17} weight="bold" />
              )}
            </button>

            <button
              onClick={onCopyLink}
              className="w-10 h-10 rounded-2xl border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title={isId ? "Bagikan Profil" : "Share Profile"}
            >
              {linkCopied ? (
                <Check size={16} weight="bold" className="text-emerald-500" />
              ) : (
                <ShareNetwork size={17} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* 3. Name, Username, Status & Bio */}
        <div className="space-y-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight font-display">
                Darell Rangga
              </h1>
              <CheckCircle size={20} weight="fill" className="text-primary shrink-0" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-0.5">
              <span>@ranggsdarell</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isId ? "Tersedia untuk Rekrutmen Fullstack" : "Open for Fullstack Roles"}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed max-w-2xl font-medium">
            {isId
              ? "Fullstack Web Developer spesialis Laravel 12 & React 19. Lead Developer Juara 1 IT Bootcamp 2026 (TitikAman, memimpin tim 11 orang). Membangun sistem transaksi atomik, real-time WebSockets, dan modern monolith. Mahasiswa aktif S1 Sistem Informasi UBSI (IPK 4.00)."
              : "Fullstack Developer specializing in Laravel 12 & React 19. Lead Developer Champion at IT Bootcamp 2026 (TitikAman, led 11 engineers). Architecting atomic concurrency, real-time WebSockets, and modern monoliths. B.S. Information Systems UBSI (4.00 GPA)."}
          </p>

          {/* Social Icons & External Portals */}
          <div className="flex items-center gap-3 pt-1 text-muted-foreground">
            <a
              href="https://github.com/Rangga11268"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors p-1.5 rounded-xl hover:bg-muted/60"
              title="GitHub @Rangga11268"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/darell-rangga-1320b634b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] transition-colors p-1.5 rounded-xl hover:bg-muted/60"
              title="LinkedIn Darell Rangga"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/ranggsdarell"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors p-1.5 rounded-xl hover:bg-muted/60"
              title="X (Twitter) @ranggsdarell"
            >
              <XTwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/darellrangga17/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E4405F] transition-colors p-1.5 rounded-xl hover:bg-muted/60"
              title="Instagram @darellrangga17"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Meta Info Row (M3 Assist Chips) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted/50 border border-border/50">
              <MapPin size={14} className="text-foreground/70" />
              <span>Bekasi, Indonesia (Open Remote)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted/50 border border-border/50 text-foreground font-semibold">
              <GraduationCap size={15} />
              <span>S1 Sistem Informasi UBSI</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-foreground/5 border border-border/80 text-foreground font-bold">
              <Trophy size={14} weight="fill" />
              <span>Juara 1 IT Bootcamp 2026</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted/50 border border-border/50">
              <Users size={14} />
              <span>11 Engineers Led</span>
            </span>
          </div>

          {/* 4. M3 Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5 border-t border-border/50">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground font-display block">
                Akademik
              </span>
              <span className="text-base sm:text-lg font-black text-foreground font-display mt-0.5 block">
                4.00 / 4.00
              </span>
              <span className="text-[11px] text-muted-foreground truncate block">
                IPK S1 UBSI
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground font-display block">
                Portofolio
              </span>
              <span className="text-base sm:text-lg font-black text-foreground font-display mt-0.5 block">
                12+ Rilis
              </span>
              <span className="text-[11px] text-muted-foreground truncate block">
                Sistem Produksi
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground font-display block">
                Prestasi
              </span>
              <span className="text-base sm:text-lg font-black text-foreground font-display mt-0.5 block">
                Juara 1
              </span>
              <span className="text-[11px] text-muted-foreground truncate block">
                Bootcamp Nasional
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground font-display block">
                Dukungan
              </span>
              <span className="text-base sm:text-lg font-black text-foreground font-display mt-0.5 block">
                {profileLikes}
              </span>
              <span className="text-[11px] text-muted-foreground truncate block">
                Rekomendasi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
