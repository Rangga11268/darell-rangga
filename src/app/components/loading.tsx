"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Star, Compass, Scroll, Gem } from "lucide-react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      >
        <div className="flex flex-col items-center max-w-md px-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative mb-8"
          >
            {/* Outer ring */}
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              {/* Middle ring */}
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                {/* Inner circle with initials */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-2xl">DR</span>
                </div>
              </div>
              
              {/* Animated orbiting elements */}
              <motion.div
                className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full"
                animate={{ 
                  rotate: 360,
                  y: [0, -40, 0]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  y: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{ transformOrigin: "0 64px" }}
              />
              <motion.div
                className="absolute top-1/2 right-0 w-2 h-2 bg-secondary rounded-full"
                animate={{ 
                  rotate: 360,
                  x: [0, 40, 0]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  x: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{ transformOrigin: "-64px 0" }}
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-center mb-2"
          >
            Darell Rangga
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-center mb-8"
          >
            Web Developer & Designer
          </motion.p>
          
          <div className="w-full mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Loading portfolio</span>
              <span>{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-muted-foreground text-center"
          >
            Crafting exceptional digital experiences
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}