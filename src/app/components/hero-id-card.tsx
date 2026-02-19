"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { QrCode } from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

export function HeroIdCard() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Motion values for 3D tilt - only active on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs only used on desktop
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Holographic shimmer - desktop only
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Pre-compute holographic background outside JSX to respect hooks rules
  const holoBackground = useTransform(
    [glareX, glareY],
    () =>
      `linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.1) 50%, transparent 54%)`,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || isMobile) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y, isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Simpler entrance animation on mobile
  const cardVariants: Variants = isMobile
    ? {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
        },
      }
    : {
        hidden: { y: -600, rotateX: 40, opacity: 0 },
        visible: {
          y: 0,
          rotateX: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1,
            delay: 0.4,
          },
        },
      };

  return (
    <div
      className="relative flex items-center justify-center py-24 md:py-20 overflow-visible"
      style={!isMobile ? { perspective: "1200px" } : undefined}
    >
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        style={
          !isMobile
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className="relative w-[220px] h-[350px] md:w-[320px] md:h-[480px] rounded-[24px] md:rounded-[30px] z-10"
      >
        {/* === CARD CONTENT === */}
        <div className="absolute inset-0 bg-[#d4d4d8] dark:bg-neutral-900 rounded-[24px] md:rounded-[30px] border border-neutral-400/50 dark:border-white/20 shadow-2xl overflow-hidden flex flex-col items-center">
          {/* Noise Overlay - Inline SVG, no external fetch, desktop only */}
          {!isMobile && (
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay hidden dark:block bg-noise" />
          )}

          {/* Top Holder Hole */}
          <div className="mt-5 md:mt-6 w-14 md:w-16 h-2.5 md:h-3 bg-neutral-800/20 rounded-full shadow-inner mx-auto mb-2 md:mb-2" />

          {/* Header Section */}
          <div className="w-full px-5 md:px-6 flex justify-between items-center mb-5 md:mb-6 relative z-10">
            <div className="flex items-center gap-3">
              {/* Logo/Icon */}
              <div className="w-8 md:w-8 h-8 md:h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden">
                <div className="relative w-5 md:w-5 h-5 md:h-5">
                  {/* Dark Mode Logo (White) */}
                  <Image
                    src="/img/saya/logo-white.webp"
                    alt="Logo"
                    fill
                    sizes="20px"
                    className="object-contain hidden dark:block"
                  />
                  {/* Light Mode Logo (Original/Black) */}
                  <Image
                    src="/img/saya/logo-new.webp"
                    alt="Logo"
                    fill
                    sizes="20px"
                    className="object-contain block dark:hidden"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Access Level
                </span>
                <span className="text-sm md:text-xs font-bold text-foreground">
                  ADMINISTRATOR
                </span>
              </div>
            </div>
            <QrCode className="w-7 md:w-8 h-7 md:h-8 text-foreground/20" />
          </div>

          {/* Photo Section */}
          <div className="relative w-28 h-28 md:w-48 md:h-48 shrink-0 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden mb-4 md:mb-6 group-hover:shadow-primary/20 transition-all duration-500">
            <Image
              src="/img/saya/saya2.webp"
              alt="Darell Rangga"
              fill
              sizes="(max-width: 768px) 112px, 192px"
              className="object-cover scale-110"
              priority
            />
          </div>

          {/* Name & Role */}
          <div className="text-center space-y-1.5 relative z-10">
            <h2 className="text-3xl md:text-3xl font-display font-bold text-foreground tracking-tight">
              Darell Rangga
            </h2>
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 inline-block">
              <p className="text-xs md:text-xs font-mono font-bold text-primary tracking-wider uppercase">
                {t.hero.role}
              </p>
            </div>
          </div>

          {/* Bottom Bar code / ID */}
          <div className="mt-auto mb-6 md:mb-8 w-full px-6 md:px-8 space-y-3 md:space-y-4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <div className="flex justify-between items-end opacity-50">
              <div className="flex flex-col gap-1.5">
                <div className="w-28 h-4 bg-foreground/20 rounded" />
                <div className="w-36 h-2 bg-foreground/10 rounded" />
              </div>
              <span className="font-mono text-xs md:text-[10px]">
                ID: 8829-DEV
              </span>
            </div>
          </div>

          {/* Background Gradient Orbs - reduced on mobile */}
          {!isMobile && (
            <>
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
            </>
          )}
        </div>

        {/* === HOLOGRAPHIC OVERLAY - Desktop only === */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 rounded-[24px] md:rounded-[30px] pointer-events-none opacity-5 dark:opacity-30 mix-blend-overlay z-20"
            style={{ background: holoBackground }}
          />
        )}

        <div className="absolute inset-0 rounded-[24px] md:rounded-[30px] ring-1 ring-white/20 z-30" />

        {/* === UPGRADED LANYARD === */}
        {/* Placed vertically to align Clip with Hole. z-20 to sit ON TOP of card background */}
        <div className="flex absolute -top-[215px] md:-top-[300px] left-1/2 -translate-x-1/2 w-[220px] md:w-[300px] h-[240px] md:h-[320px] z-20 pointer-events-none flex-col items-center justify-end">
          {/* V-Shape Strap (SVG) */}
          <svg
            className="w-full h-full drop-shadow-2xl"
            viewBox="0 0 300 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="fabric-pattern"
                x="0"
                y="0"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)" />
              </pattern>
              <linearGradient
                id="strap-gradient"
                x1="150"
                y1="0"
                x2="150"
                y2="320"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="80%" stopColor="#262626" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <filter
                id="fabric-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodColor="black"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>

            {/* Left Strap */}
            <path
              d="M100 -50 C 100 50, 140 280, 150 280"
              stroke="url(#strap-gradient)"
              strokeWidth="28"
              strokeLinecap="butt"
              filter="url(#fabric-shadow)"
            />
            <path
              d="M100 -50 C 100 50, 140 280, 150 280"
              stroke="url(#fabric-pattern)"
              strokeWidth="28"
              strokeLinecap="butt"
              className="opacity-50"
            />

            {/* Right Strap */}
            <path
              d="M200 -50 C 200 50, 160 280, 150 280"
              stroke="url(#strap-gradient)"
              strokeWidth="28"
              strokeLinecap="butt"
              filter="url(#fabric-shadow)"
            />
            <path
              d="M200 -50 C 200 50, 160 280, 150 280"
              stroke="url(#fabric-pattern)"
              strokeWidth="28"
              strokeLinecap="butt"
              className="opacity-50"
            />

            {/* Branding Text Path Left */}
            <path
              id="textPathLeft"
              d="M105 0 C 105 80, 138 240, 144 260"
              fill="transparent"
            />
            <text
              fill="rgba(255,255,255,0.4)"
              fontSize="10"
              fontWeight="bold"
              letterSpacing="2"
              fontFamily="monospace"
            >
              <textPath href="#textPathLeft" startOffset="10%">
                FULLSTACK // DEV
              </textPath>
              <textPath href="#textPathLeft" startOffset="60%">
                FULLSTACK // DEV
              </textPath>
            </text>

            {/* Branding Text Path Right */}
            <path
              id="textPathRight"
              d="M195 0 C 195 80, 162 240, 156 260"
              fill="transparent"
            />
            <text
              fill="rgba(255,255,255,0.4)"
              fontSize="10"
              fontWeight="bold"
              letterSpacing="2"
              fontFamily="monospace"
            >
              <textPath href="#textPathRight" startOffset="10%">
                RANGGA // ID
              </textPath>
              <textPath href="#textPathRight" startOffset="60%">
                RANGGA // ID
              </textPath>
            </text>
          </svg>

          {/* Realistic Metal Clip */}
          <div className="absolute bottom-[-15px] z-20 flex flex-col items-center">
            {/* Metal Ring */}
            <div className="w-12 h-12 rounded-full border-[6px] border-[#d4d4d8] bg-transparent shadow-lg relative z-10 flex items-center justify-center bg-gradient-to-br from-white via-gray-400 to-gray-600">
              <div className="w-full h-full rounded-full border-[2px] border-black/20" />
            </div>

            {/* Clasp Body */}
            <div className="w-16 h-10 bg-gradient-to-b from-[#e5e5e5] to-[#a3a3a3] rounded-md -mt-8 shadow-2xl border border-white/50 relative z-20 flex flex-col items-center justify-end pb-2">
              {/* Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-50 rounded-md" />
              {/* Grip Lines */}
              <div className="w-12 h-[2px] bg-black/20 mb-[2px]" />
              <div className="w-12 h-[2px] bg-black/20 mb-[2px]" />
              <div className="w-12 h-[2px] bg-black/20" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
