import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { ProjectCard } from "./ProjectCard";
import { useMissions } from "../../../data/hooks";
import { BeltMissionsTab } from "../Belt/BeltMissionsTab";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

interface MissionsTabProps {
  planet?: PlanetModel;
  variant?: "planet" | "belt";
}

const PlanetMissions: React.FC<{ planet: PlanetModel }> = ({ planet }) => {
  const relevantMissions = useMissions(planet.id);

  if (relevantMissions.length === 0) {
    return (
      <div className="project-list__error">
        {NO_MISSIONS_ERROR}
      </div>
    );
  }

  return (
    <div className="project-list">
      {relevantMissions.map((mission) => (
        <ProjectCard
          key={`${planet.id}-${mission.id}`}
          mission={mission}
          planetId={planet.id}
          perspectiveLabel={planet.area}
        />
      ))}
    </div>
  );
};

export const MissionsTab: React.FC<MissionsTabProps> = ({ planet, variant = "planet" }) => {
  if (variant === "belt") {
    return <BeltMissionsTab />;
  }

  if (!planet) return null;

  return <PlanetMissions planet={planet} />;
};
