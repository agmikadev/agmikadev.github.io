import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { beltDataModel, type BeltTool } from "../../../data/BeltData";
import { Card } from "../../CardVariants";
import { getSkillColor, YELLOW } from "@/lib/ui-constants";
import { AlternativeTag } from "../shared/AlternativeTag";
import "./AnalyticsTab.css";

interface AnalyticsTabProps {
  planet?: PlanetModel;
  variant?: "planet" | "belt";
}

const categoryLabels: Record<BeltTool["category"], string> = {
  llm: "LLM",
  "agent-framework": "AGENT FRAMEWORK",
  orchestration: "ORCHESTRATION",
  evaluation: "EVALUATION",
  rag: "RAG",
  mcp: "MCP",
  "prompt-engineering": "PROMPT ENGINEERING",
};

const categoryOrder: BeltTool["category"][] = [
  "llm",
  "agent-framework",
  "orchestration",
  "evaluation",
  "rag",
  "mcp",
  "prompt-engineering",
];

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ planet, variant = "planet" }) => {
  const isBelt = variant === "belt";

  if (isBelt) {
    const groupedTools = beltDataModel.tools.reduce<Record<BeltTool["category"], BeltTool[]>>(
      (acc, tool) => {
        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool);
        return acc;
      },
      {} as Record<BeltTool["category"], BeltTool[]>
    );

    return (
      <>
        <div className="analytics-main-header belt-analytics-header">
          <span className="header-label">Progresso de Sincronização do LLMB</span>
          <span className="header-value" style={{ color: YELLOW }}>STATUS: ATIVA</span>
        </div>
        <Card variant="dark" className="analytics-wrapper belt-analytics">
          <div className="analytics-container">
            <div className="analytics-list">
              {categoryOrder.map((category) => {
                const tools = groupedTools[category];
                if (!tools || tools.length === 0) return null;

                return (
                  <div key={category} className="belt-category-group">
                    <h3 className="belt-category-header">{categoryLabels[category]}</h3>
                    {tools.map((tool) => {
                      const color = getSkillColor(tool.proficiency);
                      return (
                        <div className="analytics-row" key={tool.id}>
                          <div className="analytics-row-header">
                            <span className="row-label">{tool.name}</span>
                            <span className="row-value" style={{ color }}>{tool.proficiency}/100</span>
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
                              <span className="alternatives-icon">▸</span>
                              <span className="alternatives-prefix">
                                {" "}Ferramentas Mapeadas (prontas para estudo):{" "}
                              </span>
                              <div className="alternatives-tags">
                                {tool.relatedTechnologies.map((tech, idx) => (
                                  <AlternativeTag key={idx} label={tech} />
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
      </>
    );
  }

  // Planet mode
  if (!planet) return null;

  return (
    <>
      <div className="analytics-main-header">
        <span className="header-label">Progresso de Sincronização do Astronauta</span>
        <span className="header-value" style={{ color: YELLOW }}>STATUS: ESTABILIZADO</span>
      </div>
      <Card variant="dark" className="analytics-wrapper">
        <div className="analytics-container">
          <div className="analytics-list">
            {planet.stats.map((stat, index) => (
              <div className="analytics-row" key={`${stat.label}-${index}`}>
                <div className="analytics-row-header">
                  <span className="row-label">{stat.label}</span>
                  <span
                    className="row-value"
                    style={{ color: getSkillColor(Number(stat.value)) }}
                  >
                    {stat.value}/100
                  </span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${stat.value}%`,
                      backgroundColor: getSkillColor(Number(stat.value)),
                      boxShadow: `0 0 10px ${getSkillColor(Number(stat.value))}`,
                    }}
                  >
                    <div className="metric-grid-overlay"></div>
                  </div>
                </div>

                {stat.alternatives && stat.alternatives.length > 0 && (
                  <div className="analytics-alternatives">
                    <span className="alternatives-icon">▸</span>
                    <span className="alternatives-prefix">
                      {" "}Ferramentas Mapeadas (prontas para estudo):{" "}
                    </span>
                    <div className="alternatives-tags">
                      {stat.alternatives.map((alt, altIndex) => (
                        <AlternativeTag key={altIndex} label={alt} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
