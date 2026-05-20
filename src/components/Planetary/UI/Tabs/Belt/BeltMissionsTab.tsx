import React from "react";
import { beltDataModel } from "../../../data/BeltData";
import { MissionCard } from "../Missions/MissionCard";
import { NO_MISSIONS_ERROR } from "@/lib/ui-constants";

export const BeltMissionsTab: React.FC = () => {
  const reports = beltDataModel.missionReports;

  if (reports.length === 0) {
    return (
      <div className="mission-error-log">
        {NO_MISSIONS_ERROR}
      </div>
    );
  }

  return (
    <div className="mission-list">
      {reports.map((report) => (
        <MissionCard
          key={report.id}
          mission={report}
        />
      ))}
    </div>
  );
};
