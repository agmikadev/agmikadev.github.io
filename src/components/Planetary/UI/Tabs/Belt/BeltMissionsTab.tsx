import React from "react";
import { useBeltMissions } from "../../../data/hooks";
import { ProjectCard } from "../Missions/ProjectCard";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

export const BeltMissionsTab: React.FC = () => {
  const reports = useBeltMissions();

  if (reports.length === 0) {
    return (
      <div className="project-list__error">
        {NO_MISSIONS_ERROR}
      </div>
    );
  }

  return (
    <div className="project-list">
      {reports.map((report) => (
        <ProjectCard
          key={report.id}
          mission={report}
        />
      ))}
    </div>
  );
};
