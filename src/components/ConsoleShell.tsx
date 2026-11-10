import { useState, useEffect, useCallback, useMemo, useRef, type FC, type ReactNode } from 'react';
import './styles/ConsoleShell.css';
import './styles/Console.css';
import { SideStrip } from './SideStrip';
import { PlanetarySystem } from './Planetary';
import { ConsoleHeader } from './ConsoleHeader';
import { OnboardingOverlay } from './Onboarding/OnboardingOverlay';
import { SaltoScreen } from './Salto/SaltoScreen';
import { SaltoNavigationContext } from './Salto/SaltoNavigationContext';
import { planets } from './Planetary/data/PlanetaryData';
import type { PlanetModel } from './Planetary/data';

interface ConsoleShellProps {
  children?: ReactNode;
}

type Screen = 'orbit' | 'salto';

const HISTORY_SOURCE = 'star-system-portfolio';

interface ConsoleHistoryState {
  source: typeof HISTORY_SOURCE;
  screen: Screen;
  planetId: string | null;
  tech?: string;
}

const readHistoryState = (): ConsoleHistoryState | null => {
  const state = window.history.state as Partial<ConsoleHistoryState> | null;
  return state?.source === HISTORY_SOURCE
    ? (state as ConsoleHistoryState)
    : null;
};

const pushHistoryState = (
  state: Omit<ConsoleHistoryState, 'source'>,
) => {
  window.history.pushState({ source: HISTORY_SOURCE, ...state }, '');
};

const goBackInHistory = () => {
  const state = readHistoryState();
  if (state && (state.screen !== 'orbit' || state.planetId)) {
    window.history.back();
  }
};

export const ConsoleShell: FC<ConsoleShellProps> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>('orbit');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [saltoTech, setSaltoTech] = useState('all');
  const [saltoKey, setSaltoKey] = useState(0);
  const previousScreenRef = useRef<Screen>(screen);

  const applyHistoryState = useCallback((state: ConsoleHistoryState | null) => {
    if (!state) {
      setScreen('orbit');
      setSelectedPlanet(null);
      setIsFetched(false);
      return;
    }

    setScreen(state.screen);
    const planet = state.planetId
      ? planets.find((item) => item.id === state.planetId) ?? null
      : null;
    setSelectedPlanet(planet);
    setIsFetched(planet !== null);

    if (state.screen === 'salto') {
      setSaltoTech(state.tech ?? 'all');
      setSaltoKey((key) => key + 1);
    }
  }, []);

  // Give the browser/system back gesture a history entry for each in-app
  // screen, so Back closes SALTO or the HUD instead of leaving the site.
  useEffect(() => {
    window.history.replaceState(
      {
        source: HISTORY_SOURCE,
        screen: 'orbit',
        planetId: null,
      } satisfies ConsoleHistoryState,
      '',
    );

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as Partial<ConsoleHistoryState> | null;
      applyHistoryState(
        state?.source === HISTORY_SOURCE
          ? (state as ConsoleHistoryState)
          : null,
      );
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [applyHistoryState]);

  const handleSelectPlanet = useCallback((planet: PlanetModel | null) => {
    if (planet) {
      pushHistoryState({ screen: 'orbit', planetId: planet.id });
      setSelectedPlanet(planet);
      setIsFetched(true);
      return;
    }

    setSelectedPlanet(null);
    setIsFetched(false);
    goBackInHistory();
  }, []);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const openSalto = useCallback((technology = 'all') => {
    pushHistoryState({
      screen: 'salto',
      planetId: selectedPlanet?.id ?? null,
      tech: technology,
    });
    setSaltoTech(technology);
    setSaltoKey((key) => key + 1);
    setScreen('salto');
  }, [selectedPlanet]);

  const closeSalto = useCallback(() => {
    setScreen('orbit');
    goBackInHistory();
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
