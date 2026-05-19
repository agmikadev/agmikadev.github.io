import React, { useState } from "react";
import "./Tabs.css";
import { StarBurst } from "../Symbols";

// The shape of a single Tab
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode; // Allows us to pass components inside the tab
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId: string;
  themeColor: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, themeColor }) => {
  // The component handles its own state
  const [activeTab, setActiveTab] = useState(defaultTabId);

  return (
    <div style={{ "--theme-color": themeColor } as React.CSSProperties}>
      
      {/* --- THE TAB HEADERS --- */}
      <div 
        className="tab-container" 
        style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', borderBottom: '1px solid hsl(var(--primary) / 30%)', paddingBottom: 'var(--space-2)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <StarBurst size={8} /> {tab.label}
          </button>
        ))}
      </div>

      {/* --- THE TAB CONTENT (Fades in when active) --- */}
      <div className="tab-content">
        {tabs.map((tab) => 
          activeTab === tab.id ? (
            <div key={tab.id} className="fade-in-view">
              {tab.content}
            </div>
          ) : null
        )}
      </div>

    </div>
  );
};