"use client";

import { useState, useEffect } from "react";
import { projects } from "@/app/data/projects";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";
import { useTheme } from "next-themes";
import { TabKey, ProjectFilterKey, ProjectLikesState } from "./types";
import { LeftSidebar } from "./left-sidebar";
import { RightSidebar } from "./right-sidebar";
import { ProfileHeader } from "./profile-header";
import { TabNavigation } from "./tab-navigation";
import { ComposeBox } from "./compose-box";
import { MobileBottomBar } from "./mobile-bottom-bar";
import { PinnedThreadTab } from "./tabs/pinned-thread-tab";
import { ProjectsFeedTab } from "./tabs/projects-feed-tab";
import { ExperienceTab } from "./tabs/experience-tab";
import { SkillsTab } from "./tabs/skills-tab";
import { ContactTab } from "./tabs/contact-tab";
import { ArrowLeft, Translate, Sun, Moon } from "@phosphor-icons/react";

export function ExecutiveHub() {
  const { language, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isId = language === "id";
  const [activeTab, setActiveTab] = useState<TabKey>("why-hire");
  const [projectFilter, setProjectFilter] = useState<ProjectFilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [profileLikes, setProfileLikes] = useState(148);
  const [hasLikedProfile, setHasLikedProfile] = useState(false);

  const [projectLikes, setProjectLikes] = useState<
    Record<string, ProjectLikesState>
  >({
    tujago: { count: 54, userLiked: false },
    "titik-aman": { count: 96, userLiked: false },
    makarya: { count: 88, userLiked: false },
    faktanesia: { count: 64, userLiked: false },
    "srb-motor-v3": { count: 37, userLiked: false },
    tirtasense: { count: 32, userLiked: false },
    "satya-hub": { count: 41, userLiked: false },
    "phd-trans": { count: 28, userLiked: false },
    "navara-trans": { count: 22, userLiked: false },
    "aussie-rain-ai": { count: 35, userLiked: false },
  });

  const email = "darellrangga@gmail.com";

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setActiveTab("contact");
    }
    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        setActiveTab("contact");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleLikeProfile = () => {
    if (hasLikedProfile) {
      setProfileLikes((prev) => prev - 1);
      setHasLikedProfile(false);
    } else {
      setProfileLikes((prev) => prev + 1);
      setHasLikedProfile(true);
    }
  };

  const handleLikeProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectLikes((prev) => {
      const current = prev[id] || { count: 20, userLiked: false };
      return {
        ...prev,
        [id]: {
          count: current.userLiked ? current.count - 1 : current.count + 1,
          userLiked: !current.userLiked,
        },
      };
    });
  };

  // Filter project categories
  const allProjects = [
    projects.find((p) => p.id === "titik-aman")!,
    projects.find((p) => p.id === "makarya")!,
    projects.find((p) => p.id === "tujago")!,
    projects.find((p) => p.id === "faktanesia")!,
    projects.find((p) => p.id === "srb-motor-v3")!,
    projects.find((p) => p.id === "phd-trans")!,
    projects.find((p) => p.id === "navara-trans")!,
    projects.find((p) => p.id === "janguleee-trans")!,
    projects.find((p) => p.id === "satya-hub")!,
    projects.find((p) => p.id === "tirtasense")!,
    projects.find((p) => p.id === "cumlaude-area")!,
    projects.find((p) => p.id === "have-a-treat")!,
  ].filter(Boolean);

  const systemProjects = [
    projects.find((p) => p.id === "titik-aman")!,
    projects.find((p) => p.id === "makarya")!,
    projects.find((p) => p.id === "tujago")!,
    projects.find((p) => p.id === "srb-motor-v3")!,
    projects.find((p) => p.id === "satya-hub")!,
  ].filter(Boolean);

  const liveWebProjects = [
    projects.find((p) => p.id === "tujago")!,
    projects.find((p) => p.id === "phd-trans")!,
    projects.find((p) => p.id === "navara-trans")!,
    projects.find((p) => p.id === "janguleee-trans")!,
    projects.find((p) => p.id === "srb-motor-v3")!,
    projects.find((p) => p.id === "have-a-treat")!,
  ].filter(Boolean);

  const mobileAppProjects = [
    projects.find((p) => p.id === "makarya")!,
    projects.find((p) => p.id === "tujago")!,
    projects.find((p) => p.id === "srb-motor-app")!,
  ].filter(Boolean);

  const aiProjects = [
    projects.find((p) => p.id === "faktanesia")!,
    projects.find((p) => p.id === "tirtasense")!,
    projects.find((p) => p.id === "aussie-rain-ai")!,
  ].filter(Boolean);

  const baseProjects =
    projectFilter === "systems"
      ? systemProjects
      : projectFilter === "live-web"
        ? liveWebProjects
        : projectFilter === "mobile-apps"
          ? mobileAppProjects
          : projectFilter === "ai-ml"
            ? aiProjects
            : allProjects;

  const displayedProjects = searchQuery.trim()
    ? baseProjects.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.id.toLowerCase().includes(q) ||
          p.shortDescription.en.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.techStack.some((t) => t.name.toLowerCase().includes(q))
        );
      })
    : baseProjects;

  return (
    <div className="min-h-screen bg-background text-foreground w-full flex justify-center">
      {/* 3-Column Outer Container matching X / Twitter Desktop */}
      <div className="flex w-full min-h-screen justify-between max-w-[1600px]">
        {/* 1. Left Column: Navigation Sidebar */}
        <LeftSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* 2. Middle Column: Main Feed Timeline with fluid flex-1 filling */}
        <main className="flex-1 min-w-0 max-w-[800px] xl:max-w-[860px] border-r border-border/60 min-h-screen pb-24 md:pb-12">
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-border/60">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {activeTab !== "why-hire" && (
                <button
                  onClick={() => setActiveTab("why-hire")}
                  className="p-1.5 rounded-full hover:bg-muted/80 text-foreground transition-colors cursor-pointer shrink-0"
                  title={isId ? "Kembali ke Beranda" : "Back to Home"}
                >
                  <ArrowLeft size={18} weight="bold" />
                </button>
              )}
              <div className="min-w-0">
                <div className="text-base font-black font-display text-foreground leading-tight flex items-center gap-1.5 truncate">
                  Darell Rangga
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <p className="text-[11px] font-mono text-muted-foreground leading-none truncate">
                  {allProjects.length}{" "}
                  {isId
                    ? "Karya Rekayasa · Juara 1 Nasional"
                    : "Projects · National 1st Place"}
                </p>
              </div>
            </div>

            {/* Quick Controls: Language Switcher & Dark/Light Mode Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border/70 bg-muted/40 hover:bg-muted text-xs font-bold font-mono text-foreground transition-all cursor-pointer active:scale-95"
                title={
                  isId
                    ? "Ganti Bahasa ke English"
                    : "Switch Language to Bahasa Indonesia"
                }
                aria-label={
                  isId
                    ? "Ganti Bahasa ke English"
                    : "Switch Language to Bahasa Indonesia"
                }
              >
                <Translate size={14} weight="bold" className="text-primary" />
                <span className="uppercase text-[11px] font-extrabold">
                  {language}
                </span>
              </button>

              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-1.5 sm:p-2 rounded-full border border-border/70 bg-muted/40 hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                title={
                  isDark
                    ? isId
                      ? "Mode Terang"
                      : "Light Mode"
                    : isId
                      ? "Mode Gelap"
                      : "Dark Mode"
                }
                aria-label={
                  isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDark ? (
                  <Sun size={16} weight="bold" className="text-foreground" />
                ) : (
                  <Moon size={16} weight="bold" className="text-foreground" />
                )}
              </button>
            </div>
          </header>

          {/* Profile Header & Banner (Flush to feed edges) */}
          <ProfileHeader
            profileLikes={profileLikes}
            hasLikedProfile={hasLikedProfile}
            onLikeProfile={handleLikeProfile}
            onCopyEmail={handleCopyEmail}
            copied={copied}
            onCopyLink={handleCopyLink}
            linkCopied={linkCopied}
          />

          {/* Social Navigation Tabs (Sticky) */}
          <TabNavigation activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Compose Box (Rendered on Home / Utas tab) */}
          {activeTab === "why-hire" && (
            <ComposeBox
              onSelectTab={setActiveTab}
              onPostMessage={() => {
                handleCopyEmail();
              }}
            />
          )}

          {/* Tab Content Bodies */}
          <div className="min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeTab === "why-hire" && (
                <PinnedThreadTab
                  profileLikes={profileLikes}
                  hasLikedProfile={hasLikedProfile}
                  onLikeProfile={handleLikeProfile}
                  onSelectTab={setActiveTab}
                />
              )}

              {activeTab === "projects" && (
                <div className="p-3 sm:p-4">
                  <ProjectsFeedTab
                    projects={displayedProjects}
                    projectFilter={projectFilter}
                    onFilterChange={setProjectFilter}
                    projectLikes={projectLikes}
                    onLikeProject={handleLikeProject}
                    onSelectTab={setActiveTab}
                  />
                </div>
              )}

              {activeTab === "experience" && (
                <div className="p-3 sm:p-4">
                  <ExperienceTab />
                </div>
              )}

              {activeTab === "skills" && (
                <div className="p-3 sm:p-4">
                  <SkillsTab onSelectTab={setActiveTab} />
                </div>
              )}

              {activeTab === "contact" && (
                <div className="p-3 sm:p-4">
                  <ContactTab
                    email={email}
                    copied={copied}
                    onCopyEmail={handleCopyEmail}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* 3. Right Column: Widgets, Trends, Search & Who to Follow */}
        <RightSidebar
          onSelectTab={setActiveTab}
          onFilterProjects={setProjectFilter}
          onSearchQuery={(q) => {
            setSearchQuery(q);
            setActiveTab("projects");
          }}
        />
      </div>

      {/* Mobile Bottom Navigation Bar (X-style) */}
      <MobileBottomBar activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
}

export default ExecutiveHub;
