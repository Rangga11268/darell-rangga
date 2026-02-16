"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Code,
  Star,
  GitBranch,
} from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  span?: string;
}

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  const display = value % 1 !== 0 ? count.toFixed(1) : count;

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function MilestoneCard({
  milestone,
  index,
  inView,
}: {
  milestone: Milestone;
  index: number;
  inView: boolean;
}) {
  const Icon = milestone.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative ${milestone.span || ""}`}
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-primary via-primary/50 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[0.5px]" />

      <div className="relative h-full rounded-[28px] bg-card/50 dark:bg-card/40 border border-border backdrop-blur-sm overflow-hidden p-8 md:p-10 transition-all duration-500 group-hover:bg-card/80 dark:group-hover:bg-card/60">
        {/* Giant Watermark Number */}
        <div className="absolute -bottom-4 -right-2 text-[140px] md:text-[180px] font-display font-black leading-none text-foreground/[0.03] dark:text-foreground/[0.04] group-hover:text-primary/[0.06] dark:group-hover:text-primary/[0.08] transition-colors duration-700 select-none pointer-events-none">
          {milestone.value}
          {milestone.suffix}
        </div>

        {/* Hover Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.15, rotate: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center text-primary"
            >
              <Icon className="w-6 h-6" weight="duotone" />
            </motion.div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div>
            <div className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">
              <AnimatedCounter
                value={milestone.value}
                suffix={milestone.suffix}
                inView={inView}
              />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1 font-display">
              {milestone.label}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // === GSAP PIXEL DISSOLVE TRANSITION (ENHANCED) ===
  useEffect(() => {
    if (!sectionRef.current || !pixelGridRef.current) return;

    const ctx = gsap.context(() => {
      const pixels = gsap.utils.toArray(".pixel-block");

      // Shuffle array for random dissolve order
      const shuffledPixels = pixels.sort(() => Math.random() - 0.5);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom", // Start when bottom of section hits bottom of viewport
        end: "bottom top",
        scrub: 1, // Slower scrub for more visibility
        // We use a timeline to animate scaling AND opacity
        animation: gsap.timeline().to(shuffledPixels, {
          scale: 1, // Scale up from 0
          opacity: 1, // Fade in
          duration: 0.5,
          stagger: {
            amount: 1.5, // Longer spread
            from: "random",
            grid: [10, 10], // Approximate grid
          },
          ease: "power2.out",
        }),
      });

      // Parallax Content - moves slower to let pixels overtake it
      gsap.to(".achievements-content", {
        scale: 0.9,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestones: Milestone[] =
    language === "id"
      ? [
          {
            icon: Briefcase,
            value: 10,
            suffix: "+",
            label: "Proyek Selesai",
            description: "Solusi web yang berhasil dibangun dan diluncurkan",
            span: "md:col-span-2",
          },
          {
            icon: GraduationCap,
            value: 4.0,
            suffix: "",
            label: "IPK Sempurna",
            description: "Universitas Bina Sarana Informatika — Semester 3",
            span: "md:col-span-2",
          },
          {
            icon: GitBranch,
            value: 500,
            suffix: "+",
            label: "Kontribusi GitHub",
            description:
              "Commits, PRs, dan code reviews dalam setahun terakhir",
            span: "md:col-span-2",
          },
          {
            icon: Star,
            value: 6,
            suffix: "+",
            label: "Tech Stack",
            description:
              "React, Next.js, Laravel, Node.js, TypeScript, dan lainnya",
            span: "md:col-span-2",
          },
          {
            icon: Trophy,
            value: 99,
            suffix: "",
            label: "Lighthouse Score",
            description: "Performa optimal di setiap proyek yang dibangun",
            span: "md:col-span-4",
          },
        ]
      : [
          {
            icon: Briefcase,
            value: 10,
            suffix: "+",
            label: "Projects Completed",
            description:
              "Real-world web solutions successfully built and launched",
            span: "md:col-span-2",
          },
          {
            icon: GraduationCap,
            value: 4.0,
            suffix: "",
            label: "Perfect GPA",
            description: "Bina Sarana Informatika University — Semester 3",
            span: "md:col-span-2",
          },
          {
            icon: GitBranch,
            value: 500,
            suffix: "+",
            label: "GitHub Contributions",
            description: "Commits, PRs, and code reviews in the past year",
            span: "md:col-span-2",
          },
          {
            icon: Star,
            value: 6,
            suffix: "+",
            label: "Tech Stacks",
            description:
              "React, Next.js, Laravel, Node.js, TypeScript, and more",
            span: "md:col-span-2",
          },
          {
            icon: Trophy,
            value: 99,
            suffix: "",
            label: "Lighthouse Score",
            description: "Optimal performance on every project built",
            span: "md:col-span-4",
          },
        ];

  // Create Grid of Pixels (10x10 = 100 pixels for denser effect)
  const cols = 10;
  const rows = 10;
  const pixels = Array.from({ length: cols * rows });

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30 dark:bg-background pointer-events-none -z-20" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative z-10 achievements-content"
      >
        {/* Header */}
        <div className="mb-16 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-wider"
          >
            <span className="w-8 h-[1px] bg-primary" />
            {language === "id" ? "Pencapaian" : "Milestones"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 max-w-2xl"
          >
            {language === "id" ? "Angka Berbicara" : "Numbers That Speak"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-lg"
          >
            {language === "id"
              ? "Ringkasan pencapaian dan milestone selama perjalanan karir."
              : "A snapshot of achievements and milestones throughout the journey."}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={index}
              milestone={milestone}
              index={index}
              inView={isInView}
            />
          ))}
        </div>
      </div>

      {/* === PIXEL DISSOLVE OVERLAY (ENHANCED) === */}
      <div
        ref={pixelGridRef}
        className="absolute inset-0 z-40 pointer-events-none grid grid-cols-10 grid-rows-10"
        style={{ height: "100%", width: "100%" }}
      >
        {pixels.map((_, i) => (
          <div
            key={i}
            className="pixel-block w-full h-full bg-background border-[0.5px] border-white/5" // Added subtle border for grid effect
            style={{
              opacity: 0,
              transform: "scale(0)", // Start scaled down
            }}
          />
        ))}
      </div>
    </section>
  );
}
