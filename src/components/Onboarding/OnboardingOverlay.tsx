import React, { useEffect, useState } from "react";
import "./OnboardingOverlay.css";

/**
 * Full-screen onboarding overlay shown on first visit.
 * Dismisses itself and stores a flag in localStorage.
 */
export const OnboardingOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenOnboarding");
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true">
      <div className="onboarding-content">
        <h2>WELCOME MISSION CONTROL</h2>
        <p>
          Explore the planetary system. Click a planet or the AI belt to view missions
          and analytics.
        </p>
        <p>
          <strong>Keyboard shortcuts</strong>:
          <ul>
            <li>Tab – navigate focusable elements</li>
            <li>Enter – select planet / close HUD</li>
            <li>Escape – return to system view</li>
          </ul>
        </p>
        <button className="onboarding-close" onClick={dismiss}>
          Got it
        </button>
      </div>
    </div>
  );
};
