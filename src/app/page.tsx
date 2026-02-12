"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CommandCenter } from "@/app/components/command-center/command-center";
import { FloatingNavbar } from "@/app/components/floating-navbar";
import { HeroSection } from "@/app/components/hero-section";
import { BioSection } from "@/app/components/about/bio-section";
import { ExperienceSection } from "@/app/components/about/experience-section";
import { SkillsSection } from "@/app/components/about/skills-section";
import { ServicesSection } from "@/app/components/services-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { ContactSection } from "@/app/components/contact-section";
import { Footer } from "@/app/components/footer";
import { BackToTop } from "@/app/components/back-to-top";
import { AchievementsSection } from "@/app/components/achievements-section";
import { CinematicIntro } from "@/components/ui/cinematic-intro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Intro completion handler
  // Removed the useEffect timer as CinematicIntro handles the duration

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <AnimatePresence mode="wait">
        {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <>
          <FloatingNavbar />

          {/* Main Content with Bottom Margin for Parallax Footer */}
          <div className="relative z-10 bg-background shadow-2xl rounded-b-[40px] md:mb-[500px] pb-10">
            <main>
              <HeroSection />
              <BioSection />
              <ExperienceSection />
              <SkillsSection />
              <ServicesSection />
              <ProjectsSection />
              <AchievementsSection />
              <CommandCenter />
              <ContactSection />
            </main>
          </div>

          {/* Fixed Footer Reveal */}
          <div className="relative z-0 md:fixed md:bottom-0 md:w-full md:h-[500px] flex items-end bg-background -z-10">
            <div className="w-full">
              <Footer />
            </div>
          </div>

          <BackToTop />
        </>
      )}

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
