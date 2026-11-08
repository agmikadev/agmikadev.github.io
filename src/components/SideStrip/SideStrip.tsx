import React, { useState } from "react";
import "./SideStrip.css";
import { AstronautHeader } from "./SubComponents/AstronautHeader";

import { StarBurst } from "../Planetary/UI/Symbols";
import { FooterInfo } from "./SubComponents/FooterInfo";

export const SideStrip: React.FC = () => {
const [activeTab, setActiveTab] = useState<"about" | "stack">("about");
const [isHovered, setIsHovered] = useState(false);

const handleAnimationEnd = () => {
  setActiveTab((prev) => (prev === "about" ? "stack" : "about"));
};

return (
    <aside className="side-strip-container">

      <AstronautHeader />

    {/* --- DATA CYCLER CONTAINER --- */}
    <div
      className={`data-cycler ${isHovered ? "active-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cycler-header">
        <div
          className={`cycler-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <StarBurst size={14} /> SOBRE
        </div>
        <div
          className={`cycler-tab ${activeTab === "stack" ? "active" : ""}`}
          onClick={() => setActiveTab("stack")}
        >
          <StarBurst size={14} /> STACK
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <div className="cycler-content">

        {activeTab === "about" && (
          <div className="content-pane fade-in">
            <p>
              Full stack com base em design. Gosto de resolver o mesmo problema
              por dois caminhos: um direto e um fora da caixa, escolhendo pelo contexto.
              Trabalho bem em time — do design ao deploy.
            </p>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="content-pane fade-in">
            <div className="tags-container">
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">React Router</span>
              <span className="tag">Node.js</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Supabase</span>
              <span className="tag">Cloudflare D1</span>
              <span className="tag">Cloudflare Workers</span>
              <span className="tag">Python</span>
              <span className="tag">Three.js</span>
            </div>
          </div>
        )}

      </div>

      {/* BARRA DE PROGRESSO SINCRONIZADA */}
      <div
        key={activeTab}
        className="cycler-progress-bar"
        onAnimationEnd={handleAnimationEnd}
        style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
      ></div>

    </div>

    <FooterInfo />

  </aside>
);
};
