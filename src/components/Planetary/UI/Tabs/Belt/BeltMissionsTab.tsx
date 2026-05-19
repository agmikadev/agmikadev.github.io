import React from "react";
import { beltDataModel } from "../../../data/BeltData";
import { BeltMissionCard } from "./BeltMissionCard";
import "./BeltMissionsTab.css";

export const BeltMissionsTab: React.FC = () => {
  const reports = beltDataModel.missionReports;

  if (reports.length === 0) {
    return (
      <div className="mission-error-log">
        [ERRO]: Nenhuma missão registrada nos arquivos.
      </div>
    );
  }

  return (
    <div className="mission-list">
      {reports.map((report) => (
        <BeltMissionCard
          key={report.id}
          report={report}
        />
      ))}
    </div>
  );
};
