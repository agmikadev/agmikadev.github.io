import { useState, useCallback, type FC, type ReactNode } from 'react';
import './styles/MainFrame.css';
import './styles/Container.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { CliHeader } from './Planetary/UI';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import { MissionLog } from './MissionLog/MissionLog';
import { MISSION_ARCHIVE } from './Planetary/data/MissionData';
import type { PlanetModel } from './Planetary/data';

interface MainFrameProps {
  children?: ReactNode;
}

export const MainFrame: FC<MainFrameProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isMissionLogOpen, setIsMissionLogOpen] = useState(false);

  const handleSelectPlanet = useCallback((planet: PlanetModel | null) => {
    setSelectedPlanet(planet);
    // Projects should never wait for the decorative CLI typing animation.
    setIsFetched(planet !== null);
  }, []);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const isDashboard = !!selectedPlanet;
  const featuredProjects = MISSION_ARCHIVE.filter((mission) => mission.featured).slice(0, 4);
  const cliCommand = isDashboard
    ? `❯ mission_control --setor="${selectedPlanet.area}" --status=online`
    : "❯ mission_control --status=online // Selecione uma área ou abra o Mission Log";

  return (
    <div className="app-container">
      <OnboardingOverlay onOpenProjects={() => setIsMissionLogOpen(true)} />

      <div className="cli-header-wrapper">
        <CliHeader
          key={isDashboard ? `dashboard-${selectedPlanet!.id}` : "solar-view"}
          planetId={isDashboard ? selectedPlanet!.id : "ship-os"}
          command={cliCommand}
          onBack={isDashboard ? () => handleSelectPlanet(null) : undefined}
          onComplete={isDashboard ? handleFetchComplete : undefined}
          onOpenProjects={() => setIsMissionLogOpen(true)}
        />
      </div>

      {!isDashboard && (
        <div className="featured-bar">
          <span className="featured-bar-label">EM DESTAQUE</span>
          <div className="featured-bar-list">
            {featuredProjects.map((project) => (
              <span key={project.id} className="featured-bar-item">
                {project.title.split(" — ")[0]}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="featured-bar-action"
            onClick={() => setIsMissionLogOpen(true)}
          >
            VER PROJETOS →
          </button>
        </div>
      )}

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
        <SideStrip onOpenProjects={() => setIsMissionLogOpen(true)} />
      </div>

      {/* Bottom HUD bar — full width */}
      <div className="footer">
        <div className="footer-text">PORTFOLIO // STATUS: ONLINE</div>
        <div className="footer-line"></div>
        <div className="stars">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </div>

      <MissionLog
        isOpen={isMissionLogOpen}
        onClose={() => setIsMissionLogOpen(false)}
      />
    </div>
  );
};

export default MainFrame;
