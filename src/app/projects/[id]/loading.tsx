export default function ProjectLoading() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 py-3 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-8 bg-muted rounded" />
            <div className="h-6 w-6 bg-muted rounded" />
          </div>
        </div>
      </header>

      <main className="w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-10">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-3/4 bg-muted rounded-lg" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>

        <div className="space-y-6 pt-4">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="h-20 w-full bg-muted/60 rounded-xl" />
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="h-20 w-full bg-muted/60 rounded-xl" />
        </div>
      </main>
    </div>
  );
}
