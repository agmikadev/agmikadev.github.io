import React from "react";

export interface DividerProps {
  children?: React.ReactNode;
  className?: string;
  yellow?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  children,
  className = "",
  yellow = false,
}) => {
  return (
    <div
      className={`hud-divider ${yellow ? "hud-divider-yellow" : ""} ${className}`}
    >
      <span className="hud-divider-line" />
      {children && <span className="hud-divider-text">{children}</span>}
      <span className="hud-divider-line" />
    </div>
  );
};
