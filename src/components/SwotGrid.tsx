import React from "react";
import './styles/Tabs.css';

export const SwotGrid: React.FC = () => {
  return (
    <div className="swot-grid">
      <div className="swot-item">
        <strong style={{ color: "#4ade80" }}>STRENGTHS:</strong>
        <br />
        Arquitetura modular, alta escalabilidade.
      </div>
      <div className="swot-item">
        <strong style={{ color: "#ef4444" }}>WEAKNESSES:</strong>
        <br />
        Curva de aprendizado inicial do ecossistema.
      </div>
      <div className="swot-item">
        <strong style={{ color: "#60a5fa" }}>OPPORTUNITIES:</strong>
        <br />
        Integração com APIs nativas e Server Components.
      </div>
      <div className="swot-item">
        <strong style={{ color: "#facc15" }}>THREATS:</strong>
        <br />
        Mudanças drásticas nas versões do framework.
      </div>
    </div>
  );
};