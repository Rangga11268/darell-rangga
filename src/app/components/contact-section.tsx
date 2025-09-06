"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Github, Twitter, Linkedin, Loader2, Phone, Instagram } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

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
          "Accept": "application/json"
        }
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating on a project or have any questions? Feel
            free to reach out! I&apos;m always excited to connect with fellow
            developers and potential collaborators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to me through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">
                      darrelrangga@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground">
                      +62 8978638973
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-muted-foreground">Bekasi, Jawa Barat</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <div className="flex gap-3 mt-2">
                      <a
                        href="https://github.com/Rangga11268/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition-colors dark:bg-gray-700"
                      >
                        <Github className="h-5 w-5 text-foreground dark:text-white" />
                      </a>
                      <a
                        href="https://x.com/ranggsdarell"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition-colors dark:bg-gray-700"
                      >
                        <Twitter className="h-5 w-5 text-foreground dark:text-white" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/darell-rangga-1320b634b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition-colors dark:bg-gray-700"
                      >
                        <Linkedin className="h-5 w-5 text-foreground dark:text-white" />
                      </a>
                      <a
                        href="https://www.instagram.com/darellrangga17/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition-colors dark:bg-gray-700"
                      >
                        <Instagram className="h-5 w-5 text-foreground dark:text-white" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">Social</h3>
                    <p className="text-muted-foreground">
                      Connect with me on social media
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      disabled={isSubmitting}
                      className="bg-background"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="text-green-600 dark:text-green-400 text-sm">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="text-destructive text-sm">
                      Failed to send message. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full py-6 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
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
