"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", 
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Docker"
  ]
  
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-muted-foreground mb-4">
              I'm a passionate full-stack developer with over 5 years of experience building 
              web applications. I specialize in creating responsive, accessible, and performant 
              websites using modern technologies.
            </p>
            <p className="text-muted-foreground mb-6">
              My approach combines technical expertise with an eye for design, ensuring that 
              the applications I build are not only functional but also visually appealing 
              and user-friendly.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-secondary/50 border border-border rounded-lg p-3 text-center"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Experience & Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-2 border-primary pl-4 py-1">
                  <h4 className="font-bold">Senior Full Stack Developer</h4>
                  <p className="text-sm text-muted-foreground">Tech Solutions Inc. • 2020 - Present</p>
                  <p className="mt-2 text-sm">
                    Leading development of scalable web applications using React, Node.js, and cloud technologies.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-1">
                  <h4 className="font-bold">Frontend Developer</h4>
                  <p className="text-sm text-muted-foreground">Digital Agency Co. • 2018 - 2020</p>
                  <p className="mt-2 text-sm">
                    Developed responsive websites and web applications for various clients using modern frameworks.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-1">
                  <h4 className="font-bold">B.S. Computer Science</h4>
                  <p className="text-sm text-muted-foreground">University of Technology • 2014 - 2018</p>
                  <p className="mt-2 text-sm">
                    Graduated with honors, specialized in web technologies and software engineering.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}