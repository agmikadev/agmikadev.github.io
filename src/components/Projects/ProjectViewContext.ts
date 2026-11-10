import { createContext, useContext } from "react";

export type ProjectView = "cards" | "list";

export const PROJECT_VIEW_STORAGE_KEY = "projectsView:v1";
export const DEFAULT_PROJECT_VIEW: ProjectView = "cards";

export const isProjectView = (value: unknown): value is ProjectView =>
  value === "cards" || value === "list";

export const readStoredProjectView = (): ProjectView => {
  try {
    const stored = window.localStorage.getItem(PROJECT_VIEW_STORAGE_KEY);
    return isProjectView(stored) ? stored : DEFAULT_PROJECT_VIEW;
  } catch {
    return DEFAULT_PROJECT_VIEW;
  }
};

export const storeProjectView = (view: ProjectView): void => {
  try {
    window.localStorage.setItem(PROJECT_VIEW_STORAGE_KEY, view);
  } catch {
    // Storage can be unavailable; the in-memory preference still applies.
  }
};

export interface ProjectViewContextValue {
  view: ProjectView;
  setView: (view: ProjectView) => void;
}

export const ProjectViewContext = createContext<ProjectViewContextValue | null>(
  null,
);

export const useProjectView = (): ProjectViewContextValue => {
  const context = useContext(ProjectViewContext);
  if (context) return context;

  // Components can render outside the provider (stories, isolated tests).
  return { view: DEFAULT_PROJECT_VIEW, setView: () => undefined };
};
