import React from "react";
import "./CardVariants.css";

export type RadiusVariant =
  | "default"
  | "signature"
  | "reverse"
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left"
  | "3corner"
  | "pill"
  | "none";

export interface CardProps {
  children: React.ReactNode;
  variant?: "yellow" | "dark" | "glass";
  radius?: RadiusVariant;
  className?: string;
  style?: React.CSSProperties;
}

const radiusClassMap: Record<RadiusVariant, string> = {
  default: "",
  signature: "hud-radius-signature",
  reverse: "hud-radius-reverse",
  "top-left": "hud-radius-top-left",
  "top-right": "hud-radius-top-right",
  "bottom-right": "hud-radius-bottom-right",
  "bottom-left": "hud-radius-bottom-left",
  "3corner": "hud-radius-3corner",
  pill: "hud-radius-pill",
  none: "hud-radius-none",
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = "glass",
  radius = "default",
  className = "",
  style,
}) => {
  const variantClass =
    variant === "yellow"
      ? "hud-card-yellow"
      : variant === "dark"
        ? "hud-card-dark"
        : "hud-card-glass";

  const radiusClass = radiusClassMap[radius];

  return (
    <div className={`${variantClass} ${radiusClass} ${className}`} style={style}>
      {children}
    </div>
  );
};
