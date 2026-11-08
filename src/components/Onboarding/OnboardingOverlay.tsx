import React, { useState } from "react";
import "./OnboardingOverlay.css";

interface OnboardingOverlayProps {
  onOpenProjects?: () => void;
}

/**
 * Compact first-visit card. It introduces the metaphor without blocking the
 * solar system, and offers a direct path to the project list.
 */
export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({
  onOpenProjects,
}) => {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem("hasSeenOnboarding:v2");
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    try {
      localStorage.setItem("hasSeenOnboarding:v2", "true");
    } catch {
      // Private mode can block storage; dismissal still works for this session.
    }
    setVisible(false);
  };

  const openProjects = () => {
    dismiss();
    onOpenProjects?.();
  };

  if (!visible) return null;

  return (
    <div className="onboarding-overlay" role="dialog" aria-labelledby="onboarding-title">
      <div className="onboarding-content">
        <button
          type="button"
          className="onboarding-close-x"
          onClick={dismiss}
          aria-label="Fechar boas-vindas"
        >
          ✕
        </button>

        <div className="onboarding-kicker">MISSION CONTROL // BEM-VINDO</div>
        <h2 id="onboarding-title">MIKAEL ANGELO</h2>
        <p className="onboarding-role">Full Stack Developer</p>
        <p className="onboarding-copy">
          Projetos reais em design, front-end, back-end, dados e IA. Cada planeta
          é uma área; o cinturão é a camada de IA que atravessa todas elas.
        </p>

        <div className="onboarding-actions">
          <button type="button" className="onboarding-primary" onClick={openProjects}>
            VER PROJETOS
          </button>
          <button type="button" className="onboarding-secondary" onClick={dismiss}>
            EXPLORAR SISTEMA
          </button>
        </div>

        <p className="onboarding-hint">Tab navega · Enter seleciona · Esc volta</p>
      </div>
    </div>
  );
};
