import React, { useCallback, useMemo, useState } from "react";
import {
  ProjectViewContext,
  readStoredProjectView,
  storeProjectView,
  type ProjectView,
} from "./ProjectViewContext";

/**
 * Shared between SALTO and the planet HUD so switching the layout on one
 * screen carries over to the other (and survives reloads).
 */
export const ProjectViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [view, setViewState] = useState<ProjectView>(readStoredProjectView);

  const setView = useCallback((next: ProjectView) => {
    setViewState(next);
    storeProjectView(next);
  }, []);

  const value = useMemo(() => ({ view, setView }), [view, setView]);

  return (
    <ProjectViewContext.Provider value={value}>
      {children}
    </ProjectViewContext.Provider>
  );
};
