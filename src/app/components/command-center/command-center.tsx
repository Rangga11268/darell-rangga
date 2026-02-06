"use client";

import { motion } from "framer-motion";
import { GithubWidget } from "./github-widget";

export function CommandCenter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
           {/* Section Header */}
           <div className="text-center space-y-2">
              <h2 className="text-3xl font-display font-bold">Contribution Graph</h2>
              <p className="text-muted-foreground">My code activity over the last year.</p>
           </div>

           {/* Activity Map (Clean) */}
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl"
           >
              <GithubWidget />
           </motion.div>
        </div>
      </div>
    </section>
  );
}

