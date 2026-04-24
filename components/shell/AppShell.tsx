"use client";

import { useState } from "react";
import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { KpiStrip } from "@/components/shell/KpiStrip";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ink-50">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Offset for fixed lg sidebar */}
        <main className="flex-1 overflow-y-auto scroll-thin flex flex-col lg:ml-[248px]">
          <KpiStrip />
          {/* CopilotPanel will be mounted here in feature/copilot-shell */}
          <div className="flex-1 flex items-center justify-center text-ink-300 text-sm">
            Copilot coming in the next PR
          </div>
        </main>
      </div>
    </div>
  );
}
