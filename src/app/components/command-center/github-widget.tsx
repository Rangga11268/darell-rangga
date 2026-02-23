"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  GithubLogo,
  GitCommit,
  Star,
  Code,
  ArrowSquareOut,
  TrendUp,
  CornersOut,
  GitFork,
  Users,
  MapPin,
  Lightning,
} from "@phosphor-icons/react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";

// --- Types ---
interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
}

interface ActivityItem {
  type: string;
  label: string;
  repo: string;
  message?: string;
  date: string;
}

interface TopLanguage {
  name: string;
  count: number;
  percentage: string;
  color: string;
}

interface TopRepo {
  name: string;
  stars: number;
  forks: number;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string;
}

interface GithubApiData {
  user: GithubUser;
  totalStars: number;
  totalForks: number;
  activityFeed: ActivityItem[];
  topLanguages: TopLanguage[];
  topRepos: TopRepo[];
}

const EVENT_ICONS: Record<string, React.ElementType> = {
  PushEvent: GitCommit,
  WatchEvent: Star,
  ForkEvent: GitFork,
  PullRequestEvent: GitFork,
  CreateEvent: Code,
};

export function GithubWidget() {
  const { t } = useLanguage();
  const [data, setData] = useState<GithubApiData | null>(null);
  const [loading, setLoading] = useState(true);

  // Parallax Tilt Effect
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (!data?.user) return null;

  const { user, totalStars, totalForks, activityFeed, topLanguages, topRepos } =
    data;

  return (
    <div className="w-full h-full relative perspective-1000 group/container min-h-[500px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full relative h-full flex flex-col p-4"
      >
        {/* Main Glass Card */}
        <div className="relative w-full h-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl md:rounded-[40px] shadow-2xl overflow-hidden transform-gpu flex flex-col">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[50px] translate-y-1/3 -translate-x-1/3 z-0" />

          <div className="relative z-10 p-6 md:p-10 flex flex-col gap-6 h-full transform-style-3d">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 transform-gpu translate-z-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={user.avatar_url}
                    alt="GitHub Avatar"
                    width={96}
                    height={96}
                    className="relative w-20 h-20 rounded-full border-2 border-white/50 object-cover shadow-lg"
                    unoptimized
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-white dark:border-black rounded-full" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">
                    {user.name || user.login}
                  </h2>
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="text-sm font-medium text-muted-foreground flex items-center justify-center md:justify-start gap-1 hover:text-primary transition-colors"
                  >
                    <GithubLogo weight="duotone" /> @{user.login}
                    <ArrowSquareOut className="w-3 h-3" />
                  </a>
                  {user.bio && (
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                  {user.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {user.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
                <StatBadge
                  icon={Code}
                  label={t.commandCenter.github.repos}
                  value={user.public_repos}
                />
                <StatBadge icon={Star} label="Stars" value={totalStars} />
                <StatBadge icon={GitFork} label="Forks" value={totalForks} />
                <StatBadge
                  icon={Users}
                  label={t.commandCenter.github.followers}
                  value={user.followers}
                />
                <motion.a
                  href={user.html_url}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-foreground text-background px-5 py-2 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow h-16"
                >
                  <span className="hidden md:inline">
                    {t.commandCenter.github.visit}
                  </span>
                  <CornersOut weight="bold" />
                </motion.a>
              </div>
            </div>

            {/* ── Bento Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-grow transform-gpu translate-z-20">
              {/* Col 1: Activity Feed */}
              <div className="lg:col-span-1 bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-5 backdrop-blur-md flex flex-col min-h-[200px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Lightning weight="fill" className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                    Recent Activity
                  </span>
                </div>
                <ul className="flex flex-col gap-3 flex-grow">
                  {activityFeed.length > 0 ? (
                    activityFeed.map((item, i) => {
                      const Icon = EVENT_ICONS[item.type] ?? GitCommit;
                      return (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="mt-0.5 w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                            <Icon
                              className="w-3.5 h-3.5 text-primary"
                              weight="fill"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground leading-tight">
                              <span className="text-foreground font-semibold">
                                {item.label}
                              </span>{" "}
                              <span className="text-primary font-mono">
                                {item.repo.split("/")[1]}
                              </span>
                            </p>
                            {item.message && (
                              <p className="text-[10px] text-muted-foreground/70 italic line-clamp-1 mt-0.5">
                                &ldquo;{item.message}&rdquo;
                              </p>
                            )}
                            <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                              {new Date(item.date).toLocaleDateString(
                                undefined,
                                { month: "short", day: "numeric" },
                              )}
                            </p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-xs text-muted-foreground italic">
                      No recent activity
                    </li>
                  )}
                </ul>
              </div>

              {/* Col 2+3 */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {/* Contribution Chart */}
                <div className="bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-5 backdrop-blur-md relative overflow-hidden group min-h-[140px]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <TrendUp weight="fill" className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                        {t.commandCenter.github.contributions}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground bg-foreground/5 px-2 py-1 rounded-full">
                      {t.commandCenter.github.lastYear}
                    </span>
                  </div>
                  <div className="w-full flex items-end overflow-x-auto no-scrollbar mask-gradient-x">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://ghchart.rshah.org/10b981/${user.login}`}
                      alt="Contribution Chart"
                      className="min-w-[600px] md:min-w-0 w-auto md:w-full h-auto max-h-[100px] object-contain opacity-80 group-hover:opacity-100 transition-opacity filter sepia-[.2] hue-rotate-[180deg] dark:hue-rotate-0 dark:invert-[.1] saturate-[1.5]"
                    />
                  </div>
                </div>

                {/* Languages + Top Repos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">
                  {/* Languages with percentage bars */}
                  <div className="bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-5 backdrop-blur-md flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t.commandCenter.github.topTech}
                    </span>
                    <div className="flex flex-col gap-2.5">
                      {topLanguages.map((lang) => (
                        <div key={lang.name} className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: lang.color }}
                              />
                              <span className="text-xs font-semibold text-foreground">
                                {lang.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {lang.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.1,
                              }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: lang.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Repos */}
                  <div className="bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-5 backdrop-blur-md flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Top Repos
                    </span>
                    <div className="flex flex-col gap-3 flex-grow">
                      {topRepos.length > 0 ? (
                        topRepos.map((repo) => (
                          <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-2 group/repo hover:bg-foreground/5 -mx-2 px-2 py-1.5 rounded-xl transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground group-hover/repo:text-primary transition-colors truncate flex items-center gap-1">
                                {repo.name}
                                <ArrowSquareOut className="w-3 h-3 opacity-0 group-hover/repo:opacity-100 transition-opacity shrink-0" />
                              </p>
                              {repo.description && (
                                <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                                  {repo.description}
                                </p>
                              )}
                              {repo.language && (
                                <p className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: repo.languageColor,
                                    }}
                                  />
                                  {repo.language}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                                <Star className="w-3 h-3" weight="fill" />{" "}
                                {repo.stars}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <GitFork className="w-3 h-3" /> {repo.forks}
                              </span>
                            </div>
                          </a>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          No starred repos yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface StatBadgeProps {
  icon: React.ElementType;
  label: string;
  value?: number;
}

function StatBadge({ icon: Icon, label, value }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-foreground/5 border border-foreground/5 rounded-2xl w-16 h-16">
      <Icon className="w-4 h-4 text-muted-foreground mb-0.5" />
      <span className="text-base font-bold text-foreground leading-tight">
        {value ?? "—"}
      </span>
      <span className="text-[9px] text-muted-foreground uppercase tracking-wide text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full h-[500px] bg-muted/20 rounded-[40px] animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
