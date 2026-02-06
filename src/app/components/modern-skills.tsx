"use client";

import { motion } from "framer-motion";

export function ModernSkills() {
  const skillGroups = [
    {
      title: "Core Stack",
      icons: "react,nextjs,typescript,tailwind,nodejs,express",
    },
    {
      title: "Tools & DevOps",
      icons: "git,github,vscode,docker,vercel,figma",
    },
    {
      title: "Database & Backend",
      icons: "mongodb,mysql,firebase,php,laravel",
    },
  ];

  return (
    <div className="space-y-8">
      {skillGroups.map((group, idx) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="space-y-4"
        >
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-2 border-l-2 border-primary">
            {group.title}
          </h4>
          <div className="glass-card p-6 rounded-2xl flex flex-wrap gap-4 items-center justify-center hover:border-primary/20 transition-colors">
            <a href="https://skillicons.dev">
              <img
                src={`https://skillicons.dev/icons?i=${group.icons}&perline=6`}
                alt={group.title}
                className="hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
