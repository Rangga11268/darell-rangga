"use client";

import { motion } from "framer-motion";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  Heart,
  Code,
  ArrowUp,
} from "@phosphor-icons/react";
import { useLanguage } from "@/app/providers/language-provider";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      icon: GithubLogo,
      href: "https://github.com/Rangga11268/",
      label: "GitHub",
    },
    {
      icon: LinkedinLogo,
      href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
      label: "LinkedIn",
    },
    { icon: TwitterLogo, href: "https://x.com/ranggsdarell", label: "Twitter" },
    {
      icon: InstagramLogo,
      href: "https://www.instagram.com/darellrangga17/",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden pt-20 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  {/* Dark Mode Logo (White) */}
                  <img
                    src="/img/saya/logo-white.webp"
                    alt="Logo"
                    className="w-full h-full object-contain hidden dark:block"
                  />
                  {/* Light Mode Logo (Original/Black) */}
                  <img
                    src="/img/saya/logo-new.webp"
                    alt="Logo"
                    className="w-full h-full object-contain block dark:hidden"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    DARELL RANGGA
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Fullstack Developer
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-md">
                {t.footer.quote}
              </p>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                      weight="duotone"
                    />
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {quickLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Built With
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind",
                  "Framer Motion",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowUp
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                  weight="bold"
                />
                <span>Back to top</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-white/20">•</span>
              <span>{t.footer.copyright}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{t.footer.madeWith}</span>
              <Heart
                className="w-4 h-4 text-red-500 animate-pulse"
                weight="fill"
              />
              <span>&</span>
              <Code className="w-4 h-4 text-primary" weight="duotone" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
