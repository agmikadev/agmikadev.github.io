import { type FC, type ReactNode } from 'react';
import './styles/PosterLayout.css';
import './styles/Card.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './PlanetarySystem';

interface CardFrameProps {
  children?: ReactNode;
}

export const CardFrame: FC<CardFrameProps> = ({ children }) => {
  return (
    <div className="app-container">
      
      {/* --- MIDDLE SECTION: DASHBOARD & SIDEBAR --- */}
      <div className="dashboard-wrapper">
        
        {/* --- MAIN CARD --- */}
        <div className="card">
          {/* Layer 1: Outer Border */}
          <div className="card-border-outer"></div>
          {/* Layer 2: Inner Border */}
          <div className="card-border-inner"></div>

          <PlanetarySystem />

          {/* Header */}
          <div className="header">
            <div className="circles-icon">
              <span></span><span></span>
            </div>
            <div className="header-line"></div>
            <h1>DASHBOARD INTERFACE</h1>
          </div>

          {/* Content */}
          <div className="card-content">
            {children || <div/>}
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-text">STATUS: ONLINE</div>
            <div className="footer-line"></div>
            <div className="stars">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <SideStrip />
      </div>
    </div>
  );
};

export default CardFrame;