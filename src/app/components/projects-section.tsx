"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    title: "Navara Trans",
    description: "A modern transportation rental website with booking system and fleet management.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/img/navara.png",
    githubUrl: "https://github.com/Rangga11268/navara-trans",
    liveUrl: "https://navara-trans.vercel.app/",
    colSpan: "md:col-span-1",
  },
  {
    title: "Tujago",
    description: "Tunggal Jaya Transport - A comprehensive transportation service management system.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    imageUrl: "/img/tujago.png",
    githubUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    liveUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    colSpan: "md:col-span-1",
  },
  {
    title: "SRB Motor",
    description: "A motorcycle sales and service website with product catalog and appointment booking system.",
    tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    imageUrl: "/img/srb motor.png",
    githubUrl: "https://github.com/Rangga11268/Srb-Motor",
    liveUrl: "https://srb-motor.vercel.app/",
    colSpan: "md:col-span-1",
  },
  {
    title: "ApaPesan Laravel Project",
    description: "A Laravel-based web application for managing messages and communications with a clean, intuitive interface.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    imageUrl: "https://placehold.co/600x400/202020/FFFFFF?text=ApaPesan",
    githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    liveUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    colSpan: "md:col-span-2",
  },
  {
    title: "CRUD Manajemen APP Pegawai",
    description: "A Laravel-based employee management application with full CRUD functionality for managing employee data.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "CRUD"],
    imageUrl: "/img/manajemenPegawai.png",
    githubUrl: "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
    liveUrl: "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
    colSpan: "md:col-span-1",
  },
  {
    title: "Personal Portfolio Website",
    description: "A responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode and smooth scrolling navigation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/img/portfolio.png",
    githubUrl: "https://github.com/Rangga11268/darell-rangga",
    liveUrl: "https://darell-rangga.vercel.app/",
    colSpan: "md:col-span-3",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-secondary/30 -z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of my work, ranging from web applications to design systems.
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative rounded-3xl overflow-hidden bg-card border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-primary/10",
                project.colSpan
              )}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90 z-10" />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {project.description}
                  </p>

                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Button size="sm" className="rounded-full" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full bg-background/50 backdrop-blur-sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Source
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="ghost" size="lg" className="group text-lg" asChild>
            <a href="https://github.com/Rangga11268" target="_blank" rel="noopener noreferrer">
              View More on GitHub
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
