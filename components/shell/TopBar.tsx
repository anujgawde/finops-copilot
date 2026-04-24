"use client";

import { Menu, ChevronDown, CircleHelp } from "lucide-react";
import { PumpLogo } from "@/components/PumpLogo";

type Props = { onMenuClick: () => void };

export function TopBar({ onMenuClick }: Props) {
  return (
    <header className="h-14 shrink-0 bg-white border-b border-ink-100 px-4 flex items-center gap-3 z-30">
      {/* Left cluster */}
      <button
        className="lg:hidden p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition-colors"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <PumpLogo size="sm" />

      <div className="w-px h-5 bg-ink-200 mx-1" aria-hidden />

      <button
        className="flex items-center gap-1.5 text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors cursor-default"
        aria-disabled="true"
        tabIndex={-1}
      >
        Acme Robotics · AWS · 12 accounts
        <ChevronDown size={14} className="text-ink-400" />
      </button>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs font-semibold bg-mint-50 text-mint-600 rounded-full px-2.5 py-1 hidden sm:inline">
          MTD $312K
        </span>
        <span className="text-xs font-semibold bg-electric-50 text-electric-600 rounded-full px-2.5 py-1 hidden sm:inline">
          Saved $9.8K/mo
        </span>
        <div className="w-7 h-7 rounded-full bg-ink-800 text-white text-xs font-semibold flex items-center justify-center select-none">
          AG
        </div>
        <button
          className="p-1.5 rounded-lg text-ink-400 hover:text-ink-600 hover:bg-ink-50 transition-colors"
          aria-label="Help"
        >
          <CircleHelp size={18} />
        </button>
      </div>
    </header>
  );
}
