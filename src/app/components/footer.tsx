"use client";

import { useLanguage } from "@/app/providers/language-provider";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-paper border-t-rule-thick border-primary py-12">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop mb-8 pb-8 border-b hairline-b border-primary/20">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-4">
            <span className="font-serif italic font-bold text-xs uppercase text-primary/75 tracking-wider">
              {language === "id" ? "Arsip Musik Terkurasi" : "Curated Music Archive"}
            </span>
            <span className="label-caps text-[9px] opacity-40 font-mono tracking-widest">
              SOUNDTRACK VOL. 01
            </span>
          </div>
          <div className="w-full h-[352px] border-2 border-primary p-[1px] shadow-[8px_8px_0px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.05)] bg-transparent overflow-hidden rounded-[12px]">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px", width: "100%", height: "352px" }}
              src={`https://open.spotify.com/embed/playlist/${process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID || "3epWoGlNfC8AadULiXKV38"}?utm_source=generator`}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="body-md text-on-surface-variant">
          © {new Date().getFullYear()} Darell Rangga. {t.footer.copyright}
        </div>
        
        <div className="label-caps text-xs uppercase tracking-widest text-on-surface-variant">
          Vol. 01 — Edition {new Date().getFullYear()}
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label-caps text-xs uppercase tracking-widest hover:underline decoration-primary underline-offset-4"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
