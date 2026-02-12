"use client";

import { useEffect, useState, useRef } from "react";
import {
  GithubLogo,
  GitCommit,
  Star,
  Code,
  ArrowSquareOut,
  TrendUp,
  CornersOut,
} from "@phosphor-icons/react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";

// --- Types ---
interface GithubData {
  public_repos: number;
  followers: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GithubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{
      message: string;
    }>;
  };
  created_at: string;
}

interface TopLanguage {
  name: string;
  count: number;
  percentage: string;
  color: string;
}

export function GithubWidget() {
  const { t } = useLanguage();
  const [user, setUser] = useState<GithubData | null>(null);
  const [lastEvent, setLastEvent] = useState<GithubEvent | null>(null);
  const [topLanguages, setTopLanguages] = useState<TopLanguage[]>([]);
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
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        if (data.user) setUser(data.user);
        if (data.lastEvent) setLastEvent(data.lastEvent);
        if (data.topLanguages) setTopLanguages(data.topLanguages);
        setLoading(false);
      } catch (error) {
        console.error("GitHub Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="w-full h-full relative perspective-1000 group/container min-h-[500px]">
      {/* Container with Tilt - Added padding buffer to prevent clipping */}
      {/* Container with Tilt - Flex layout to adapt to height */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full relative h-full flex flex-col p-4"
      >
        {/* Main Glass Card Wrapper */}
        <div className="relative w-full h-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl md:rounded-[40px] shadow-2xl overflow-hidden transform-gpu flex flex-col">
          {/* Abstract Gradient Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 z-0" />

          {/* Content Layer */}
          <div className="relative z-10 p-6 md:p-12 flex flex-col flex-grow h-full transform-style-3d">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-6 transform-gpu translate-z-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={user?.avatar_url}
                    alt="Profile"
                    className="relative w-24 h-24 md:w-20 md:h-20 rounded-full border-2 border-white/50 object-cover shadow-lg"
                  />
                  <div className="absolute bottom-1 right-1 md:bottom-0 md:right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-black rounded-full" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground tracking-tight break-all">
                    {user?.login}
                  </h2>
                  <a
                    href={user?.html_url}
                    target="_blank"
                    className="text-sm font-medium text-muted-foreground flex items-center justify-center md:justify-start gap-1 hover:text-primary transition-colors"
                  >
                    <GithubLogo weight="duotone" /> @{user?.login}{" "}
                    <ArrowSquareOut className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                <StatBadge
                  icon={Code}
                  label={t.commandCenter.github.repos}
                  value={user?.public_repos}
                />
                <StatBadge
                  icon={Star}
                  label={t.commandCenter.github.followers}
                  value={user?.followers}
                />
                <motion.a
                  href={user?.html_url}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-foreground text-background px-6 md:px-4 py-2 rounded-2xl md:rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-shadow h-20 md:h-20"
                >
                  <span className="hidden md:inline">
                    {t.commandCenter.github.visit}
                  </span>
                  <CornersOut weight="bold" />
                </motion.a>
              </div>
            </div>

            {/* Bento Grid Layout - Adaptive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow transform-gpu translate-z-20">
              {/* Col 1: Latest Activity */}
              {/* Col 1: Latest Activity */}
              <div className="lg:col-span-1 bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between min-h-[200px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <GitCommit weight="fill" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    {t.commandCenter.github.latestCommit}
                  </span>
                </div>

                <div className="relative pl-4 border-l-2 border-primary/20 flex-grow flex flex-col justify-center">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary" />
                  <p className="text-sm md:text-base font-medium text-foreground italic line-clamp-3 mb-4">
                    &quot;
                    {lastEvent?.payload?.commits?.[0]?.message ||
                      "Updating project structure..."}
                    &quot;
                  </p>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-auto">
                    <span className="font-bold text-primary truncate max-w-[200px]">
                      {lastEvent?.repo.name}
                    </span>
                    <span>
                      {new Date(lastEvent?.created_at || "").toLocaleDateString(
                        undefined,
                        { dateStyle: "long" },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 2 & 3: Stats */}
              <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                {/* Graph */}
                {/* Graph */}
                <div className="flex-grow bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group min-h-[180px]">
                  <div className="flex justify-between items-center mb-2 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <TrendUp weight="fill" />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                        {t.commandCenter.github.contributions}
                      </span>
                    </div>
                    <div className="hidden sm:block text-[10px] font-bold text-muted-foreground bg-foreground/5 px-2 py-1 rounded-full">
                      {t.commandCenter.github.lastYear}
                    </div>
                  </div>

                  <div className="w-full h-full flex items-end justify-start md:justify-center pb-2 overflow-x-auto no-scrollbar mask-gradient-x">
                    <img
                      src={`https://ghchart.rshah.org/10b981/${user?.login}`}
                      alt="Chart"
                      className="min-w-[800px] md:min-w-0 w-auto md:w-full h-auto max-h-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity filter sepia-[.2] hue-rotate-[180deg] dark:hue-rotate-0 dark:invert-[.1] saturate-[1.5]"
                    />
                  </div>
                </div>

                {/* Languages */}
                {/* Languages */}
                <div className="h-auto md:h-20 bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl md:rounded-3xl px-6 py-4 md:py-0 flex flex-wrap md:flex-nowrap items-center gap-4 backdrop-blur-md">
                  <span className="text-xs font-bold uppercase text-muted-foreground shrink-0 w-full md:w-auto">
                    {t.commandCenter.github.topTech}:
                  </span>
                  <div className="flex flex-wrap gap-2 w-full">
                    {topLanguages.slice(0, 4).map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center gap-2 bg-foreground/5 px-3 py-1 rounded-full shrink-0 border border-foreground/5 text-xs"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="font-bold text-foreground">
                          {lang.name}
                        </span>
                      </div>
                    ))}
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
    <div className="flex flex-col items-center justify-center bg-foreground/5 border border-foreground/5 rounded-2xl w-24 h-20">
      <Icon className="w-5 h-5 text-muted-foreground mb-1" />
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground uppercase">
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
