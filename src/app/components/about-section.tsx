"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/app/components/section-title";

export function AboutSection() {
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "2023 - Present",
      description:
        "Developing responsive websites and web applications for various clients using modern technologies like React, Next.js, and Tailwind CSS.",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Information Systems",
      school: "Bina Sarana Informatika University",
      period: "2024 - Present",
      description:
        "Currently pursuing a degree in Information Systems with a focus on web development and software engineering.",
    },
  ];

  // Categorized skills with proficiency levels
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 75 },
        { name: "Next.js", level: 70 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "PHP", level: 75 },
        { name: "Laravel", level: 70 },
        { name: "MySQL", level: 70 },
        { name: "RESTful APIs", level: 75 },
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 80 },
        { name: "Responsive Design", level: 85 },
        { name: "CRUD Operations", level: 80 },
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  // Skill level indicator component
  const SkillBar = ({ name, level }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know me better and discover my skills and experience"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m a passionate full-stack developer with experience building web applications. 
              I specialize in creating responsive, accessible, and performant websites using modern technologies.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold mb-4">Experience</h4>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-2 border-primary pl-4 py-1"
                    >
                      <h5 className="font-bold">{exp.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Education</h4>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-2 border-primary pl-4 py-1"
                    >
                      <h5 className="font-bold">{edu.degree}</h5>
                      <p className="text-sm text-muted-foreground">
                        {edu.school} • {edu.period}
                      </p>
                      <p className="mt-2 text-sm">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Skills</h3>
                <p className="text-muted-foreground">
                  Proficiency Level
                </p>
              </div>
              <p className="text-muted-foreground mb-6">
                Here are some of the technologies and tools I work with:
              </p>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skillCategories.map((category, index) => (
                  <Button
                    key={index}
                    variant={activeCategory === index ? "default" : "outline"}
                    size="sm"
                    className="rounded-full px-4 py-2 transition-all duration-300"
                    onClick={() => setActiveCategory(index)}
                  >
                    {category.category}
                  </Button>
                ))}
              </div>

              {/* Skills display with proficiency */}
              <div className="space-y-4">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <SkillBar key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>My Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As a student and aspiring developer, I combine academic
                  knowledge with hands-on project experience to create modern,
                  responsive websites. I focus on clean code, user-friendly
                  interfaces, and staying up-to-date with the latest web
                  technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
