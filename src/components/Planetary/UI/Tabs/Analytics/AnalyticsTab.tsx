import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";

interface AnalyticsTabProps {
  planet: PlanetModel;
}

// A função de cores vive isolada aqui, sem poluir o painel principal
const getSkillColor = (value: number) => {
  if (value >= 90) return "#00f0ff"; 
  if (value >= 75) return "#00ff73"; 
  if (value >= 50) return "#ffae00"; 
  return "#ff3366";                  
};

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ planet }) => {
  return (
    <div className="analytics-list">
      {/* --- CABEÇALHO --- */}
      <div className="stat-header">
        <span className="stat-label">Progresso de Sincronização do Astronauta</span>
        <span className="stat-value" style={{ color: planet.color }}>
          STATUS: ESTABILIZADO
        </span>
      </div>

      {/* --- BARRAS DE PROGRESSO --- */}
      {planet.stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-header">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value" style={{ color: getSkillColor(stat.value) }}>
              {stat.value}/100
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${stat.value}%`,
                backgroundColor: getSkillColor(stat.value),
                boxShadow: `0 0 10px ${getSkillColor(stat.value)}`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};