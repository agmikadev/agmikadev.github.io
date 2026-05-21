import React from "react";
import { TerminalText } from "./TerminalText";
import "./CliHeader.css";
import { HudButton } from "../HudButtons";

interface CliHeaderProps {
  planetId?: string;
  color?: string;
  onComplete?: () => void;
  onBack?: () => void;
  speed?: number;
  command?: string;
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
  planetId = "unknown",
  onComplete,
  onBack,
  speed = 10,
  command,
}) => {
  const terminalCommand = command || `❯ root@ship-os:~# fetch_archives --location="${planetId}"`;

  return (
    <div className="cli-header">
      {onBack && (
        <HudButton
          variant="back"
          label="SYSTEM VIEW"
          onClick={onBack}
          themeColor="hsl(var(--primary))"
          icon={BACK_ICON}
        />
      )}

      <TerminalText
        key={`${planetId}-cli`}
        text={terminalCommand}
        speed={speed}
        onComplete={onComplete}
      />
    </div>
  );
};