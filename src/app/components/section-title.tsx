import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn("text-center mb-16 flex flex-col items-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <motion.span
          className="text-primary font-serif font-bold tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="h-[2px] w-8 bg-primary/40 inline-block"></span>
          {subtitle}
          <span className="h-[2px] w-8 bg-primary/40 inline-block"></span>
        </motion.span>
      )}

      <div className="relative inline-block py-2">
        <h2 className="text-4xl md:text-5xl font-bold relative z-10 font-sans tracking-wide text-[#3e2723] dark:text-[#d7ccc8] drop-shadow-sm">
          {title}
        </h2>

        {/* Ornamental divider */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-80">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="w-2 h-2 rotate-45 border border-primary bg-background"></div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>
    </motion.div>
  );
}
