/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Github, GitCommit, Star, Code, ExternalLink } from "lucide-react";
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

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  PHP: "#4F5D95",
  Java: "#b07219",
  Shell: "#89e051",
  Dart: "#00B4AB",
  "Jupyter Notebook": "#DA5B0B",
};

export function GithubWidget() {
  const [user, setUser] = useState<GithubData | null>(null);
  const [lastEvent, setLastEvent] = useState<GithubEvent | null>(null);
  const [topLanguages, setTopLanguages] = useState<TopLanguage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from cached server-side API route
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
      <div className="h-full bg-card/10 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center justify-center">
        <span className="text-xs font-mono text-muted-foreground animate-pulse">
          SYNCING GITHUB DATA...
        </span>
      </div>
    );
  }

  return (
    <div className="h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -z-10 opacity-30 pointer-events-none" />

      {/* Header Profile Section */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-5">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative group/avatar"
          >
            {/* Rotating Rings */}
            <div className="absolute -inset-1 rounded-full border border-primary/30 border-t-primary/80 animate-spin-slow" />
            <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 animate-[spin_10s_linear_infinite_reverse]" />

            <div className="relative z-10 rounded-full p-1 bg-black/50 backdrop-blur-sm">
              <img
                src={user?.avatar_url}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full z-20 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
          </motion.div>

          <div>
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              @{user?.login}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <a
                href={user?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="flex gap-3">
          {[
            { label: "Repos", value: user?.public_repos, icon: GitCommit },
            { label: "Followers", value: user?.followers, icon: Star },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-3 min-w-[80px] hover:bg-white/10 transition-colors cursor-default"
            >
              <stat.icon className="w-4 h-4 text-muted-foreground mb-1" />
              <span className="text-xl font-bold font-mono text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase opacity-70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 relative z-10">
        {/* Contribution Graph (Image Version) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Activity Map
            </div>
            <span className="text-[10px] opacity-50">LAST YEAR</span>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-white/10 overflow-hidden h-36 flex items-center justify-center relative group/graph">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none opacity-0 group-hover/graph:opacity-100 transition-opacity" />
            <img
              src={`https://ghchart.rshah.org/4ade80/${
                user?.login
              }?t=${new Date().getTime()}`}
              alt="Contribution Graph"
              className="w-full h-full object-contain opacity-90 invert dark:invert-0 scale-105 group-hover/graph:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Languages & Latest Commit */}
        <div className="flex flex-col gap-5">
          {/* Languages */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              <Code className="w-4 h-4 text-primary" /> Top Languages
            </div>
            <div className="space-y-2.5">
              {topLanguages.map((lang, idx) => (
                <div key={lang.name} className="group/lang">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="font-semibold text-gray-200">
                      {lang.name}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Commit Terminal */}
          <div className="mt-auto">
            <div className="bg-black/80 rounded-xl border border-white/10 overflow-hidden font-mono text-[11px] shadow-inner">
              {/* Fake Terminal Header */}
              <div className="bg-white/5 px-3 py-1.5 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-auto text-[9px] text-muted-foreground lowercase opacity-50">
                  bash --v
                </span>
              </div>
              {/* Terminal Content */}
              <div className="p-3 text-gray-300 leading-relaxed">
                <div className="flex gap-2">
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-muted-foreground">git log -1</span>
                </div>
                <div className="mt-2 pl-4 border-l-2 border-white/10">
                  <div className="text-yellow-100/90 italic">
                    &quot;
                    {lastEvent?.payload?.commits?.[0]?.message ||
                      "No recent public commits"}
                    &quot;
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[9px] text-muted-foreground">
                    <span className="text-primary">
                      {lastEvent?.repo?.name}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(
                        lastEvent?.created_at || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-2 animate-pulse text-primary">_</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
