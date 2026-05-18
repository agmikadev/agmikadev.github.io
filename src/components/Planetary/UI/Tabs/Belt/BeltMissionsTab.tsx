import React from "react";
import { beltDataModel } from "../../../data/BeltData";
import { BeltMissionCard } from "./BeltMissionCard";
import "./BeltMissionsTab.css";

export const BeltMissionsTab: React.FC = () => {
  const reports = beltDataModel.missionReports;
  const beltColor = beltDataModel.color;

  if (reports.length === 0) {
    return (
      <div className="mission-error-log">
        [ERRO]: Nenhuma miss\u00e3o registrada nos arquivos.
      </div>
    );
  }

  return (
    <div className="mission-list">
      {reports.map((report) => (
        <BeltMissionCard
          key={report.id}
          report={report}
          beltColor={beltColor}
        />
      ))}
    </div>
  );
};
