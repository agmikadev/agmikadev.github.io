import React from "react";

export interface StarBurstProps {
  size?: number;
  className?: string;
}

export const StarBurst: React.FC<StarBurstProps> = ({
  size = 14,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`hud-starburst ${className}`}
    >
      <path
        d="M12 0L16 8L24 12L16 16L12 24L8 16L0 12L8 8L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
};
