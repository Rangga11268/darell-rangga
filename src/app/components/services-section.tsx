"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";
import {
  Code2,
  Database,
  Layout,
  Smartphone,
  Zap,
  Rocket,
  ArrowRight,
} from "lucide-react";

const ICONS = {
  web: Code2,
  db: Database,
  visual: Layout,
  mobile: Smartphone,
  speed: Zap,
  deploy: Rocket,
};

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
      <div className="absolute inset-0 bg-black pointer-events-none -z-20" />
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
            className="flex items-center gap-2 text-primary/80 font-mono text-sm uppercase tracking-wider"
          >
            <span className="w-8 h-[1px] bg-primary" />
            {t.services.subtitle}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 max-w-2xl"
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
          {Object.entries(services).map(([key, service], index) => {
            const Icon = ICONS[key as keyof typeof ICONS] || Code2;

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowRight className="w-5 h-5 text-zinc-500 -rotate-45" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pricing Packages */}
        <div className="mt-32 mb-16">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
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
                className={`relative p-8 rounded-3xl border backdrop-blur-md flex flex-col group overflow-hidden ${
                  tier.popular
                    ? "bg-white/10 border-primary/50 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                    POPULAR
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-xl font-bold text-white">{tier.name}</h4>
                  <div className="text-3xl font-display font-bold text-primary">
                    {tier.price}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.desc}</p>
                </div>

                {/* Tech Stack Mini-Badge */}
                <div className="mb-6 bg-black/30 rounded-lg p-2 text-xs font-mono text-primary/80 border border-white/5 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  {tier.tech}
                </div>

                {/* Features List */}
                <ul className="space-y-4 flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="mt-1 min-w-[16px]">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 ${
                    tier.popular
                      ? "bg-primary text-black hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {language === "en" ? "Select Plan" : "Pilih Paket"}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action (Previously existed, now below packages) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 backdrop-blur-md text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {language === "en" ? "Ready to Launch?" : "Siap Meluncur?"}
            </h3>
            <p className="text-white/60 max-w-xl mx-auto">
              {language === "en"
                ? "Pricing is tailored to your specific needs. Let's discuss your project scope and find the best solution."
                : "Harga disesuaikan dengan kebutuhan spesifik Anda. Mari diskusikan cakupan proyek Anda dan temukan solusi terbaik."}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-black transition-all duration-300 hover:scale-105"
            >
              {language === "en" ? "Get a Quote" : "Dapatkan Penawaran"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
