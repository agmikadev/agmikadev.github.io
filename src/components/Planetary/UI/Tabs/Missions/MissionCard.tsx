import React from "react";
import type { MissionType } from "../../../data/MissionData";
import type { BeltMissionReport } from "../../../data/BeltData";
import { Card } from "../../CardVariants";
import "./MissionCard.css";

type MissionCardData = MissionType | BeltMissionReport;

interface MissionCardProps {
  mission: MissionCardData;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <Card
      variant="dark"
      className="mission-card"
    >
      <div className="mission-header">
        <h3 className="mission-title mission-title-accent">
          {mission.title}
        </h3>
        <span className="mission-year">{mission.year}</span>
      </div>

      <div className="mission-role">{mission.role.toUpperCase()}</div>

      <p className="mission-summary">{mission.summary}</p>

      <div className="mission-section">
        <span className="mission-section-label mission-section-label-accent">
          HIGHLIGHTS
        </span>
        <ul className="mission-highlights">
          {mission.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="mission-detail-grid">
        <div className="mission-detail-block">
          <span className="mission-section-label mission-section-label-accent">
            DESAFIO
          </span>
          <p className="mission-detail-text">{mission.challenges}</p>
        </div>
        <div className="mission-detail-block">
          <span className="mission-section-label mission-section-label-accent">
            IMPACTO
          </span>
          <p className="mission-detail-text">{mission.impact}</p>
        </div>
      </div>

      {mission.aiWorkflow && (
        <div className="mission-ai-block">
          <span className="mission-section-label mission-ai-label">
            AI WORKFLOW
          </span>
          <p className="mission-detail-text">{mission.aiWorkflow}</p>
        </div>
      )}

      <div className="mission-tags-container">
        {mission.technologies.map((tech) => (
          <span key={tech} className="mission-tag active">
            {tech}
          </span>
        ))}
      </div>

      {mission.external_links && (
        <div className="mission-links-container">
          {mission.external_links.map((link) => (
            <a
              key={link.label}
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </Card>
  );
};
