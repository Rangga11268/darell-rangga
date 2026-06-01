"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { Megaphone, Briefcase, Star, Disc } from "@phosphor-icons/react";

export function ClassifiedAds() {
  const { language } = useLanguage();

  const ads = [
    {
      title: language === "id" ? "DICARI: DEVELOPER" : "WANTED: DEVELOPER",
      content: language === "id" 
        ? "Menciptakan ekosistem digital dengan presisi. Hubungi untuk kolaborasi Next.js."
        : "Building digital ecosystems with precision. Inquire for Next.js collaborations.",
      icon: Megaphone,
      category: "SERVICES"
    },
    {
      title: language === "id" ? "IKLAN BARIS: UI/UX" : "CLASSIFIED: UI/UX",
      content: language === "id"
        ? "Desain pixel-perfect. Estetika editorial modern. Tersedia untuk proyek freelance."
        : "Pixel-perfect design. Modern editorial aesthetics. Available for freelance projects.",
      icon: Star,
      category: "CREATIVE"
    },
    {
      title: language === "id" ? "PELUANG: FULLSTACK" : "OPPORTUNITY: FULLSTACK",
      content: language === "id"
        ? "Dari database ke antarmuka. Solusi end-to-end untuk visi bisnis Anda."
        : "From database to interface. End-to-end solutions for your business vision.",
      icon: Briefcase,
      category: "BUSINESS"
    },
    {
      title: language === "id" ? "SPONSOR: PLAYLIST" : "SPONSOR: PLAYLIST",
      content: "",
      icon: Disc,
      category: "SOUNDTRACK"
    }
  ];

  return (
    <section className="bg-paper border-b-rule-thick border-primary py-12">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="border-y hairline-y border-primary flex items-center justify-between py-2 mb-8 label-caps text-[10px] font-bold">
          <span className="opacity-40">SECTION 09</span>
          <span className="tracking-[0.5em] hidden sm:inline">CLASSIFIED ADVERTISEMENTS</span>
          <span className="tracking-[0.5em] sm:hidden">CLASSIFIED</span>
          <span className="opacity-40">VOL. I</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l hairline-l border-primary">
          {ads.map((ad, index) => {
            const isSpotifyAd = ad.category === "SOUNDTRACK";

            return (
              <div 
                key={index} 
                className="p-6 border-r border-b hairline-r hairline-b border-primary hover:bg-primary/[0.02] transition-colors group relative flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="label-caps text-[8px] bg-primary text-primary-foreground px-1.5 py-0.5">{ad.category}</span>
                  <ad.icon size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="headline-sm text-sm uppercase mb-2 font-black leading-tight tracking-tighter">
                  {ad.title}
                </h4>
                
                {isSpotifyAd ? (
                  <div className="w-full h-[152px] border border-primary p-[1px] bg-transparent overflow-hidden rounded-[8px] mb-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: "8px", width: "100%", height: "152px" }}
                      src={`https://open.spotify.com/embed/playlist/${process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID || "3epWoGlNfC8AadULiXKV38"}?utm_source=generator`}
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : (
                  <p className="body-md text-[13px] leading-relaxed opacity-80 mb-4 font-serif italic flex-1">
                    {ad.content}
                  </p>
                )}
                
                <div className="text-[9px] font-bold label-caps opacity-30 mt-auto pt-4">
                  {isSpotifyAd ? "LISTEN: SPOTIFY APP" : "INQUIRE: @RANGGA11268"}
                </div>
                
                {/* Decorative Newspaper Dots */}
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-10">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  <div className="w-1 h-1 bg-primary rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <p className="editor-note text-[12px] opacity-40">
            {language === "id" 
              ? "*Pemuatan iklan ini dijamin oleh otoritas kearsipan digital."
              : "*This advertisement listing is guaranteed by the digital archival authority."}
          </p>
        </div>
      </div>
    </section>
  );
}
