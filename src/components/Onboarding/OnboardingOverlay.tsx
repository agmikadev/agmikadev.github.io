import React, { useState } from "react";
import "./OnboardingOverlay.css";

/**
 * Compact first-visit card. It introduces the two navigation modes without
 * blocking the solar system or competing with the single express-mode switch.
 */
export const OnboardingOverlay: React.FC = () => {
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
          Explore no seu ritmo: cada planeta é uma área e o cinturão é a camada
          de IA. Se estiver com pressa, o botão <strong>MODO EXPRESSO</strong> no
          topo vai direto aos projetos e à experiência por tecnologia.
        </p>

        <div className="onboarding-actions">
          <button type="button" className="onboarding-primary" onClick={dismiss}>
            EXPLORAR SISTEMA
          </button>
        </div>

        <p className="onboarding-hint">Tab navega · Enter seleciona · Esc volta</p>
      </div>
    </div>
  );
};
