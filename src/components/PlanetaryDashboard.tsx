import React, { useMemo } from "react";
import { HudButton } from "./HudButton";
import { TerminalText } from "./TerminalText";
import { MissionCard } from "./MissionCard";
import { Tabs, type TabItem } from "./Tabs";
import { SwotGrid } from "./SWOTgrid";
import "./styles/PlanetaryDashboard.css";

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
  // --- THE FILTER LOGIC (Memoized for performance) ---
  const relevantMissions = useMemo(() => {
    // 1. Convert "React | Next.js" into ["React", "Next.js"]
    const planetTags = planet.tools.split("|").map((tag) => tag.trim());

    // 2. Filter missions that share at least ONE tag with this planet
    return MISSION_ARCHIVE.filter((mission) =>
      mission.technologies.some((tech) => planetTags.includes(tech)),
    );
  // React strictly tracks the tools string to know when to re-filter
  }, [planet.tools]); 

  // =========================================
  // DEFINE THE TABS DATA
  // =========================================
  const dashboardTabs: TabItem[] = [
    {
      id: "missions",
      label: "[ MISSÕES ]",
      content: (
        <>
          <div className="mission-log-header">
            [ REGISTROS DE MISSÃO ENCONTRADOS: {relevantMissions.length} ]
          </div>
          {relevantMissions.length === 0 ? (
            <div className="mission-error-log">[ERRO]: Nenhuma missão registrada nos arquivos.</div>
          ) : (
            <div className="mission-list">
              {relevantMissions.map((mission) => (
                <MissionCard key={`${planet.id}-${mission.id}`} mission={mission} planetColor={planet.color} planetTools={planet.tools} />
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
        <>
          {/* The Skill Bars */}
          <div className="stats-container" style={{ marginBottom: "24px" }}>
            {planet.stats.map(stat => (
              <div className="stat-group" key={stat.label}>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value" style={{ color: planet.color }}>{stat.value}%</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${stat.value}%`, backgroundColor: planet.color, boxShadow: `0 0 10px ${planet.color}` }} />
                </div>
              </div>
            ))}
          </div>
          {/* The SWOT Grid */}
          <SwotGrid />
        </>
      ),
    },
  ];

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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          
          {/* CLI Header */}
          <div className="cli-header" style={{ color: planet.color }}>
            root@ship-os:~# fetch_archives --location="{planet.id}" <span className="cli-cursor"></span>
          </div>

          <h1 className="planet-title" style={{ color: planet.color, textShadow: `0 0 15px ${planet.color}60` }}>
            <TerminalText key={`${planet.id}-title`} text={planet.name} speed={50} />
          </h1>

          {/* Planet Debrief (Short Lore) */}
          <div className="planet-debrief" style={{ borderLeft: `2px solid ${planet.color}` }}>
            <strong style={{ color: "#fff" }}>STATUS:</strong> {planet.type} <br />
            <TerminalText key={`${planet.id}-lore`} text={planet.lore} speed={10} />
          </div>

          <Tabs 
            tabs={dashboardTabs} 
            defaultTabId="missions" 
            themeColor={planet.color} 
          />

        </div>
      </div>
    </div>
  );
};