import React from 'react';
import './styles/PlanetarySystem.css';

// Define the data for our 5 planets (No changes to data)
const PLANET_DATA = [
  // OrbitSize increased from 140 to 230 to completely clear the sun
  { id: 'p1', name: 'Astra', color: '#a0e1ff', size: 22, orbitSize: 230, speed: 6, url: '/planet/astra' },
  { id: 'p2', name: 'Helios', color: '#ffb347', size: 28, orbitSize: 310, speed: 10, url: '/planet/helios' },
  { id: 'p3', name: 'Nova', color: '#ff6b6b', size: 24, orbitSize: 390, speed: 15, url: '/planet/nova' },
  { id: 'p4', name: 'Kyber', color: '#4ade80', size: 38, orbitSize: 480, speed: 22, url: '/planet/kyber' },
  { id: 'p5', name: 'Orion', color: '#c084fc', size: 32, orbitSize: 580, speed: 30, url: '/planet/orion' },
];

export const PlanetarySystem: React.FC = () => {
  return (
    <div className="system-container">
      {/* Central Star */}
      <div className="central-star"></div>

      {PLANET_DATA.map((planet) => {
        // Calculate the radius (half of orbitSize)
        const radius = planet.orbitSize / 2;

        return (
          // We pass the data to CSS via Custom Properties
          <div 
            className="orbit-group" 
            key={planet.id}
            style={{ 
              '--radius': `${radius}px`, 
              '--speed': `${planet.speed}s`,
              '--p-color': planet.color,
              '--p-size': `${planet.size}px`
            } as React.CSSProperties}
          >
            {/* 1. The Visual Ring (Scaled to simulate 3D tilt) */}
            <div className="orbit-ring"></div>

            {/* 2. The Planet (Moved via CSS Trig) */}
            <a href={planet.url} className="planet-link" aria-label={`View details for ${planet.name}`}>
              <div className="planet">
                <span className="planet-label">{planet.name}</span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};