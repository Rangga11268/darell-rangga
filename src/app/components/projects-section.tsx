"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionTitle } from "./section-title";

const projects = [
  {
    title: "Navara Trans",
    description:
      "A modern transportation rental website with booking system and fleet management.",
    tags: ["React.js", "JavaScript", "Tailwind CSS"],
    imageUrl: "/img/navara.png",
    githubUrl: "https://github.com/Rangga11268/navara-trans",
    liveUrl: "https://navara-trans.vercel.app/",
    colSpan: "md:col-span-1",
  },
  {
    title: "PHD Trans",
    description:
      "A premium bus rental service website featuring fleet showcase, booking system, and destination packages with modern UI/UX.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/img/PhdTrans.png",
    githubUrl: "https://github.com/Rangga11268/phd-trans",
    liveUrl: "https://phd-trans.vercel.app/",
    colSpan: "md:col-span-1",
  },
  {
    title: "Tujago",
    description:
      "Tunggal Jaya Transport - A comprehensive transportation service management system.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    imageUrl: "/img/tujago.png",
    githubUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    liveUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    colSpan: "md:col-span-1",
  },
  {
    title: "SRB Motor",
    description:
      "A motorcycle sales and service website with product catalog and appointment booking system.",
    tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    imageUrl: "/img/srb motor.png",
    githubUrl: "https://github.com/Rangga11268/Srb-Motor",
    liveUrl: "https://srb-motor.vercel.app/",
    colSpan: "md:col-span-1",
  },
  {
    title: "ApaPesan Laravel Project",
    description:
      "A Laravel-based web application for managing messages and communications with a clean, intuitive interface.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    imageUrl: "/img/Apapesan.png",
    githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    liveUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    colSpan: "md:col-span-2",
  },
  {
    title: "CRUD Manajemen APP Pegawai",
    description:
      "A Laravel-based employee management application with full CRUD functionality for managing employee data.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "CRUD"],
    imageUrl: "/img/manajemenPegawai.png",
    githubUrl:
      "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
    liveUrl: "https://github.com/Rangga11268/CRUD-manajemenAPP-pegawai-simple",
    colSpan: "md:col-span-1",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "A responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode and smooth scrolling navigation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/img/portfolio.png",
    githubUrl: "https://github.com/Rangga11268/darell-rangga",
    liveUrl: "https://darell-rangga.vercel.app/",
    colSpan: "md:col-span-2",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-[url('/img/dark-texture.png')]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[#3e2723]/5 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="My Creations" subtitle="Artifacts I Have Forged" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative rounded-sm overflow-hidden border-4 border-[#8d6e63] bg-[#f4e4bc] dark:bg-[#2c241b] shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500",
                project.colSpan
              )}
            >
              {/* Image Background */}
              <div className="absolute inset-x-2 top-2 h-1/2 overflow-hidden border-b-2 border-[#8d6e63] rounded-t-sm">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 sepia-[.3] group-hover:sepia-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f4e4bc] dark:from-[#2c241b] via-transparent to-transparent opacity-80 z-10" />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-6 pt-[55%]">
                {/* Decorative rivets */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#5d4037] shadow-inner"></div>
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5d4037] shadow-inner"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#5d4037] shadow-inner"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#5d4037] shadow-inner"></div>

                <div className="transform translate-y-0 transition-transform duration-500 text-center">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm bg-[#8d6e63]/20 text-[#3e2723] dark:text-[#d7ccc8] border border-[#8d6e63]/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 font-sans text-[#3e2723] dark:text-[#d7ccc8] group-hover:text-primary transition-colors uppercase tracking-wide">
                    {project.title}
                  </h3>

                  <p className="text-[#5d4037] dark:text-[#a1887f] mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 font-serif text-sm px-4">
                    {project.description}
                  </p>

                  <div className="flex justify-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Button
                      size="sm"
                      className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-serif font-bold tracking-wider border border-[#3e2723]"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-sm bg-transparent border-[#8d6e63] text-[#3e2723] dark:text-[#d7ccc8] hover:bg-[#8d6e63]/20 font-serif"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
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
          <Button
            variant="ghost"
            size="lg"
            className="group text-lg font-serif text-[#3e2723] dark:text-[#d7ccc8] hover:text-primary hover:bg-[#3e2723]/10"
            asChild
          >
            <a
              href="https://github.com/Rangga11268"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Map className="mr-2 w-5 h-5" />
              Explore More Archives
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
