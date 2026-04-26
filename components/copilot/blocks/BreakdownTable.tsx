"use client";

import type { TableBlock } from "@/lib/types";

type Props = { block: TableBlock };

export function BreakdownTable({ block }: Props) {
  return (
    <div className="bg-white rounded-xl border border-ink-100 shadow-card overflow-hidden animate-fade-in">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-ink-50">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">
              Service
            </th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">
              Delta $
            </th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">
              Delta %
            </th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-ink-50 last:border-0">
              <td className="px-4 py-2.5 text-ink-700 font-medium">{row.service}</td>
              <td className="px-4 py-2.5 text-right text-rose-500 font-semibold">
                +${row.delta.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right text-rose-500">+{row.pct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
