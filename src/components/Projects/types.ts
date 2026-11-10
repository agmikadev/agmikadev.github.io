import type { MissionType } from "../Planetary/data/MissionData";
import type { BeltMissionReport } from "../Planetary/data/BeltData";

/** A project archive entry or an AI-belt mission report. */
export type ProjectData = MissionType | BeltMissionReport;
