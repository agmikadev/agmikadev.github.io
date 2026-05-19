import React from "react";
import type { MissionType } from "../../../data/MissionData";
import { Card } from "../../CardVariants";
import "./MissionCard.css";

interface MissionCardProps {
  mission: MissionType;
  planetTools: string[];
}

const YELLOW = "hsl(var(--primary))";

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  planetTools,
}) => {
  return (
    <Card
      variant="dark"
      className="mission-card"
      style={{ borderLeft: `2px solid ${YELLOW}` }}
    >
      <div className="mission-header">
        <h3 className="mission-title" style={{ color: YELLOW }}>
          {mission.title}
        </h3>
        <span className="mission-year">
          {mission.year}
        </span>
      </div>

      <div className="mission-role">
        {mission.role.toUpperCase()}
      </div>

      <p className="mission-description">
        {mission.technical_briefing}
      </p>

      <div className="mission-tags-container">
        {mission.technologies.map((tech) => {
          const isActive = planetTools.includes(tech);
          return (
            <span
              key={tech}
              className={`mission-tag ${isActive ? "active" : ""}`}
              style={isActive ? {
                borderColor: YELLOW,
                color: YELLOW,
                backgroundColor: "hsl(var(--primary) / 8%)",
                boxShadow: "0 0 10px hsl(var(--primary) / 20%)"
              } : {}}
            >
              {tech}
            </span>
          );
        })}
      </div>

      {mission.external_links && (
        <div className="mission-links-container">
          {mission.external_links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="mission-link"
              style={{ color: YELLOW }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
