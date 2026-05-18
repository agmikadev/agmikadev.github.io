import React from "react";

export interface TripleDotProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  gap?: number;
  className?: string;
}

export const TripleDot: React.FC<TripleDotProps> = ({
  size = "md",
  color = "currentColor",
  gap = 4,
  className = "",
}) => {
  const dotSizes = { sm: 6, md: 8, lg: 12 };
  const dotSize = dotSizes[size];

  return (
    <div
      className={`hud-triple-dot ${className}`}
      style={{ display: "flex", gap, alignItems: "center" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="hud-dot"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            border: `1.5px solid ${color}`,
            backgroundColor: "transparent",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
};
