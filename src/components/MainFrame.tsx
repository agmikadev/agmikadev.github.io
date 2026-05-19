import { useState, type FC, type ReactNode } from 'react';
import './styles/MainFrame.css';
import './styles/Container.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import type { PlanetModel } from './Planetary/data';

interface MainFrameProps {
  children?: ReactNode;
}

export const MainFrame: FC<MainFrameProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);

  return (
    <div className="app-container">
      <OnboardingOverlay />

      {/* Top HUD bar — full width */}
      <div className="header">
        <div className="circles-icon">
          <span></span><span></span>
        </div>
        <div className="header-line"></div>
        <h1>DASHBOARD INTERFACE</h1>
      </div>

      {/* Middle row: container + sidebar */}
      <div className="dashboard-wrapper">
        <div className="main-column">
          <div className="container">
            <div className="container-content">
              {children || (
                <PlanetarySystem
                  selectedPlanet={selectedPlanet}
                  onSelectPlanet={setSelectedPlanet}
                />
              )}
            </div>
          </div>
        </div>
        <SideStrip />
      </div>

      {/* Bottom HUD bar — full width */}
      <div className="footer">
        <div className="footer-text">STATUS: ONLINE</div>
        <div className="footer-line"></div>
        <div className="stars">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
