"use client";

import { useState, useEffect } from "react";
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
import { LoadingScreen } from "@/app/components/loading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cinematic boot sequence (reduced for better LCP)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Accessibility improvements
  useEffect(() => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:px-6 focus:py-3 focus:rounded-md focus:ring-2 focus:ring-primary focus:shadow-xl font-bold";
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Set focus management for modals/dialogs
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Add tab trap logic if needed for modals
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <FloatingNavbar />
      <main>
        <HeroSection />

        <ScrollReveal width="100%" delay={0.1}>
          <BioSection />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <ExperienceSection />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <SkillsSection />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <ProjectsSection />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <CommandCenter />
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.1}>
          <ContactSection />
        </ScrollReveal>
      </main>
      <Footer />
      <BackToTop />

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
