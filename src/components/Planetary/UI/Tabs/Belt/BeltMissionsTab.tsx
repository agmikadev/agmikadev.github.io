import React from "react";
import { useBeltMissions } from "../../../data/hooks";
import { ProjectCollection } from "@/components/Projects";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

export const BeltMissionsTab: React.FC = () => {
  const reports = useBeltMissions();

  return (
    <ProjectCollection
      missions={reports}
      emptyMessage={NO_MISSIONS_ERROR}
    />
  );
};
