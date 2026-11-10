import React from "react";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useProjectView, type ProjectView } from "./ProjectViewContext";
import "./ProjectViewToggle.css";

const VIEW_OPTIONS: { value: ProjectView; label: string; icon: React.ReactNode }[] = [
  {
    value: "cards",
    label: "CARDS",
    icon: <LayoutGrid size={14} aria-hidden="true" />,
  },
  {
    value: "list",
    label: "LISTA",
    icon: <List size={14} aria-hidden="true" />,
  },
];

interface ProjectViewToggleProps {
  className?: string;
}

/** Cards/list switch shared by SALTO and the planet HUD. */
export const ProjectViewToggle: React.FC<ProjectViewToggleProps> = ({
  className,
}) => {
  const { view, setView } = useProjectView();

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(value) => {
        if (value === "cards" || value === "list") setView(value);
      }}
      className={`view-toggle ${className ?? ""}`.trim()}
      aria-label="Modo de visualização dos projetos"
    >
      {VIEW_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="view-toggle__item"
          data-view-option={option.value}
          aria-label={`Ver projetos em ${option.value === "cards" ? "cards" : "lista"}`}
          title={`Ver projetos em ${option.value === "cards" ? "cards" : "lista"}`}
        >
          {option.icon}
          <span className="view-toggle__label">{option.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
