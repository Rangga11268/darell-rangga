"use client";

import { Button } from "@/components/ui/button";
import { GithubLogo, LinkedinLogo, FilePdf } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import Image from "next/image";

export function HeroSection() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <section id="home" className="pt-8">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Utility Bar - Precise Reference Layout */}
        <div className="flex justify-between items-center mb-4 label-caps border-b hairline-b border-primary/20 pb-2 text-[10px] md:text-[11px] text-on-surface-variant font-bold">
          <div className="flex items-center gap-3">
            <span>{new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex items-center gap-1.5 border-l hairline-l border-primary/20 pl-3 ml-1">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-2 py-0.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <span className="opacity-60 hidden sm:inline">EDITION:</span>
                <span>{language === "en" ? "ENGLISH" : "INDONESIA"}</span>
              </button>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                title="TOGGLE CONTRAST"
              >
                {theme === "dark" ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 border-l hairline-l border-primary/20 pl-6 ml-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="opacity-60">STATUS:</span>
              <span>AVAILABLE FOR DISPATCH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-60">LOCATION:</span>
              <span>BEKASI DISPATCH</span>
            </div>
          </div>
          <span className="hidden sm:inline ml-6">No. 07</span>
        </div>

        {/* Masthead - Precise Reference Styling */}
        <div className="text-center py-6 border-b-rule-thick border-primary mb-2 flex flex-col items-center">
          <h1 className="text-masthead text-primary mb-4 leading-none select-none tracking-tighter whitespace-nowrap">
            DARELL RANGGA
          </h1>
          <p className="editor-note flex items-center gap-4 text-on-surface-variant">
            <span className="h-px w-12 bg-primary inline-block"></span>
            Crafting Digital Experiences. Telling Stories Through Code.
            <span className="h-px w-12 bg-primary inline-block"></span>
          </p>
        </div>

        {/* Navigation - Embedded in Masthead structure as per reference */}
        <nav className="flex justify-between items-center py-3 sticky top-0 bg-paper z-40 border-b hairline-b border-primary/20 mb-8 outline-none">
           <button className="flex items-center gap-2 hover:text-primary transition-colors outline-none focus:outline-none">
             <span className="font-bold text-xl font-serif">MENU</span>
           </button>
           <div className="hidden md:flex gap-8 lg:gap-12">
             {["home", "about", "services", "projects", "skills", "experience", "contact"].map((item) => (
               <a 
                 key={item}
                 href={`#${item}`} 
                 className="label-caps text-on-surface-variant hover:text-primary transition-colors font-bold outline-none"
               >
                 {item}
               </a>
             ))}
           </div>
           <span className="label-caps text-on-surface-variant font-bold">• EST. 2020</span>
        </nav>

        {/* Tech Ticker - Modern Marquee with Editorial Flair */}
        <div className="w-full bg-primary text-primary-foreground py-2 mb-8 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee font-bold label-caps text-[10px] tracking-[0.2em]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                <span>NEXT.JS EXPERTISE</span>
                <span className="opacity-30">•</span>
                <span>LARAVEL BACKEND</span>
                <span className="opacity-30">•</span>
                <span>REACT INTERFACES</span>
                <span className="opacity-30">•</span>
                <span>UI/UX DESIGN</span>
                <span className="opacity-30">•</span>
                <span>TYPESCRIPT SAFETY</span>
                <span className="opacity-30">•</span>
                <span>RESTFUL API</span>
                <span className="opacity-30">•</span>
              </div>
            ))}
          </div>
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />
        </div>

        {/* Hero Grid - 12 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter border-b-rule-thick border-primary pb-12 pt-4">
          
          {/* Column 1: Intro (3 cols) */}
          <div className="lg:col-span-3 flex flex-col border-b hairline-b lg:border-b-0 border-primary pb-8 lg:pb-0">
            <div className="mb-6">
              <span className="bg-primary text-primary-foreground label-caps px-3 py-1 inline-block mb-4">
                Breaking News
              </span>
              <h2 className="headline-md italic mb-2">Hi, I&apos;m</h2>
              <h1 className="headline-lg uppercase mb-4 leading-[0.9] tracking-tighter">
                Darell<br />Rangga
              </h1>
              <h3 className="headline-sm italic text-on-surface-variant border-b hairline-b border-primary/20 pb-4 mb-4">
                Creative Developer & Problem Solver
              </h3>
              <p className="body-lg mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline"
                  className="border border-primary rounded-none px-6 py-6 label-caps hover:bg-primary hover:text-primary-foreground transition-colors tracking-widest font-bold"
                  asChild
                >
                  <a href="#projects">{t.hero.viewWork}</a>
                </Button>
                <Button 
                  variant="default"
                  className="bg-primary text-paper rounded-none px-6 py-6 label-caps hover:bg-primary/90 transition-colors tracking-widest font-bold flex items-center gap-2"
                  asChild
                >
                  <a href="/img/saya/CV IND.pdf" target="_blank">
                    <FilePdf size={20} weight="bold" />
                    CV.PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Main Feature Image (6 cols) */}
          <div className="lg:col-span-6 lg:border-x lg:hairline-r lg:hairline-l border-primary px-0 lg:px-gutter">
            <div className="relative aspect-[4/5] w-full grayscale contrast-125 sepia-[.15] border border-primary/10">
              <Image 
                src="/img/saya/saya1.webp" 
                alt="Portrait" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/5" />
            </div>
          </div>

          {/* Column 3: Index & Aside (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div>
              <h4 className="editor-note text-on-surface-variant mb-2">{t.hero.featuredEdition}</h4>
              <h3 className="headline-md leading-tight mb-4">{t.hero.mainHeadline}</h3>
              <div className="flex gap-4 label-caps text-on-surface-variant mb-4 uppercase">
                <span>{new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>Portfolio</span>
              </div>
              <p className="body-md border-b hairline-b border-primary/20 pb-6 mb-6">
                {t.hero.bio}
              </p>
            </div>

            <div>
              <h4 className="editor-note text-on-surface-variant mb-4 font-bold">{t.hero.inThisEdition}</h4>
              <ul className="flex flex-col gap-3 label-caps tracking-widest font-bold">
                {[
                  { name: "About Me", page: "02", id: "about" },
                  { name: "Services", page: "03", id: "services" },
                  { name: "Projects", page: "04", id: "projects" },
                  { name: "Skills", page: "05", id: "skills" },
                  { name: "Experience", page: "06", id: "experience" },
                  { name: "Contact", page: "07", id: "contact" }
                ].map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b hairline-b border-on-surface-variant/20 pb-2">
                    <a href={`#${item.id}`} className="hover:underline">{item.name}</a>
                    <span className="body-md font-normal">{item.page}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto border hairline border-primary p-4 bg-primary/5">
              <h4 className="label-caps text-[10px] font-bold mb-2 opacity-60">{t.hero.archivedDocs}</h4>
              <a 
                href="/img/saya/CV IND.pdf" 
                target="_blank"
                className="flex items-center justify-between text-xs font-bold hover:underline group"
              >
                <span>{t.hero.cvPdf}</span>
                <FilePdf size={16} weight="bold" className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="flex gap-4 pt-6 border-t hairline-t border-primary/10">
              <a href="https://github.com/Rangga11268/" target="_blank" className="hover:scale-110 transition-transform">
                <GithubLogo size={24} weight="bold" />
              </a>
              <a href="https://www.linkedin.com/in/darell-rangga-1320b634b/" target="_blank" className="hover:scale-110 transition-transform">
                <LinkedinLogo size={24} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
