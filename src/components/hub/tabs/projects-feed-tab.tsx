"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/providers/language-provider";
import { Project } from "@/app/data/projects";
import { ProjectFilterKey, TabKey, ProjectLikesState } from "../types";
import { ProjectVisualCard } from "../project-visual-card";
import { motion } from "framer-motion";
import {
  CheckCircle,
  DeviceMobile,
  Cpu,
  Sparkle,
  Heart,
  ArrowRight,
  ChatCircleDots,
} from "@phosphor-icons/react";

interface ProjectsFeedTabProps {
  projects: Project[];
  projectFilter: ProjectFilterKey;
  onFilterChange: (filter: ProjectFilterKey) => void;
  projectLikes: Record<string, ProjectLikesState>;
  onLikeProject: (id: string, e: React.MouseEvent) => void;
  onSelectTab: (tab: TabKey) => void;
}

export function ProjectsFeedTab({
  projects,
  projectFilter,
  onFilterChange,
  projectLikes,
  onLikeProject,
  onSelectTab,
}: ProjectsFeedTabProps) {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Filters Bar — horizontal scroll, single row */}
      <div className="flex items-center gap-3 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1">
          {([
            { key: "all", label: isId ? "Semua (12)" : "All (12)", icon: null },
            { key: "web", label: "Fullstack Web (8)", icon: "pulse" },
            { key: "systems", label: isId ? "Sistem & Backend (5)" : "Systems & Backend (5)", icon: "cpu" },
            { key: "mobile-apps", label: isId ? "Mobile Apps (3)" : "Mobile Apps (3)", icon: "mobile" },
            { key: "ai-ml", label: "AI & Data (3)", icon: "sparkle" },
          ] as { key: ProjectFilterKey; label: string; icon: string | null }[]).map(({ key, label, icon }) => {
            const isActive = projectFilter === key || (key === "web" && projectFilter === "live-web");
            return (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/60"
                }`}
              >
                {icon === "pulse" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {icon === "cpu" && <Cpu size={12} weight="bold" />}
                {icon === "mobile" && <DeviceMobile size={12} weight="bold" />}
                {icon === "sparkle" && <Sparkle size={12} weight="bold" />}
                {label}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline-block shrink-0">
          {isId ? "Ketuk untuk baca" : "Tap to read"}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project) => {
          const pLike = projectLikes[project.id] || {
            count: 24,
            userLiked: false,
          };
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              prefetch={true}
              className="p-4 sm:p-5 rounded-3xl bg-card border border-border/80 hover:border-foreground/30 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md block"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/60 shrink-0">
                      <Image
                        src="/img/saya/saya1.webp"
                        alt="Darell"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-foreground font-display">
                          Darell Rangga
                        </span>
                        <CheckCircle
                          size={13}
                          weight="fill"
                          className="text-foreground"
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        @darellrangga • {project.year}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-mono font-semibold">
                    {project.role}
                  </span>
                </div>

                <ProjectVisualCard project={project} />

                <div className="mt-3.5">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {project.isLive && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 text-[10px] font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Web
                      </span>
                    )}
                    {project.hasMobileApp && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 text-[10px] font-mono font-bold flex items-center gap-1">
                        <DeviceMobile size={11} weight="bold" />
                        {project.mobileStack ? project.mobileStack.split(" ")[0] : "App"}
                      </span>
                    )}
                    {project.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-muted text-[10px] font-semibold text-foreground font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors font-display">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {project.shortDescription[language]}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onLikeProject(project.id, e);
                    }}
                    className={`flex items-center gap-1 font-bold text-[11px] transition-colors cursor-pointer ${
                      pLike.userLiked
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart
                      size={14}
                      weight={pLike.userLiked ? "fill" : "bold"}
                    />
                    <span>{pLike.count}</span>
                  </button>

                  <span className="text-[11px] font-bold text-foreground group-hover:underline flex items-center gap-1">
                    <span>
                      {isId ? "Studi Kasus" : "Case Study"}
                    </span>
                    <ArrowRight size={11} weight="bold" />
                  </span>
                </div>

                {project.githubUrl && project.githubUrl !== "#" && (
                  <span className="text-[11px] text-muted-foreground font-mono">
                    GitHub Repo
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-foreground block font-display">
            {isId
              ? "Punya kebutuhan sistem atau posisi engineering di tim Anda?"
              : "Looking for an engineer to architect your next system?"}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {isId
              ? "Klik kartu proyek mana pun untuk membaca utas studi kasus rekayasa secara lengkap."
              : "Click any project card to read the complete technical thread case study."}
          </span>
        </div>
        <button
          onClick={() => onSelectTab("contact")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all shrink-0 cursor-pointer"
        >
          <ChatCircleDots size={14} weight="bold" />
          <span>
            {isId ? "Kirim Pesan Langsung (DM)" : "Send Direct Message"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
