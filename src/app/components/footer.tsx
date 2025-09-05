import { Heart, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 border-t border-border bg-background/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Darell Rangga. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/ranggsdarell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/darell-rangga-1320b634b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Rangga11268/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-center">
            <p className="text-muted-foreground text-sm">Made with</p>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <p className="text-muted-foreground text-sm">
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
