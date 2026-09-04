export type TabKey =
  | "why-hire"
  | "projects"
  | "experience"
  | "skills"
  | "contact";

export type ProjectFilterKey =
  | "all"
  | "web"
  | "systems"
  | "mobile-apps"
  | "ai-ml"
  | "live-web";

export interface ProjectLikesState {
  count: number;
  userLiked: boolean;
}
