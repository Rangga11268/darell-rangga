"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">DR</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-muted-foreground font-medium"
        >
          Loading portfolio...
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mt-4 h-1 bg-primary/20 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}