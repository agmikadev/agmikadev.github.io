import React, { useState } from "react";
import { canonicalTechList } from "../Planetary/data/technologies";
import { resolveMissionPerspective } from "../Planetary/data/perspectives";
import { ExternalLinkIcon } from "../ui/ExternalLinkIcon";
import { useSaltoNavigation } from "../Salto/SaltoNavigationContext";
import { Card } from "../Planetary/UI/CardVariants";
import type { ProjectData } from "./types";
import "./ProjectCard.css";

interface ProjectCardProps {
  mission: ProjectData;
  compact?: boolean;
  perspectivePlanetId?: string;
  onTechClick?: (technology: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  mission,
  compact = false,
  perspectivePlanetId,
  onTechClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useSaltoNavigation();
  const perspective = resolveMissionPerspective(mission, perspectivePlanetId);
  const role = perspective?.role ?? mission.role;
  const summary = perspective?.summary ?? mission.summary;
  const highlights = perspective?.highlights ?? mission.highlights;
  const challenges = perspective?.challenges ?? mission.challenges;
  const impact = perspective?.impact ?? mission.impact;
  const aiWorkflow = perspective?.aiWorkflow ?? mission.aiWorkflow;
  const technologies = perspective?.technologies ?? mission.technologies;
  const visibleHighlights = highlights.slice(0, 3);
  const canonicalTechnologies = canonicalTechList(technologies);
  const visibleTechnologies = canonicalTechnologies.slice(0, 4);
  const hiddenTechnologies = canonicalTechnologies.length - visibleTechnologies.length;
  const detailsId = `project-details-${mission.id}`;
  const handleTechClick =
    onTechClick ??
    (navigation
      ? (technology: string) => navigation.openSalto(technology)
      : undefined);

  const renderTechnology = (technology: string) => {
    if (handleTechClick) {
      return (
        <button
          key={technology}
          type="button"
          className="project-card__tag project-card__tag--button project-card__tag--active"
          onClick={() => handleTechClick(technology)}
          aria-label={`Ver projetos com ${technology}`}
        >
          {technology}
        </button>
      );
    }

    return (
      <span key={technology} className="project-card__tag project-card__tag--active">
        {technology}
      </span>
    );
  };

  return (
    <Card
      variant="dark"
      className={`project-card ${compact ? "project-card--compact" : ""} ${perspective ? "project-card--perspective" : ""}`}
    >
      {mission.imageUrl && (
        <div className="project-card__media">
          <img
            className="project-card__image"
            src={mission.imageUrl}
            alt={`Interface do projeto ${mission.title}`}
            loading="lazy"
          />
          <span className="project-card__year project-card__year--floating">{mission.year}</span>
        </div>
      )}

      <div className="project-card__content">
        <div className="project-card__header">
          <div className="project-card__heading">
            <h3 className="project-card__title">{mission.title}</h3>
            <div className="project-card__role">
              {role.toUpperCase()}
              {!mission.imageUrl && ` · ${mission.year}`}
            </div>
          </div>
          {!mission.imageUrl && <span className="project-card__year">{mission.year}</span>}
        </div>

        <p className="project-card__summary">{summary}</p>

        <div className="project-card__section">
          <span className="project-card__label project-card__label--accent">
            O QUE FOI FEITO
          </span>
          <ul className="project-card__highlights">
            {visibleHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="project-card__details" id={detailsId}>
            {highlights.length > visibleHighlights.length && (
              <div className="project-card__section">
                <span className="project-card__label project-card__label--accent">
                  MAIS DESTAQUES
                </span>
                <ul className="project-card__highlights">
                  {highlights.slice(visibleHighlights.length).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="project-card__detail-grid">
              <div className="project-card__detail">
                <span className="project-card__label project-card__label--accent">
                  DESAFIO
                </span>
                <p className="project-card__detail-text">{challenges}</p>
              </div>
              <div className="project-card__detail">
                <span className="project-card__label project-card__label--accent">
                  IMPACTO
                </span>
                <p className="project-card__detail-text">{impact}</p>
              </div>
            </div>

            {aiWorkflow && (
              <div className="project-card__ai">
                <span className="project-card__label project-card__ai-label">
                  AI WORKFLOW
                </span>
                <p className="project-card__detail-text">{aiWorkflow}</p>
              </div>
            )}

            {hiddenTechnologies > 0 && (
              <div className="project-card__section">
                <span className="project-card__label project-card__label--accent">
                  MAIS TECNOLOGIAS
                </span>
                <div className="project-card__tags">
                  {canonicalTechnologies
                    .slice(visibleTechnologies.length)
                    .map(renderTechnology)}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="project-card__tags">
          {visibleTechnologies.map(renderTechnology)}
          {hiddenTechnologies > 0 && (
            <span className="project-card__tag project-card__tag--more">+{hiddenTechnologies}</span>
          )}
        </div>

        <div className="project-card__footer">
          <div className="project-card__links">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
                aria-label={`${link.label} (abre em nova aba)`}
              >
                <ExternalLinkIcon />
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="project-card__expand"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={expanded ? detailsId : undefined}
          >
            {expanded ? "MENOS DETALHES" : "VER CASE COMPLETO"}
          </button>
        </div>
      </div>
    </Card>
  );
};
