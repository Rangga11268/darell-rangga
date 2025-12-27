"use client";

import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useLanguage } from "@/app/providers/language-provider";
import { motion } from "framer-motion";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/10 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">DARELL RANGGA</h3>
            <p className="text-muted-foreground max-w-sm">{t.footer.quote}</p>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t.footer.copyright}
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Rangga11268/" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
                },
                { icon: Twitter, href: "https://x.com/ranggsdarell" },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/darellrangga17/",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span>{t.footer.madeWith}</span>
              <span className="font-bold text-foreground">
                Next.js & Tailwind
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
