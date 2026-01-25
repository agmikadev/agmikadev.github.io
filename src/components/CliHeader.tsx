import React from "react";
import { TerminalText } from "./TerminalText";
import "./styles/CliHeader.css";

interface CliHeaderProps {
  planetId: string;
  color: string;
  onComplete: () => void;
  speed?: number; // Optional prop with a default value
}

export const CliHeader: React.FC<CliHeaderProps> = ({
  planetId,
  color,
  onComplete,
  speed = 10, // Defaults to your ultra-fast 10ms speed
}) => {
  // Construct the command string cleanly outside the JSX
  const terminalCommand = `root@ship-os:~# fetch_archives --location="${planetId}"`;

  return (
    <div className="cli-header" style={{ color: color }}>
      
      {/* 1. The Safe SVG Prompt */}
      <svg 
        width="14" height="14" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
      
      {/* 2. The Typing Engine */}
      <TerminalText 
        key={`${planetId}-cli`} 
        text={terminalCommand} 
        speed={speed} 
        onComplete={onComplete} 
      />
      
      {/* 3. The Blinking Cursor */}
      <span className="cli-cursor"></span>

    </div>
  );
};