"use client";

import { Check } from "lucide-react";
import clsx from "clsx";
import type { ToolBlock } from "@/lib/types";

type Props = { block: ToolBlock };

export function ToolUseChip({ block }: Props) {
  const done = block.status === "done";
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 animate-fade-in",
        done
          ? "bg-mint-50 border-mint-200 text-mint-700"
          : "bg-ink-50 border-ink-200 text-ink-600 animate-pulse-soft",
      )}
    >
      <span aria-hidden>{block.icon}</span>
      <span>{block.label}</span>
      {done && <Check size={11} className="text-mint-500 shrink-0" aria-label="Complete" />}
    </div>
  );
}
