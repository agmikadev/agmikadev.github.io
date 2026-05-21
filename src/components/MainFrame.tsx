import { useState, useCallback, type FC, type ReactNode } from 'react';
import './styles/MainFrame.css';
import './styles/Container.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { CliHeader } from './Planetary/UI';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import type { PlanetModel } from './Planetary/data';

interface MainFrameProps {
  children?: ReactNode;
}

export const MainFrame: FC<MainFrameProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const handleSelectPlanet = useCallback((planet: PlanetModel | null) => {
    setSelectedPlanet(planet);
    setIsFetched(false);
  }, []);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const isDashboard = !!selectedPlanet;
  const cliCommand = isDashboard
    ? `❯ root@ship-os:~# fetch_archives --location="${selectedPlanet.id}"`
    : "❯ root@ship-os:~# Dados do sistema carregados com sucesso. Selecione um objeto espacial para ver mais detalhes";

  return (
    <div className="app-container">
      <OnboardingOverlay />

      <div className="cli-header-wrapper">
        <CliHeader
          key={isDashboard ? `dashboard-${selectedPlanet!.id}` : "solar-view"}
          planetId={isDashboard ? selectedPlanet!.id : "ship-os"}
          command={cliCommand}
          onBack={isDashboard ? () => handleSelectPlanet(null) : undefined}
          onComplete={isDashboard ? handleFetchComplete : undefined}
        />
      </div>

      {/* Middle row: container + sidebar */}
      <div className="dashboard-wrapper">
        <div className="main-column">
          <div className="container">
            <div className="container-content">
              {children || (
                <PlanetarySystem
                  selectedPlanet={selectedPlanet}
                  onSelectPlanet={handleSelectPlanet}
                  isFetched={isFetched}
                />
              )}
            </div>
          </div>
        </div>
        <SideStrip />
      </div>

      {/* Bottom HUD bar — full width */}
      <div className="footer">
        <div className="footer-text">DASHBOARD INTERFACE // STATUS: ONLINE</div>
        <div className="footer-line"></div>
        <div className="stars">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
