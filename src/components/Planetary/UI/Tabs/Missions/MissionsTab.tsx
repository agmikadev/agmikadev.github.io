import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { MissionCard } from "./MissionCard";
import { useMissions } from "../../../data/hooks";
import { BeltMissionsTab } from "../Belt/BeltMissionsTab";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

interface MissionsTabProps {
  planet?: PlanetModel;
  variant?: "planet" | "belt";
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ planet, variant = "planet" }) => {
  if (variant === "belt") {
    return <BeltMissionsTab />;
  }

  if (!planet) return null;

  const relevantMissions = useMissions(planet.id);

  if (relevantMissions.length === 0) {
    return (
      <div className="mission-error-log">
        {NO_MISSIONS_ERROR}
      </div>
    );
  }

  return (
    <div className="mission-list">
      {relevantMissions.map((mission) => (
        <MissionCard
          key={`${planet.id}-${mission.id}`}
          mission={mission}
        />
      ))}
    </div>
  );
};
