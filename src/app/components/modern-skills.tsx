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
      icons:
        "react,nextjs,typescript,tailwind,laravel,nodejs,mysql,mongodb,postgres",
    },
    {
      title: "Specialized Frameworks & Libraries",
      icons: "vue,threejs,express",
      extras: ["Inertia.js", "Framer Motion", "Zustand", "Socket.io"],
    },
    {
      title: "Tools & DevOps",
      icons: "figma,git,vscode,postman,ubuntu",
      extras: ["Scikit-Learn", "Google Colab", "Antigravity AI"],
    },
    {
      title: "Programming Languages",
      icons: "html,css,js,ts,php,py",
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
              {group.icons &&
                group.icons.split(",").map((icon) => (
                  <div
                    key={icon}
                    className="relative z-10 transition-transform hover:scale-110 duration-200"
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${icon}&theme=light`}
                      alt={icon}
                      className="w-12 h-12 block dark:hidden"
                    />
                    <img
                      src={`https://skillicons.dev/icons?i=${icon}&theme=dark`}
                      alt={icon}
                      className="w-12 h-12 hidden dark:block"
                    />
                  </div>
                ))}

              {group.extras &&
                group.extras.map((extra) => (
                  <span
                    key={extra}
                    className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-white/5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors relative z-10"
                  >
                    {extra}
                  </span>
                ))}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}
