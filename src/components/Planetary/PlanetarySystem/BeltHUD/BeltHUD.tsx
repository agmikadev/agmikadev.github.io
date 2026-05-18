import React, { useState, useCallback } from "react";
import { HudButton, CliHeader, Tabs } from "../../UI";
import { Card } from "../../UI/CardVariants";
import { BeltMissionsTab, BeltAnalyticsTab } from "../../UI/Tabs/Belt";
import { beltDataModel } from "../../data/BeltData";


import "./BeltHUD.css";

interface BeltHUDProps {
  onClose: () => void;
}

export const BeltHUD: React.FC<BeltHUDProps> = ({ onClose }) => {
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
  const beltTabs = [
    {
      id: "missions",
      label: "[ MISSÕES ]",
      content: <BeltMissionsTab />,
    },
    {
      id: "analytics",
      label: "[ MÉTRICAS ]",
      content: <BeltAnalyticsTab />,
    },
  ];

  // =========================================
  // COMPONENT RENDERING
  // =========================================
  return (
    <div
      className="belt-dashboard-overlay"
      style={{ "--theme-color": beltDataModel.color } as React.CSSProperties}
    >
      <div className="belt-dashboard-container">
        {/* --- RETURN BUTTON --- */}
        <div style={{ position: "absolute", zIndex: 20 }}>
          <HudButton
            variant="back"
            label="SYSTEM VIEW"
            themeColor={beltDataModel.color}
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

        {/* --- RIGHT: Full-width HUD content (no left 3D column) --- */}
        <div className="belt-dashboard-right" style={{ fontFamily: "monospace" }}>
          {/* --- 1. THE CLI LINE --- */}
          <CliHeader
            planetId="ai-belt"
            color={beltDataModel.color}
            onComplete={handleFetchComplete}
          />

          {/* --- 2. THE REVEALER --- */}
          {isFetched && (
            <Card variant="yellow" className="fetched-data-wrapper">
              <h1
                className="planet-title"
                style={{
                  color: beltDataModel.color,
                  textShadow: `0 0 15px ${beltDataModel.color}60`,
                }}
              >
                {beltDataModel.name}
              </h1>

              <div
                className="planet-debrief"
                style={{ borderLeft: `2px solid ${beltDataModel.color}` }}
              >
                <strong style={{ color: "#fff" }}>STATUS:</strong> Neural{" "}Backbone <br />
                {beltDataModel.description}
              </div>

              {/* --- 3. TAB Renderer --- */}
              <Tabs
                tabs={beltTabs}
                defaultTabId="missions"
                themeColor={beltDataModel.color}
              />
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};
