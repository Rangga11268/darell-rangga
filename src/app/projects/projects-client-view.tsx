"use client";

import React, { useState } from "react";
import { Project } from "@/app/data/projects";
import { FloatingNavbar } from "@/app/components/floating-navbar";
import { ProjectDetailModal } from "@/app/components/project-detail-modal";
import { ProjectCommentsDrawer } from "@/app/components/project-comments-drawer";
import { DeviceMockup } from "@/app/components/device-mockup";
import { useLanguage } from "@/app/providers/language-provider";
import { motion } from "framer-motion";
import { 
  MagnifyingGlass, 
  GithubLogo, 
  ArrowUpRight, 
  Folder, 
  BookOpen, 
  BracketsCurly, 
  Gear,
  ArrowLeft,
  ChatCircleDots
} from "@phosphor-icons/react";
import Link from "next/link";

interface ProjectsClientViewProps {
  initialProjects: Project[];
}

export function ProjectsClientView({ initialProjects }: ProjectsClientViewProps) {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [commentProjectId, setCommentProjectId] = useState<string | null>(null);
  const [commentProjectName, setCommentProjectName] = useState<string>("");

  // Divide into Featured (have image & detail) and Minor (pure GitHub repos)
  const featuredProjects = initialProjects.filter(p => p.imageUrl !== "");
  const minorProjects = initialProjects.filter(p => p.imageUrl === "");

  // Collect top tags for filtering
  const allTags = Array.from(
    new Set(initialProjects.flatMap((p) => p.tags))
  ).filter(tag => tag && tag !== "Open Source");

  const filterCategories = ["All", ...allTags.slice(0, 7)];

  const matchesSearchAndTag = (project: Project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTag = 
      selectedTag === "All" || 
      project.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  };

  const filteredFeatured = featuredProjects.filter(matchesSearchAndTag);
  const filteredMinor = minorProjects.filter(matchesSearchAndTag);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary pb-24">
      <FloatingNavbar />

      {/* Retro News Header */}
      <header className="border-b-rule-thick border-primary py-12 text-center bg-paper relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1 border hairline border-primary/20 hover:border-primary label-caps text-[10px] transition-all bg-background">
              <ArrowLeft size={10} weight="bold" /> BACK HOME
            </Link>
            <span className="label-caps text-xs tracking-[0.2em] font-bold opacity-60">THE CHRONICLE ARCHIVE</span>
          </div>
          <h1 className="headline-lg text-4xl md:text-7xl font-serif mt-2 font-black leading-none uppercase">
            {language === "id" ? "INDeks seluruh proyek" : "ALL WORKS & ARTIFACTS"}
          </h1>
          <p className="editor-note italic text-base md:text-lg max-w-xl mx-auto mt-4 opacity-75 font-serif">
            {language === "id" 
              ? `"Daftar berkas perkembangan digital, sistem kecerdasan buatan, dan skrip eksperimental yang dikompilasi secara dinamis."`
              : `"A comprehensive index of digital developments, artificial intelligences, and experimental scripts dynamically compiled."`
            }
          </p>
        </div>
      </header>

      {/* Filter and Search Bar Container */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-rule-thin border-primary bg-paper p-4 md:p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)]">
          {/* Search Box */}
          <div className="md:col-span-4 relative flex items-center">
            <MagnifyingGlass size={18} className="absolute left-3 opacity-50" />
            <input
              type="text"
              placeholder={language === "id" ? "CARI PROYEK..." : "SEARCH ARTIFACTS..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-primary/20 focus:border-primary px-10 py-2.5 outline-none font-mono text-xs uppercase tracking-wider transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="md:col-span-8 flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <span className="label-caps text-[10px] font-bold mr-2 opacity-50 hidden lg:inline">FILTER BY:</span>
            {filterCategories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 border hairline label-caps text-[9px] font-bold transition-all ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/20 hover:border-primary hover:bg-primary/5 text-primary/75"
                }`}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {filteredFeatured.length > 0 && (
          <section className="mb-20">
            <div className="border-b-rule-thin border-primary pb-3 mb-10">
              <h2 className="headline-md text-2xl font-serif uppercase tracking-tight">
                {language === "id" ? "Rilisan Utama Redaksi" : "Featured Editorial Releases"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredFeatured.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="bg-paper border-rule-thin border-primary flex flex-col h-full shadow-[8px_8px_0px_rgba(0,0,0,0.1)] group"
                >
                  {/* Visual Device Mockup Card Top */}
                  <div className="aspect-[16/10] bg-zinc-950/5 border-b border-primary/20 relative overflow-hidden flex items-center justify-center p-4">
                    <div className="scale-90 group-hover:scale-95 transition-transform duration-500 w-full flex justify-center">
                      <DeviceMockup
                        imageUrl={project.imageUrl}
                        title={project.title}
                        defaultMode={project.id === "srb-motor-app" ? "phone" : "laptop"}
                        allowToggle={false}
                      />
                    </div>
                    {/* Retro Stamp */}
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground label-caps text-[8px] font-black px-2 py-0.5 z-10">
                      VOL. {project.year}
                    </div>
                  </div>

                  {/* Card Info Bottom */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="label-caps text-[8px] font-bold text-primary opacity-60">ROLE: {project.role.toUpperCase()}</span>
                      <h3 className="headline-sm text-xl uppercase tracking-tight font-black mt-1.5 mb-3 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                        {project.title}
                      </h3>
                      <p className="body-md text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 font-serif">
                        {project.fullDescription[language]}
                      </p>
                    </div>

                    <div>
                      {/* Tech Tokens */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6 text-[10px] font-mono text-muted-foreground/80">
                        {project.techStack.map(t => (
                          <span key={t.name}>#{t.name.toLowerCase()}</span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center justify-between border-t border-primary/10 pt-4 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="flex items-center gap-1.5 label-caps text-[10px] font-bold text-primary group-hover:translate-x-1 transition-transform cursor-pointer"
                          >
                            <BookOpen size={14} /> VIEW CASE STUDY
                          </button>

                          <button
                            onClick={() => {
                              setCommentProjectId(project.id);
                              setCommentProjectName(project.title);
                            }}
                            className="flex items-center gap-1.5 label-caps text-[10px] font-bold text-primary hover:opacity-80 transition-opacity cursor-pointer"
                          >
                            <ChatCircleDots size={14} /> DISCUSS
                          </button>
                        </div>

                        <div className="flex gap-2">
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 border hairline border-primary/10 hover:border-primary hover:text-primary transition-all rounded-full"
                              title="GITHUB FILE"
                            >
                              <GithubLogo size={14} weight="bold" />
                            </a>
                          )}
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 border hairline border-primary/10 hover:border-primary hover:text-primary transition-all rounded-full"
                              title="EXTERNAL LINK"
                            >
                              <ArrowUpRight size={14} weight="bold" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Repositories List */}
        {filteredMinor.length > 0 && (
          <section>
            <div className="border-b-rule-thin border-primary pb-3 mb-10">
              <h2 className="headline-md text-2xl font-serif uppercase tracking-tight">
                {language === "id" ? "Laporan Kawat Repositori Publik" : "Public Repository Wire-Reports"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMinor.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-paper border hairline border-primary/20 hover:border-primary p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Folder Icon & Year */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-primary/5 border hairline border-primary/10 group-hover:border-primary/30">
                        <Folder size={16} className="opacity-60" />
                      </div>
                      <span className="font-mono text-[9px] font-bold text-muted-foreground opacity-60">YEAR: {project.year}</span>
                    </div>

                    <h3 className="headline-sm text-base uppercase tracking-tight font-black mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="body-sm text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-6 font-serif">
                      {project.shortDescription[language]}
                    </p>
                  </div>

                  <div>
                    {/* Tech tag */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[8px] font-bold tracking-tight label-caps border border-primary/10 bg-primary/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer link */}
                    <div className="border-t border-primary/5 pt-3 flex justify-between items-center text-[10px] font-mono">
                      <span className="flex items-center gap-1 opacity-50">
                        <Gear size={10} className="animate-spin-slow" /> WIRE_LOG
                      </span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-bold text-primary hover:underline"
                      >
                        <GithubLogo size={12} weight="bold" /> SOURCE CODE →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {filteredFeatured.length === 0 && filteredMinor.length === 0 && (
          <div className="text-center py-24 border hairline border-primary/20 bg-paper shadow-inner flex flex-col items-center justify-center">
            <BracketsCurly size={48} className="opacity-20 animate-pulse mb-4" />
            <p className="label-caps text-xs tracking-widest opacity-50">NO ARTIFACTS OR WIRE-REPORTS FOUND</p>
          </div>
        )}
      </main>

      {/* Case Study Modal Popup */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        language={language}
        onOpenComments={(id, title) => {
          setCommentProjectId(id);
          setCommentProjectName(title);
        }}
      />

      <ProjectCommentsDrawer
        projectId={commentProjectId}
        projectName={commentProjectName}
        onClose={() => setCommentProjectId(null)}
      />
    </div>
  );
}
