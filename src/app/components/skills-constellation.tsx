"use client";

import { useLanguage } from "@/app/providers/language-provider";

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Node.js",
  "Laravel",
  "PHP",
  "MySQL",
  "Git",
  "Framer Motion",
  "Inertia.js",
  "UI/UX",
];

const MarqueeRow = ({
  skills,
  direction = "left",
  speed = 40,
}: {
  skills: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden relative w-full group py-2">
      {/* Gradient Mask */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-4 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className="px-6 py-3 rounded-full bg-background border border-white/10 shadow-sm text-sm font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export function SkillsConstellation() {
  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden mask-gradient-x">
      <MarqueeRow skills={SKILLS.slice(0, 8)} direction="left" speed={40} />
      <MarqueeRow skills={SKILLS.slice(7)} direction="right" speed={50} />
    </div>
  );
}
