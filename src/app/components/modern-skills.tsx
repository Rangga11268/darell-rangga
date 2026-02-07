"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-foreground/5 bg-card/30 overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function ModernSkills() {
  const skillGroups = [
    {
      title: "The Bread & Butter (Core Stack)",
      icons: "react,nextjs,typescript,tailwind,laravel,nodejs,mongodb",
    },
    {
      title: "Specialized Frameworks & Libraries",
      icons: "vue,threejs", // icons that definitely work
      extras: [
        "Inertia.js",
        "Framer Motion",
        "Zustand",
        "Socket.io",
        "TanStack Query",
      ],
    },
    {
      title: "Tools & DevOps",
      icons: "figma,git,vercel,vite,vscode,postman",
      extras: ["Antigravity AI"],
    },
    {
      title: "Design & Concepts",
      badges: ["Glassmorphism", "Neo Brutalism", "Minimalism"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skillGroups.map((group, idx) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="h-full"
        >
          <SpotlightCard className="h-full p-8 transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-3 text-foreground/80 group-hover:text-primary transition-colors">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {group.title}
            </h4>

            <div className="flex flex-wrap gap-4 items-center justify-center">
              {group.icons && (
                <a
                  href="https://skillicons.dev"
                  className="block relative z-10"
                >
                  {/* Light Mode Icons */}
                  <img
                    src={`https://skillicons.dev/icons?i=${group.icons}&theme=light&perline=7`}
                    alt={group.title}
                    className="h-12 w-auto hover:scale-105 transition-transform duration-300 block dark:hidden"
                  />
                  {/* Dark Mode Icons */}
                  <img
                    src={`https://skillicons.dev/icons?i=${group.icons}&theme=dark&perline=7`}
                    alt={group.title}
                    className="h-12 w-auto hover:scale-105 transition-transform duration-300 hidden dark:block"
                  />
                </a>
              )}

              {group.extras &&
                group.extras.map((extra) => (
                  <span
                    key={extra}
                    className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-white/5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors relative z-10"
                  >
                    {extra}
                  </span>
                ))}

              {group.badges &&
                group.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-sm font-bold text-primary tracking-wide relative z-10"
                  >
                    {badge}
                  </span>
                ))}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}
