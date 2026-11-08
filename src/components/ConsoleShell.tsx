import { useState, useEffect, useCallback, useMemo, useRef, type FC, type ReactNode } from 'react';
import './styles/ConsoleShell.css';
import './styles/Console.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { ConsoleHeader } from './ConsoleHeader';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import { SaltoScreen } from './Salto/SaltoScreen';
import { SaltoNavigationContext } from './Salto/SaltoNavigationContext';
import type { PlanetModel } from './Planetary/data';

interface ConsoleShellProps {
  children?: ReactNode;
}

type Screen = 'orbit' | 'salto';

export const ConsoleShell: FC<ConsoleShellProps> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>('orbit');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [saltoTech, setSaltoTech] = useState('all');
  const [saltoKey, setSaltoKey] = useState(0);
  const previousScreenRef = useRef<Screen>(screen);

  const handleSelectPlanet = useCallback((planet: PlanetModel | null) => {
    setSelectedPlanet(planet);
    setIsFetched(planet !== null);
  }, []);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const openSalto = useCallback((technology = 'all') => {
    setSaltoTech(technology);
    setSaltoKey((key) => key + 1);
    setScreen('salto');
  }, []);

  const closeSalto = useCallback(() => {
    setScreen('orbit');
  }, []);

  useEffect(() => {
    if (screen !== 'salto') return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSalto();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, closeSalto]);

  // Restore focus to the SALTO trigger after the orbit remounts.
  useEffect(() => {
    const wasSalto = previousScreenRef.current === 'salto';
    previousScreenRef.current = screen;
    if (!wasSalto || screen !== 'orbit') return;

    const frame = requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>('.orbit__salto')
        ?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [screen]);

  const navigation = useMemo(() => ({ openSalto }), [openSalto]);

  const isSalto = screen === 'salto';
  const isDashboard = !isSalto && selectedPlanet !== null;

  const command = isSalto
    ? '❯ salto --indice=projetos --status=online'
    : isDashboard
      ? `❯ órbita --area="${selectedPlanet.area}" --status=online`
      : '❯ órbita --status=online // Escolha uma área ou dê um Salto';

  return (
    <SaltoNavigationContext.Provider value={navigation}>
      <main className="console" data-screen={screen}>
        <OnboardingOverlay />

        <ConsoleHeader
          key={isSalto ? 'salto' : isDashboard ? `dashboard-${selectedPlanet.id}` : 'orbit'}
          planetId={isSalto ? 'salto' : isDashboard ? selectedPlanet.id : 'orbit'}
          command={command}
          onComplete={isDashboard ? handleFetchComplete : undefined}
        />

        <div className="console__body">
          <section className="console__stage">
            <div className="console__screen">
              {isSalto ? (
                <SaltoScreen
                  key={saltoKey}
                  initialTech={saltoTech}
                  onBack={closeSalto}
                />
              ) : (
                children || (
                  <PlanetarySystem
                    selectedPlanet={selectedPlanet}
                    onSelectPlanet={handleSelectPlanet}
                    isFetched={isFetched}
                    onOpenSalto={() => openSalto()}
                  />
                )
              )}
            </div>
          </section>

          <SideStrip />
        </div>

        <footer className="console__footer">
          <div className="console__footer-text">
            {isSalto ? "SALTO" : "ÓRBITA"} // STATUS: ONLINE
          </div>
          <div className="console__footer-line"></div>
          <div className="console__footer-stars">
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
        </footer>
      </main>
    </SaltoNavigationContext.Provider>
  );
};

export default ConsoleShell;
