import React from "react";
import { MissionsTab, AnalyticsTab } from "../../UI";
import { Card } from "../../UI/CardVariants";
import { StarBurst } from "../../UI/Symbols";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { PlanetModel } from "../../data";
import { beltDataModel } from "../../data/BeltData";
import { Planet3D } from "./Planet3D";

import "./Dashboard.css";

interface DashboardProps {
  planet?: PlanetModel;
  mode: "planet" | "belt";
  isFetched: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ planet, mode, isFetched }) => {
  const isBelt = mode === "belt";
  const themeColor = isBelt ? beltDataModel.color : planet?.color;
  const planetName = isBelt ? beltDataModel.name : planet?.name;
  const planetType = isBelt ? "Large Language Model Belt" : planet?.type;
  const planetDescription = isBelt ? beltDataModel.description : planet?.description;

  const beltPlanet: PlanetModel = isBelt
    ? {
        id: "ai-belt",
        name: beltDataModel.name,
        type: "Large Language Model Belt",
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

  if (!planetName || !themeColor) return null;

  return (
    <div
      className={`dashboard-overlay ${isBelt ? "belt-dashboard" : ""}`}
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      <div className="dashboard-container">
        <div className="dashboard-body">
          <div className="dashboard-left">
            <Card variant="dark" className="planet-info-card">
              <div className="planet-3d-wrapper">
                <Planet3D planet={beltPlanet} />
              </div>
              <div className="planet-info-content">
                <h1 className="planet-title" style={{ color: themeColor, textShadow: `0 0 10px ${themeColor}` }}>
                  <StarBurst size={22} /> {planetName}
                </h1>
                <div className="planet-debrief planet-debrief-yellow">
                  <strong>STATUS:</strong> {planetType}
                  {!isBelt && <br />}
                  {planetDescription}
                </div>
              </div>
            </Card>
          </div>

          <div className="dashboard-right">
            {isFetched && (
              <Tabs defaultValue="missions" className="dashboard-right-tabs">
                <div className="dashboard-right-header">
                  <TabsList>
                    <TabsTrigger value="missions"><StarBurst size={14} /> MISSÕES</TabsTrigger>
                    <TabsTrigger value="analytics"><StarBurst size={14} /> MÉTRICAS</TabsTrigger>
                  </TabsList>
                </div>
                <div className="dashboard-right-body">
                  <div className="mobile-planet-header" style={{ "--planet-color": themeColor } as React.CSSProperties}>
                    <h1 className="planet-title" style={{ color: themeColor, textShadow: `0 0 10px ${themeColor}` }}>
                      <StarBurst size={22} /> {planetName}
                    </h1>
                    <div className="planet-debrief planet-debrief-yellow">
                      <strong>STATUS:</strong> {planetType}
                    </div>
                  </div>
                  <div className="fetched-data-wrapper">
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
