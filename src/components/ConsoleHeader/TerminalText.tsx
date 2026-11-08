import React, { useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const TerminalText: React.FC<TerminalTextProps> = ({ 
  text, 
  speed = 30,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete(); 
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className="console__command">
      {displayedText}
      <span className="console__cursor" />
    </span>
  );
};
