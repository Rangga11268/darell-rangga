import { useState, useEffect } from "react";
import {
  Heart,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Diamond,
} from "lucide-react";
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
      color: "hover:text-[#d4c5a9]",
    },
    {
      href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-[#c5a059]",
    },
    {
      href: "https://x.com/ranggsdarell",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-[#d4c5a9]",
    },
    {
      href: "https://www.instagram.com/darellrangga17/",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-[#c5a059]",
    },
  ];

  return (
    <footer className="py-10 border-t-4 border-[#8d6e63] bg-[#1a1614] text-[#d7ccc8] relative">
      {/* Texture overlay */}
      {/* Texture overlay - Removed per user request */}
      {/* <div className="absolute inset-0 bg-[url('/img/dark-texture.png')] opacity-20 pointer-events-none"></div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Copyright and developer info */}
          <motion.div
            className="text-center md:text-left space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#a1887f] text-sm font-sans tracking-widest uppercase">
              © {new Date().getFullYear()} Darell Rangga.
            </p>
            <p className="text-[#8d6e63] text-xs font-serif italic">
              "Forged in the fires of code."
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
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#8d6e63] transition-colors ${social.color}`}
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Tech stack and current time */}
          <motion.div
            className="flex flex-col items-center md:items-end space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-center text-[#a1887f] text-sm font-serif">
              <span>Etched with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Diamond className="h-3 w-3 text-primary fill-current" />
              </motion.div>
              <span>using Rare Artifacts</span>
            </div>
            <p className="text-[#5d4037] text-xs font-mono">
              Chronicle:{" "}
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>
        </div>

        {/* Decorative element */}
        <motion.div
          className="mt-8 pt-6 border-t border-[#3e2723] text-center flex justify-center items-center gap-4 opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="h-[1px] w-12 bg-[#8d6e63]"></div>
          <div className="w-2 h-2 rotate-45 bg-[#8d6e63]"></div>
          <div className="h-[1px] w-12 bg-[#8d6e63]"></div>
        </motion.div>
      </div>
    </footer>
  );
}
