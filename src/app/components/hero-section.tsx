"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const roles = ["Web Developer", "Full Stack Developer"]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
<<<<<<< HEAD
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-pink-500/20 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
=======
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
>>>>>>> e19bd6ed532cb4aa4ba322640529640a100dc51c
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
<<<<<<< HEAD
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium"
              >
                Available for work
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">Darell</span>
                <br />
                <span className="text-foreground/80">Web Developer</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Crafting exceptional digital experiences with modern technologies. 
                Specializing in full-stack development with Laravel, PHP, and Next.js.
              </motion.p>
            </div>
=======
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hi, I&apos;m <span className="text-primary">Darell</span>
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary inline-block"
                >
                  {roles[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I&apos;m a passionate web developer who is currently pursuing my degree in Information Systems at Bina Sarana Informatika University. 
              I specialize in creating full-stack web applications using technologies like Laravel, PHP, and modern frontend tools.
            </motion.p>
>>>>>>> e19bd6ed532cb4aa4ba322640529640a100dc51c
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
<<<<<<< HEAD
              <Button size="lg" className="rounded-full text-lg px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" asChild>
                <a href="#projects">
                  View Work
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full text-lg px-8 h-12 border-primary/20 hover:bg-primary/5" asChild>
=======
              <Button 
                size="lg" 
                className="w-full sm:w-auto group relative overflow-hidden"
                asChild
              >
                <a href="#projects">
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-primary/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto group relative overflow-hidden"
                asChild
              >
>>>>>>> e19bd6ed532cb4aa4ba322640529640a100dc51c
                <a href="#contact">
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-secondary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "mailto:hello@example.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
<<<<<<< HEAD
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Image container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-background shadow-2xl shadow-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 absolute inset-0 z-10 mix-blend-overlay" />
=======
            <div className="relative">
              {/* Floating animation rings */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary/10"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>
              
              {/* Profile image with enhanced styling */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-10"></div>
>>>>>>> e19bd6ed532cb4aa4ba322640529640a100dc51c
                <img 
                  src="/img/me3.jpeg" 
                  alt="Darell Rangga" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_10px_rgba(255,255,255,0.05)]"></div>
              </div>

              {/* Floating badges */}
              <motion.div 
                className="absolute -right-4 top-10 glass px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-medium">Fast & Modern</span>
              </motion.div>
              
              <motion.div 
                className="absolute -left-4 bottom-20 glass px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-2xl">💻</span>
                <span className="text-sm font-medium">Full Stack</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
<<<<<<< HEAD
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
            <span className="text-sm font-medium">Scroll Down</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
=======
          <Button 
            variant="ghost" 
            size="icon" 
            className="animate-bounce group"
            asChild
          >
            <a href="#about">
              <ArrowDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
            </a>
          </Button>
>>>>>>> e19bd6ed532cb4aa4ba322640529640a100dc51c
        </motion.div>
      </div>
    </section>
  )
}