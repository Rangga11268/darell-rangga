"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Envelope,
  MapPin,
  GithubLogo,
  LinkedinLogo,
  CircleNotch,
  Phone,
  InstagramLogo,
  PaperPlaneTilt,
  TwitterLogo,
} from "@phosphor-icons/react";
import { SectionTitle } from "./section-title";
import { useLanguage } from "@/app/providers/language-provider";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from "@/lib/animations";
import { ParallaxBackground } from "@/components/ui/parallax-background";

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        headers: { Accept: "application/json" },
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

  const contactItems = [
    {
      icon: Envelope,
      label: "Email",
      value: "darrelrangga@gmail.com",
      href: "mailto:darrelrangga@gmail.com",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 897 863 8973",
      href: "https://wa.me/628978638973",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bekasi, Indonesia",
      href: null,
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-16"
        >
          <SectionTitle
            title={t.contact.title}
            subtitle={t.contact.subtitle}
            className="text-left mb-0"
          />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto md:auto-rows-[120px]">
          {/* Main Form Card - Spans 4x5 or similar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-4 md:row-span-4 lg:row-span-5 relative"
          >
            <Card className="h-full border-white/5 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardContent className="p-8 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold font-display mb-2">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-muted-foreground">{t.contact.formDesc}</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 flex-grow flex flex-col"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        {t.contact.nameLabel}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 h-12 focus:border-primary/50 transition-all rounded-xl focus:ring-0"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        {t.contact.emailLabel}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 h-12 focus:border-primary/50 transition-all rounded-xl focus:ring-0"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex-grow">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t.contact.messageLabel}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 resize-none focus:border-primary/50 transition-all rounded-xl flex-grow h-full min-h-[150px] focus:ring-0"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircleNotch
                        className="animate-spin mr-2"
                        weight="duotone"
                      />
                    ) : (
                      <PaperPlaneTilt
                        className="mr-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        weight="duotone"
                      />
                    )}
                    {isSubmitting
                      ? t.contact.submitting
                      : t.contact.submitButton}
                  </Button>

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-green-500 text-sm mt-4 text-center font-medium"
                      >
                        {t.contact.success}
                      </motion.p>
                    )}
                    {submitStatus === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-4 text-center font-medium"
                      >
                        {t.contact.error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Let's Talk Hero Card - Spans 2x2 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 md:row-span-2 relative group"
          >
            <Card className="h-full border-white/5 bg-primary overflow-hidden relative border-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.4)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-20 mix-blend-overlay pointer-events-none" />
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Envelope
                  size={180}
                  weight="fill"
                  className="text-black rotate-12"
                />
              </div>
              <CardContent className="p-8 relative h-full flex flex-col justify-end">
                <h4 className="text-primary-foreground/70 text-sm font-bold tracking-widest uppercase mb-2">
                  Available for new projects
                </h4>
                <h3 className="text-4xl lg:text-5xl font-extrabold font-display leading-[1.1] text-primary-foreground">
                  LET&apos;S <br /> BUILD <br /> STUFF.
                </h3>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Contact Items (Email/Phone) - Individual 2x1 cards */}
          {contactItems.map((item, idx) =>
            item.href ? (
              <motion.a
                key={idx}
                href={item.href}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-1 group"
              >
                <Card className="h-full border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300 overflow-hidden border">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <CardContent className="p-0 h-full flex items-center px-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-primary group-hover:scale-110 transition-transform">
                      <item.icon size={20} weight="duotone" />
                    </div>
                    <div className="ml-4 truncate">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium truncate text-sm lg:text-base">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ) : (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-1"
              >
                <Card className="h-full border-white/5 bg-white/[0.03] backdrop-blur-md transition-all duration-300 overflow-hidden border">
                  <CardContent className="p-0 h-full flex items-center px-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-primary">
                      <item.icon size={20} weight="duotone" />
                    </div>
                    <div className="ml-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-sm lg:text-base">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
