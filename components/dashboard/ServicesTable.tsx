"use client";

import { Search, Filter, Plus, ChevronUp, ChevronDown, Sparkles } from "lucide-react";

type Row = {
  service: string;
  badges?: { label: string; tone: "amber" | "mint" }[];
  original: number;
  savings: number;
  savingsPct: number;
  actual: number;
};

const ROWS: Row[] = [
  { service: "Amazon Elastic Container Service", badges: [{ label: "Alert", tone: "amber" }, { label: "Commitments", tone: "mint" }], original: 5064.84, savings: -3152.29, savingsPct: 62.24, actual: 1912.55 },
  { service: "Amazon Elastic Compute Cloud - Compute", badges: [{ label: "Commitments", tone: "mint" }], original: 2203.79, savings: -2125.97, savingsPct: 96.47, actual: 77.81 },
  { service: "AmazonCloudWatch", badges: [{ label: "Alert", tone: "amber" }], original: 2765.85, savings: -689.79, savingsPct: 24.94, actual: 2076.06 },
  { service: "Amazon GuardDuty", original: 522.83, savings: -327.0, savingsPct: 62.54, actual: 195.83 },
  { service: "Amazon Simple Storage Service", original: 3207.25, savings: -243.42, savingsPct: 7.59, actual: 2963.83 },
];

type Props = { onAskRow?: (service: string) => void };

export function ServicesTable({ onAskRow }: Props) {
  return (
    <section className="bg-white rounded-xl border border-[#EDEDED] overflow-hidden">
      {/* Filter bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#EFEFEF]">
        <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-sm h-7 px-2 rounded-md border border-[#E5E5E5] bg-white">
          <Search size={12} className="text-ink-300 shrink-0" />
          <input
            placeholder="Filter group..."
            className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-ink-300"
          />
        </div>
        <PillButton icon={<Plus size={11} />}>Budgets</PillButton>
        <PillButton icon={<Filter size={11} />}>More filters</PillButton>
        <div className="flex-1" />
        <PillButton>Edit columns</PillButton>
        <button
          aria-disabled
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] font-semibold text-white bg-ink-900 hover:bg-ink-800 transition-colors cursor-default"
        >
          <Plus size={12} /> Budget
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold">
            <th className="text-left font-semibold py-2.5 pl-4 pr-3 w-8">
              <input type="checkbox" disabled className="accent-ink-400" />
            </th>
            <th className="text-left font-semibold py-2.5 pr-3">
              <button className="inline-flex items-center gap-1 cursor-default">
                Groups <SortIcon />
              </button>
            </th>
            <th className="text-right font-semibold py-2.5 px-3">
              <button className="inline-flex items-center gap-1 cursor-default">
                Original costs <ChevronDown size={11} />
              </button>
            </th>
            <th className="text-right font-semibold py-2.5 px-3">
              <button className="inline-flex items-center gap-1 cursor-default">
                Pump savings (est.) <ChevronUp size={11} />
              </button>
            </th>
            <th className="text-right font-semibold py-2.5 px-4">
              <button className="inline-flex items-center gap-1 cursor-default">
                Actual costs (est.) <SortIcon />
              </button>
            </th>
            <th className="w-12" />
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.service} className="group border-t border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
              <td className="py-3 pl-4 pr-3">
                <input type="checkbox" disabled className="accent-ink-400" />
              </td>
              <td className="py-3 pr-3 text-ink-800">
                <span className="inline-flex items-center gap-2 flex-wrap">
                  {r.service}
                  {r.badges?.map((b) => <Badge key={b.label} {...b} />)}
                </span>
              </td>
              <td className="py-3 px-3 text-right text-ink-700 tabular-nums">
                ${r.original.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                <span className="text-ink-700">
                  -${Math.abs(r.savings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>{" "}
                <span className="text-mint-600 text-xs">{r.savingsPct.toFixed(2)}%</span>
              </td>
              <td className="py-3 px-4 text-right text-ink-700 tabular-nums">
                ${r.actual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-3 pr-3">
                {onAskRow && (
                  <button
                    onClick={() => onAskRow(r.service)}
                    aria-label={`Ask about ${r.service}`}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1 h-7 px-2 rounded-md text-[11px] font-medium text-ink-600 hover:bg-mint-50 hover:text-mint-700 border border-transparent hover:border-mint-200 transition-all"
                  >
                    <Sparkles size={11} className="text-mint-500" />
                    Ask
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SortIcon() {
  return (
    <span className="inline-flex flex-col -my-0.5 text-ink-300">
      <ChevronUp size={9} className="-mb-0.5" />
      <ChevronDown size={9} className="-mt-0.5" />
    </span>
  );
}

function PillButton({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button
      aria-disabled
      className="flex items-center gap-1 h-7 px-2 rounded-md text-[12px] text-ink-600 border border-[#E5E5E5] bg-white hover:bg-[#FAFAFA] transition-colors cursor-default"
    >
      {icon}
      {children}
    </button>
  );
}

function Badge({ label, tone }: { label: string; tone: "amber" | "mint" }) {
  const styles =
    tone === "amber"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-mint-50 text-mint-700 border-mint-200";
  const dot = tone === "amber" ? "bg-amber-500" : "bg-mint-500";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium border rounded-full pl-1.5 pr-2 py-[2px] ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
      <span className="font-semibold ml-0.5">{label === "Alert" ? "1" : "2"}</span>
    </span>
  );
}
