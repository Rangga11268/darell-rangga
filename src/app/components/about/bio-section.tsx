"use client";

import { useLanguage } from "@/app/providers/language-provider";
import Image from "next/image";

export function BioSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-paper border-b-rule-thick border-primary pb-8 pt-4">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="headline-md">About Me</h2>
          <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest">Editor&apos;s Note</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Column 1: Profile Image */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] w-full grayscale contrast-125 sepia-[.1] border border-primary/10 overflow-hidden">
              <Image 
                src="/img/saya/saya2.webp" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2: Main Content */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:border-x lg:hairline-r lg:hairline-l border-primary px-0 lg:px-gutter">
            <h3 className="headline-md leading-tight mb-6 uppercase">
              Crafting Code<br />With Purpose
            </h3>
            <p className="body-lg mb-6 leading-relaxed">
              {t.about.journeyText.split('.')[0]}.
            </p>
            <p className="body-md mb-8">
              {t.about.journeyText.split('.')[1] || "I specialize in turning complex problems into simple, beautiful, and intuitive solutions."}
            </p>
            <div className="grid grid-cols-3 gap-4 border-t hairline-t border-primary pt-4 text-sm">
              <div>
                <div className="label-caps text-on-surface-variant uppercase mb-1 text-[10px]">Based In</div>
                <div className="font-bold">Indonesia</div>
              </div>
              <div>
                <div className="label-caps text-on-surface-variant uppercase mb-1 text-[10px]">Experience</div>
                <div className="font-bold">2+ Years</div>
              </div>
              <div>
                <div className="label-caps text-on-surface-variant uppercase mb-1 text-[10px]">Focus</div>
                <div className="font-bold">Web Dev</div>
              </div>
            </div>
          </div>

          {/* Column 3: Background & Quote */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h4 className="editor-note text-on-surface-variant mb-4">Background</h4>
            <p className="body-md mb-8">
              {t.about.journeyDesc}
            </p>
            <div className="border-t hairline-t border-primary pt-6 mt-auto">
              <span className="w-8 h-px bg-primary inline-block mb-4"></span>
              <p className="headline-sm italic leading-snug mb-6">
                &quot;The best websites are not just built, they are crafted with intention.&quot;
              </p>
              <div className="font-serif italic text-3xl opacity-80">Darell Rangga</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
