"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Loader2,
  Phone,
  Instagram,
  Feather,
  Scroll,
} from "lucide-react";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "darrelrangga@gmail.com",
    href: "mailto:darrelrangga@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 8978638973",
    href: "tel:+628978638973",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bekasi, Jawa Barat",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Rangga11268/",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://x.com/ranggsdarell",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darell-rangga-1320b634b/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/darellrangga17/",
  },
];

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const response = await fetch("https://formspree.io/f/mrbaonbz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[#2c241b]/5 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#f4e4bc] dark:bg-[#2c241b] border-2 border-[#8d6e63] shadow-md group hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-[#8d6e63] bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
                        <info.icon className="w-6 h-6 text-[#3e2723] dark:text-[#d7ccc8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-1 font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                          {info.label}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm font-serif text-[#5d4037] dark:text-[#a1887f] hover:text-primary transition-colors break-words"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-serif text-[#5d4037] dark:text-[#a1887f] break-words">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-[#f4e4bc] dark:bg-[#2c241b] border-2 border-[#8d6e63] shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 font-sans text-[#3e2723] dark:text-[#d7ccc8]">
                    {t.contact.followMe}
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border-2 border-[#8d6e63] bg-primary/20 flex items-center justify-center hover:bg-primary hover:text-[#2c241b] transition-all duration-300 hover:scale-110 text-[#3e2723] dark:text-[#d7ccc8]"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-[#f4e4bc] dark:bg-[#2c241b] border-2 border-[#8d6e63] shadow-xl relative overflow-hidden">
              {/* Decorative stamp */}
              <div className="absolute top-4 right-4 opacity-50 pointer-events-none">
                <div className="w-24 h-24 rounded-full border-4 border-[#8d6e63] flex items-center justify-center rotate-[-15deg]">
                  <div className="w-20 h-20 rounded-full border-2 border-[#8d6e63] flex items-center justify-center">
                    <span className="font-serif font-bold text-[#8d6e63] text-xl">
                      POST
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-2 font-sans text-[#3e2723] dark:text-[#d7ccc8] flex items-center gap-2">
                  <Scroll className="w-6 h-6" />
                  {t.contact.formTitle}
                </h3>
                <p className="text-[#5d4037] dark:text-[#a1887f] mb-8 font-serif italic">
                  {t.contact.formDesc}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold mb-2 text-[#3e2723] dark:text-[#d7ccc8] uppercase tracking-wider"
                      >
                        {t.contact.nameLabel}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-[#fff8e1] dark:bg-[#3e2723] border-[#8d6e63] focus:border-primary transition-colors h-12 font-serif text-lg"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold mb-2 text-[#3e2723] dark:text-[#d7ccc8] uppercase tracking-wider"
                      >
                        {t.contact.emailLabel}
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-[#fff8e1] dark:bg-[#3e2723] border-[#8d6e63] focus:border-primary transition-colors h-12 font-serif text-lg"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold mb-2 text-[#3e2723] dark:text-[#d7ccc8] uppercase tracking-wider"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      disabled={isSubmitting}
                      className="bg-[#fff8e1] dark:bg-[#3e2723] border-[#8d6e63] focus:border-primary transition-colors resize-none font-serif text-lg"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-sm bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm font-serif"
                    >
                      {t.contact.success}
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-sm bg-destructive/10 border border-destructive/20 text-destructive text-sm font-serif"
                    >
                      {t.contact.error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg rounded-sm shadow-lg hover:shadow-xl transition-all font-serif font-bold tracking-widest bg-primary text-[#3e2723] border-2 border-[#3e2723] relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.contact.submitting}
                        </>
                      ) : (
                        <>
                          <Feather className="mr-2 h-5 w-5" />
                          {t.contact.submitButton}
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
