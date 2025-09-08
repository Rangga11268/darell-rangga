import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <motion.div 
      className={cn("text-center mb-16", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
          {title}
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full"></div>
      </div>
      {subtitle && (
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}