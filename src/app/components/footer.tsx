import { Button } from "@/components/ui/button"
import { Heart, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Darell Rangga. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm">
              Made with
            </p>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <p className="text-muted-foreground text-sm">
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}