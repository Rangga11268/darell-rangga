export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background">
      {/* Top Medsos Sticky Header Skeleton */}
      <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md border-b border-border/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-28 bg-muted/70 rounded-full animate-pulse" />
            <div className="hidden sm:block h-4 w-36 bg-muted/40 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-12 bg-muted/60 rounded-full animate-pulse" />
            <div className="h-7 w-7 bg-muted/60 rounded-full animate-pulse" />
            <div className="h-7 w-14 bg-muted/60 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Container Skeleton */}
      <main className="flex-1 w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        {/* Main Post Card Skeleton */}
        <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col gap-6 animate-pulse">
          {/* Post Header: Author Identity */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-muted/80 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 bg-muted/80 rounded" />
                <div className="h-3 w-24 bg-muted/50 rounded" />
              </div>
            </div>
            <div className="h-6 w-20 bg-muted/60 rounded-md" />
          </div>

          {/* Project Title & Badges Skeleton */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted/70 rounded" />
              <div className="h-5 w-20 bg-muted/70 rounded" />
              <div className="h-5 w-24 bg-muted/70 rounded" />
            </div>
            <div className="h-8 w-3/4 bg-muted/90 rounded-lg" />
            <div className="h-4 w-full bg-muted/50 rounded" />
            <div className="h-4 w-4/5 bg-muted/50 rounded" />
          </div>

          {/* Media / Visual Preview Skeleton */}
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl bg-muted/60 border border-border/60" />

          {/* Stats Bar Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <div className="flex items-center gap-4">
              <div className="h-8 w-16 bg-muted/70 rounded-full" />
              <div className="h-8 w-16 bg-muted/70 rounded-full" />
              <div className="h-8 w-16 bg-muted/70 rounded-full" />
            </div>
            <div className="h-8 w-24 bg-muted/80 rounded-full" />
          </div>
        </div>

        {/* Supporting Architecture Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border/80 h-44 animate-pulse bg-muted/30" />
          <div className="p-5 rounded-2xl bg-card border border-border/80 h-44 animate-pulse bg-muted/30" />
        </div>
      </main>
    </div>
  );
}
