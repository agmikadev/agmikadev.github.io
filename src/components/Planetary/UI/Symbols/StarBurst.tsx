import React from "react";

export interface StarBurstProps {
  size?: number;
  color?: string;
  className?: string;
}

export const StarBurst: React.FC<StarBurstProps> = ({
  size = 12,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`hud-starburst ${className}`}
      style={{ color }}
    >
      <path
        d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
};
