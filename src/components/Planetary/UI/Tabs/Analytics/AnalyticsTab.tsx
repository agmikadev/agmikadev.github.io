import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import "./AnalyticsTab.css"; // Lembre-se de importar o CSS!

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
        <span className="header-label">Progresso de Sincronização do Astronauta</span>
        <span className="header-value" style={{ color: planet.color }}>
          STATUS: ESTABILIZADO
        </span>
      </div>

      {/* --- BARRAS DE PROGRESSO --- */}
      <div className="analytics-list">
        {planet.stats.map((stat) => (
          /* Mudei de "stat-card" para "analytics-row" para matar o hover! */
          <div className="analytics-row" key={stat.label}>
            
            {/* O Cabeçalho da Barra (Nome na esquerda, Número na direita) */}
            <div className="analytics-row-header">
              <span className="row-label">{stat.label}</span>
              <span className="row-value" style={{ color: getSkillColor(stat.value) }}>
                {stat.value}/100
              </span>
            </div>

            {/* A Barra de Progresso */}
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
    </div>
  );
};