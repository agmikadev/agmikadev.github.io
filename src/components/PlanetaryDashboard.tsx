import React from "react";
import "./styles/PlanetaryDashboard.css";

// Import just the type using the "type" keyword for safety
import type { PlanetType } from "./data/PlanetaryData";

interface DashboardProps {
  planet: PlanetType;
  onClose: () => void;
}

export const PlanetDashboard: React.FC<DashboardProps> = ({
  planet,
  onClose,
}) => {
  return (
    <div className="dashboard-overlay">
      <div className="dashboard-container">
        {/* Return Button */}
        <button
          className="back-btn"
          onClick={onClose}
          aria-label="Return to system view"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>SYSTEM VIEW</span>
        </button>

        {/* LEFT: Zoomed Planet */}
        <div className="dashboard-left">
          <div
            className="big-planet"
            style={{
              backgroundColor: planet.color,
              boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.6), 0 0 50px ${planet.color}60`,
            }}
          ></div>
        </div>

        {/* RIGHT: Data HUD */}
        <div className="dashboard-right">
          <h1 className="planet-title" style={{ color: planet.color }}>
            {planet.name}
          </h1>
          <p className="planet-description">{planet.description}</p>

          <div className="stats-container">
            {/* Stat Bar 1 */}
            <div className="stat-group">
              <span className="stat-label">Habitability</span>
              <span className="stat-value">{planet.habitability}%</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${planet.habitability}%`,
                    backgroundColor: planet.color,
                  }}
                ></div>
              </div>
            </div>

            {/* Stat Bar 2 */}
            <div className="stat-group">
              <span className="stat-label">Resources</span>
              <span className="stat-value">{planet.resources}%</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${planet.resources}%`,
                    backgroundColor: planet.color,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
