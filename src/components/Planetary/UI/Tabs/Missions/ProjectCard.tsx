import React, { useState } from "react";
import type { MissionType } from "../../../data/MissionData";
import type { BeltMissionReport } from "../../../data/BeltData";
import { canonicalTechList } from "../../../data/technologies";
import { resolveMissionPerspective } from "../../../data/perspectives";
import { useSaltoNavigation } from "../../../../Salto/SaltoNavigationContext";
import { Card } from "../../CardVariants";
import "./ProjectCard.css";

type ProjectCardData = MissionType | BeltMissionReport;

interface ProjectCardProps {
  mission: ProjectCardData;
  compact?: boolean;
  planetId?: string;
  perspectiveLabel?: string;
  onTechClick?: (technology: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  mission,
  compact = false,
  planetId,
  perspectiveLabel,
  onTechClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useSaltoNavigation();
  const perspective = resolveMissionPerspective(mission, planetId);
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
      {perspective && (
        <div className="project-card__perspective">
          ÓTICA // {perspectiveLabel ?? planetId}
        </div>
      )}

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
            {perspective
              ? `CONTRIBUIÇÃO EM ${(perspectiveLabel ?? planetId ?? "ÁREA").toUpperCase()}`
              : "O QUE FOI FEITO"}
          </span>
          <ul className="project-card__highlights">
            {visibleHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="project-card__details">
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
                rel="noreferrer"
                className="project-card__link"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="project-card__expand"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? "MENOS DETALHES" : "VER CASE COMPLETO"}
          </button>
        </div>
      </div>
    </Card>
  );
};
