export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fake Navbar Spacer */}
      <div className="h-16 w-full border-b hairline-b border-primary/10"></div>

      <main className="flex-1 container mx-auto px-margin-mobile md:px-margin-desktop py-24 max-w-5xl animate-pulse">
        {/* Fake Back Button */}
        <div className="h-4 w-32 bg-primary/15 mb-8 rounded"></div>

        {/* Double-bordered Header Skeleton */}
        <div className="border-t-4 border-b-4 border-double border-primary/20 py-8 mb-12">
          <div className="flex justify-between mb-4">
            <div className="h-3 w-40 bg-primary/10 rounded"></div>
            <div className="h-3 w-32 bg-primary/10 rounded"></div>
          </div>
          <div className="h-10 w-3/4 bg-primary/15 mb-4 rounded"></div>
          <div className="h-4 w-full bg-primary/10 rounded"></div>
        </div>

        {/* Dynamic Column Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Metadata Skeleton */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="border border-primary/25 p-6 bg-paper shadow-[4px_4px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="h-4 w-1/2 bg-primary/15 rounded mb-2"></div>
              <div className="h-8 w-full bg-primary/10 rounded"></div>
              <div className="h-8 w-full bg-primary/10 rounded"></div>
              <div className="h-12 w-full bg-primary/10 rounded"></div>
            </div>
            
            <div className="h-12 w-full bg-primary/15 rounded"></div>
            <div className="h-12 w-full bg-primary/15 rounded"></div>
          </div>

          {/* Right Column: Preview & Content Skeleton */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <div className="w-full h-64 bg-primary/5 border border-primary/20 rounded"></div>
            
            <div className="flex flex-col gap-3 pb-8 border-b hairline-b border-primary/10">
              <div className="h-5 w-40 bg-primary/15 rounded"></div>
              <div className="h-4 w-full bg-primary/10 rounded"></div>
              <div className="h-4 w-11/12 bg-primary/10 rounded"></div>
              <div className="h-4 w-5/6 bg-primary/10 rounded"></div>
            </div>

            {/* Comments Board Loading placeholder */}
            <div className="flex flex-col gap-4">
              <div className="h-4 w-36 bg-primary/15 rounded"></div>
              <div className="h-24 w-full bg-primary/5 rounded border border-primary/15"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
