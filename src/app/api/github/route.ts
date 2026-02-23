import { NextResponse } from "next/server";

// Revalidate every 1 hour (ISR)
export const revalidate = 3600;

interface GithubEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: Array<{ message: string }>; action?: string };
  created_at: string;
}

interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  html_url: string;
  topics: string[];
  fork: boolean;
}

const GITHUB_HEADERS = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
  Accept: "application/vnd.github+json",
};

const EVENT_LABELS: Record<string, string> = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  IssuesEvent: "Opened issue in",
  PullRequestEvent: "Opened PR in",
  DeleteEvent: "Deleted branch in",
  ReleaseEvent: "Released",
};

export async function GET() {
  try {
    const [userRes, eventsRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/Rangga11268", {
        headers: GITHUB_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/Rangga11268/events?per_page=30", {
        headers: GITHUB_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(
        "https://api.github.com/users/Rangga11268/repos?per_page=100&sort=updated",
        { headers: GITHUB_HEADERS, next: { revalidate: 3600 } },
      ),
    ]);

    const [userData, eventsData, reposData] = await Promise.all([
      userRes.json(),
      eventsRes.json(),
      reposRes.json(),
    ]);

    // Activity feed — deduplicate by repo, max 5 distinct events
    const seen = new Set<string>();
    const activityFeed: {
      type: string;
      label: string;
      repo: string;
      message?: string;
      date: string;
    }[] = [];

    if (Array.isArray(eventsData)) {
      for (const e of eventsData as GithubEvent[]) {
        const key = `${e.type}:${e.repo.name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        activityFeed.push({
          type: e.type,
          label: EVENT_LABELS[e.type] ?? e.type.replace("Event", ""),
          repo: e.repo.name,
          message: e.payload?.commits?.[0]?.message,
          date: e.created_at,
        });
        if (activityFeed.length >= 5) break;
      }
    }

    // Repos stats
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

    const langCounts: Record<string, number> = {};
    let totalLang = 0;
    let totalStars = 0;
    let totalForks = 0;

    if (Array.isArray(reposData)) {
      reposData.forEach((repo: GithubRepo) => {
        if (!repo.fork) {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        }
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          totalLang++;
        }
      });
    }

    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / totalLang) * 100).toFixed(1),
        color: LANGUAGE_COLORS[name] || "#8b8b8b",
      }));

    // Top repos (non-fork), sorted by stars then forks
    const topRepos = Array.isArray(reposData)
      ? (reposData as GithubRepo[])
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              b.forks_count - a.forks_count,
          )
          .slice(0, 3)
          .map((r) => ({
            name: r.name,
            stars: r.stargazers_count,
            forks: r.forks_count,
            description: r.description,
            url: r.html_url,
            language: r.language,
            languageColor: LANGUAGE_COLORS[r.language ?? ""] || "#8b8b8b",
          }))
      : [];

    return NextResponse.json({
      user: {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        location: userData.location,
      },
      totalStars,
      totalForks,
      activityFeed,
      topLanguages,
      topRepos,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
