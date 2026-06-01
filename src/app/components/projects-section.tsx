"use client";

import { useState } from "react";
import { useLanguage } from "@/app/providers/language-provider";
import { projects, Project } from "@/app/data/projects";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const langKey = language === "id" ? "id" : "en";
  const router = useRouter();

  const skills = [
    { name: "HTML / CSS", level: "95%" },
    { name: "JavaScript", level: "90%" },
    { name: "TypeScript", level: "85%" },
    { name: "React", level: "90%" },
    { name: "Next.js", level: "85%" },
    { name: "UI / UX Design", level: "80%" },
    { name: "Node.js", level: "75%" },
    { name: "Tailwind CSS", level: "90%" },
  ];

  return (
    <>
      <section id="projects" className="bg-paper border-b-rule-thick border-primary pb-8 pt-4">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Projects Area */}
            <div className="lg:col-span-9 lg:border-r lg:hairline-r border-primary pr-0 lg:pr-gutter">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-8 border-b hairline-b border-primary/10 pb-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-paper px-2 py-0.5 text-[10px] label-caps font-bold italic">Front Page</div>
                    <span className="label-caps text-[10px] opacity-40 uppercase tracking-widest">Featured Work</span>
                  </div>
                  <h2 className="headline-lg uppercase tracking-tighter leading-[0.85]">
                    {language === "id" ? "Cerita Utama" : "Featured Stories"}
                  </h2>
                </div>
                <Link 
                  href="/projects"
                  className="label-caps hover:underline flex items-center gap-2 tracking-widest font-bold self-start sm:self-auto group border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {language === "id" ? "Lihat Semua Arsip" : "View All Archives"} 
                  <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project, i) => (
                  <article 
                    key={project.id} 
                    className="flex flex-col group cursor-pointer"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div className="relative mb-4 border border-primary/20 p-1 overflow-hidden">
                      <span className="absolute top-2 left-2 bg-background px-2 py-0.5 text-[10px] label-caps z-10 border border-primary">
                        {i === 0 ? "Featured" : i === 1 ? "Breaking" : "Popular"}
                      </span>
                      <div className="relative aspect-[4/3] w-full grayscale contrast-125 transition-transform duration-500 group-hover:scale-105">
                        <Image 
                          src={project.imageUrl} 
                          alt={project.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="label-caps text-on-surface-variant mb-2">
                      {project.tags[0]} • {project.year}
                    </div>
                    <h3 className="headline-sm mb-2 uppercase tracking-wide group-hover:underline decoration-primary underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="body-md mb-4 flex-grow line-clamp-3">
                      {project.shortDescription[langKey]}
                    </p>
                    <span className="label-caps flex items-center gap-1 font-bold group-hover:text-primary transition-colors">
                      Read More <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </article>
                ))}
              </div>
            </div>

            {/* Skills Sidebar */}
            <div className="lg:col-span-3" id="skills">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="headline-md">Skills</h2>
                <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest uppercase">Classified</span>
              </div>
              <div className="flex flex-col gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="font-bold text-sm uppercase">{skill.name}</span>
                    <div className="flex-grow mx-4 border-b border-primary border-dotted mt-2"></div>
                    <span className="text-sm font-bold">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


    </>
  );
}
