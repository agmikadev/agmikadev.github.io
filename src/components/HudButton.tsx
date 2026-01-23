import React, { type ReactNode } from 'react';
import './styles/HudButton.css';

interface HudButtonProps {
  label: string;
  onClick: () => void;
  icon?: ReactNode; 
  themeColor?: string; 
  variant?: 'default' | 'back' | 'action'; 
}

export const HudButton: React.FC<HudButtonProps> = ({ 
  label, 
  onClick, 
  icon,
  themeColor = "#ffffff", 
  variant = 'default' 
}) => {
  return (
    <button 
      // Output example: class="hud-btn hud-btn-back"
      className={`hud-btn hud-btn-${variant}`} 
      onClick={onClick} 
      aria-label={label}
      style={{ '--theme-color': themeColor } as React.CSSProperties}
    >
      {icon && <span className="hud-icon">{icon}</span>}
      <span className="hud-text">{label}</span>
    </button>
  );
};