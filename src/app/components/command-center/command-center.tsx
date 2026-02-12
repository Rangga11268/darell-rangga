"use client";

import { motion } from "framer-motion";
import { GithubWidget } from "./github-widget";
import { useLanguage } from "@/app/providers/language-provider";
import { GithubLogo } from "@phosphor-icons/react";

export function CommandCenter() {
  const { t } = useLanguage();

  return (
    <section id="github" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <GithubLogo className="w-4 h-4" />
              <span>Open Source</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              {t.commandCenter.github.title}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              {t.commandCenter.github.description}
            </p>
          </motion.div>

          {/* Modern GitHub Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full max-w-5xl min-h-[600px] md:min-h-[550px] h-auto flex justify-center perspective-1000"
          >
            <GithubWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
