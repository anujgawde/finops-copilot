"use client";

import { useState } from "react";
import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { CopilotPanel } from "@/components/copilot/CopilotPanel";
import { Overview } from "@/components/dashboard/Overview";
import { useView } from "@/lib/useView";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { view, goTo } = useView("overview");

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        activeView={view}
        onNavigate={(id) => goTo(id)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        {view === "overview" ? (
          <Overview goTo={goTo} />
        ) : (
          <main className="flex-1 overflow-hidden flex flex-col mesh-hero">
            <CopilotPanel />
          </main>
        )}
      </div>
    </div>
  );
}
