"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GithubLogo,
  GitCommit,
  Star,
  Code,
  ArrowSquareOut,
  GitFork,
  Users,
  MapPin,
  Lightning,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
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
  const { language } = useLanguage();
  const [data, setData] = useState<GithubApiData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const { user, totalStars, totalForks, activityFeed, topLanguages, topRepos } = data;

  return (
    <div className="w-full h-full bg-paper flex flex-col gap-8">
      {/* ── Top Section: Identity ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b hairline-b border-primary/20 pb-8">
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="relative shrink-0">
            <div className="w-24 h-24 border-rule-thick border-primary p-1 bg-paper">
              <Image
                src={user.avatar_url}
                alt="GitHub Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover grayscale contrast-125"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-paper p-1 border hairline border-primary">
              <GithubLogo size={16} weight="bold" />
            </div>
          </div>
          <div>
            <h2 className="headline-sm uppercase leading-none mb-2">{user.name || user.login}</h2>
            <p className="label-caps text-[10px] opacity-60 mb-2">@{user.login}</p>
            {user.location && (
              <p className="text-[10px] label-caps flex items-center gap-1 opacity-40">
                <MapPin size={12} /> {user.location}
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-l hairline-t hairline-l border-primary/20">
            <StatBox label="Repositories" value={user.public_repos} />
            <StatBox label="Stars Earned" value={totalStars} />
            <StatBox label="Forks Count" value={totalForks} />
            <StatBox label="Followers" value={user.followers} />
          </div>
          <div className="mt-6">
             <p className="editor-note text-sm italic opacity-60">
              &quot;{user.bio || "Active contributor in the global open-source intelligence network."}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Section: Feed & Details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-4 border-r hairline-r border-primary/10 pr-0 lg:pr-8">
          <div className="flex items-center gap-2 mb-6">
            <Lightning size={16} weight="bold" className="text-primary" />
            <h3 className="label-caps text-xs font-bold tracking-widest">Recent Activity Log</h3>
          </div>
          <div className="space-y-4">
            {activityFeed.map((item, i) => {
              const Icon = EVENT_ICONS[item.type] ?? GitCommit;
              return (
                <div key={i} className="flex gap-4 group">
                  <div className="w-8 h-8 border hairline border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-paper transition-all">
                    <Icon size={14} weight="bold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold leading-tight">
                      <span className="uppercase">{item.label}</span>
                      <span className="opacity-40 mx-2">/</span>
                      <span className="text-primary underline underline-offset-2">{item.repo.split("/")[1]}</span>
                    </p>
                    <p className="text-[9px] label-caps opacity-40 mt-1">
                      {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech & Repos */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Tech */}
          <div>
            <h3 className="label-caps text-xs font-bold tracking-widest mb-6 border-b hairline-b border-primary/10 pb-2">Language Distribution</h3>
            <div className="space-y-4">
              {topLanguages.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase">
                    <span>{lang.name}</span>
                    <span className="font-mono">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-primary/5 border hairline border-primary/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Repos */}
          <div>
            <h3 className="label-caps text-xs font-bold tracking-widest mb-6 border-b hairline-b border-primary/10 pb-2">Active Intelligence</h3>
            <div className="space-y-4">
              {topRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group p-3 border hairline border-primary/10 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold uppercase group-hover:underline">{repo.name}</span>
                    <ArrowSquareOut size={12} weight="bold" />
                  </div>
                  <p className="text-[10px] opacity-60 line-clamp-2 leading-tight h-8">
                    {repo.description || "Project documentation archived in public repository."}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[9px] font-bold flex items-center gap-1">
                      <Star size={10} weight="bold" /> {repo.stars}
                    </span>
                    <span className="text-[9px] font-bold flex items-center gap-1">
                      <GitFork size={10} weight="bold" /> {repo.forks}
                    </span>
                    {repo.language && (
                      <span className="text-[9px] label-caps opacity-40 ml-auto">{repo.language}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-r border-b hairline-r hairline-b border-primary/20 p-4 flex flex-col items-center justify-center">
      <span className="headline-sm text-2xl mb-1">{value}</span>
      <span className="label-caps text-[8px] font-bold opacity-60 text-center">{label}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full h-[500px] border-rule-thick border-primary/10 flex items-center justify-center bg-paper animate-pulse">
      <div className="label-caps opacity-20">Synchronizing Data Feed...</div>
    </div>
  );
}
