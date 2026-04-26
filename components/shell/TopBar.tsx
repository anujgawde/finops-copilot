"use client";

import { Menu, ChevronDown, CircleHelp } from "lucide-react";
import { PumpLogo } from "@/components/PumpLogo";

type Props = { onMenuClick: () => void };

export function TopBar({ onMenuClick }: Props) {
  return (
    <header className="h-14 shrink-0 bg-white border-b border-[#E5E5E5] px-4 flex items-center gap-3 z-30">
      {/* Mobile only: hamburger + logo (sidebar is hidden on mobile) */}
      <button
        className="md:hidden p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-[#F5F5F5] transition-colors"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <div className="md:hidden">
        <PumpLogo size="sm" />
      </div>

      {/* Desktop: org switcher (logo lives in sidebar header) */}
      <button
        className="hidden md:flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700 transition-colors cursor-default"
        aria-disabled="true"
        tabIndex={-1}
      >
        Acme Robotics
        <span className="text-ink-300">·</span>
        <span className="text-xs text-ink-400">AWS · 12 accounts</span>
        <ChevronDown size={13} className="text-ink-300" />
      </button>
    </header>
  );
}
