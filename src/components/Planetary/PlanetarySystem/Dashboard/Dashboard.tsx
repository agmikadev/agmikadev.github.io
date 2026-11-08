import React from "react";
import { MissionsTab, AnalyticsTab } from "../../UI";
import { Card } from "../../UI/CardVariants";
import { StarBurst } from "../../UI/Symbols";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { PlanetModel } from "../../data";
import { beltDataModel } from "../../data/BeltData";
import { ScreenAction } from "../../../ui/ScreenAction";
import { Planet3D } from "./Planet3D";

import "./Dashboard.css";

interface DashboardProps {
  planet?: PlanetModel;
  mode: "planet" | "belt";
  isFetched: boolean;
  onBack?: () => void;
}

const BACK_ICON = (
  <svg
    width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const Dashboard: React.FC<DashboardProps> = ({ planet, mode, isFetched, onBack }) => {
  const isBelt = mode === "belt";
  const themeColor = isBelt ? beltDataModel.color : planet?.color;
  const planetArea = isBelt ? beltDataModel.area : planet?.area;
  const planetCodename = isBelt ? beltDataModel.codename : planet?.name;
  const planetType = isBelt ? beltDataModel.area : planet?.type;
  const planetDescription = isBelt ? beltDataModel.description : planet?.description;

  const beltPlanet: PlanetModel = isBelt
    ? {
        id: "ai-belt",
        name: beltDataModel.codename,
        area: beltDataModel.area,
        type: beltDataModel.area,
        description: beltDataModel.description,
        tools: [],
        shape: "belt",
        color: beltDataModel.color,
        size: 0,
        orbitSize: 0,
        speed: 0,
        stats: [],
      }
    : planet!;

  if (!planetArea || !themeColor) return null;

  return (
    <div
      className="planet-hud"
      data-variant={isBelt ? "belt" : "planet"}
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      <div className="planet-hud__container">
        <div className="planet-hud__body">
          <div className="planet-hud__left">
            <Card variant="dark" className="planet-hud__info-card">
              {onBack && (
                <ScreenAction
                  className="planet-hud__back"
                  label="SISTEMA"
                  icon={BACK_ICON}
                  onClick={onBack}
                  ariaLabel="Voltar ao sistema"
                />
              )}
              <div className="planet-hud__planet">
                <Planet3D planet={beltPlanet} />
              </div>
              <div className="planet-hud__info">
                <div className="planet-hud__kicker">SETOR // {planetCodename}</div>
                <h1 className="planet-hud__title" style={{ "--planet-title-color": themeColor } as React.CSSProperties}>
                  <StarBurst size={22} /> {planetArea}
                </h1>
                <div className="planet-hud__debrief planet-hud__debrief--yellow">
                  <strong>FOCO:</strong> {planetType}
                  {!isBelt && <br />}
                  {planetDescription}
                </div>
              </div>
            </Card>
          </div>

          <div className="planet-hud__right">
            {isFetched && (
              <Tabs defaultValue="missions" className="planet-hud__tabs">
                <div className="planet-hud__tabs-header">
                  <TabsList>
                    <TabsTrigger value="missions"><StarBurst size={14} /> PROJETOS</TabsTrigger>
                    <TabsTrigger value="analytics"><StarBurst size={14} /> COMPETÊNCIAS</TabsTrigger>
                  </TabsList>
                </div>
                <div className="planet-hud__tabs-body">
        <div className="planet-hud__mobile-header">
          <div className="planet-hud__kicker">SETOR // {planetCodename}</div>
          <h1 className="planet-hud__title" style={{ "--planet-title-color": themeColor } as React.CSSProperties}>
            <StarBurst size={22} /> {planetArea}
          </h1>
                    <div className="planet-hud__debrief planet-hud__debrief--yellow">
                      <strong>FOCO:</strong> {planetType}
                    </div>
                  </div>
                  <div className="planet-hud__content">
                    <TabsContent value="missions">
                      {isBelt ? (
                        <MissionsTab variant="belt" />
                      ) : (
                        <MissionsTab planet={planet!} />
                      )}
                    </TabsContent>
                    <TabsContent value="analytics">
                      {isBelt ? (
                        <AnalyticsTab variant="belt" />
                      ) : (
                        <AnalyticsTab planet={planet!} />
                      )}
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
