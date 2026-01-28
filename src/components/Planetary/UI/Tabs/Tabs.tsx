import React, { useState } from "react";
import "./Tabs.css";

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
        style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
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