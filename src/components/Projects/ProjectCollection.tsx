import React from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";
import type { ProjectData } from "./types";
import { useProjectView, type ProjectView } from "./ProjectViewContext";
import "./ProjectCollection.css";

interface ProjectCollectionProps {
  missions: ProjectData[];
  perspectivePlanetId?: string;
  onTechClick?: (technology: string) => void;
  /** Overrides the shared preference (used by tests and embedded contexts). */
  view?: ProjectView;
  emptyMessage?: string;
  loading?: boolean;
  loadingMessage?: string;
  className?: string;
}

/**
 * Single entry point for project content. Both SALTO and the planet HUD use it,
 * so the cards/list choice behaves the same on every screen.
 */
export const ProjectCollection: React.FC<ProjectCollectionProps> = ({
  missions,
  perspectivePlanetId,
  onTechClick,
  view,
  emptyMessage,
  loading = false,
  loadingMessage = "SINCRONIZANDO...",
  className,
}) => {
  const { view: preferredView } = useProjectView();
  const activeView = view ?? preferredView;

  if (loading) {
    return (
      <div className={`project-collection project-collection--empty ${className ?? ""}`.trim()}>
        <div className="project-collection__empty">{loadingMessage}</div>
      </div>
    );
  }

  if (missions.length === 0) {
    if (!emptyMessage) return null;

    return (
      <div className={`project-collection project-collection--empty ${className ?? ""}`.trim()}>
        <div className="project-collection__empty">{emptyMessage}</div>
      </div>
    );
  }

  if (activeView === "list") {
    return (
      <div
        className={`project-collection project-collection--list ${className ?? ""}`.trim()}
        data-view="list"
      >
        {missions.map((mission) => (
          <ProjectRow
            key={mission.id}
            mission={mission}
            perspectivePlanetId={perspectivePlanetId}
            onTechClick={onTechClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`project-collection project-collection--cards ${className ?? ""}`.trim()}
      data-view="cards"
    >
      {missions.map((mission) => (
        <ProjectCard
          key={mission.id}
          mission={mission}
          perspectivePlanetId={perspectivePlanetId}
          onTechClick={onTechClick}
        />
      ))}
    </div>
  );
};
