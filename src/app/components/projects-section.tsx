"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      title: "Kopi Kupu",
      description:
        "A coffee shop website with product catalog and online ordering system.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      imageUrl: "/img/kopi kupu.png",
      githubUrl: "https://github.com/Rangga11268/KopiKupu",
      liveUrl: "https://kopi-kupu.vercel.app/",
    },
    {
      title: "App Quiz",
      description:
        "An interactive quiz application with multiple categories and score tracking functionality.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      imageUrl: "/img/app quiz.png",
      githubUrl: "https://github.com/Rangga11268/App-quiz",
      liveUrl: "https://superlative-pothos-2638e8.netlify.app/",
    },
    {
      title: "SRB Motor",
      description:
        "A motorcycle sales and service website with product catalog and appointment booking system.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      imageUrl: "/img/srb motor.png",
      githubUrl: "https://github.com/Rangga11268/Srb-Motor",
      liveUrl: "https://srb-motor.vercel.app/",
    },
    {
      title: "ApaPesan Laravel Project",
      description:
        "A Laravel-based web application for managing messages and communications with a clean, intuitive interface.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      imageUrl: "https://placehold.co/600x400/202020/FFFFFF?text=ApaPesan",
      githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
      liveUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    },
    {
      title: "CRUD Manajemen APP Pegawai",
      description:
        "A Laravel-based employee management application with full CRUD functionality for managing employee data.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "CRUD"],
      imageUrl: "/img/manajemenPegawai.png",
      githubUrl:
        "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
      liveUrl:
        "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode and smooth scrolling navigation.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      imageUrl: "/img/portfolio.png",
      githubUrl: "https://github.com/Rangga11268/darell-rangga",
      liveUrl: "https://darell-rangga.vercel.app/",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each project reflects my
            passion for creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="rounded-t-xl overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-1/2" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button className="w-1/2" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
