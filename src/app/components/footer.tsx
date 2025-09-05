import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} My Portfolio. All rights reserved.
            </p>
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
          
          <div className="mt-4 md:mt-0">
            <Button variant="ghost" size="sm" asChild>
              <a href="#">
                Back to top
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}