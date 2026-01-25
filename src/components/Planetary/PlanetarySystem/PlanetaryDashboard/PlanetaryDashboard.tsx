import React, { useState, useCallback } from "react";
import { HudButton, CliHeader, Tabs, MissionsTab, AnalyticsTab } from "../../UI";

import "./PlanetaryDashboard.css";
import type { PlanetModel } from "../../data";

interface DashboardProps {
  planet: PlanetModel;
  onClose: () => void;
}

export const PlanetDashboard: React.FC<DashboardProps> = ({
  planet,
  onClose,
}) => {
  // =========================================
  // FETCH WAITER (CLI Animation)
  // =========================================
  const [isFetched, setIsFetched] = useState(false);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  // =========================================
  // TABS DATA
  // =========================================
  // Agora as abas apenas carregam os componentes limpos, passando o "planet" como prop.

  const dashboardTabs = [
    {
      id: "missions",
      label: "[ MISSÕES ]",
      content: <MissionsTab planet={planet} />,
    },
    {
      id: "analytics",
      label: "[ MÉTRICAS ]",
      content: <AnalyticsTab planet={planet} />,
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
                {planet.description}
              </div>

              {/* --- 3. TAB Renderer --- */}
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