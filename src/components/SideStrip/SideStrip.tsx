import React, { useState } from "react";
import "./SideStrip.css";

// Importando seus sub-componentes
import { AstronautHeader } from "./SubComponents/AstronautHeader";
import { TelemetryStats } from "./SubComponents/TelemetryStats";
import { FooterInfo } from "./SubComponents/FooterInfo";

export const SideStrip: React.FC = () => {
  // --- LÓGICA DO CYCLER ---
  const [activeTab, setActiveTab] = useState<"manifesto" | "stack">("manifesto");
  const [isHovered, setIsHovered] = useState(false);

  // --- A FUNÇÃO QUE FALTAVA ---
  // Essa função é chamada automaticamente quando a barra de progresso termina (5s)
  const handleAnimationEnd = () => {
    setActiveTab((prev) => (prev === "manifesto" ? "stack" : "manifesto"));
  };

  return (
    <aside className="side-strip-container">
      
      <AstronautHeader />
      <TelemetryStats />

      <div className="sci-fi-divider" />

      {/* --- DATA CYCLER CONTAINER --- */}
      <div 
        className={`data-cycler ${isHovered ? "active-hover" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* HEADER DO CYCLER */}
        <div className="cycler-header">
          <div 
            className={`cycler-tab ${activeTab === "manifesto" ? "active" : ""}`}
            onClick={() => setActiveTab("manifesto")}
          >
            // MANIFESTO
          </div>
          <div 
            className={`cycler-tab ${activeTab === "stack" ? "active" : ""}`}
            onClick={() => setActiveTab("stack")}
          >
            // STACK
          </div>
        </div>

        {/* CONTEÚDO DINÂMICO */}
        <div className="cycler-content">
          
          {activeTab === "manifesto" && (
            <div className="content-pane fade-in">
              <p>
                Procurando sempre duas maneiras de resolver o mesmo problema:
          Uma pragmática e uma fora da caixa, aplicando cada uma conforme o contexto.
          <br /><br />
          Está sempre jogando coletivamente,
          seja como baixista no altar da igreja, ou como desenvolvedor no time ágil.
              </p>
            </div>
          )}

          {activeTab === "stack" && (
            <div className="content-pane fade-in">
              <div className="tags-container">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Next.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">Tailwind</span>
                <span className="tag">Three.js</span>
                <span className="tag">Docker</span>
                <span className="tag">Git</span>
              </div>
            </div>
          )}

        </div>
        
        {/* BARRA DE PROGRESSO SINCRONIZADA */}
        <div 
          key={activeTab} 
          className="cycler-progress-bar"
          onAnimationEnd={handleAnimationEnd} // Agora a função existe!
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
        ></div>

      </div>

      <FooterInfo />
      
    </aside>
  );
};