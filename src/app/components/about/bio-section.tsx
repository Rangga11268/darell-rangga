"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/app/providers/language-provider";
import { useRef } from "react";

export function BioSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xText = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacityText = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.3, 0.1],
  );

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: xText, opacity: opacityText }}
          className="text-[20vw] font-display font-bold whitespace-nowrap text-foreground/5 leading-none"
        >
          STORY
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Title Area */}
          <div className="md:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <User className="w-4 h-4" />
              <span>{t.about.title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
              {t.about.journeyTitle}
            </h2>
          </div>

          {/* Text Content */}
          <div className="md:w-2/3 prose dark:prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.journeyText}
            </p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
              {t.about.journeyDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
