import React from "react";
import { TerminalText } from "./TerminalText";
import "./ConsoleHeader.css";

interface ConsoleHeaderProps {
  planetId?: string;
  onComplete?: () => void;
  speed?: number;
  command?: string;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  planetId = "orbit",
  onComplete,
  speed = 10,
  command,
}) => {
  const terminalCommand = command || "❯ órbita --status=online";

  return (
    <header className="console__header">
      <TerminalText
        key={`${planetId}-command`}
        text={terminalCommand}
        speed={speed}
        onComplete={onComplete}
      />
    </header>
  );
};
