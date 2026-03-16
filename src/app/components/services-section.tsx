"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";
import {
  CodeBlock,
  Database,
  Layout,
  DeviceMobile,
  Lightning,
  Rocket,
} from "@phosphor-icons/react";

const ICONS = {
  web: CodeBlock,
  db: Database,
  visual: Layout,
  mobile: DeviceMobile,
  speed: Lightning,
  deploy: Rocket,
};

interface Tier {
  name: string;
  price: string;
  oldPrice?: string;
  desc: string;
  features: string[];
  details?: string[];
  tech: string;
  popular?: boolean;
}

interface ServiceItem {
  title: string;
  desc: string;
}

export function ServicesSection() {
  const { t, language } = useLanguage();
  const services = t.services.items;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-background pointer-events-none -z-20" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
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
            {t.services.subtitle}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 max-w-2xl"
          >
            {t.services.title}
          </motion.h2>
        </div>

        {/* Services Grid / Mobile Carousel */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar"
          >
            {Object.entries(services).map(([key, service]) => (
              <ServiceCard
                key={key}
                serviceId={key}
                service={service as ServiceItem}
                itemVariants={itemVariants}
              />
            ))}
          </motion.div>

          {/* Mobile Scroll Indicator (Subtle) */}
          <div className="flex md:hidden justify-center gap-1.5 mt-4">
            {Object.keys(services).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// Reusable ServiceCard Component - New Glass Bento Design
function ServiceCard({
  serviceId,
  service,
  itemVariants,
}: {
  serviceId: string;
  service: ServiceItem;
  itemVariants: Variants;
}) {
  const Icon = ICONS[serviceId as keyof typeof ICONS] || CodeBlock;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative h-[320px] md:h-auto md:aspect-square lg:aspect-[4/3] p-8 rounded-[2rem] bg-card/30 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden snap-center shrink-0 w-[85vw] md:w-auto"
    >
      {/* Interactive Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Decorative Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--primary)/0.3)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-500"
            >
              <Icon className="w-7 h-7 text-primary" weight="fill" />
            </motion.div>
            <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em]">
              {serviceId}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {service.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />
    </motion.div>
  );
}
