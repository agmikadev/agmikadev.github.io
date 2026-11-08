import React, { useState } from "react";
import type { MissionType } from "../../../data/MissionData";
import type { BeltMissionReport } from "../../../data/BeltData";
import { canonicalTechList } from "../../../data/technologies";
import { resolveMissionPerspective } from "../../../data/perspectives";
import { useProjectNavigation } from "../../../../MissionLog/ProjectNavigationContext";
import { Card } from "../../CardVariants";
import "./MissionCard.css";

type MissionCardData = MissionType | BeltMissionReport;

interface MissionCardProps {
  mission: MissionCardData;
  compact?: boolean;
  planetId?: string;
  perspectiveLabel?: string;
  onTechClick?: (technology: string) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  compact = false,
  planetId,
  perspectiveLabel,
  onTechClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useProjectNavigation();
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
      ? (technology: string) => navigation.openProjects(technology)
      : undefined);

  const renderTechnology = (technology: string) => {
    if (handleTechClick) {
      return (
        <button
          key={technology}
          type="button"
          className="mission-tag active mission-tag-button"
          onClick={() => handleTechClick(technology)}
          aria-label={`Ver projetos com ${technology}`}
        >
          {technology}
        </button>
      );
    }

    return (
      <span key={technology} className="mission-tag active">
        {technology}
      </span>
    );
  };

  return (
    <Card
      variant="dark"
      className={`mission-card ${compact ? "mission-card-compact" : ""} ${perspective ? "mission-card-perspective" : ""}`}
    >
      {perspective && (
        <div className="mission-perspective">
          ÓTICA // {perspectiveLabel ?? planetId}
        </div>
      )}

      {mission.imageUrl && (
        <div className="mission-image-wrapper">
          <img
            className="mission-image"
            src={mission.imageUrl}
            alt={`Interface do projeto ${mission.title}`}
            loading="lazy"
          />
          <span className="mission-year mission-year-floating">{mission.year}</span>
        </div>
      )}

      <div className="mission-content">
        <div className="mission-header">
          <div className="mission-heading">
            <h3 className="mission-title mission-title-accent">{mission.title}</h3>
            <div className="mission-role">
              {role.toUpperCase()}
              {!mission.imageUrl && ` · ${mission.year}`}
            </div>
          </div>
          {!mission.imageUrl && <span className="mission-year">{mission.year}</span>}
        </div>

        <p className="mission-summary">{summary}</p>

        <div className="mission-section">
          <span className="mission-section-label mission-section-label-accent">
            {perspective
              ? `CONTRIBUIÇÃO EM ${(perspectiveLabel ?? planetId ?? "ÁREA").toUpperCase()}`
              : "O QUE FOI FEITO"}
          </span>
          <ul className="mission-highlights">
            {visibleHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="mission-details">
            {highlights.length > visibleHighlights.length && (
              <div className="mission-section">
                <span className="mission-section-label mission-section-label-accent">
                  MAIS DESTAQUES
                </span>
                <ul className="mission-highlights">
                  {highlights.slice(visibleHighlights.length).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mission-detail-grid">
              <div className="mission-detail-block">
                <span className="mission-section-label mission-section-label-accent">
                  DESAFIO
                </span>
                <p className="mission-detail-text">{challenges}</p>
              </div>
              <div className="mission-detail-block">
                <span className="mission-section-label mission-section-label-accent">
                  IMPACTO
                </span>
                <p className="mission-detail-text">{impact}</p>
              </div>
            </div>

            {aiWorkflow && (
              <div className="mission-ai-block">
                <span className="mission-section-label mission-ai-label">
                  AI WORKFLOW
                </span>
                <p className="mission-detail-text">{aiWorkflow}</p>
              </div>
            )}

            {hiddenTechnologies > 0 && (
              <div className="mission-section">
                <span className="mission-section-label mission-section-label-accent">
                  MAIS TECNOLOGIAS
                </span>
                <div className="mission-tags-container">
                  {canonicalTechnologies
                    .slice(visibleTechnologies.length)
                    .map(renderTechnology)}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mission-tags-container">
          {visibleTechnologies.map(renderTechnology)}
          {hiddenTechnologies > 0 && (
            <span className="mission-tag mission-tag-more">+{hiddenTechnologies}</span>
          )}
        </div>

        <div className="mission-footer">
          <div className="mission-links-container">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="mission-link mission-link-accent"
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
            className="mission-expand"
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
