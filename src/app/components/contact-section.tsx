"use client";

import { useState } from "react";
import { useLanguage } from "@/app/providers/language-provider";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataObj = new FormData(e.target as HTMLFormElement);
      const response = await fetch("https://formspree.io/f/mrbaonbz", {
        method: "POST",
        body: formDataObj,
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
    <section id="contact" className="bg-paper border-b-rule-thick border-primary pb-24 pt-4">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="headline-md">Letters To The Editor</h2>
          <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest">Get In Touch</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Column 1: Contact Info */}
          <div className="lg:col-span-4 lg:border-r lg:hairline-r border-primary pr-0 lg:pr-gutter">
            <h3 className="headline-sm mb-6 uppercase tracking-wide">Direct Correspondence</h3>
            <div className="space-y-6">
              <div>
                <span className="label-caps text-[10px] opacity-40 block mb-1">Email Dispatch</span>
                <a href="mailto:darrelrangga@gmail.com" className="body-lg font-bold hover:underline">darrelrangga@gmail.com</a>
              </div>
              <div>
                <span className="label-caps text-[10px] opacity-40 block mb-1">Tele-Communication</span>
                <a href="tel:+628978638973" className="body-lg font-bold hover:underline">+62 897 863 8973</a>
              </div>
              <div>
                <span className="label-caps text-[10px] opacity-40 block mb-1">Digital Identity</span>
                <div className="flex gap-4">
                  <a href="https://github.com/Rangga11268" className="label-caps text-xs font-bold hover:underline">GitHub</a>
                  <a href="https://linkedin.com/in/darell-rangga" className="label-caps text-xs font-bold hover:underline">LinkedIn</a>
                  <a href="https://instagram.com/darrelrangga" className="label-caps text-xs font-bold hover:underline">Instagram</a>
                </div>
              </div>
            </div>
            <div className="mt-12 p-4 border border-primary/20 italic text-sm">
              &quot;Every letter received is a new story waiting to be told. I aim to respond within 24 business hours.&quot;
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="lg:col-span-8 lg:px-gutter">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-caps text-[11px] mb-2 block font-bold uppercase opacity-60">Name / Identification</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="E.g. John Doe"
                    className="w-full bg-transparent border-b hairline-b border-primary/30 px-0 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="label-caps text-[11px] mb-2 block font-bold uppercase opacity-60">Email Address</label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b hairline-b border-primary/30 px-0 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40 font-bold text-lg"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[11px] mb-2 block font-bold uppercase opacity-60">Your Dispatch / Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b hairline-b border-primary/30 px-0 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary/40 resize-none font-bold text-lg"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary text-paper label-caps font-bold py-4 px-8 tracking-widest hover:bg-primary/90 transition-colors w-full md:w-auto"
              >
                {isSubmitting ? "SENDING DISPATCH..." : "SEND DISPATCH"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 border border-green-500 text-green-500 font-bold label-caps text-center">
                  Message Delivered Successfully
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 border border-red-500 text-red-500 font-bold label-caps text-center">
                  Delivery Failed. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
