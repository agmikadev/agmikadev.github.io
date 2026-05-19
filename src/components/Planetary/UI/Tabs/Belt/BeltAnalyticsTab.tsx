import React from "react";
import { beltDataModel, type BeltTool } from "../../../data/BeltData";
import { Card } from "../../CardVariants";
import "../Analytics/AnalyticsTab.css";
import "./BeltAnalyticsTab.css";

const getSkillColor = (value: number) => {
  if (value >= 90) return "#00f0ff";
  if (value >= 75) return "#00ff73";
  if (value >= 50) return "#ffae00";
  return "#ff3366";
};

const YELLOW = "hsl(var(--primary))";

const categoryLabels: Record<BeltTool["category"], string> = {
  llm: "LLM",
  "agent-framework": "AGENT FRAMEWORK",
  orchestration: "ORCHESTRATION",
  evaluation: "EVALUATION",
  rag: "RAG",
  mcp: "MCP",
  "prompt-engineering": "PROMPT ENGINEERING",
};

export const BeltAnalyticsTab: React.FC = () => {
  const groupedTools = beltDataModel.tools.reduce<
    Record<BeltTool["category"], BeltTool[]>
  >((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<BeltTool["category"], BeltTool[]>);

  const categoryOrder: BeltTool["category"][] = [
    "llm",
    "agent-framework",
    "orchestration",
    "evaluation",
    "rag",
    "mcp",
    "prompt-engineering",
  ];

  return (
    <Card variant="dark" className="analytics-wrapper belt-analytics">
      <div className="analytics-container">
        <div className="analytics-main-header">
          <span className="header-label">
            Progresso de Sincroniza\u00e7\u00e3o da Rede S.O.N.D.A.
          </span>
                        <span className="header-value" style={{ color: YELLOW }}>
            STATUS: ATIVA
          </span>
        </div>

        <div className="analytics-list">
          {categoryOrder.map((category) => {
            const tools = groupedTools[category];
            if (!tools || tools.length === 0) return null;

            return (
              <div key={category} className="belt-category-group">
                <h3 className="belt-category-header">
                  {categoryLabels[category]}
                </h3>
                {tools.map((tool) => {
                  const color = getSkillColor(tool.proficiency);
                  return (
                    <div className="analytics-row" key={tool.id}>
                      <div className="analytics-row-header">
                        <span className="row-label">{tool.name}</span>
                        <span className="row-value" style={{ color }}>
                          {tool.proficiency}/100
                        </span>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${tool.proficiency}%`,
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
                          }}
                        >
                          <div className="metric-grid-overlay" />
                        </div>
                      </div>

                      <p className="belt-tool-description">{tool.description}</p>

                      {tool.relatedTechnologies.length > 0 && (
                        <div className="analytics-alternatives">
                          <span className="alternatives-icon">\u21b3</span>
                          <span className="alternatives-prefix">
                            {" "}
                            Ferramentas Mapeadas (prontas para estudo):{" "}
                          </span>
                          <div className="alternatives-tags">
                            {tool.relatedTechnologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="alternative-tag"
                          style={
                            {
                              border: "1px solid hsl(var(--primary) / 12%)",
                              color: "hsl(var(--primary) / 80%)",
                            } as React.CSSProperties
                          }
                          onMouseEnter={(e) => {
                            e.currentTarget.style.border = "1px solid hsl(var(--primary) / 80%)";
                            e.currentTarget.style.boxShadow = "0 0 8px hsl(var(--primary) / 25%)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.border = "1px solid hsl(var(--primary) / 12%)";
                            e.currentTarget.style.boxShadow = "";
                          }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
