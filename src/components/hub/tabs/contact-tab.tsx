"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { motion } from "framer-motion";
import {
  CheckCircle,
  WhatsappLogo,
  EnvelopeOpen,
  ArrowRight,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import {
  LinkedinIcon,
  GithubIcon,
  XTwitterIcon,
  InstagramIcon,
} from "@/components/ui/brand-icons";

interface ContactTabProps {
  email: string;
  copied: boolean;
  onCopyEmail: () => void;
}

export function ContactTab({ email, copied, onCopyEmail }: ContactTabProps) {
  const { language } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const isId = language === "id";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
    >
      {/* Left Column: Direct Channels */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 pb-4 border-b border-border/60 mb-5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/60 shrink-0">
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
                <CheckCircle
                  size={13}
                  weight="fill"
                  className="text-foreground"
                />
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                Aktif Sekarang • Balas dalam &lt; 2 jam
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 mb-5">
            <p className="text-xs text-foreground/90 leading-relaxed">
              {isId
                ? "Halo! Sedang membuka lowongan Fullstack Developer untuk tim Anda? Saya siap berdiskusi mengenai penempatan Full-Time, Kontrak, atau proyek engineering."
                : "Hi there! Looking for a Fullstack Web Developer? I'm open to discussing Full-Time, Contract, or Technical Internship roles."}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://wa.me/628978638973"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center">
                  <WhatsappLogo
                    size={20}
                    weight="fill"
                    className="text-emerald-500"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    WhatsApp Direct
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    +62 897 8638 973
                  </div>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
              />
            </a>

            <div
              onClick={onCopyEmail}
              className="p-4 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center">
                  <EnvelopeOpen size={20} weight="bold" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    Email Resmi
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {email}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-foreground">
                {copied
                  ? isId
                    ? "Tersalin!"
                    : "Copied!"
                  : isId
                    ? "Salin"
                    : "Copy"}
              </span>
            </div>

            <a
              href="https://www.linkedin.com/in/darellrangga/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#0a66c2] flex items-center justify-center border border-blue-500/20">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    LinkedIn Profile
                  </div>
                  <div className="text-xs text-muted-foreground">
                    linkedin.com/in/darellrangga
                  </div>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
              />
            </a>

            <a
              href="https://github.com/Rangga11268"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center border border-border/60">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    GitHub Code Repositories
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    github.com/Rangga11268
                  </div>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
              />
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://x.com/ranggsdarell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-muted text-foreground flex items-center justify-center shrink-0">
                  <XTwitterIcon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-foreground">
                    X / Twitter
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono truncate">
                    @ranggsdarell
                  </div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/darellrangga17/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-border/80 bg-background hover:bg-muted transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-[#E4405F] flex items-center justify-center shrink-0 border border-pink-500/20">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-foreground">
                    Instagram
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono truncate">
                    @darellrangga17
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between">
          <span>Domisili: Bekasi, Indonesia</span>
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Ready to Relocate / Remote</span>
          </span>
        </div>
      </div>

      {/* Right Column: Direct Message Form */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs">
        <h4 className="text-base font-bold text-foreground font-display mb-1">
          {isId ? "Kirim Pesan Langsung (DM)" : "Direct Message (DM)"}
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          {isId
            ? "Tinggalkan tawaran atau kontak Anda, saya akan merespon dalam waktu maksimal 24 jam."
            : "Leave your inquiry or contact details, I will reply within 24 hours."}
        </p>

        {formSent ? (
          <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 text-center space-y-2">
            <CheckCircle
              size={32}
              weight="fill"
              className="text-emerald-500 mx-auto"
            />
            <h5 className="text-sm font-bold text-foreground font-display">
              {isId ? "Pesan Berhasil Terkirim!" : "DM Sent Successfully!"}
            </h5>
            <p className="text-xs text-muted-foreground">
              {isId
                ? "Terima kasih atas ketertarikan Anda. Saya akan segera menghubungi Anda kembali."
                : "Thank you for reaching out. I will get back to you shortly."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase font-display block mb-1">
                {isId ? "Nama Anda / Perusahaan" : "Your Name / Company"}
              </label>
              <input
                type="text"
                required
                placeholder="HR Team / Engineering Lead"
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase font-display block mb-1">
                {isId ? "Email atau WhatsApp" : "Contact (Email or WhatsApp)"}
              </label>
              <input
                type="text"
                required
                placeholder="contact@company.com"
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase font-display block mb-1">
                {isId ? "Pesan / Posisi Kerja" : "Message / Role"}
              </label>
              <textarea
                rows={3}
                required
                placeholder={
                  isId
                    ? "Undangan interview / diskusi posisi Fullstack Developer..."
                    : "Interview invitation / Fullstack Developer role..."
                }
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PaperPlaneRight size={14} weight="bold" />
              <span>{isId ? "Kirim DM Sekarang" : "Send Message"}</span>
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
