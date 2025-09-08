"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/app/components/navigation";
import { HeroSection } from "@/app/components/hero-section";
import { AboutSection } from "@/app/components/about-section";
import { ServicesSection } from "@/app/components/services-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { ContactSection } from "@/app/components/contact-section";
import { Footer } from "@/app/components/footer";
import { BackToTop } from "@/app/components/back-to-top";
import { LoadingScreen } from "@/app/components/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Accessibility improvements
  useEffect(() => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-primary';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Set focus management for modals/dialogs
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Add tab trap logic if needed for modals
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      
      {/* Accessibility announcements */}
      <div id="a11y-announcer" className="sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>
  );
}
