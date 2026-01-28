// Certifique-se de que o CSS abaixo esteja no arquivo correto (ex: SideStrip.css)

export const AstronautHeader = () => (
  <div className="profile-header">
    
    {/* 1. O AVATAR (Centralizado e Compacto) */}
    <div className="avatar-wrapper">
      {/* Anel decorativo girando */}
      <div className="avatar-ring"></div>
      
      {/* A Foto ou Iniciais */}
      <div className="avatar-placeholder">
        <span className="initials">MA</span>
      </div>
      
      {/* Indicador de Status Online */}
      <span className="status-ping"></span>
    </div>

    {/* 2. O BLOCO DE TEXTO (Nome + Função colados) */}
    <div className="header-text-block">
      <h2 className="profile-name">MIKAEL ANGELO</h2>
      <span className="profile-role">DEV. FULLSTACK JR</span>
    </div>

  </div>
);