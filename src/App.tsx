import { useState, useEffect } from 'react';
import MainFrame from './components/MainFrame';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dismiss spinner after first render cycle completes
    // requestAnimationFrame ensures the 3D scene has at least started rendering
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <MainFrame />}
    </div>
  );
}

export default App;
