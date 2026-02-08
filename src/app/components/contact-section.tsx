"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background Marquee */}
      <div className="absolute top-20 left-0 w-full -rotate-3 opacity-[0.03] pointer-events-none select-none overflow-hidden text-foreground">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[15vw] font-bold font-display mx-10">
              LET&apos;S WORK TOGETHER
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-display font-bold mb-4">
                {t.contact.contactHeader}
              </h3>
              <p className="text-muted-foreground text-lg">
                {t.contact.contactText}
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Envelope,
                  label: "Email",
                  value: "darrelrangga@gmail.com",
                  href: "mailto:darrelrangga@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+62 897 863 8973",
                  href: "https://wa.me/628978638973",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Bekasi, Indonesia",
                  href: null,
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href || "#"}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card hover:bg-muted/50 hover:translate-x-2 transition-all border border-border group shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.label}</h4>
                    <p className="text-muted-foreground text-sm">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {[GithubLogo, LinkedinLogo, TwitterLogo, InstagramLogo].map(
                (Icon, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 border-border hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all hover:-translate-y-1"
                    aria-label={`Visit my profile on ${
                      Icon.displayName || "social media"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ),
              )}
            </div>
          </motion.div>

          {/* Right: Modern Glass Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-[100px] -z-10" />

            <Card className="border-0 bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">
                        {t.contact.nameLabel}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border h-12 focus:border-primary transition-colors rounded-xl"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">
                        {t.contact.emailLabel}
                      </label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border h-12 focus:border-primary transition-colors rounded-xl"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">
                      {t.contact.messageLabel}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-background/50 border-border resize-none focus:border-primary transition-colors rounded-xl"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  {/* ... (Keep submit status logic same) ... */}

                  <Button
                    type="submit"
                    className="w-full h-14 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircleNotch
                        className="animate-spin mr-2"
                        weight="duotone"
                      />
                    ) : (
                      <PaperPlaneTilt
                        className="mr-2 w-4 h-4"
                        weight="duotone"
                      />
                    )}
                    {t.contact.submitButton}
                  </Button>

                  {submitStatus === "success" && (
                    <p className="text-green-500 text-sm mt-2 text-center font-medium">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-sm mt-2 text-center font-medium">
                      Something went wrong. Please try again later.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
