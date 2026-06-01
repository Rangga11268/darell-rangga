"use client";

import { useLanguage } from "@/app/providers/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-paper border-t-rule-thick border-primary py-12">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="body-md text-on-surface-variant">
          © {new Date().getFullYear()} Darell Rangga. {t.footer.copyright}
        </div>
        
        <div className="label-caps text-xs uppercase tracking-widest text-on-surface-variant">
          Vol. 01 — Edition {new Date().getFullYear()}
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label-caps text-xs uppercase tracking-widest hover:underline decoration-primary underline-offset-4"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
