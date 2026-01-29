import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import "./AnalyticsTab.css";

interface AnalyticsTabProps {
  planet: PlanetModel;
}

const getSkillColor = (value: number) => {
  if (value >= 90) return "#00f0ff";
  if (value >= 75) return "#00ff73";
  if (value >= 50) return "#ffae00";
  return "#ff3366";
};

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ planet }) => {
  return (
    <div className="analytics-container">
      {/* --- CABEÇALHO DA ABA --- */}
      <div className="analytics-main-header">
        <span className="header-label">
          Progresso de Sincronização do Astronauta
        </span>
        <span className="header-value" style={{ color: planet.color }}>
          STATUS: ESTABILIZADO
        </span>
      </div>

      {/* --- BARRAS DE PROGRESSO --- */}
      <div className="analytics-list">
        {planet.stats.map((stat, index) => (
          <div className="analytics-row" key={`${stat.label}-${index}`}>
            {/* O Cabeçalho da Barra (Nome na esquerda, Número na direita) */}
            <div className="analytics-row-header">
              <span className="row-label">{stat.label}</span>
              <span
                className="row-value"
                style={{ color: getSkillColor(Number(stat.value)) }}
              >
                {stat.value}/100
              </span>
            </div>

            {/* A Barra de Progresso */}
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

            {/* NOVO: Alternativas (se existirem) */}
            {stat.alternatives && stat.alternatives.length > 0 && (
              <div className="analytics-alternatives">
                <span className="alternatives-icon">↳</span>
                <span className="alternatives-prefix">
                  {" "}
                  Ferramentas Mapeadas (prontas para estudo):{" "}
                </span>
                <div className="alternatives-tags">
                  {stat.alternatives.map((alt, altIndex) => (
                    <span
                      key={altIndex}
                      className="alternative-tag"
                      style={
                        {
                          borderColor: `${planet.color}40`,
                          color: `${planet.color}cc`,
                          // Adiciona o box-shadow neon no hover usando a cor do planeta
                          "--tag-glow": planet.color,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 8px ${planet.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
