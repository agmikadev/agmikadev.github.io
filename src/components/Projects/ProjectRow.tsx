import React, { useState } from "react";
import { canonicalTechList } from "../Planetary/data/technologies";
import { resolveMissionPerspective } from "../Planetary/data/perspectives";
import { ExternalLinkIcon } from "../ui/ExternalLinkIcon";
import { useSaltoNavigation } from "../Salto/SaltoNavigationContext";
import type { ProjectData } from "./types";
import "./ProjectRow.css";

interface ProjectRowProps {
  mission: ProjectData;
  onTechClick?: (technology: string) => void;
  perspectivePlanetId?: string;
}

/**
 * Disclosure row used by the list layout on both SALTO and the planet HUD.
 * The row body opens the details; the title button is the explicit control.
 */
const ProjectRowComponent: React.FC<ProjectRowProps> = ({
  mission,
  onTechClick,
  perspectivePlanetId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useSaltoNavigation();
  const detailsId = `project-row-details-${mission.id}`;
  const perspective = resolveMissionPerspective(mission, perspectivePlanetId);
  const role = perspective?.role ?? mission.role;
  const summary = perspective?.summary ?? mission.summary;
  const highlights = perspective?.highlights ?? mission.highlights;
  const challenges = perspective?.challenges ?? mission.challenges;
  const impact = perspective?.impact ?? mission.impact;
  const aiWorkflow = perspective?.aiWorkflow ?? mission.aiWorkflow;
  const technologies = canonicalTechList(
    perspective?.technologies ?? mission.technologies,
  );
  const visibleTechnologies = technologies.slice(0, 5);
  const hiddenCount = technologies.length - visibleTechnologies.length;
  const handleTechClick =
    onTechClick ??
    (navigation
      ? (technology: string) => navigation.openSalto(technology)
      : undefined);

  const toggleExpanded = () => setExpanded((current) => !current);

  // The explicit control is the title button; this lets pointer users open the
  // row from its non-interactive area without hijacking links, tags or actions.
  const handleRowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button, input, select, textarea")) {
      return;
    }
    toggleExpanded();
  };

  const renderTech = (technology: string) => {
    if (!handleTechClick) {
      return (
        <span key={technology} className="project-row__tech">
          {technology}
        </span>
      );
    }

    return (
      <button
        key={technology}
        type="button"
        className="project-row__tech project-row__tech--button"
        onClick={() => handleTechClick(technology)}
        aria-label={`Filtrar projetos com ${technology}`}
      >
        {technology}
      </button>
    );
  };

  return (
    <article
      className={`project-row ${expanded ? "project-row--expanded" : ""}`}
      data-expanded={expanded}
    >
      <div className="project-row__main" onClick={handleRowClick}>
        <div className="project-row__heading">
          <h3 className="project-row__title">
            <button
              type="button"
              className="project-row__title-button"
              onClick={toggleExpanded}
              aria-expanded={expanded}
              aria-controls={expanded ? detailsId : undefined}
              aria-label={`${expanded ? "Ocultar" : "Ver"} detalhes de ${mission.title}`}
              title={expanded ? "Ocultar detalhes" : "Ver detalhes"}
            >
              <span className="project-row__title-text">{mission.title}</span>
              <span className="project-row__chevron" aria-hidden="true">
                {expanded ? "−" : "+"}
              </span>
            </button>
          </h3>
          <div className="project-row__meta">
            <span>{role}</span>
            <span>{mission.year}</span>
          </div>
        </div>

        <p className="project-row__summary">{summary}</p>

        <div className="project-row__techs">
          {visibleTechnologies.map(renderTech)}
          {hiddenCount > 0 && (
            <span className="project-row__more">+{hiddenCount}</span>
          )}
        </div>

        <div className="project-row__actions">
          <div className="project-row__links">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row__link"
                aria-label={`${link.label} (abre em nova aba)`}
              >
                {link.label}
                <ExternalLinkIcon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="project-row__details" id={detailsId}>
          <div className="project-row__detail">
            <span className="project-row__detail-label">
              O QUE FOI FEITO
            </span>
            <ul className="project-row__highlights">
              {highlights.slice(0, 4).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="project-row__detail">
            <span className="project-row__detail-label">DESAFIO</span>
            <p>{challenges}</p>
          </div>

          <div className="project-row__detail">
            <span className="project-row__detail-label">IMPACTO</span>
            <p>{impact}</p>
          </div>

          {aiWorkflow && (
            <div className="project-row__detail">
              <span className="project-row__detail-label">AI WORKFLOW</span>
              <p>{aiWorkflow}</p>
            </div>
          )}

          <div className="project-row__detail project-row__stack">
            <span className="project-row__detail-label">STACK COMPLETA</span>
            <div className="project-row__techs">
              {technologies.map(renderTech)}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export const ProjectRow = React.memo(ProjectRowComponent);
ProjectRow.displayName = "ProjectRow";
