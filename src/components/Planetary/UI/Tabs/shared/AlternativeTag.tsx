import React, { useState } from "react";

interface AlternativeTagProps {
  label: string;
}

export const AlternativeTag: React.FC<AlternativeTagProps> = ({ label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`alternative-tag ${hovered ? "alternative-tag-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
};
