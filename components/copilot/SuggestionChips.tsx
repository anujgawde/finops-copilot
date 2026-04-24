"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import type { FlowKey } from "@/lib/types";
import { FLOW_CHIPS } from "@/lib/types";

type ChipDef = { key: FlowKey; emoji: string };

const CHIPS: ChipDef[] = [
  { key: "spike",   emoji: "📈" },
  { key: "savings", emoji: "💡" },
  { key: "board",   emoji: "📋" },
];

type Props = { onSelect: (key: FlowKey) => void };

export function SuggestionChips({ onSelect }: Props) {
  const [focused, setFocused] = useState(-1);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const len = CHIPS.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (idx + 1) % len;
      btnRefs.current[next]?.focus();
      setFocused(next);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (idx - 1 + len) % len;
      btnRefs.current[prev]?.focus();
      setFocused(prev);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      {CHIPS.map(({ key, emoji }, idx) => (
        <button
          key={key}
          ref={(el) => { btnRefs.current[idx] = el; }}
          onClick={() => onSelect(key)}
          onFocus={() => setFocused(idx)}
          onBlur={() => setFocused(-1)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={clsx(
            "flex-1 text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all duration-200 bg-white",
            "text-ink-700 border-ink-200",
            "hover:border-mint-300 hover:text-ink-900 hover:shadow-card hover:-translate-y-0.5",
            focused === idx && "border-mint-300 shadow-card -translate-y-0.5",
          )}
        >
          <span className="block text-base mb-1" aria-hidden>{emoji}</span>
          {FLOW_CHIPS[key]}
        </button>
      ))}
    </div>
  );
}
