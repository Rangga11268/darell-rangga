import { NextResponse } from "next/server";

// Revalidate every 1 hour (ISR)
export const revalidate = 3600;

interface GithubEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: Array<{ message: string }> };
  created_at: string;
}

export async function GET() {
  try {
    // Fetch user data
    const userRes = await fetch("https://api.github.com/users/Rangga11268", {
      next: { revalidate: 3600 },
    });
    const userData = await userRes.json();

    // Fetch events
    const eventsRes = await fetch(
      "https://api.github.com/users/Rangga11268/events?per_page=10",
      { next: { revalidate: 3600 } }
    );
    const eventsData = await eventsRes.json();
    const pushEvent = eventsData.find(
      (e: GithubEvent) => e.type === "PushEvent"
    );

    // Fetch repos for languages
    const reposRes = await fetch(
      "https://api.github.com/users/Rangga11268/repos?per_page=100&sort=updated",
      { next: { revalidate: 3600 } }
    );
    const reposData = await reposRes.json();

    // Calculate top languages
    interface RepoWithLanguage {
      language: string | null;
    }

    const langCounts: Record<string, number> = {};
    let total = 0;

    if (Array.isArray(reposData)) {
      reposData.forEach((repo: RepoWithLanguage) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          total++;
        }
      });
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

    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / total) * 100).toFixed(1),
        color: LANGUAGE_COLORS[name] || "#ccc",
      }));

    return NextResponse.json({
      user: userData,
      lastEvent: pushEvent || null,
      topLanguages,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
