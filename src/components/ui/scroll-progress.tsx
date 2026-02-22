// Pure CSS scroll-driven animation — zero JS, zero framer-motion, zero TBT cost
export function ScrollProgress() {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left pointer-events-none"
      style={{
        background:
          "linear-gradient(to right, var(--color-primary), #a855f7, #3b82f6)",
        transformOrigin: "0 50%",
        animation: "scroll-progress linear",
        animationTimeline: "scroll()",
        animationRangeStart: "0%",
        animationRangeEnd: "100%",
      }}
    />
  );
}
