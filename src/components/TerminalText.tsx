import React, { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number; 
  className?: string;
}

export const TerminalText: React.FC<TerminalTextProps> = ({ 
  text, 
  speed = 30, 
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');

  // ONE SINGLE EFFECT: Handles the typing. No synchronous resets.
  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeWriter = () => {
      if (i < text.length) {
        // Slice the text up to the current index
        setDisplayedText(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(typeWriter, speed);
      }
    };

    // Start the typing loop
    typeWriter();

    // Cleanup: Stops the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {/* Show cursor only if we haven't reached the end of the text */}
      {displayedText.length < text.length && <span className="cli-cursor"></span>}
    </span>
  );
};