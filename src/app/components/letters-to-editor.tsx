"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { ChatCircleDots, Quotes } from "@phosphor-icons/react";

export function LettersToEditor() {
  const { language } = useLanguage();

  const letters = [
    {
      author: "Alex Rivera",
      location: "San Francisco",
      content: language === "id"
        ? "Desainnya sangat unik. Jarang sekali melihat portofolio yang berani menggunakan gaya editorial murni seperti ini."
        : "The design is incredibly unique. It's rare to see a portfolio that leans so heavily and successfully into a pure editorial style."
    },
    {
      author: "Siti Aminah",
      location: "Jakarta",
      content: language === "id"
        ? "Sangat responsif dan rapi. Penggunaan tipografi Serif-nya membuat pembaca betah berlama-lama."
        : "Very responsive and clean. The use of Serif typography makes the reader want to stay longer."
    }
  ];

  return (
    <section className="bg-paper border-b-rule-thick border-primary py-16">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Column 1: Header */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                <ChatCircleDots size={24} weight="fill" />
              </div>
              <h2 className="headline-md uppercase leading-tight">
                {language === "id" ? "Surat Untuk Redaksi" : "Letters To The Editor"}
              </h2>
            </div>
            <p className="editor-note text-on-surface-variant mb-8 leading-relaxed">
              {language === "id"
                ? "Pendapat Anda penting bagi kearsipan kami. Kirimkan surat atau masukan untuk pengembangan edisi mendatang."
                : "Your opinion matters to our archive. Send us your letters or feedback for future editions."}
            </p>
            <div className="border hairline border-primary p-4 bg-primary/5 italic text-sm">
              <span className="font-bold uppercase block mb-1 text-[10px] opacity-40">Editor&apos;s Note:</span>
              {language === "id" 
                ? "Kami menerima segala bentuk kritik yang membangun dan apresiasi artistik."
                : "We welcome all forms of constructive criticism and artistic appreciation."}
            </div>
          </div>

          {/* Column 2: The Letters */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {letters.map((letter, index) => (
              <div key={index} className="flex flex-col border-t hairline-t border-primary pt-6 relative">
                <Quotes size={32} className="absolute -top-4 right-0 opacity-10 text-primary" weight="fill" />
                <p className="body-md italic mb-6 leading-relaxed flex-1">
                  &quot;{letter.content}&quot;
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="block font-bold text-sm uppercase">{letter.author}</span>
                    <span className="block text-[10px] label-caps opacity-50">{letter.location}</span>
                  </div>
                  <div className="w-8 h-px bg-primary/20" />
                </div>
              </div>
            ))}
            
            {/* Empty Letter Slot for Interactive Feel */}
            <div className="flex flex-col border-dashed border hairline border-primary/30 p-6 items-center justify-center text-center group cursor-pointer hover:border-primary/60 transition-all">
              <div className="label-caps text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">
                {language === "id" ? "TULIS SURAT ANDA" : "WRITE YOUR LETTER"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
