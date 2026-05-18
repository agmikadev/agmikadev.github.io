import React from "react";
import "./BeltNetwork.css";

interface BeltNetworkProps {
  planetPositions: { x: number; y: number; color: string; id: string }[];
  isHovered: boolean;
  beltColor?: string;
}

export const BeltNetwork: React.FC<BeltNetworkProps> = ({
  planetPositions,
  isHovered,
  beltColor = "#a9fc03",
}) => {
  if (planetPositions.length < 2) return null;

  // Build individual line segments between adjacent planets (closing the loop)
  const lines = planetPositions.map((planet, i) => {
    const next = planetPositions[(i + 1) % planetPositions.length];
    return {
      key: `belt-line-${planet.id}-${next.id}`,
      x1: planet.x,
      y1: planet.y,
      x2: next.x,
      y2: next.y,
    };
  });

  return (
    <svg className="belt-network-svg" preserveAspectRatio="none">
      <defs>
        <filter id="belt-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#belt-glow)">
        {lines.map((line) => (
          <line
            key={line.key}
            className="belt-connection"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={beltColor}
            strokeWidth={isHovered ? 2 : 1}
            strokeOpacity={isHovered ? 0.8 : 0.4}
            strokeDasharray="6, 4"
          />
        ))}
      </g>

      {planetPositions.map((planet) => (
        <circle
          key={`belt-node-${planet.id}`}
          className="belt-node"
          cx={planet.x}
          cy={planet.y}
          r={isHovered ? 4 : 3}
          fill={beltColor}
          fillOpacity={isHovered ? 0.6 : 0.3}
        />
      ))}
    </svg>
  );
};
