"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackgroundController = dynamic(
  () =>
    import("@/components/ui/background-controller").then(
      (m) => m.BackgroundController,
    ),
  { ssr: false },
);

export function ClientSideElements() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <BackgroundController />;
}
