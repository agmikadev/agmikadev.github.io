import { useState, useEffect } from 'react';
import MainFrame from './components/MainFrame';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const MIN_DISPLAY_MS = 1000;
    const start = performance.now();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        if (remaining > 0) {
          timeoutId = setTimeout(() => setIsLoading(false), remaining);
        } else {
          setIsLoading(false);
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <MainFrame />}
    </div>
  );
}

export default App;
