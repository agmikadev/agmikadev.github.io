import React from "react";
import type { BeltMissionReport } from "../../../data/BeltData";
import { Card } from "../../CardVariants";
import "../Missions/MissionCard.css";
import "./BeltMissionCard.css";

interface BeltMissionCardProps {
  report: BeltMissionReport;
}

const YELLOW = "hsl(var(--primary))";

export const BeltMissionCard: React.FC<BeltMissionCardProps> = ({
  report,
}) => {
  return (
    <Card
      variant="dark"
      className="mission-card belt-mission-card"
      style={{ borderLeft: `2px solid ${YELLOW}` }}
    >
      <div className="mission-header">
        <h3 className="mission-title" style={{ color: YELLOW }}>
          {report.title}
        </h3>
        <span className="mission-year">{report.year}</span>
      </div>

      <div className="mission-role">{report.role.toUpperCase()}</div>

      <p className="mission-summary">{report.summary}</p>

      <div className="mission-section">
        <span className="mission-section-label" style={{ color: YELLOW }}>
          HIGHLIGHTS
        </span>
        <ul className="mission-highlights">
          {report.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="mission-detail-grid">
        <div className="mission-detail-block">
          <span className="mission-section-label" style={{ color: YELLOW }}>
            DESAFIO
          </span>
          <p className="mission-detail-text">{report.challenges}</p>
        </div>
        <div className="mission-detail-block">
          <span className="mission-section-label" style={{ color: YELLOW }}>
            IMPACTO
          </span>
          <p className="mission-detail-text">{report.impact}</p>
        </div>
      </div>

      {report.aiWorkflow && (
        <div className="mission-ai-block">
          <span className="mission-section-label mission-ai-label">
            AI WORKFLOW
          </span>
          <p className="mission-detail-text">{report.aiWorkflow}</p>
        </div>
      )}

      <div className="mission-tags-container">
        {report.technologies.map((tech) => (
          <span key={tech} className="mission-tag active">
            {tech}
          </span>
        ))}
      </div>

      {report.external_links && (
        <div className="mission-links-container">
          {report.external_links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="mission-link"
              style={{ color: YELLOW }}
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
