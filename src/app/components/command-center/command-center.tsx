"use client";

import { motion } from "framer-motion";
import { GithubWidget } from "./github-widget";
import { useLanguage } from "@/app/providers/language-provider";
import { GithubLogo } from "@phosphor-icons/react";

export function CommandCenter() {
  const { language } = useLanguage();

  const title = language === "id" ? "Arsip Open Source" : "Open Source Archives";
  const description = language === "id" 
    ? "Eksplorasi dokumentasi kode dan aktivitas repositori publik yang tersentralisasi."
    : "Exploration of centralized code documentation and public repository activity.";

  return (
    <section id="github" className="bg-paper border-b-rule-thick border-primary py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col items-center justify-center space-y-12 md:space-y-16">
          {/* Section Header - Official Bulletin Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center w-full"
          >
            <div className="inline-flex items-center gap-3 border border-primary px-4 py-1.5 label-caps text-[10px] font-bold tracking-widest mb-6">
              <GithubLogo size={16} weight="bold" />
              <span>OFFICIAL REPOSITORY LOG</span>
            </div>
            <h2 className="headline-lg uppercase mb-4 tracking-tighter leading-[0.85]">
              {title}
            </h2>
            <p className="editor-note max-w-lg mx-auto text-lg italic opacity-60">
              {description}
            </p>
          </motion.div>

          {/* GitHub Card - Framed like a printed diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl h-auto flex justify-center border-rule-thick border-primary p-1 bg-paper shadow-[12px_12px_0px_#1a1c1c]"
          >
            <div className="w-full h-full border hairline border-primary bg-white/50 dark:bg-black/5 p-4 md:p-8">
              <GithubWidget />
            </div>
          </motion.div>
          
          <div className="label-caps text-[9px] font-bold opacity-30 tracking-[0.2em]">
            END OF DATA_TRANSMISSION — REPO_REF_2025
          </div>
        </div>
      </div>
    </section>
  );
}
