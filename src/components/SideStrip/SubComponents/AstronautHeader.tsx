export const AstronautHeader = () => (
  <div className="profile-header">
    <div className="avatar-wrapper">
      {/* O brilho ao redor do avatar */}
      <div className="avatar-ring"></div> 
      <div className="avatar-placeholder">
        <span className="initials">MA</span>
      </div>
      {/* O indicador verde de "Disponível" */}
      <span className="status-ping"></span> 
    </div>

    <div className="title-group">
      <h2 className="profile-name">MIKAEL ANGELO</h2>
      <p className="profile-role">
        <span className="role-tag">DEV. FULLSTACK JR</span>
      </p>
    </div>
  </div>
);