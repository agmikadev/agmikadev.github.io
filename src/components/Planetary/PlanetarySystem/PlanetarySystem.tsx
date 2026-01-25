import React, { useState } from "react";
import "./PlanetarySystem.css";
import "./PlanetShapes.css";

// 1. Import the data and type from our new file
import { planets, type PlanetModel } from "../data";
import { PlanetDashboard } from "./PlanetaryDashboard/PlanetaryDashboard";

export const PlanetarySystem: React.FC = () => {
  // 2. Add the state to track which planet is clicked
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(
    null,
  );

  return (
    <div className="system-container">
      <div className="central-star"></div>

      {planets.map((planet) => {
        const radius = planet.orbitSize / 2;

        return (
          <div
            className="orbit-group"
            key={planet.id}
            style={
              {
                "--radius": `${radius}`,
                "--r-val": radius,
                "--speed": `${planet.speed}s`,
                "--p-color": planet.color,
                "--p-size": `${planet.size}`,
              } as React.CSSProperties
            }
          >
            <div className="orbit-ring"></div>

            {/* 3. Change <a> to <button> to trigger the state */}
            <button
              className="planet-link"
              onClick={() => setSelectedPlanet(planet)}
            >
              {/* 1. DYNAMIC CLASS: It applies "shape-prism" or "shape-pyramid" automatically */}
              <div className={`planet ${planet.shape === "hexagon" ? "shape-hexagon" : ""}`}></div>

              <span className="planet-label">{planet.name}</span>
            </button>
          </div>
        );
      })}

      {/* 4. Render the Dashboard if a planet is selected */}
      {selectedPlanet && (
        <PlanetDashboard
          key={selectedPlanet.id}
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
};
