import React, { useMemo, useState, useCallback } from "react";
import { HudButton } from "./HudButton";
import { CliHeader } from "./CliHeader";
import { MissionCard } from "./MissionCard";
import { Tabs, type TabItem } from "./Tabs";
import "./styles/PlanetaryDashboard.css";
import "./styles/Tabs.css";

// IMPORT THE DATA
import type { PlanetModel } from "./data/PlanetaryData";
import { MISSION_ARCHIVE } from "./data/MissionData";

interface DashboardProps {
  planet: PlanetModel;
  onClose: () => void;
}

export const PlanetDashboard: React.FC<DashboardProps> = ({
  planet,
  onClose,
}) => {
  // =========================================
  // FETCH WAITER
  // =========================================

  // 1. THE FETCH STATE
  const [isFetched, setIsFetched] = useState(false);

  // 2. RESET STATE WHEN PLANET CHANGES
  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  // =========================================
  // THE FILTER LOGIC (Memoized for performance)
  // =========================================

  const relevantMissions = useMemo(() => {
    // FIX: Since planet.tools is already an array, just use it directly!
    const planetTags = planet.tools;

    return MISSION_ARCHIVE.filter((mission) =>
      mission.technologies.some((tech) => planetTags.includes(tech)),
    );
  }, [planet.tools]);

  const getSkillColor = (value: number) => {
    if (value >= 90) return "#00f0ff"; // MASTER: Sci-Fi Cyan
    if (value >= 75) return "#00ff73"; // PROFICIENT: Neon Green
    if (value >= 50) return "#ffae00"; // INTERMEDIATE: Amber/Orange
    return "#ff3366"; // LEARNING: Danger Red
  };

  // =========================================
  // TABS DATA
  // =========================================

  const dashboardTabs: TabItem[] = [
    {
      id: "missions",
      label: `[ MISSÕES: ${relevantMissions.length} ]`,
      content: (
        <>
          {relevantMissions.length === 0 ? (
            <div className="mission-error-log">
              [ERRO]: Nenhuma missão registrada nos arquivos.
            </div>
          ) : (
            <div className="mission-list">
              {relevantMissions.map((mission) => (
                <MissionCard
                  key={`${planet.id}-${mission.id}`}
                  mission={mission}
                  planetColor={planet.color}
                  planetTools={planet.tools}
                />
              ))}
            </div>
          )}
        </>
      ),
    },

    {
      id: "analytics",
      label: "[ MÉTRICAS ]",
      content: (
        <div className="analytics-list">
          <div className="stat-header">
            <span className="stat-label">Progresso de Sincronização do Astronauta</span>
            {/* We reuse the stat-value class to create a cool sci-fi status indicator */}
            <span className="stat-value" style={{ color: planet.color }}>
              STATUS: ESTABILIZADO
            </span>
          </div>

          {/* --- 2. YOUR EXISTING LOOP (Untouched) --- */}
          {planet.stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              {/* Header: Label and Value */}
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <span
                  className="stat-value"
                  style={{ color: getSkillColor(stat.value) }}
                >
                  {stat.value}/100
                </span>
              </div>

              {/* The Progress Bar */}
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${stat.value}%`,
                    /* THE FIX: Colors and glow now react to the number! */
                    backgroundColor: getSkillColor(stat.value),
                    boxShadow: `0 0 10px ${getSkillColor(stat.value)}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // =========================================
  // COMPONENT RENDERING
  // =========================================

  return (
    <div
      className="dashboard-overlay"
      style={{ "--theme-color": planet.color } as React.CSSProperties}
    >
      <div className="dashboard-container">
        {/* --- RETURN BUTTON --- */}
        <div style={{ position: "absolute", zIndex: 20 }}>
          <HudButton
            variant="back"
            label="SYSTEM VIEW"
            themeColor={planet.color}
            onClick={onClose}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
          />
        </div>

        {/* --- LEFT: The 3D Planet --- */}
        <div className="dashboard-left">
          <div
            className="big-planet"
            style={{
              backgroundColor: planet.color,
              boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.6), 0 0 50px ${planet.color}60`,
            }}
          ></div>
        </div>

        {/* --- RIGHT: The Mission HUD --- */}
        <div className="dashboard-right" style={{ fontFamily: "monospace" }}>
          {/* --- 1. THE CLI LINE --- */}
          <CliHeader
            planetId={planet.id}
            color={planet.color}
            onComplete={handleFetchComplete}
          />

          {/* --- 2. THE REVEALER --- */}
          {isFetched && (
            <div className="fetched-data-wrapper">
              <h1
                className="planet-title"
                style={{
                  color: planet.color,
                  textShadow: `0 0 15px ${planet.color}60`,
                }}
              >
                {planet.name}
              </h1>

              <div
                className="planet-debrief"
                style={{ borderLeft: `2px solid ${planet.color}` }}
              >
                <strong style={{ color: "#fff" }}>STATUS:</strong> {planet.type}{" "}
                <br />
                {/* Changed from planet.lore to planet.description */}
                {planet.description}
              </div>

              <Tabs
                tabs={dashboardTabs}
                defaultTabId="missions"
                themeColor={planet.color}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
