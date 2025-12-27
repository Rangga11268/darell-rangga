"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Code, Palette, Rocket, Zap, Smartphone, Database } from "lucide-react";
import { SectionTitle } from "@/app/components/section-title";
import { useLanguage } from "@/app/providers/language-provider";

export function ServicesSection() {
  const { t } = useLanguage();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const services = [
    {
      icon: Code,
      title: t.services.items.web.title,
      description: t.services.items.web.desc,
    },
    {
      icon: Database,
      title: t.services.items.db.title,
      description: t.services.items.db.desc,
    },
    {
      icon: Palette,
      title: t.services.items.visual.title,
      description: t.services.items.visual.desc,
    },
    {
      icon: Smartphone,
      title: t.services.items.mobile.title,
      description: t.services.items.mobile.desc,
    },
    {
      icon: Zap,
      title: t.services.items.speed.title,
      description: t.services.items.speed.desc,
    },
    {
      icon: Rocket,
      title: t.services.items.deploy.title,
      description: t.services.items.deploy.desc,
    },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />

        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {/* Spotlight Effect Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />

          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full relative z-20"
              >
                <div className="h-full bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:bg-white/5 transition-all duration-300 group">
                  {/* Local Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--primary), transparent 100%)`,
                      opacity: 0.1,
                    }}
                  />

                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
