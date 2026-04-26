"use client";

import { Menu } from "lucide-react";
import { PumpLogo } from "@/components/PumpLogo";

type Props = { onMenuClick: () => void };

export function TopBar({ onMenuClick }: Props) {
  return (
    <header className="h-12 shrink-0 bg-white border-b border-[#E5E5E5] px-4 flex items-center gap-3 z-30">
      <button
        className="md:hidden p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-[#F5F5F5] transition-colors"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>
      <div className="md:hidden">
        <PumpLogo size="sm" />
      </div>

      <span className="hidden md:inline text-[13px] text-ink-700 font-semibold">
        Welcome, Anuj <span aria-hidden>👋</span>
      </span>
    </header>
  );
}
