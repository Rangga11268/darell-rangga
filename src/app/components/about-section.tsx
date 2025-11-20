"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Rocket, Zap } from "lucide-react";

const skills = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", 
  "Tailwind CSS", "Bootstrap", "PHP", "Laravel", "MySQL", 
  "Git", "RESTful APIs", "Responsive Design", "Framer Motion"
];

const experiences = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2023 - Present",
    description: "Developing responsive websites and web applications for various clients using modern technologies like React, Next.js, and Tailwind CSS.",
  },
];

const education = [
  {
    degree: "Bachelor of Information Systems",
    school: "Bina Sarana Informatika University",
    period: "2024 - Present",
    description: "Currently pursuing a degree in Information Systems with a focus on web development and software engineering.",
  },
];

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable and scalable code following best practices",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful, user-friendly interfaces with attention to detail",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and efficiency in every project",
  },
  {
    icon: Zap,
    title: "Fast Learner",
    description: "Quickly adapting to new technologies and frameworks",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">My Journey</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I&apos;m a passionate full-stack developer with experience building web applications. 
                I specialize in creating responsive, accessible, and performant websites using modern technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a student and aspiring developer, I combine academic knowledge with hands-on project 
                experience to create modern, responsive websites. I focus on clean code, user-friendly 
                interfaces, and staying up-to-date with the latest web technologies.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Experience
              </h4>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <h5 className="font-bold text-lg">{exp.title}</h5>
                  <p className="text-sm text-primary mb-2">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Education
              </h4>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <h5 className="font-bold text-lg">{edu.degree}</h5>
                  <p className="text-sm text-primary mb-2">
                    {edu.school} • {edu.period}
                  </p>
                  <p className="text-muted-foreground text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">What I Bring</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card h-full group hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <highlight.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-bold text-lg">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Tech Stack</h3>
            <p className="text-muted-foreground">Technologies I work with</p>
          </div>
          
          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
