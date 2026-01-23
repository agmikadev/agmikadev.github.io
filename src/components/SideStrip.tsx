import { type FC } from 'react';
import './styles/SideStrip.css';

export const SideStrip: FC = () => {
  return (
    <aside className="side-strip profile-panel">
      
      {/* --- PROFILE HEADER --- */}
      <div className="profile-header">
        <div className="avatar-container">
          {/* Placeholder for real image */}
          <div className="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </div>
          <div className="status-indicator"></div>
        </div>
        
        <h2 className="profile-name">
          Dan Williams
          <span className="verified-badge">✓</span>
        </h2>
        <p className="profile-role">Full Stack Developer</p>
      </div>

      <div className="divider-line"></div>

      {/* --- STATS ROW --- */}
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">892</span>
          <span className="stat-label">Commits</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">56k</span>
          <span className="stat-label">Lines</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">12</span>
          <span className="stat-label">Projects</span>
        </div>
      </div>

      <div className="divider-line"></div>

      {/* --- BIO SECTION --- */}
      <div className="profile-bio">
        <h3>About</h3>
        <p>
          Building digital experiences that merge art and code. 
          Specialized in React ecosystems and creative UI design.
        </p>
      </div>

      {/* --- TAGS / SKILLS --- */}
      <div className="profile-tags">
        <h3>Tech Stack</h3>
        <div className="tags-container">
          <span className="tag">React</span>
          <span className="tag">TypeScript</span>
          <span className="tag">CSS Modules</span>
          <span className="tag">Vite</span>
          <span className="tag">Node.js</span>
          <span className="tag">Design</span>
        </div>
      </div>

      {/* --- FOOTER INFO (Moved Up) --- */}
      <div className="profile-footer">
        <div className="info-row">
          <span className="label">Location</span>
          <span className="value">New York, USA</span>
        </div>
        <div className="info-row">
          <span className="label">Status</span>
          <span className="value">Open for Work</span>
        </div>
      </div>

      {/* --- NEW SITE FOOTER ANCHOR --- */}
      {/* This acts as the bottom anchor, pushing down to the end of the yellow strip */}
      <div className="sidestrip-site-footer">
        <div className="system-id">SYS.NOMINAL</div>
        <div className="copyright">© 2026 DAN WILLIAMS</div>
      </div>
    </aside>
  );
};