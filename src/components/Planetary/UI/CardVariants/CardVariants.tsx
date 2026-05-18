import React from "react";
import "./CardVariants.css";

export interface CardProps {
  children: React.ReactNode;
  variant?: "yellow" | "dark" | "glass";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "glass",
  className = "",
}) => {
  const variantClass =
    variant === "yellow"
      ? "hud-card-yellow"
      : variant === "dark"
      ? "hud-card-dark"
      : "hud-card-glass";

  return <div className={`${variantClass} ${className}`}>{children}</div>;
};
