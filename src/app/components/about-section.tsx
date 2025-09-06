"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "PHP",
    "Laravel",
    "MySQL",
    "Bootstrap",
    "Tailwind CSS",
    "Git",
    "Responsive Design",
    "CRUD Operations",
    "RESTful APIs",
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know me better and discover my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m a passionate full-stack developer with over 5 years of
              experience building web applications. I specialize in creating
              responsive, accessible, and performant websites using modern
              technologies.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold mb-4">Experience</h4>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary pl-4 py-1"
                    >
                      <h5 className="font-bold">{exp.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Education</h4>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary pl-4 py-1"
                    >
                      <h5 className="font-bold">{edu.degree}</h5>
                      <p className="text-sm text-muted-foreground">
                        {edu.school} • {edu.period}
                      </p>
                      <p className="mt-2 text-sm">{edu.description}</p>
                    </div>
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
              <h3 className="text-2xl font-bold mb-6">Skills</h3>
              <p className="text-muted-foreground mb-6">
                Here are some of the technologies and tools I work with:
              </p>

              {/* Running text animation for skills */}
              <div className="overflow-hidden py-3 rounded-lg bg-secondary/20 border border-border mb-6">
                <div className="flex animate-marquee space-x-3 w-max">
                  {[...skills, ...skills].map((skill, index) => (
                    <div
                      key={index}
                      className="bg-background/80 border border-border rounded-lg px-3 py-2 text-center whitespace-nowrap shadow-sm text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-background border border-border rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-sm">{skill}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Card>
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
