import React from "react";
import "./SideStrip.css";

// Importando os sub-componentes (assumindo que você criou o index.ts na pasta subcomponents)
import { AstronautHeader, TelemetryStats, FooterInfo } from "./SubComponents";

export const SideStrip: React.FC = () => {
  return (
    <aside className="side-strip-container">
      <div className="hud-corner top-left"></div>
      <div className="hud-corner bottom-right"></div>

      <AstronautHeader />

      <hr className="sci-fi-divider" />

      <TelemetryStats />

      <hr className="sci-fi-divider" />

      {/* --- SEÇÃO DA BIO --- */}
      <div className="profile-bio">
        <h3>[ MANIFESTO DO ASTRONAUTA ]</h3>
        <p>
          Desenvolvedor de software e músico, procura sempre duas maneiras de resolver o mesmo problema:
          Uma pragmática e uma fora da caixa, aplicando cada uma conforme o contexto e necessidade do time.

        </p>
      </div>

      {/* --- TAGS / SKILLS --- */}
      <div className="profile-tags">
        <h3>[ STACK PRINCIPAL ]</h3>
        <div className="tags-container">
          <span className="tag">React</span>
          <span className="tag">TypeScript</span>
          <span className="tag">Node.js</span>
          <span className="tag">Tailwind</span>
          <span className="tag">Git</span>
        </div>
      </div>

      {/* Empurra o rodapé para a base do componente */}
      <div className="flex-spacer"></div>

      <FooterInfo />
    </aside>
  );
};