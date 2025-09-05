"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/app/components/navigation";
import { HeroSection } from "@/app/components/hero-section";
import { AboutSection } from "@/app/components/about-section";
import { ServicesSection } from "@/app/components/services-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { ContactSection } from "@/app/components/contact-section";
import { Footer } from "@/app/components/footer";
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
