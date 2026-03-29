"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy peripheral components to save TBT
// ssr: false is allowed here because this is a Client Component
const CursorFollower = dynamic(
  () =>
    import("@/app/components/cursor-follower").then((m) => m.CursorFollower),
  { ssr: false },
);

const AITerminal = dynamic(
  () =>
    import("@/app/components/ai-terminal/ai-terminal").then(
      (m) => m.AITerminal,
    ),
  { ssr: false },
);

const FolderWindow = dynamic(
  () => import("@/app/components/folder-window").then((m) => m.FolderWindow),
  { ssr: false },
);

// BackgroundController moved here from layout.tsx — dynamic+ssr:false not
// allowed in Server Components. Renders immediately (no delay needed).
const BackgroundController = dynamic(
  () =>
    import("@/components/ui/background-controller").then(
      (m) => m.BackgroundController,
    ),
  { ssr: false },
);

import { useEffect, useState } from "react";

export function ClientSideElements() {
  const [shouldMount, setShouldMount] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Delay mounting of peripheral layout tools to save TBT
    const timer = setTimeout(() => setShouldMount(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Background Controller (Lightweight, no delay) */}
      <BackgroundController />
      
      {/* Heavy elements (Delayed to prioritize LCP) */}
      {shouldMount && (
        <>
          <CursorFollower />
          <AITerminal />
          <FolderWindow />
        </>
      )}
    </>
  );
}
