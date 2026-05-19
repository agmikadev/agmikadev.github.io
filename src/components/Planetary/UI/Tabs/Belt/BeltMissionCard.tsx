import React from "react";
import type { BeltMissionReport, BeltTool } from "../../../data/BeltData";
import { beltDataModel } from "../../../data/BeltData";
import { Card } from "../../CardVariants";
import "./BeltMissionCard.css";

interface BeltMissionCardProps {
  report: BeltMissionReport;
}

const YELLOW = "hsl(var(--primary))";

const toolMap = new Map<string, BeltTool>(
  beltDataModel.tools.map((tool) => [tool.id, tool])
);

export const BeltMissionCard: React.FC<BeltMissionCardProps> = ({
  report,
}) => {
  const year = report.date.substring(0, 4);

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
        <span className="mission-year">{year}</span>
      </div>

      <div className="belt-section">
        <span className="belt-section-label">PROBLEMA:</span>
        <p className="belt-section-text">{report.problem}</p>
      </div>

      <div className="belt-section">
        <span className="belt-section-label">ABORDAGEM:</span>
        <p className="belt-section-text">{report.approach}</p>
      </div>

      <div className="belt-section">
        <span className="belt-section-label">RESULTADO:</span>
        <p className="belt-section-text">{report.outcome}</p>
      </div>

      <div className="belt-divider" />

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
            borderColor: YELLOW,
            color: "#fff",
            backgroundColor: "hsl(var(--primary) / 8%)",
            boxShadow: "0 0 10px hsl(var(--primary) / 20%)",
          }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

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
    </Card>
  );
};
