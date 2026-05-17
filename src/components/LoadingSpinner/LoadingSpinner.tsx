import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner-ring" />
    <div className="spinner-text">INITIALIZING SYSTEM...</div>
  </div>
);
