import React, { type ReactNode } from "react";
import "./ConsoleButton.css";

interface ConsoleButtonProps {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  themeColor?: string;
  variant?: "default" | "back" | "action";
}

export const ConsoleButton: React.FC<ConsoleButtonProps> = ({
  label,
  onClick,
  icon,
  themeColor = "#ffffff",
  variant = "default",
}) => {
  return (
    <button
      className={`console__button console__button--${variant}`}
      onClick={onClick}
      aria-label={label}
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      {icon && <span className="console__button-icon">{icon}</span>}
      <span className="console__button-label">{label}</span>
    </button>
  );
};
