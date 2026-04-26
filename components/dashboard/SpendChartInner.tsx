"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const isFirst = i === 0;
  const original = isFirst ? 2700 : 720 + Math.sin(i * 0.7) * 40 + (i % 5 === 0 ? 30 : 0);
  const savings = isFirst ? 280 : 110 + Math.cos(i * 0.6) * 18;
  return {
    label: day === 1 || day % 7 === 0 ? `Oct ${day}` : "",
    day: `Oct ${day}, 2025`,
    actual: Math.round(original),
    savings: Math.round(savings),
  };
});

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: { day: string; actual: number; savings: number } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-white rounded-lg border border-[#EDEDED] shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-4 py-3 min-w-[200px]">
      <p className="text-[15px] font-bold text-ink-900 mb-2.5 tabular-nums">{p.day}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-6 text-[13px]">
          <span className="flex items-center gap-2 text-ink-700">
            <span className="w-1 h-3 rounded-sm bg-[#D1D5DB]" />
            Actual Costs
          </span>
          <span className="font-semibold text-ink-900 tabular-nums">${p.actual.toLocaleString()}.00</span>
        </div>
        <div className="flex items-center justify-between gap-6 text-[13px]">
          <span className="flex items-center gap-2 text-ink-700">
            <span className="w-1 h-3 rounded-sm bg-[#26E789]" />
            Pump savings
          </span>
          <span className="font-semibold text-ink-900 tabular-nums">${p.savings.toLocaleString()}.00</span>
        </div>
      </div>
    </div>
  );
}

export function SpendChartInner() {
  return (
    <div className="h-[260px] -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 4 }} barCategoryGap={3}>
          <defs>
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C1F568" />
              <stop offset="100%" stopColor="#26E789" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#F0F0F0" vertical={false} />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9AA3B5" }}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9AA3B5" }}
            tickFormatter={(v) => (v === 0 ? "$0" : `$${(v / 1000).toFixed(1)}k`)}
            ticks={[0, 600, 1200, 1800, 2400, 3000]}
            domain={[0, 3000]}
            width={42}
          />
          <Tooltip cursor={{ fill: "rgba(34, 197, 94, 0.06)" }} content={<CustomTooltip />} />
          <Bar dataKey="actual" stackId="a" fill="#E5E7EB" radius={[0, 0, 0, 0]} />
          <Bar dataKey="savings" stackId="a" fill="url(#savingsGradient)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
