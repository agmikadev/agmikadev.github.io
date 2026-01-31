// Certifique-se de importar o CSS (SideStrip.css)

// Configuração dos Links Sociais
const SOCIALS = [
  {
    id: "github",
    url: "https://github.com/angelomikaa",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    id: "linkedin",
    url: "https://linkedin.com/in/angelomikaa",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    id: "email",
    url: "mailto:agmikadesign@gmail.com",
    icon: "M0 3v18h24v-18h-24zm6.623 4l5.377 5.373 5.377-5.373h-10.754zm-4.623 8.926v-7.926l6.372 6.372-6.372 1.554zm.009 2.146l6.385-1.554 3.605 3.605 3.605-3.605 6.385 1.554v-10.146h-20v10.146zm17.991-6.372l6.372-6.372v7.926l-6.372-1.554z",
  },
];

export const FooterInfo = () => (
  <div className="profile-footer">
    
    {/* GRID DE DADOS TÉCNICOS */}
    <div className="info-grid">
      
      {/* Localização */}
      <div className="info-row">
        <span className="label">BASE_GEO:</span>
        <span className="value">S.G. Amarante, CE</span>
      </div>
      
      {/* Status com Ponto Piscante */}
      <div className="info-row">
        <span className="label">STATUS:</span>
        <span className="value status-active">
          <span className="blink-dot"></span>
          OPEN TO WORK
        </span>
      </div>
      
      {/* 1. SOCIAL ROW (Horizontal Icons) */}
      <div className="social-row">
        {SOCIALS.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="social-icon-btn"
            aria-label={social.id}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={social.icon} />
            </svg>
          </a>
        ))}
      </div>
    </div>

    {/* ASSINATURA DO SISTEMA */}
    <div className="system-footer">
      <div className="sys-line">SYS.NOMINAL // V1.0</div>
      <div className="sys-line copyright">© 2026 MIKAEL ANGELO</div>
    </div>
    
  </div>
);