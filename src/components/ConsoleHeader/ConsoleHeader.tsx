import React from "react";
import { TerminalText } from "./TerminalText";
import { ConsoleButton } from "./ConsoleButton";
import "./ConsoleHeader.css";

interface ConsoleHeaderProps {
  planetId?: string;
  onComplete?: () => void;
  onBack?: () => void;
  backLabel?: string;
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

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  planetId = "orbit",
  onComplete,
  onBack,
  backLabel = "VOLTAR AO SISTEMA",
  speed = 10,
  command,
}) => {
  const terminalCommand = command || "❯ órbita --status=online";

  return (
    <header className="console__header">
      {onBack && (
        <ConsoleButton
          variant="back"
          label={backLabel}
          onClick={onBack}
          themeColor="hsl(var(--primary))"
          icon={BACK_ICON}
        />
      )}

      <TerminalText
        key={`${planetId}-command`}
        text={terminalCommand}
        speed={speed}
        onComplete={onComplete}
      />
    </header>
  );
};
