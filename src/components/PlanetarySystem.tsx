import React, { useState } from 'react';
import './styles/PlanetarySystem.css';

// 1. Import the data and type from our new file
import { PLANET_DATA, type PlanetType } from './data/PlanetaryData'; 
import { PlanetDashboard } from './PlanetaryDashboard';

export const PlanetarySystem: React.FC = () => {
  // 2. Add the state to track which planet is clicked
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetType | null>(null);

  return (
    <div className="system-container">
      <div className="central-star"></div>

      {PLANET_DATA.map((planet) => {
        const radius = planet.orbitSize / 2;

        return (
          <div 
            className="orbit-group" 
            key={planet.id}
            style={{ 
              '--radius': `${radius}px`, 
              '--r-val': radius, 
              '--speed': `${planet.speed}s`,
              '--p-color': planet.color,
              '--p-size': `${planet.size}px`
            } as React.CSSProperties}
          >
            <div className="orbit-ring"></div>

            {/* 3. Change <a> to <button> to trigger the state */}
            <button 
              className="planet-link" 
              onClick={() => setSelectedPlanet(planet)}
              aria-label={`View details for ${planet.name}`}
            >
              <div className="planet">
                <span className="planet-label">{planet.name}</span>
              </div>
            </button>
          </div>
        );
      })}

      {/* 4. Render the Dashboard if a planet is selected */}
      {selectedPlanet && (
        <PlanetDashboard 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
    </div>
  );
};