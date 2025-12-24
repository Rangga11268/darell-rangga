"use client";

import dynamic from "next/dynamic";

const BackgroundAudio = dynamic(
  () =>
    import("@/app/components/background-audio").then(
      (mod) => mod.BackgroundAudio
    ),
  { ssr: false }
);
const MagicCanvas = dynamic(
  () => import("@/app/components/magic-canvas").then((mod) => mod.MagicCanvas),
  { ssr: false }
);
const RuneClickEffect = dynamic(
  () =>
    import("@/app/components/rune-click-effect").then(
      (mod) => mod.RuneClickEffect
    ),
  { ssr: false }
);

export function DynamicEffects() {
  return (
    <>
      <BackgroundAudio />
      <MagicCanvas />
      <RuneClickEffect />
    </>
  );
}
