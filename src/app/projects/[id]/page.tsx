import { projects as localProjects, Project } from "@/app/data/projects";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "./project-detail-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string): Promise<Project | null> {
  const local = localProjects.find((p) => p.id === id);
  if (local) return local;

  if (id.startsWith("gh-")) {
    const ghId = id.replace("gh-", "");
    try {
      const res = await fetch(`https://api.github.com/repositories/${ghId}`, {
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const repo = await res.json();
        
        const cleanTitle = repo.name
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (char: string) => char.toUpperCase());

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
          imageUrl: "",
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || "#",
          colSpan: "col-span-1",
          year: new Date(repo.created_at).getFullYear().toString(),
          role: "Creator",
          features: { en: [], id: [] },
          techStack: repo.language ? [{ name: repo.language }] : [],
        } as Project;
      }
    } catch (e) {
      console.error("Failed to fetch repository details from GitHub:", e);
    }
  }
  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Project Details`,
    description: project.shortDescription.en,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailView project={project} />
  );
}
