"use client";

import { useLanguage } from "@/app/providers/language-provider";

import {
  GithubIcon,
  LinkedinIcon,
  XTwitterIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/ui/brand-icons";

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-[10px]">
              DR
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              &copy; {currentYear} Darell Rangga. {language === "id" ? "Hak cipta dilindungi." : "All rights reserved."}
            </p>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href="https://github.com/Rangga11268"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/darell-rangga-1320b634b/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-muted hover:text-[#0a66c2] transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/ranggsdarell"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
              title="X (Twitter)"
              aria-label="X Twitter"
            >
              <XTwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/darellrangga17/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-muted hover:text-[#E4405F] transition-colors"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6281292558509"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-muted hover:text-emerald-500 transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
