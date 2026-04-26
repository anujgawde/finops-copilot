"use client";

import type { ExecSummaryBlock } from "@/lib/types";

type Props = { block: ExecSummaryBlock };

export function ExecSummary({ block }: Props) {
  const { summary } = block;
  return (
    <div className="bg-white rounded-xl border border-ink-100 shadow-card px-5 py-5 animate-fade-in space-y-4">
      <p className="text-sm font-semibold text-ink-900 leading-snug">{summary.headline}</p>

      <div className="border-t border-ink-100 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-2">
          The numbers
        </p>
        <table className="w-full font-mono text-sm">
          <tbody>
            {summary.numbers.map((n, i) => (
              <tr key={i}>
                <td className="pr-4 py-0.5 text-ink-500 font-sans text-xs">{n.label}</td>
                <td className="pr-4 py-0.5 font-bold text-ink-900">{n.value}</td>
                <td className="py-0.5 text-ink-400 text-xs font-sans">{n.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-ink-100 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-2">
          Top movers
        </p>
        <ul className="space-y-1">
          {summary.movers.map((m, i) => (
            <li key={i} className="text-xs text-ink-600 flex gap-2">
              <span className="text-ink-300">·</span>
              <span>
                <span className="font-medium text-ink-800">{m.label}</span> {m.delta}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-ink-100 pt-4 space-y-2">
        <p className="text-xs text-ink-600">
          <span className="font-semibold text-ink-800">Watching:</span> {summary.watching}
        </p>
        <p className="text-xs text-ink-600">
          <span className="font-semibold text-ink-800">One ask:</span> {summary.ask}
        </p>
      </div>
    </div>
  );
}
