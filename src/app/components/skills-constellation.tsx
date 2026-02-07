"use client";

import {
  CodeBlock,
  Palette,
  Database,
  HardDrives,
  Layout,
  GitBranch,
  Terminal,
  Cube,
  Stack,
  Cpu,
  Globe,
} from "@phosphor-icons/react";

const SKILLS = [
  { name: "HTML5", icon: CodeBlock, type: "frontend" },
  { name: "CSS3", icon: Palette, type: "frontend" },
  { name: "JavaScript", icon: Terminal, type: "language" },
  { name: "TypeScript", icon: CodeBlock, type: "language" },
  { name: "React", icon: Cube, type: "framework" },
  { name: "Next.js", icon: Globe, type: "framework" },
  { name: "Tailwind", icon: Palette, type: "styling" },
  { name: "Node.js", icon: HardDrives, type: "backend" },
  { name: "Laravel", icon: Stack, type: "backend" },
  { name: "PHP", icon: CodeBlock, type: "language" },
  { name: "MySQL", icon: Database, type: "database" },
  { name: "PostgreSQL", icon: Database, type: "database" },
  { name: "MongoDB", icon: Database, type: "database" },
  { name: "Git", icon: GitBranch, type: "tool" },
  { name: "Framer Motion", icon: Layout, type: "library" },
  { name: "Inertia.js", icon: Cpu, type: "library" },
  { name: "UI/UX", icon: Layout, type: "design" },
];

const MarqueeRow = ({
  skills,
  direction = "left",
  speed = 40,
}: {
  skills: typeof SKILLS;
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden relative w-full group py-4">
      {/* Gradient Mask */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-6 animate-marquee hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className="group/card relative px-6 py-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary/50 hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--primary)] min-w-[200px] flex items-center gap-4"
          >
            <div className="p-2 rounded-lg bg-white/5 text-muted-foreground group-hover/card:text-primary group-hover/card:bg-primary/10 transition-colors">
              <skill.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground group-hover/card:text-primary transition-colors">
                {skill.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {skill.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function SkillsConstellation() {
  return (
    <div className="w-full flex flex-col gap-8 overflow-hidden mask-gradient-x">
      <MarqueeRow skills={SKILLS.slice(0, 8)} direction="left" speed={35} />
      <MarqueeRow skills={SKILLS.slice(7)} direction="right" speed={45} />
    </div>
  );
}
