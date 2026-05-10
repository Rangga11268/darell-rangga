"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { GithubLogo, LinkedinLogo, InstagramLogo, Broadcast } from "@phosphor-icons/react";

export function SocialDispatch() {
  const { language } = useLanguage();

  const socialLinks = [
    {
      name: "GitHub",
      handle: "@Rangga11268",
      url: "https://github.com/Rangga11268/",
      icon: GithubLogo,
      desc: language === "id" ? "Pusat kode sumber dan kearsipan proyek pengembangan." : "Source code hub and project development archives."
    },
    {
      name: "LinkedIn",
      handle: "Darell Rangga",
      url: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
      icon: LinkedinLogo,
      desc: language === "id" ? "Korespondensi profesional dan jaringan karir digital." : "Professional correspondence and career network."
    },
    {
      name: "Instagram",
      handle: "@darellrangga17",
      url: "https://www.instagram.com/darellrangga17/",
      icon: InstagramLogo,
      desc: language === "id" ? "Dokumentasi visual dan cuplikan kehidupan di balik layar." : "Visual documentation and behind-the-scenes life snippets."
    }
  ];

  return (
    <section className="bg-paper border-b-rule-thick border-primary py-12">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Header Column */}
          <div className="lg:w-1/4">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Broadcast size={24} weight="bold" />
              <h2 className="headline-md uppercase tracking-tighter leading-none">
                {language === "id" ? "Layanan Kawat" : "Wire Services"}
              </h2>
            </div>
            <p className="editor-note text-sm opacity-60 leading-relaxed">
              {language === "id" 
                ? "Terhubung langsung dengan biro korespondensi kami di berbagai platform digital untuk pembaruan terkini."
                : "Connect directly with our correspondence bureaus across various digital platforms for latest updates."}
            </p>
            <div className="mt-6 pt-6 border-t hairline-t border-primary/20">
              <span className="label-caps text-[10px] font-bold opacity-30">AVAILABILITY: 24/7 DIGITAL DISPATCH</span>
            </div>
          </div>

          {/* Social Grid */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t hairline-l hairline-t border-primary">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                className="p-8 border-r border-b hairline-r hairline-b border-primary hover:bg-primary text-primary hover:text-primary-foreground transition-all group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <social.icon size={40} weight="bold" className="opacity-20 group-hover:opacity-100 transition-opacity" />
                  <span className="label-caps text-[8px] border border-current px-1.5 py-0.5 opacity-40 group-hover:opacity-100">STATION ACTIVE</span>
                </div>
                <div className="mb-4">
                  <h3 className="label-caps text-sm font-black mb-1 tracking-wider">{social.name}</h3>
                  <div className="font-serif italic text-lg opacity-60 group-hover:opacity-100">{social.handle}</div>
                </div>
                <p className="text-[12px] leading-relaxed opacity-40 group-hover:opacity-80 font-serif">
                  {social.desc}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="label-caps text-[9px] font-bold opacity-30">EST. CONNECTION</span>
                  <div className="w-8 h-px bg-current opacity-20" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
