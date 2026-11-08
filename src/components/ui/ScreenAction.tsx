import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./ScreenAction.css";

interface ScreenActionProps {
  label: string;
  hint?: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

export const ScreenAction: React.FC<ScreenActionProps> = ({
  label,
  hint,
  icon,
  onClick,
  className,
  ariaLabel,
  title,
}) => {
  return (
    <button
      type="button"
      className={cn("screen-action", className)}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      title={title ?? ariaLabel ?? label}
    >
      <span className="screen-action__icon">{icon}</span>
      <span className="screen-action__label">{label}</span>
      {hint && <span className="screen-action__hint">{hint}</span>}
    </button>
  );
};
