"use client";

import { Plus, FileBarChart, Wallet, UserPlus, ChevronDown, Download } from "lucide-react";

export function WelcomeHeader() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[18px] font-bold text-ink-900 leading-tight tracking-tight">
        Welcome, Anuj <span aria-hidden>👋</span>
      </h1>

      <div className="flex flex-wrap items-center gap-2">
        <button
          aria-disabled
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] font-semibold text-white bg-ink-900 hover:bg-ink-800 transition-colors cursor-default"
        >
          <Plus size={12} /> Connect
          <span className="ml-1 flex items-center gap-1 opacity-90">
            <CloudIcons />
          </span>
        </button>

        <GreenHoverButton icon={<Plus size={12} />} sub={<FileBarChart size={11} />}>
          New report
        </GreenHoverButton>
        <GreenHoverButton icon={<Plus size={12} />} sub={<Wallet size={11} />}>
          New budget
        </GreenHoverButton>
        <GreenHoverButton icon={<UserPlus size={12} />}>Invite team</GreenHoverButton>

        <div className="flex-1" />

        <button aria-disabled className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] text-ink-700 border border-[#E5E5E5] bg-white hover:bg-[#FAFAFA] transition-colors cursor-default">
          Aug 1 – Aug 31, 2025
        </button>
        <button aria-disabled className="flex items-center gap-1 h-7 px-2 rounded-md text-[12px] text-ink-700 border border-[#E5E5E5] bg-white hover:bg-[#FAFAFA] transition-colors cursor-default">
          Day <ChevronDown size={11} className="text-ink-400" />
        </button>
        <button aria-disabled aria-label="Download" className="flex items-center justify-center h-7 w-7 rounded-md text-ink-500 border border-[#E5E5E5] bg-white hover:bg-[#FAFAFA] transition-colors cursor-default">
          <Download size={12} />
        </button>
      </div>
    </div>
  );
}

function GreenHoverButton({
  children,
  icon,
  sub,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <button
      aria-disabled
      className="group flex items-center gap-1 h-7 px-2.5 rounded-md text-[12px] font-medium text-ink-700 border border-[#E5E5E5] bg-white hover:bg-mint-50 hover:border-mint-200 hover:text-mint-700 transition-colors cursor-default"
    >
      <span className="text-mint-500 group-hover:text-mint-600 transition-colors">{icon}</span>
      {sub && <span className="text-ink-300 group-hover:text-mint-500 transition-colors mr-0.5">{sub}</span>}
      {children}
    </button>
  );
}

function CloudIcons() {
  return (
    <span className="flex items-center gap-1 ml-0.5 text-[9px] font-bold">
      <span className="text-[#FF9900]">aws</span>
      <span className="text-[#4285F4]">●</span>
      <span className="text-[#0089D6]">▲</span>
    </span>
  );
}
