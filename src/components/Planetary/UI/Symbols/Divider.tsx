import React from "react";

export interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ children, className = "" }) => {
  return (
    <div className={`hud-divider ${className}`}>
      <span className="hud-divider-line" />
      {children && <span className="hud-divider-text">{children}</span>}
      <span className="hud-divider-line" />
    </div>
  );
};
