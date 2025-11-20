import { useState, useEffect } from "react";
import { Heart, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/Rangga11268/",
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-gray-300"
    },
    {
      href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    {
      href: "https://x.com/ranggsdarell",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-blue-400"
    },
    {
      href: "https://www.instagram.com/darellrangga17/",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-pink-500"
    }
  ];

  return (
    <footer className="py-8 border-t border-border bg-background/30 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Copyright and developer info */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Darell Rangga. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Crafted with passion and dedication
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors ${social.color}`}
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Tech stack and current time */}
          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-center">
              <p className="text-muted-foreground text-sm">Made with</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <p className="text-muted-foreground text-sm">
                using Next.js & Tailwind CSS
              </p>
            </div>
            <p className="text-muted-foreground text-xs mt-2">
              Local time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative element */}
        <motion.div 
          className="mt-8 pt-6 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-xs">
            Designed and built with attention to detail and user experience
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
