import { type FC, type ReactNode } from 'react';
import './styles/MainFrame.css';
import './styles/Container.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';

interface MainFrameProps {
  children?: ReactNode;
}

export const MainFrame: FC<MainFrameProps> = ({ children }) => {
  return (
    <div className="app-container">
      
      {/* --- MIDDLE SECTION: DASHBOARD & SIDEBAR --- */}
      <div className="dashboard-wrapper">
        
        {/* --- MAIN CONTAINER --- */}
        <div className="container">
          {/* Layer 1: Outer Border */}
          <div className="container-border-outer"></div>
          {/* Layer 2: Inner Border */}
          <div className="container-border-inner"></div>

          {/* Header */}
          <div className="header">
            <div className="circles-icon">
              <span></span><span></span>
            </div>
            <div className="header-line"></div>
            <h1>DASHBOARD INTERFACE</h1>
          </div>

          {/* Content */}
          <div className="container-content">
            {children || <PlanetarySystem />}
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

export default MainFrame;