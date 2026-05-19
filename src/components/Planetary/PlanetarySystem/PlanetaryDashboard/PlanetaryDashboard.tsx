import React, { useState, useCallback } from "react";
import {
  CliHeader,
  MissionsTab,
  AnalyticsTab,
} from "../../UI";
import { Card } from "../../UI/CardVariants";
import { StarBurst } from "../../UI/Symbols";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import "./PlanetaryDashboard.css";
import type { PlanetModel } from "../../data";
import { Planet3D } from "./Planet3D";


interface DashboardProps {
  planet: PlanetModel;
  onBack: () => void;
}

export const PlanetDashboard: React.FC<DashboardProps> = ({
  planet,
  onBack,
}) => {
  const [isFetched, setIsFetched] = useState(false);

  const handleFetchComplete = useCallback(() => {
    setIsFetched(true);
  }, []);

  return (
    <div
      className="dashboard-overlay"
      style={{ "--theme-color": planet.color } as React.CSSProperties}
    >
      <div className="dashboard-container">
        {/* --- CLI HEADER (full width, above both columns) --- */}
        <CliHeader
          planetId={planet.id}
          color="hsl(var(--primary))"
          onComplete={handleFetchComplete}
          onBack={onBack}
        />

        {/* --- BODY: left + right columns --- */}
        <div className="dashboard-body">
          {/* --- LEFT: Planet 3D + name + description --- */}
          <div className="dashboard-left">
            <Card variant="dark" className="planet-info-card">
              <div className="planet-3d-wrapper">
                <Planet3D planet={planet} />
              </div>
              <div className="planet-info-content">
                <h1 className="planet-title" style={{ color: planet.color, textShadow: `0 0 10px ${planet.color}` }}>
<StarBurst size={22} /> {planet.name}
          </h1>
          <div className="planet-debrief planet-debrief-yellow">
            <strong>STATUS:</strong> {planet.type}
            <br />
            {planet.description}
          </div>
        </div>
      </Card>
    </div>

    {/* --- RIGHT: tabs only --- */}
    <div className="dashboard-right">
      <div className="mobile-planet-header" style={{ "--planet-color": planet.color } as React.CSSProperties}>
        <h1 className="planet-title" style={{ color: planet.color, textShadow: `0 0 10px ${planet.color}` }}>
          <StarBurst size={22} /> {planet.name}
              </h1>
              <div className="planet-debrief planet-debrief-yellow">
                <strong>STATUS:</strong> {planet.type}
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
                      <MissionsTab planet={planet} />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <AnalyticsTab planet={planet} />
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
