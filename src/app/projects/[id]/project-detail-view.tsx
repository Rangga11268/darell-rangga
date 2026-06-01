"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { Project } from "@/app/data/projects";
import { DeviceMockup } from "@/app/components/device-mockup";
import { RichCommentSection } from "@/app/components/rich-comment-section";
import { CaretLeft, GithubLogo, Browser, Calendar, Suitcase, Cpu } from "@phosphor-icons/react";
import Link from "next/link";
import { FloatingNavbar } from "@/app/components/floating-navbar";
import { Footer } from "@/app/components/footer";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { language } = useLanguage();

  const labels = {
    year: language === "id" ? "Tahun Rilis" : "Release Year",
    role: language === "id" ? "Peran Pengembang" : "Developer Role",
    techStack: language === "id" ? "Teknologi" : "Tech Stack",
    features: language === "id" ? "Fitur Utama" : "Key Features",
    liveDemo: language === "id" ? "KUNJUNGI APLIKASI" : "LIVE APPLICATION",
    sourceCode: language === "id" ? "KODE SUMBER (GITHUB)" : "SOURCE CODE (GITHUB)",
    back: language === "id" ? "Kembali ke Proyek" : "Back to Projects",
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary flex flex-col">
      <FloatingNavbar />

      <main className="flex-1 container mx-auto px-margin-mobile md:px-margin-desktop py-24 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-primary transition-all group"
          >
            <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
            {labels.back}
          </Link>
        </div>

        {/* Double-bordered Header */}
        <div className="border-t-4 border-b-4 border-double border-primary py-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-[10px] label-caps tracking-widest text-primary/60 font-mono">
            <span>STATION: DARELL RANGGA ARCHIVAL INDEX</span>
            <span>VOL. {project.year} — NO. {project.id}</span>
          </div>

          <h1 className="headline-lg uppercase mb-3 break-words text-left tracking-tight">
            {project.title}
          </h1>

          <p className="editor-note text-sm md:text-base italic leading-relaxed text-on-surface-variant max-w-3xl text-left border-l-2 border-primary/20 pl-4">
            {project.shortDescription[language]}
          </p>
        </div>

        {/* Dynamic Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Metadata & Tech Specs (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="border border-primary p-6 bg-paper shadow-[4px_4px_0px_#1a1c1c] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)]">
              <h2 className="label-caps text-xs font-black uppercase text-primary border-b border-primary/25 pb-2 mb-4 tracking-wider">
                {language === "id" ? "SPESIFIKASI PROYEK" : "PROJECT SPECIFICATIONS"}
              </h2>

              <div className="flex flex-col gap-4 text-xs">
                {/* Year */}
                <div className="flex justify-between items-center py-2 border-b hairline-b border-primary/10">
                  <span className="opacity-60 flex items-center gap-1.5 font-bold uppercase"><Calendar size={14} /> {labels.year}</span>
                  <span className="font-mono font-bold text-primary">{project.year}</span>
                </div>

                {/* Role */}
                <div className="flex justify-between items-center py-2 border-b hairline-b border-primary/10">
                  <span className="opacity-60 flex items-center gap-1.5 font-bold uppercase"><Suitcase size={14} /> {labels.role}</span>
                  <span className="font-bold">{project.role}</span>
                </div>

                {/* Tech Stack */}
                <div className="py-2">
                  <span className="opacity-60 flex items-center gap-1.5 font-bold uppercase mb-2"><Cpu size={14} /> {labels.techStack}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="border border-primary bg-primary/5 text-primary text-[10px] font-mono px-2 py-0.5 rounded-none"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground hover:bg-background hover:text-primary border-2 border-primary font-mono font-black text-center py-3.5 text-xs transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.15)] select-none hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <span className="flex items-center justify-center gap-2"><Browser size={16} /> {labels.liveDemo}</span>
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono font-black text-center py-3.5 text-xs transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.15)] select-none hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <span className="flex items-center justify-center gap-2"><GithubLogo size={16} weight="bold" /> {labels.sourceCode}</span>
                </a>
              )}
            </div>

            {/* Features (If present) */}
            {project.features && project.features[language] && project.features[language].length > 0 && (
              <div className="border border-primary p-6 bg-paper">
                <h2 className="label-caps text-xs font-black uppercase text-primary border-b border-primary/25 pb-2 mb-4 tracking-wider">
                  {labels.features}
                </h2>
                <ul className="list-disc pl-5 text-xs flex flex-col gap-2 font-serif text-on-surface-variant text-left leading-relaxed">
                  {project.features[language].map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Preview & Detailed Description & Comments (7 Cols) */}
          <div className="md:col-span-7 flex flex-col gap-8">
            {/* Device Preview (Mockup) */}
            {project.imageUrl && (
              <div className="w-full border border-primary p-4 bg-black/5 rounded">
                <DeviceMockup
                  imageUrl={project.imageUrl}
                  title={project.title}
                  defaultMode={project.id === "srb-motor-app" ? "phone" : "laptop"}
                  allowToggle={project.id !== "srb-motor-app"}
                />
              </div>
            )}

            {/* Full Content Article Body */}
            <div className="text-left font-serif text-sm md:text-base leading-relaxed text-on-surface flex flex-col gap-4 border-b hairline-b border-primary/20 pb-8">
              <h2 className="headline-sm uppercase font-sans tracking-tight mb-2">
                {language === "id" ? "RINGKASAN EDISI" : "ARCHIVAL OVERVIEW"}
              </h2>
              {project.fullDescription[language].split("\n\n").map((para, i) => (
                <p key={i} className="whitespace-pre-wrap">{para}</p>
              ))}
            </div>

            {/* Rich-Text Discussion/Comment Section */}
            <RichCommentSection projectId={project.id} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
