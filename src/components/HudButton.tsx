import React, { type ReactNode } from "react";
import "./styles/HudButton.css";

interface HudButtonProps {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  themeColor?: string;
  variant?: "default" | "back" | "action";
}

export const HudButton: React.FC<HudButtonProps> = ({
  label,
  onClick,
  icon,
  themeColor = "#ffffff",
  variant = "default",
}) => {
  return (
    <button
      className={`hud-btn hud-btn-${variant}`}
      onClick={onClick}
      aria-label={label} // Critical for accessibility since we hide the text on mobile
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      {icon && <span className="hud-icon">{icon}</span>}
      {/* THE FIX: Standardized to hud-label */}
      <span className="hud-label">{label}</span>
    </button>
  );
};
