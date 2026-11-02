import Link from "next/link";
import { House } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "404 - Page Not Found | Darell Rangga",
  description: "The requested architectural route could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 selection:bg-foreground selection:text-background text-foreground font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">
            HTTP 404 / Route Inaccessible
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
            Lost in Space
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            The endpoint or resource you requested has been refactored, migrated, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <House size={14} weight="bold" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
