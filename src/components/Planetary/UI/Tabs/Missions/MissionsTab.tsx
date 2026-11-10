import React from "react";
import { type PlanetModel } from "../../../data/PlanetaryData";
import { useMissions } from "../../../data/hooks";
import { BeltMissionsTab } from "../Belt/BeltMissionsTab";
import { ProjectCollection } from "@/components/Projects";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

interface MissionsTabProps {
  planet?: PlanetModel;
  variant?: "planet" | "belt";
}

const PlanetMissions: React.FC<{ planet: PlanetModel }> = ({ planet }) => {
  const relevantMissions = useMissions(planet.id);

  return (
    <ProjectCollection
      missions={relevantMissions}
      perspectivePlanetId={planet.id}
      emptyMessage={NO_MISSIONS_ERROR}
    />
  );
};

export const MissionsTab: React.FC<MissionsTabProps> = ({ planet, variant = "planet" }) => {
  if (variant === "belt") {
    return <BeltMissionsTab />;
  }

  if (!planet) return null;

  return <PlanetMissions planet={planet} />;
};
