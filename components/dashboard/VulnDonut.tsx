"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Critical", value: 4, color: "#7F1D1D" },
  { name: "High", value: 11, color: "#DC2626" },
  { name: "Medium", value: 53, color: "#F59E0B" },
  { name: "Low", value: 24, color: "#FBBF24" },
];

export function VulnDonut() {
  return (
    <div className="w-[112px] h-[112px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={38}
            outerRadius={54}
            paddingAngle={1}
            dataKey="value"
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
