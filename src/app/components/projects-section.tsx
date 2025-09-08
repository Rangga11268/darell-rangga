"use client";

import { useState } from "react";
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
import { ExternalLink, Github, Filter } from "lucide-react";
import { SectionTitle } from "@/app/components/section-title";

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

  const [filter, setFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Get unique tags for filter options
  const allTags = ["All", ...new Set(projects.flatMap(project => project.tags))];
  
  const handleFilter = (tag) => {
    setFilter(tag);
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.includes(tag)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="My Projects" 
          subtitle="Here are some of my recent projects. Each project reflects my passion for creating exceptional digital experiences."
        />

        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4 py-2 transition-all duration-300 hover:shadow-md"
              onClick={() => handleFilter(tag)}
            >
              {tag === "All" ? (
                <>
                  <Filter className="w-4 h-4 mr-2" />
                  {tag}
                </>
              ) : (
                tag
              )}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-border">
                <CardHeader className="p-0">
                  <div className="rounded-t-xl overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                          filter === tag 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary hover:bg-primary/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-1/2 group/github hover:shadow-md" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2 group-hover/github:scale-110 transition-transform" />
                      Code
                    </a>
                  </Button>
                  <Button className="w-1/2 group/demo hover:shadow-md" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/demo:rotate-12 transition-transform" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No projects found with this filter.</p>
          </motion.div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" asChild className="group hover:shadow-lg">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
