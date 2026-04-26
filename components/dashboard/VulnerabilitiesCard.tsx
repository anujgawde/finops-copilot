"use client";

import dynamic from "next/dynamic";

const Donut = dynamic(() => import("./VulnDonut").then((m) => m.VulnDonut), {
  ssr: false,
  loading: () => <div className="w-[112px] h-[112px]" />,
});

const ROWS = [
  { label: "Critical", value: 4, color: "#7F1D1D" },
  { label: "High", value: 11, color: "#DC2626" },
  { label: "Medium", value: 53, color: "#F59E0B" },
  { label: "Low", value: 24, color: "#FBBF24" },
];

export function VulnerabilitiesCard() {
  return (
    <section className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-ink-800">Vulnerabilities</p>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 bg-[#F2F2F2] rounded px-1.5 py-0.5">
          Demo data
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Donut />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[18px] font-semibold text-ink-900 leading-none">92</p>
            <p className="text-[10px] text-ink-400 leading-none mt-1">failed</p>
          </div>
        </div>
        <ul className="flex-1 flex flex-col gap-1.5">
          {ROWS.map((r) => (
            <li key={r.label} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-ink-700">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                {r.label}
              </span>
              <span className="font-semibold text-ink-800 tabular-nums">{r.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
