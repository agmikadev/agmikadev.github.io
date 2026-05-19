import React from "react";
import { TerminalText } from "./TerminalText";
import "./CliHeader.css";
import { HudButton } from "../HudButtons";

interface CliHeaderProps {
  planetId: string;
  color: string;
  onComplete: () => void;
  onBack?: () => void;
  speed?: number;
}

const BACK_ICON = (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const CliHeader: React.FC<CliHeaderProps> = ({
  planetId,
  color,
  onComplete,
  onBack,
  speed = 10,
}) => {
  const terminalCommand = `root@ship-os:~# fetch_archives --location="${planetId}"`;

  return (
    <div className="cli-header" style={{ color }}>
      {onBack && (
        <HudButton
          variant="back"
          label="SYSTEM VIEW"
          onClick={onBack}
          themeColor={color}
          icon={BACK_ICON}
        />
      )}

      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>

      <TerminalText
        key={`${planetId}-cli`}
        text={terminalCommand}
        speed={speed}
        onComplete={onComplete}
      />

      <span className="cli-cursor"></span>
    </div>
  );
};