import React from "react";
import type { BeltMissionReport, BeltTool } from "../../../data/BeltData";
import { beltDataModel } from "../../../data/BeltData";
import "./BeltMissionCard.css";

interface BeltMissionCardProps {
  report: BeltMissionReport;
  beltColor: string;
}

// Build a lookup map for tool names by ID
const toolMap = new Map<string, BeltTool>(
  beltDataModel.tools.map((tool) => [tool.id, tool])
);

export const BeltMissionCard: React.FC<BeltMissionCardProps> = ({
  report,
  beltColor,
}) => {
  const year = report.date.substring(0, 4);

  return (
    <div
      className="mission-card belt-mission-card"
      style={{ borderLeft: `2px solid ${beltColor}` }}
    >
      {/* --- HEADER --- */}
      <div className="mission-header">
        <h3 className="mission-title" style={{ color: beltColor }}>
          {report.title}
        </h3>
        <span className="mission-year">{year}</span>
      </div>

      {/* --- PROBLEMA --- */}
      <div className="belt-section">
        <span className="belt-section-label">PROBLEMA:</span>
        <p className="belt-section-text">{report.problem}</p>
      </div>

      {/* --- ABORDAGEM --- */}
      <div className="belt-section">
        <span className="belt-section-label">ABORDAGEM:</span>
        <p className="belt-section-text">{report.approach}</p>
      </div>

      {/* --- RESULTADO --- */}
      <div className="belt-section">
        <span className="belt-section-label">RESULTADO:</span>
        <p className="belt-section-text">{report.outcome}</p>
      </div>

      {/* --- DIVIDER --- */}
      <div className="belt-divider" />

      {/* --- FERRAMENTAS --- */}
      <div className="belt-tools-section">
        <span className="belt-section-label">Ferramentas:</span>
        <div className="mission-tags-container">
          {report.toolsUsed.map((toolId) => {
            const tool = toolMap.get(toolId);
            const label = tool ? tool.name : toolId;
            return (
              <span
                key={toolId}
                className="mission-tag active"
                style={{
                  borderColor: beltColor,
                  color: "#fff",
                  backgroundColor: `${beltColor}15`,
                  boxShadow: `0 0 10px ${beltColor}30`,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* --- MTRICAS --- */}
      <div className="belt-metrics-section">
        <span className="belt-section-label">Mtricas:</span>
        <ul className="belt-metrics-list">
          {report.metrics.map((metric, index) => (
            <li key={`${metric.label}-${index}`}>
              <span className="metric-label">{metric.label}:</span>{" "}
              <span className="metric-value">{metric.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
