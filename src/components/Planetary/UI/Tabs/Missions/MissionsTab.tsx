import React, { useMemo } from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { MissionCard } from "./MissionCard";
import { MISSION_ARCHIVE } from "../../../data/MissionData";

interface MissionsTabProps {
  planet: PlanetModel;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ planet }) => {
  // A lógica de filtro agora vive APENAS aqui. Perfeito para a performance.
  const relevantMissions = useMemo(() => {
    return MISSION_ARCHIVE.filter((mission) =>
      mission.technologies.some((tech) => planet.tools.includes(tech))
    );
  }, [planet.tools]);

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
          planetColor={planet.color}
          planetTools={planet.tools}
        />
      ))}
    </div>
  );
};