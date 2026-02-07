"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { QrCode, WifiHigh } from "@phosphor-icons/react";

export function HeroIdCard() {
  const ref = useRef<HTMLDivElement>(null);
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for rotation
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-25deg", "25deg"]);

  // Holographic shimmer effect based on rotation
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Calculate normalized mouse position (-0.5 to 0.5)
      // 0 is center, -0.5 is left/top, 0.5 is right/bottom
      const mouseXPos = (e.clientX - rect.left) / width - 0.5;
      const mouseYPos = (e.clientY - rect.top) / height - 0.5;

      x.set(mouseXPos);
      y.set(mouseYPos);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    // Reset to center but keep a slight idle float
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      className="relative flex items-center justify-center py-8 md:py-20"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[260px] h-[380px] md:w-[320px] md:h-[480px] rounded-[24px] md:rounded-[30px] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-500 ease-out"
      >
        {/* === CARD CONTENT === */}
        <div className="absolute inset-0 bg-[#e0e0e0] dark:bg-neutral-900 rounded-[24px] md:rounded-[30px] border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center">
          {/* Texture/Noise Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

          {/* Top Holder Hole */}
          <div className="mt-4 md:mt-6 w-12 md:w-16 h-2 md:h-3 bg-neutral-800/20 rounded-full shadow-inner mx-auto mb-1 md:mb-2" />

          {/* Header Section */}
          <div className="w-full px-4 md:px-6 flex justify-between items-center mb-4 md:mb-6 relative z-10">
            <div className="flex items-center gap-2">
              {/* Logo/Icon */}
              {/* Logo/Icon */}
              <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden">
                <div className="relative w-4 md:w-5 h-4 md:h-5">
                  {/* Dark Mode Logo (White) */}
                  <Image
                    src="/img/saya/logo-white.webp"
                    alt="Logo"
                    fill
                    className="object-contain hidden dark:block"
                  />
                  {/* Light Mode Logo (Original/Black) */}
                  <Image
                    src="/img/saya/logo-new.webp"
                    alt="Logo"
                    fill
                    className="object-contain block dark:hidden"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Access Level
                </span>
                <span className="text-xs font-bold text-foreground">
                  ADMINISTRATOR
                </span>
              </div>
            </div>
            <QrCode className="w-6 md:w-8 h-6 md:h-8 text-foreground/20" />
          </div>

          {/* Photo Section */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 md:border-4 border-white/10 shadow-2xl overflow-hidden mb-4 md:mb-6 group-hover:shadow-primary/20 transition-all duration-500">
            <Image
              src="/img/saya/saya2.webp"
              alt="Darell Rangga"
              fill
              className="object-cover scale-110"
              priority
              unoptimized
            />
          </div>

          {/* Name & Role */}
          <div className="text-center space-y-1 relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
              Darell Rangga
            </h2>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block">
              <p className="text-xs font-mono font-bold text-primary tracking-wider">
                FULLSTACK ENGINEER
              </p>
            </div>
          </div>

          {/* Bottom Bar code / ID */}
          <div className="mt-auto mb-4 md:mb-8 w-full px-6 md:px-8 space-y-2 md:space-y-4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <div className="flex justify-between items-end opacity-50">
              <div className="flex flex-col gap-1">
                <div className="w-24 h-4 bg-foreground/20 rounded" />
                <div className="w-32 h-2 bg-foreground/10 rounded" />
              </div>
              <span className="font-mono text-[10px]">ID: 8829-DEV</span>
            </div>
          </div>

          {/* Background Gradient Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* === HOLOGRAPHIC OVERLAY === */}
        <motion.div
          className="absolute inset-0 rounded-[24px] md:rounded-[30px] pointer-events-none opacity-40 mix-blend-overlay z-20"
          style={{
            background: useTransform(
              [glareX, glareY],
              () =>
                `linear-gradient(${115}deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.1) 50%, transparent 54%)`,
            ),
          }}
        />

        <div className="absolute inset-0 rounded-[24px] md:rounded-[30px] ring-1 ring-white/20 z-30" />

        {/* === UPGRADED LANYARD === */}
        <div className="hidden md:flex absolute -top-[300px] left-1/2 -translate-x-1/2 w-[300px] h-[320px] z-0 pointer-events-none flex-col items-center justify-end">
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
