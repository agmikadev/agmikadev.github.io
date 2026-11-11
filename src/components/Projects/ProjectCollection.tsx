import React, { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectCase } from "./ProjectCase";
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
 * so the cards/list/case behavior is the same on every screen.
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
  const [caseState, setCaseState] = useState<ProjectData | null>(null);
  const caseTriggerId = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // The open case follows the current result set: if a filter removes it, the
  // grid takes over without an effect or a second render pass.
  const activeCase =
    caseState && missions.some((mission) => mission.id === caseState.id)
      ? missions.find((mission) => mission.id === caseState.id) ?? caseState
      : null;

  const openCase = useCallback((mission: ProjectData) => {
    caseTriggerId.current = mission.id;
    setCaseState(mission);
  }, []);

  const closeCase = useCallback(() => {
    const triggerId = caseTriggerId.current;
    setCaseState(null);

    // The grid remounts; restore focus to the same card control.
    requestAnimationFrame(() => {
      if (!triggerId) return;
      containerRef.current
        ?.querySelector<HTMLElement>(`[data-case-trigger="${triggerId}"]`)
        ?.focus({ preventScroll: true });
    });
  }, []);

  // Filtering from inside a case should reveal the filtered results.
  const handleCaseTechClick = useCallback(
    (technology: string) => {
      onTechClick?.(technology);
      setCaseState(null);
    },
    [onTechClick],
  );

  // Escape closes the case first, before SALTO's global Escape handler.
  useEffect(() => {
    if (!activeCase) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      closeCase();
    };

    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [activeCase, closeCase]);

  const mode = activeCase ? "case" : activeView;
  const rootClassName = `project-collection project-collection--${mode} ${className ?? ""}`.trim();

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

  return (
    <div ref={containerRef} className={rootClassName} data-view={mode}>
      {activeCase ? (
        <ProjectCase
          mission={activeCase}
          perspectivePlanetId={perspectivePlanetId}
          onTechClick={onTechClick ? handleCaseTechClick : undefined}
          onClose={closeCase}
        />
      ) : activeView === "list" ? (
        missions.map((mission) => (
          <ProjectRow
            key={mission.id}
            mission={mission}
            perspectivePlanetId={perspectivePlanetId}
            onTechClick={onTechClick}
          />
        ))
      ) : (
        missions.map((mission) => (
          <ProjectCard
            key={mission.id}
            mission={mission}
            perspectivePlanetId={perspectivePlanetId}
            onTechClick={onTechClick}
            onOpenCase={openCase}
          />
        ))
      )}
    </div>
  );
};
