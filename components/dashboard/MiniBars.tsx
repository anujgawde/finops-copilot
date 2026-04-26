"use client";

import { ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  { v: 96 }, { v: 64 }, { v: 44 }, { v: 22 },
];

export function MiniBars() {
  return (
    <div className="h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap={10}>
          <Bar dataKey="v" fill="#A8E1F0" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
