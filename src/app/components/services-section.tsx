"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";
import {
  CodeBlock,
  Database,
  Layout,
  DeviceMobile,
  Lightning,
  Rocket,
  ArrowRight,
  CheckCircle,
  CaretRight,
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
  desc: string;
  features: string[];
  details?: string[];
  tech: string;
  popular?: boolean;
}

export function ServicesSection() {
  const { t, language } = useLanguage();
  const services = t.services.items;

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

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

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(services).map(([key, service]) => {
            const Icon = ICONS[key as keyof typeof ICONS] || CodeBlock;

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative pt-10" // Added top padding for the tab space
              >
                {/* Folder Tab */}
                <div className="absolute top-0 left-0 w-28 h-10 bg-card/40 border-t border-l border-r border-border rounded-t-2xl z-20 backdrop-blur-sm group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Main Folder Body */}
                <div className="relative p-8 pt-10 rounded-b-3xl rounded-tr-3xl bg-card/40 border-l border-r border-b border-border hover:border-primary/50 transition-all duration-500 backdrop-blur-sm overflow-hidden min-h-[200px]">
                  {/* Top Right Header Border - Connects to Tab */}
                  <div className="absolute top-0 right-0 w-[calc(100%-7rem)] h-[1px] bg-border group-hover:bg-primary/50 transition-colors duration-500" />

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.desc}
                    </p>
                  </div>

                  {/* Decorative Corner Arrow */}
                  <div className="absolute bottom-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5 text-primary -rotate-45" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pricing Packages */}
        <div className="mt-32 mb-16">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t.services.packages.title}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.services.packages.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.packages.tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-[2.5rem] border backdrop-blur-md flex flex-col group overflow-hidden transition-all duration-300 ${
                  tier.popular
                    ? "bg-primary/5 border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] md:scale-105 z-10"
                    : "bg-card/30 border-white/10 hover:border-white/20 hover:bg-card/50"
                }`}
              >
                {/* Popular Badge & Glow */}
                {tier.popular && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute top-6 right-6">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    </div>
                  </>
                )}

                {/* Header */}
                <div className="mb-8 space-y-4">
                  <div
                    className={`text-sm font-bold tracking-widest uppercase ${tier.popular ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-display font-bold text-foreground">
                      {tier.price
                        .replace("Starts at ", "")
                        .replace("Mulai ", "")}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      {language === "en" ? "/ project" : "/ proyek"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                {/* Tech Stack Mini-Badge */}
                <div className="mb-8 inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-xs font-mono text-primary/80">
                  <Lightning className="w-3.5 h-3.5" weight="fill" />
                  {tier.tech}
                </div>

                {/* Features List */}
                <ul className="space-y-4 flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <div
                        className={`mt-0.5 min-w-[18px] flex items-center justify-center ${tier.popular ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <CheckCircle className="w-5 h-5" weight="fill" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="space-y-3 mt-auto">
                  <a
                    href={`https://wa.me/628978638973?text=${encodeURIComponent(
                      language === "en"
                        ? `Hello Rangga, I'm interested in the ${tier.name} package.`
                        : `Halo Rangga, saya tertarik dengan paket ${tier.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn relative block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 overflow-hidden ${
                      tier.popular
                        ? "bg-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/40"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {language === "en" ? "Select Plan" : "Pilih Paket"}
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                        weight="bold"
                      />
                    </span>
                  </a>

                  <button
                    onClick={() => setSelectedTier(tier)}
                    className="w-full py-2 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 group/view"
                  >
                    {t.services.packages.viewDetails}
                    <CaretRight className="w-3 h-3 transition-transform group-hover/view:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* Call to Action - Premium Redesign */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-32 p-1 relative rounded-[2.5rem] overflow-hidden group"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 opacity-20 group-hover:opacity-100 blur-xl transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 animate-pulse opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />

          <div className="relative rounded-[2.3rem] bg-card/90 backdrop-blur-xl border border-white/10 p-12 md:p-20 text-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-black mb-2 shadow-lg shadow-primary/20"
              >
                <Rocket className="w-10 h-10" weight="fill" />
              </motion.div>

              <div className="space-y-6 max-w-3xl">
                <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  {language === "en" ? "Ready to Launch?" : "Siap Meluncur?"}
                </h3>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                  {language === "en"
                    ? "Prices are tailored to your specific needs. Let's discuss your project scope and find the best solution."
                    : "Harga disesuaikan dengan kebutuhan spesifik Anda. Mari diskusikan cakupan proyek Anda dan temukan solusi terbaik."}
                </p>
              </div>

              <motion.a
                href={`https://wa.me/628978638973?text=${encodeURIComponent(
                  language === "en"
                    ? "Hello, I'd like to get a quote for a project."
                    : "Halo, saya ingin minta penawaran untuk proyek.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-10 py-5 bg-gradient-to-r from-primary to-primary/80 text-black font-bold text-lg rounded-full shadow-lg shadow-primary/25 flex items-center gap-3 hover:gap-4 transition-all"
              >
                {language === "en" ? "Get a Quote" : "Dapatkan Penawaran"}
                <ArrowRight className="w-5 h-5" weight="bold" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              {/* Modal Background Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedTier.name}
                  </h3>
                  <div className="text-primary font-display text-xl font-bold mt-1">
                    {selectedTier.price}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    {language === "en" ? "What's Included" : "Rincian Lengkap"}
                  </h4>
                  <ul className="space-y-3">
                    {(selectedTier.details || selectedTier.features).map(
                      (detail: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-foreground text-sm"
                        >
                          <div className="mt-1 min-w-[16px]">
                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </div>
                          </div>
                          {detail}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <a
                    href={`https://wa.me/628978638973?text=${encodeURIComponent(
                      language === "en"
                        ? `Hello Rangga, I'm interested in the ${selectedTier.name} package.`
                        : `Halo Rangga, saya tertarik dengan paket ${selectedTier.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-xl font-bold text-center bg-primary text-black hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all"
                  >
                    {language === "en" ? "Choose This Plan" : "Pilih Paket Ini"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
