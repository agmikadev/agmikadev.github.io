import React, { useState } from "react";

interface AlternativeTagProps {
  label: string;
}

export const AlternativeTag: React.FC<AlternativeTagProps> = ({ label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="alternative-tag"
      style={{
        border: hovered
          ? "1px solid hsl(var(--primary) / 80%)"
          : "1px solid hsl(var(--primary) / 12%)",
        color: "hsl(var(--primary) / 80%)",
        boxShadow: hovered ? "0 0 8px hsl(var(--primary) / 25%)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
};
