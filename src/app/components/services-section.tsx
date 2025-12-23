"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Palette, Rocket, Zap, Smartphone, Database } from "lucide-react";
import { SectionTitle } from "@/app/components/section-title";

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Web Artificing",
      description:
        "Building full-stack web applications using Laravel, PHP, and modern frontend technologies like HTML, CSS, and JavaScript.",
    },
    {
      icon: Database,
      title: "Scroll Keeping",
      description:
        "Designing and managing MySQL databases with CRUD operations for data-driven applications.",
    },
    {
      icon: Palette,
      title: "Visual Sorcery",
      description:
        "Creating responsive and user-friendly interfaces using HTML, CSS, JavaScript, and modern frameworks.",
    },
    {
      icon: Smartphone,
      title: "Mobile Enchantment",
      description:
        "Developing websites that look and function perfectly on all devices, from mobile phones to desktop computers.",
    },
    {
      icon: Zap,
      title: "Speed Alchemy",
      description:
        "Optimizing web applications for speed, efficiency, and search engine visibility to improve user experience.",
    },
    {
      icon: Rocket,
      title: "Deployment Rituals",
      description:
        "Deploying web applications to hosting platforms with proper configuration and optimization.",
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[#2c241b]/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="My Services" subtitle="Artifacts I Can Provide" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 border-[#8d6e63] bg-[#f4e4bc] dark:bg-[#2c241b] relative overflow-hidden">
                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#5d4037] z-10"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#5d4037] z-10"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#5d4037] z-10"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#5d4037] z-10"></div>

                  <CardHeader>
                    <motion.div
                      className="bg-[#8d6e63]/10 p-3 rounded-full w-fit group-hover:bg-[#8d6e63]/20 transition-colors border border-[#8d6e63]"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Icon className="h-6 w-6 text-[#3e2723] dark:text-[#d7ccc8] group-hover:text-primary transition-colors" />
                    </motion.div>
                    <CardTitle className="mt-4 font-sans text-[#3e2723] dark:text-[#d7ccc8] group-hover:text-primary transition-colors text-xl font-bold">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-serif text-[#5d4037] dark:text-[#a1887f] group-hover:text-[#3e2723] dark:group-hover:text-[#d7ccc8] transition-colors">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
