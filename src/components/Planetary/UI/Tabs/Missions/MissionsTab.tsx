import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { MissionCard } from "./MissionCard";
import { useMissions } from "../../../data/hooks";

interface MissionsTabProps {
  planet: PlanetModel;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ planet }) => {
  const relevantMissions = useMissions(planet.id);

  if (relevantMissions.length === 0) {
    return (
      <div className="mission-error-log">
        [ERRO]: Nenhuma missão registrada nos arquivos.
      </div>
    );
  }

  return (
    <div className="mission-list">
      {relevantMissions.map((mission) => (
        <MissionCard
          key={`${planet.id}-${mission.id}`}
          mission={mission}
          planetId={planet.id}
        />
      ))}
    </div>
  );
};
