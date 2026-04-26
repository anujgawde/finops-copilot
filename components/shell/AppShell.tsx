"use client";

import { useState } from "react";
import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { KpiStrip } from "@/components/shell/KpiStrip";
import { CopilotPanel } from "@/components/copilot/CopilotPanel";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left: sidebar spans full viewport height */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Right: top bar + content stacked */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-hidden flex flex-col mesh-hero">
          <KpiStrip />
          <CopilotPanel />
        </main>
      </div>
    </div>
  );
}
