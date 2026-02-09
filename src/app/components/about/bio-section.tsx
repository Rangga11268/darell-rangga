"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { User } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { useRef } from "react";

const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <motion.p
      className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.015 } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.2em] -mb-[0.2em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: 0,
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export function BioSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
      ref={containerRef}
    >
      {/* Background Typography (Parallax) */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 will-change-transform"
      >
        <span className="text-[15vw] md:text-[20vw] font-black text-foreground/5 whitespace-nowrap select-none">
          THE STORY
        </span>
      </motion.div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      {/* Modern Skills Marquee - Horizontal Scrolling */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-6 border-y border-foreground/5 bg-background/50 backdrop-blur-sm z-10">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND",
            "GSAP",
            "FRAMER MOTION",
            "NODE.JS",
            "LARAVEL",
            "FIGMA",
            "UI/UX",
            "THREE.JS",
            "WEBGL",
          ].map((skill, i) => (
            <span
              key={i}
              className="text-lg md:text-xl font-display font-medium text-muted-foreground/60 flex items-center gap-12"
            >
              {skill} <span className="w-2 h-2 rounded-full bg-primary/40" />
            </span>
          ))}
          {/* Duplicate for loop */}
          {[
            "REACT",
            "NEXT.JS",
            "TYPESCRIPT",
            "TAILWIND",
            "GSAP",
            "FRAMER MOTION",
            "NODE.JS",
            "LARAVEL",
            "FIGMA",
            "UI/UX",
            "THREE.JS",
            "WEBGL",
          ].map((skill, i) => (
            <span
              key={`dup-${i}`}
              className="text-lg md:text-xl font-display font-medium text-muted-foreground/60 flex items-center gap-12"
            >
              {skill} <span className="w-2 h-2 rounded-full bg-primary/40" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Title Area */}
          <div className="md:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6"
            >
              <User className="w-4 h-4" weight="fill" />
              <span className="uppercase tracking-wide">{t.about.title}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold font-display leading-[1.1] mb-6"
            >
              {t.about.journeyTitle}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              viewport={{ once: true }}
              className="w-24 h-1.5 bg-primary origin-left rounded-full"
            />
          </div>

          {/* Text Content */}
          <div className="md:col-span-8 space-y-8 pl-0 md:pl-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <TextReveal text={t.about.journeyText} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="mt-8 p-6 md:p-8 rounded-2xl bg-secondary/30 border-l-4 border-primary backdrop-blur-sm"
              >
                <p className="text-lg md:text-xl italic text-muted-foreground m-0">
                  &quot;{t.about.journeyDesc}&quot;
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
