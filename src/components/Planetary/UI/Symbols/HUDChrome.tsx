import React from "react";

export interface HUDChromeRowProps {
  label: string;
  className?: string;
}

export const HUDChromeRow: React.FC<HUDChromeRowProps> = ({
  label,
  className = "",
}) => (
  <div className={`hud-chrome-row ${className}`}>
    <div className="hud-chrome-circles">
      <span />
      <span />
      <span />
    </div>
    <div className="hud-chrome-line" />
    <span className="hud-chrome-label">{label}</span>
    <div className="hud-chrome-line" />
  </div>
);
