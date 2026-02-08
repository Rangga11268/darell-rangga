/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import {
  GithubLogo,
  GitCommit,
  Star,
  Code,
  ArrowSquareOut,
  GitPullRequest,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

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

import { useLanguage } from "@/app/providers/language-provider";

export function GithubWidget() {
  const { t } = useLanguage();
  const [user, setUser] = useState<GithubData | null>(null);
  const [lastEvent, setLastEvent] = useState<GithubEvent | null>(null);
  const [topLanguages, setTopLanguages] = useState<TopLanguage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();

        if (data.user) setUser(data.user);
        if (data.lastEvent) setLastEvent(data.lastEvent);
        if (data.topLanguages) setTopLanguages(data.topLanguages);
      } catch (error) {
        console.error("GitHub Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full bg-card/10 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <GithubLogo className="w-12 h-12 text-muted-foreground animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            {t.loading?.gathering || "SYNCING DATA..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-700 shadow-2xl">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10 opacity-20 pointer-events-none" />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Left Column: Profile & Stats (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-card/20 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <motion.div whileHover={{ scale: 1.1 }} className="relative mb-4">
              <div className="absolute -inset-2 rounded-full border border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
              <div className="relative rounded-full p-1 bg-black/50 border border-white/10">
                <img
                  src={user?.avatar_url}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-1">
              @{user?.login}
            </h3>
            <a
              href={user?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary/80 hover:text-primary flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 transition-all hover:bg-primary/20"
            >
              <GithubLogo weight="fill" />
              github.com
              <ArrowSquareOut />
            </a>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Repos", value: user?.public_repos, icon: Code },
              { label: "Followers", value: user?.followers, icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/20 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-card/40 transition-colors"
              >
                <stat.icon
                  className="w-5 h-5 text-muted-foreground mb-2"
                  weight="duotone"
                />
                <span className="text-2xl font-bold font-mono text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Content (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Top Row: Languages & Terminal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Languages */}
            <div className="bg-card/20 border border-white/5 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                <Code className="w-4 h-4 text-primary" />
                <span>Top Languages</span>
              </div>
              <div className="space-y-3">
                {topLanguages.slice(0, 5).map((lang, idx) => (
                  <div key={lang.name} className="group/lang">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-300 font-medium">
                        {lang.name}
                      </span>
                      <span className="text-zinc-500 font-mono">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                        className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                        style={{
                          backgroundColor: lang.color,
                          color: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal / Latest Activity */}
            <div className="bg-[#0D1117] border border-white/10 rounded-2xl p-5 flex flex-col font-mono text-xs shadow-inner">
              <div className="flex items-center gap-1.5 mb-4 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-auto text-[9px]">latest-commit.sh</span>
              </div>

              <div className="flex-1 text-zinc-400 space-y-2">
                <div className="flex gap-2">
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-500">~</span>
                  <span>git log -1 --pretty=format:&quot;%s&quot;</span>
                </div>
                <div className="pl-4 border-l-2 border-zinc-800 py-1">
                  <p className="text-zinc-200 italic mb-1">
                    &quot;
                    {lastEvent?.payload?.commits?.[0]?.message ||
                      "Refining the digital architecture..."}
                    &quot;
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                    <GitCommit />
                    <span>
                      {new Date(
                        lastEvent?.created_at || "",
                      ).toLocaleDateString()}
                    </span>
                    <span>in</span>
                    <span className="text-primary">
                      {lastEvent?.repo?.name}
                    </span>
                  </div>
                </div>
                <div className="animate-pulse text-primary">_</div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Contribution Graph */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group/graph h-32 md:h-auto">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="absolute top-2 left-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest z-10">
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>Contributions</span>
            </div>

            <div className="w-full h-full flex items-center justify-center overflow-x-auto overflow-y-hidden pt-4 custom-scrollbar">
              <div className="min-w-[600px] w-full transform scale-105 opacity-80 group-hover/graph:opacity-100 group-hover/graph:scale-100 transition-all duration-500 ease-out origin-center">
                <img
                  src={`https://ghchart.rshah.org/4ade80/${user?.login}`}
                  alt="Graph"
                  className="w-full h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
