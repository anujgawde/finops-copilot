"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ChartBlock } from "@/lib/types";

type Props = { block: ChartBlock };

export function InlineChart({ block }: Props) {
  const spike = block.data.find((d) => d.spike);

  return (
    <div className="bg-white rounded-xl border border-ink-100 shadow-card px-4 pt-4 pb-2 animate-fade-in">
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={block.data} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#15A365" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#15A365" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#EEF0F5" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#7F89A1" }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />

          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#7F89A1" }}
            tickLine={false}
            axisLine={false}
            width={44}
          />

          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Spend"]}
            labelStyle={{ color: "#1D2434", fontWeight: 600, fontSize: 12 }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #EEF0F5",
              borderRadius: 10,
              fontSize: 12,
            }}
          />

          <Area
            type="monotone"
            dataKey="spend"
            stroke="#15A365"
            strokeWidth={2}
            fill="url(#mintGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#15A365", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* Spike annotation */}
          {spike && (
            <ReferenceDot
              x={spike.date}
              y={spike.spend}
              r={5}
              fill="#E5484D"
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: spike.note ?? "",
                position: "top",
                fontSize: 10,
                fill: "#E5484D",
                fontWeight: 600,
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
