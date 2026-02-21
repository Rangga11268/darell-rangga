"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Eager imports — above the fold, critical for LCP
import { FloatingNavbar } from "@/app/components/floating-navbar";
import { HeroSection } from "@/app/components/hero-section";
import { CinematicIntro } from "@/components/ui/cinematic-intro";

// Lazy imports — below the fold, code-split to reduce TBT
const BioSection = dynamic(
  () =>
    import("@/app/components/about/bio-section").then((m) => ({
      default: m.BioSection,
    })),
  { ssr: false },
);
const ExperienceSection = dynamic(
  () =>
    import("@/app/components/about/experience-section").then((m) => ({
      default: m.ExperienceSection,
    })),
  { ssr: false },
);
const SkillsSection = dynamic(
  () =>
    import("@/app/components/about/skills-section").then((m) => ({
      default: m.SkillsSection,
    })),
  { ssr: false },
);
const ServicesSection = dynamic(
  () =>
    import("@/app/components/services-section").then((m) => ({
      default: m.ServicesSection,
    })),
  { ssr: false },
);
const ProjectsSection = dynamic(
  () =>
    import("@/app/components/projects-section").then((m) => ({
      default: m.ProjectsSection,
    })),
  { ssr: false },
);
const AchievementsSection = dynamic(
  () =>
    import("@/app/components/achievements-section").then((m) => ({
      default: m.AchievementsSection,
    })),
  { ssr: false },
);
const CommandCenter = dynamic(
  () =>
    import("@/app/components/command-center/command-center").then((m) => ({
      default: m.CommandCenter,
    })),
  { ssr: false },
);
const ContactSection = dynamic(
  () =>
    import("@/app/components/contact-section").then((m) => ({
      default: m.ContactSection,
    })),
  { ssr: false },
);
const Footer = dynamic(
  () =>
    import("@/app/components/footer").then((m) => ({
      default: m.Footer,
    })),
  { ssr: false },
);
const BackToTop = dynamic(
  () =>
    import("@/app/components/back-to-top").then((m) => ({
      default: m.BackToTop,
    })),
  { ssr: false },
);

import { useEffect } from "react";

// Lazy imports — below the fold, code-split to reduce TBT
// ... (dynamic imports stay the same)

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Sequence the mounting of heavy components to save TBT
  useEffect(() => {
    if (!showIntro) {
      // Small delay to ensure intro exit animation starts smoothly
      const timer = setTimeout(() => setIsReady(true), 150);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      {/* Intro overlay — content renders BEHIND it for instant LCP */}
      <AnimatePresence mode="wait">
        {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Main content — always in DOM so Lighthouse can paint the hero */}
      <FloatingNavbar />

      {/* Main Content with Bottom Margin for Parallax Footer */}
      <div className="relative z-10 bg-background shadow-2xl rounded-b-[40px] md:mb-[500px] pb-10">
        <main>
          {/* Hero is EAGER for LCP but its animations are gated by isReady to save TBT */}
          <HeroSection isReady={isReady} />

          {/* BELOW FOLD sections are SEQUENCED to save TBT */}
          {isReady && (
            <>
              <BioSection />
              <ExperienceSection />
              <SkillsSection />
              <ServicesSection />
              <ProjectsSection />
              <AchievementsSection />
              <CommandCenter />
              <ContactSection />
            </>
          )}
        </main>
      </div>

      {/* Fixed Footer Reveal */}
      <div className="relative z-0 md:fixed md:bottom-0 md:w-full md:h-[500px] flex items-end bg-background -z-10">
        <div className="w-full">{isReady && <Footer />}</div>
      </div>

      {isReady && <BackToTop />}

      {/* Accessibility announcements */}
      <div
        id="a11y-announcer"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </div>
  );
}
