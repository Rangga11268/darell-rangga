"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { motion } from "framer-motion";

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
  speed = 20,
}: {
  skills: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden relative w-full group py-2 md:py-4">
      {/* Gradient Mask for fading edges - Adapts to theme background */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-3 md:gap-8 px-4 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            className="
                            relative
                            px-6 py-3
                            rounded-md
                            border-2 border-[#8d6e63] dark:border-[#5d4037]
                            bg-[#f5e6c8] dark:bg-[#1e1814]
                            text-[#3e2723] dark:text-[#ede0d4]
                            font-bold
                            font-sans
                            text-sm md:text-base
                            tracking-wider
                            uppercase
                            cursor-pointer
                            group/item
                            overflow-hidden
                            transition-colors duration-300
                            hover:bg-[#fffaeb] dark:hover:bg-[#2c241b]
                            hover:border-[#5d4037] dark:hover:border-[#8d6e63]
                        "
          >
            {/* Golden sheen effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
            </div>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2a1b12] dark:group-hover:text-[#ffffff]">
              {skill}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export function SkillsConstellation() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 relative flex flex-col gap-8 overflow-hidden">
      {/* Decorative glow - visible mostly in dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <MarqueeRow skills={SKILLS.slice(0, 8)} direction="left" speed={40} />
      <MarqueeRow skills={SKILLS.slice(7)} direction="right" speed={50} />
    </div>
  );
}
