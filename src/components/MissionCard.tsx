import React from "react";
import type { MissionType } from "./data/MissionData";
import "./styles/MissionCard.css";

interface MissionCardProps {
  mission: MissionType;
  planetColor: string;
  planetTools: string[]; // ✅ Correctly typed as an array
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  planetColor,
  planetTools,
}) => {
  return (
    <div 
      className="mission-card" 
      // Gives the card a subtle colored border to match the planet
      style={{ borderLeft: `2px solid ${planetColor}` }} 
    >
      
      {/* --- HEADER --- */}
      <div className="mission-header">
        <h3 className="mission-title" style={{ color: planetColor }}>
          {mission.title}
        </h3>
        <span className="mission-year">
          {mission.year}
        </span>
      </div>

      {/* --- SUBTITLE --- */}
      <div className="mission-role">
        {mission.role.toUpperCase()}
      </div>

      {/* --- DESCRIPTION --- */}
      <p className="mission-description">
        {mission.technical_briefing}
      </p>

      {/* --- TAGS (Dynamic Highlighting) --- */}
      <div className="mission-tags-container">
        {mission.technologies.map((tech) => {
          // ✅ Checks if the planet uses this technology
          const isActive = planetTools.includes(tech); 
          
          return (
            <span 
              key={tech} 
              className={`mission-tag ${isActive ? "active" : ""}`}
              style={isActive ? { 
                // Dynamic styling for ACTIVE tags
                borderColor: planetColor, 
                color: planetColor,
                backgroundColor: `${planetColor}15`, // 15% opacity background
                boxShadow: `0 0 10px ${planetColor}30` // Subtle sci-fi glow
              } : {}}
            >
              {tech}
            </span>
          );
        })}
      </div>

      {/* --- EXTERNAL LINKS --- */}
      {mission.external_links && (
        <div className="mission-links-container">
          {mission.external_links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="mission-link"
              style={{ color: planetColor }}
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
    </div>
  );
};