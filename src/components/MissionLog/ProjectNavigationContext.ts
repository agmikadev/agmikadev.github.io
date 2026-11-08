import { createContext, useContext } from "react";

export interface ProjectNavigation {
  openProjects: (technology?: string) => void;
}

export const ProjectNavigationContext = createContext<ProjectNavigation | null>(
  null,
);

export function useProjectNavigation(): ProjectNavigation | null {
  return useContext(ProjectNavigationContext);
}
