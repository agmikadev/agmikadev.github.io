import { useState, useCallback, useMemo, type FC, type ReactNode } from 'react';
import './styles/MainFrame.css';
import './styles/Container.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { CliHeader } from './Planetary/UI';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import { MissionLog } from './MissionLog/MissionLog';
import { ProjectNavigationContext } from './MissionLog/ProjectNavigationContext';
import type { PlanetModel } from './Planetary/data';

interface MainFrameProps {
  children?: ReactNode;
}

export const MainFrame: FC<MainFrameProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isMissionLogOpen, setIsMissionLogOpen] = useState(false);
  const [missionLogTech, setMissionLogTech] = useState('all');
  const [missionLogKey, setMissionLogKey] = useState(0);

  const handleSelectPlanet = useCallback((planet: PlanetModel | null) => {
    setSelectedPlanet(planet);
    // Projects should never wait for the decorative CLI typing animation.
    setIsFetched(planet !== null);
  }, []);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const openProjects = useCallback((technology = 'all') => {
    setMissionLogTech(technology);
    setMissionLogKey((key) => key + 1);
    setIsMissionLogOpen(true);
  }, []);

  const projectNavigation = useMemo(() => ({ openProjects }), [openProjects]);

  const isDashboard = !!selectedPlanet;
  const cliCommand = isDashboard
    ? `❯ órbita --area="${selectedPlanet.area}" --status=online`
    : "❯ órbita --status=online // Escolha uma área ou dê um Salto";

  return (
    <ProjectNavigationContext.Provider value={projectNavigation}>
      <div className="app-container">
        <OnboardingOverlay />

        <div className="cli-header-wrapper">
          <CliHeader
            key={isDashboard ? `dashboard-${selectedPlanet!.id}` : "solar-view"}
            planetId={isDashboard ? selectedPlanet!.id : "ship-os"}
            command={cliCommand}
            onBack={isDashboard ? () => handleSelectPlanet(null) : undefined}
            onComplete={isDashboard ? handleFetchComplete : undefined}
            onOpenProjects={() => openProjects()}
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
          <div className="footer-text">ÓRBITA // STATUS: ONLINE</div>
          <div className="footer-line"></div>
          <div className="stars">
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
        </div>

        <MissionLog
          key={missionLogKey}
          isOpen={isMissionLogOpen}
          initialTech={missionLogTech}
          onClose={() => setIsMissionLogOpen(false)}
        />
      </div>
    </ProjectNavigationContext.Provider>
  );
};

export default MainFrame;
