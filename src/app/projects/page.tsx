import { projects as localProjects, Project } from "@/app/data/projects";
import { ProjectsClientView } from "./projects-client-view";

export const metadata = {
  title: "All Projects & Archive",
  description: "Daftar lengkap proyek, aplikasi web, AI, dan repositori open-source milik Darell Rangga.",
};

// Next.js ISR: Revalidate the data every 1 hour (3600 seconds)
export const revalidate = 3600;

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
  created_at: string;
  fork: boolean;
}

export default async function ProjectsPage() {
  let githubProjects: Project[] = [];
  
  try {
    const res = await fetch(
      "https://api.github.com/users/Rangga11268/repos?sort=updated&per_page=100",
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (res.ok) {
      const repos: GitHubRepo[] = await res.json();
      
      // Filter out forks (only show original repositories)
      const originalRepos = repos.filter(repo => !repo.fork);
      
      githubProjects = originalRepos.map((repo) => {
        // Find if this GitHub repository is already defined locally in projects.ts
        const matchedLocal = localProjects.find(
          (lp) =>
            lp.githubUrl.toLowerCase() === repo.html_url.toLowerCase() ||
            lp.title.toLowerCase().replace(/\s+/g, "-") === repo.name.toLowerCase()
        );
        
        if (matchedLocal) {
          // Merge local detailed data with live GitHub stats (optional integration)
          return {
            ...matchedLocal,
            // We can append stats to dynamic props if needed, but keeping the schema compatible
          };
        }
        
        // Convert raw GitHub repo data to Project schema
        const cleanTitle = repo.name
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
          
        return {
          id: `gh-${repo.id}`,
          title: cleanTitle,
          shortDescription: {
            en: repo.description || "Open source repository hosted on GitHub.",
            id: repo.description || "Repositori open source yang di-host di GitHub.",
          },
          fullDescription: {
            en: repo.description || "Open source repository hosted on GitHub.",
            id: repo.description || "Repositori open source yang di-host di GitHub.",
          },
          tags: repo.language ? [repo.language] : ["Open Source"],
          imageUrl: "", // Handled as fallback in client side
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || "#",
          colSpan: "col-span-1",
          year: new Date(repo.created_at).getFullYear().toString(),
          role: "Creator",
          features: { en: [], id: [] },
          techStack: repo.language ? [{ name: repo.language }] : [],
        } as Project;
      });
    }
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    // Fallback: If API fails, default to local projects
    githubProjects = localProjects;
  }

  // Deduplicate and combine
  // We want local projects to retain priority, and then append other GitHub repos
  const mergedProjects: Project[] = [...localProjects];
  
  githubProjects.forEach((ghProj) => {
    const exists = mergedProjects.some(
      (p) => 
        p.githubUrl.toLowerCase() === ghProj.githubUrl.toLowerCase() ||
        p.title.toLowerCase() === ghProj.title.toLowerCase()
    );
    if (!exists) {
      mergedProjects.push(ghProj);
    }
  });

  return (
    <ProjectsClientView initialProjects={mergedProjects} />
  );
}
