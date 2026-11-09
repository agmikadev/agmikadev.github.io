import React, { useState } from "react";
import type { MissionType } from "../Planetary/data/MissionData";
import { canonicalTechList } from "../Planetary/data/technologies";
import { resolveMissionPerspective } from "../Planetary/data/perspectives";
import { ExternalLinkIcon } from "../ui/ExternalLinkIcon";
import "./SaltoRow.css";

interface SaltoRowProps {
  mission: MissionType;
  onTechClick: (technology: string) => void;
  perspectivePlanetId?: string;
}

export const SaltoRow: React.FC<SaltoRowProps> = ({
  mission,
  onTechClick,
  perspectivePlanetId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const perspective = resolveMissionPerspective(mission, perspectivePlanetId);
  const role = perspective?.role ?? mission.role;
  const summary = perspective?.summary ?? mission.summary;
  const highlights = perspective?.highlights ?? mission.highlights;
  const challenges = perspective?.challenges ?? mission.challenges;
  const impact = perspective?.impact ?? mission.impact;
  const aiWorkflow = perspective?.aiWorkflow ?? mission.aiWorkflow;
  const technologies = canonicalTechList(mission.technologies);
  const visibleTechnologies = technologies.slice(0, 5);
  const hiddenCount = technologies.length - visibleTechnologies.length;

  const renderTech = (technology: string) => (
    <button
      key={technology}
      type="button"
      className="salto__row-tech"
      onClick={() => onTechClick(technology)}
      aria-label={`Filtrar projetos com ${technology}`}
    >
      {technology}
    </button>
  );

  return (
    <article className={`salto__row ${expanded ? "salto__row--expanded" : ""}`}>
      <div className="salto__row-main">
        <div className="salto__row-heading">
          <h3 className="salto__row-title">{mission.title}</h3>
          <div className="salto__row-meta">
            <span>{role}</span>
            <span>{mission.year}</span>
          </div>
        </div>

        <p className="salto__row-summary">{summary}</p>

        <div className="salto__row-techs">
          {visibleTechnologies.map(renderTech)}
          {hiddenCount > 0 && (
            <span className="salto__row-more">+{hiddenCount}</span>
          )}
        </div>

        <div className="salto__row-actions">
          <div className="salto__row-links">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="salto__row-link"
                aria-label={`${link.label} (abre em nova aba)`}
              >
                {link.label}
                <ExternalLinkIcon />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="salto__row-toggle"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? "FECHAR" : "DETALHES"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="salto__row-details">
          <div className="salto__row-detail">
            <span className="salto__row-detail-label">
              O QUE FOI FEITO
            </span>
            <ul className="salto__row-highlights">
              {highlights.slice(0, 4).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="salto__row-detail">
            <span className="salto__row-detail-label">DESAFIO</span>
            <p>{challenges}</p>
          </div>

          <div className="salto__row-detail">
            <span className="salto__row-detail-label">IMPACTO</span>
            <p>{impact}</p>
          </div>

          {aiWorkflow && (
            <div className="salto__row-detail">
              <span className="salto__row-detail-label">AI WORKFLOW</span>
              <p>{aiWorkflow}</p>
            </div>
          )}

          <div className="salto__row-detail salto__row-stack">
            <span className="salto__row-detail-label">STACK COMPLETA</span>
            <div className="salto__row-techs">
              {technologies.map(renderTech)}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
