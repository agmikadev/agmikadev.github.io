import React, { useState } from "react";
import type { MissionType } from "../Planetary/data/MissionData";
import { canonicalTechList } from "../Planetary/data/technologies";
import "./ProjectRow.css";

interface ProjectRowProps {
  mission: MissionType;
  onTechClick: (technology: string) => void;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
  mission,
  onTechClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const technologies = canonicalTechList(mission.technologies);
  const visibleTechnologies = technologies.slice(0, 5);
  const hiddenCount = technologies.length - visibleTechnologies.length;

  const renderTech = (technology: string) => (
    <button
      key={technology}
      type="button"
      className="project-row-tech"
      onClick={() => onTechClick(technology)}
      aria-label={`Filtrar projetos com ${technology}`}
    >
      {technology}
    </button>
  );

  return (
    <article className={`project-row ${expanded ? "project-row-expanded" : ""}`}>
      <div className="project-row-main">
        <div className="project-row-heading">
          <h3 className="project-row-title">{mission.title}</h3>
          <div className="project-row-meta">
            <span>{mission.role}</span>
            <span>{mission.year}</span>
          </div>
        </div>

        <p className="project-row-summary">{mission.summary}</p>

        <div className="project-row-techs">
          {visibleTechnologies.map(renderTech)}
          {hiddenCount > 0 && (
            <span className="project-row-more">+{hiddenCount}</span>
          )}
        </div>

        <div className="project-row-actions">
          <div className="project-row-links">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="project-row-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="project-row-toggle"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? "FECHAR" : "DETALHES"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="project-row-details">
          <div className="project-row-detail-block">
            <span className="project-row-detail-label">O QUE FOI FEITO</span>
            <ul className="project-row-highlights">
              {mission.highlights.slice(0, 4).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="project-row-detail-block">
            <span className="project-row-detail-label">DESAFIO</span>
            <p>{mission.challenges}</p>
          </div>

          <div className="project-row-detail-block">
            <span className="project-row-detail-label">IMPACTO</span>
            <p>{mission.impact}</p>
          </div>

          {mission.aiWorkflow && (
            <div className="project-row-detail-block">
              <span className="project-row-detail-label">AI WORKFLOW</span>
              <p>{mission.aiWorkflow}</p>
            </div>
          )}

          <div className="project-row-detail-block project-row-stack">
            <span className="project-row-detail-label">STACK COMPLETA</span>
            <div className="project-row-techs">
              {technologies.map(renderTech)}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
