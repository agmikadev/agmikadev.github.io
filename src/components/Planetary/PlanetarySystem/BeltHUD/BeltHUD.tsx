import React, { useState, useCallback } from "react";
import { CliHeader } from "../../UI";
import { Card } from "../../UI/CardVariants";
import { StarBurst } from "../../UI/Symbols";
import { BeltMissionsTab, BeltAnalyticsTab } from "../../UI/Tabs/Belt";
import { beltDataModel } from "../../data/BeltData";
import type { PlanetModel } from "../../data/PlanetaryData";
import { Planet3D } from "../PlanetaryDashboard/Planet3D";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import "./BeltHUD.css";

interface BeltHUDProps {
  onBack: () => void;
}

export const BeltHUD: React.FC<BeltHUDProps> = ({ onBack }) => {
  const [isFetched, setIsFetched] = useState(false);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  const beltPlanet: PlanetModel = {
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
  };

  return (
    <div
      className="belt-dashboard-overlay"
      style={{ "--theme-color": beltDataModel.color } as React.CSSProperties}
    >
      <div className="belt-dashboard-container">
        <CliHeader
          planetId="ai-belt"
          color="hsl(var(--primary))"
          onComplete={handleFetchComplete}
          onBack={onBack}
        />

        <div className="dashboard-body">
          {/* --- LEFT: Belt 3D + name + description --- */}
          <div className="dashboard-left">
            <Card variant="dark" className="planet-info-card">
              <div className="planet-3d-wrapper">
                <Planet3D planet={beltPlanet} />
              </div>
              <div className="planet-info-content">
                <h1 className="planet-title" style={{ color: beltDataModel.color, textShadow: `0 0 10px ${beltDataModel.color}` }}>
<StarBurst size={22} /> {beltDataModel.name}
          </h1>
          <div className="planet-debrief planet-debrief-yellow">
            <strong>STATUS:</strong> Large Language Model Belt <br />
            {beltDataModel.description}
          </div>
        </div>
      </Card>
    </div>

    {/* --- RIGHT: tabs only --- */}
    <div className="dashboard-right">
      <div className="mobile-planet-header" style={{ "--planet-color": beltDataModel.color } as React.CSSProperties}>
        <h1 className="planet-title" style={{ color: beltDataModel.color, textShadow: `0 0 10px ${beltDataModel.color}` }}>
          <StarBurst size={22} /> {beltDataModel.name}
              </h1>
              <div className="planet-debrief planet-debrief-yellow">
                <strong>STATUS:</strong> Large Language Model Belt
              </div>
            </div>
            {isFetched && (
              <div className="fetched-data-wrapper">
                <div className="tab-area-wrapper">
                  <Tabs defaultValue="missions">
                    <TabsList>
<TabsTrigger value="missions"><StarBurst size={14} /> MISSÕES</TabsTrigger>
              <TabsTrigger value="analytics"><StarBurst size={14} /> MÉTRICAS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="missions">
                      <BeltMissionsTab />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <BeltAnalyticsTab />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
