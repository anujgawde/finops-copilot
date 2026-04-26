"use client";

import clsx from "clsx";
import type { OpportunitiesBlock } from "@/lib/types";

type Props = { block: OpportunitiesBlock };

export function OpportunityCard({ block }: Props) {
  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {block.items.map((item, i) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-ink-100 shadow-card px-4 py-4 flex items-start gap-4"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-ink-900 leading-snug">{item.title}</p>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-mint-600 font-bold text-sm">
                Save ${item.savings.toLocaleString()}/mo
              </span>
              <span
                className={clsx(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  item.effort === "Low"
                    ? "bg-mint-50 text-mint-700"
                    : item.effort === "Medium"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-rose-50 text-rose-700",
                )}
              >
                Effort: {item.effort}
              </span>
              <span
                className={clsx(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  item.risk === "Low"
                    ? "bg-ink-50 text-ink-500"
                    : item.risk === "Medium"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-rose-50 text-rose-700",
                )}
              >
                Risk: {item.risk}
              </span>
              {item.note && <span className="text-xs text-ink-400">{item.note}</span>}
            </div>
          </div>
          <button className="shrink-0 text-xs font-semibold bg-mint-500 hover:bg-mint-600 text-white px-3 py-1.5 rounded-lg transition-colors">
            {item.primaryAction}
          </button>
        </div>
      ))}
    </div>
  );
}
