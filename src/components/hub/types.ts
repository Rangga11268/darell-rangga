export type TabKey = "why-hire" | "projects" | "experience" | "skills" | "contact";
export type ProjectFilterKey = "all" | "systems" | "live-web" | "mobile-apps" | "ai-ml";

export interface ProjectLikesState {
  count: number;
  userLiked: boolean;
}
