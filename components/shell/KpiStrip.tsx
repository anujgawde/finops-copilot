"use client";

import clsx from "clsx";

type Accent = "mint" | "electric" | "ink";

type Kpi = {
  label: string;
  value: string;
  sub: string;
  accent: Accent;
};

const KPIS: Kpi[] = [
  {
    label: "MTD Spend",
    value: "$312,480",
    sub: "↓ 3.8% vs plan",
    accent: "mint",
  },
  {
    label: "Forecasted EoM",
    value: "$342,600",
    sub: "under plan",
    accent: "ink",
  },
  {
    label: "Savings Run-Rate",
    value: "$118,200/yr",
    sub: "↑ $14K vs March",
    accent: "electric",
  },
  {
    label: "Open Opportunities",
    value: "3",
    sub: "$9,860/mo available",
    accent: "mint",
  },
];

const accentClass: Record<Accent, string> = {
  mint: "text-mint-500",
  electric: "text-electric-500",
  ink: "text-ink-400",
};

export function KpiStrip() {
  return (
    <div className="flex gap-3 px-4 lg:px-6 pt-4 pb-4 overflow-x-auto scroll-thin shrink-0 border-b border-ink-100/70">
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className={clsx(
            "min-w-[160px] flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl border border-ink-100 shadow-card px-4 py-3",
            "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-pop transition-all duration-150 cursor-default"
          )}
        >
          <p className="text-xs font-medium text-ink-400 truncate">{kpi.label}</p>
          <p className="text-xl font-bold text-ink-900 mt-0.5">{kpi.value}</p>
          <p className={clsx("text-xs font-medium mt-0.5", accentClass[kpi.accent])}>
            {kpi.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
