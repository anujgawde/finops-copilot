"use client";

import clsx from "clsx";
import type { AssistantMessage as AsstMsg, Block } from "@/lib/types";
import { ToolUseChip } from "./blocks/ToolUseChip";
import { StreamingText } from "./blocks/StreamingText";
import { InlineChart } from "./blocks/InlineChart";

type Props = {
  message: AsstMsg;
  onChipClick: (text: string) => void;
};

export function AssistantMessage({ message, onChipClick }: Props) {
  return (
    <div className="animate-fade-in max-w-[65ch]">
      <div className="space-y-3">
        {/* Tool chips render inline, not as cards */}
        <div className="flex flex-wrap gap-2">
          {message.blocks
            .filter((b): b is Extract<Block, { kind: "tool" }> => b.kind === "tool")
            .map((b) => (
              <ToolUseChip key={b.id} block={b} />
            ))}
        </div>

        {/* Non-tool blocks */}
        {message.blocks
          .filter((b) => b.kind !== "tool")
          .map((block) => (
            <BlockRenderer key={block.id} block={block} onChipClick={onChipClick} />
          ))}

        {/* Thinking dots before first block */}
        {message.status === "streaming" && message.blocks.length === 0 && (
          <div className="flex items-center gap-1.5 py-1">
            {[0, 200, 400].map((delay) => (
              <span
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-pulse-soft"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block dispatcher
// ---------------------------------------------------------------------------

function BlockRenderer({
  block,
  onChipClick,
}: {
  block: Exclude<Block, { kind: "tool" }>;
  onChipClick: (text: string) => void;
}) {
  switch (block.kind) {
    case "text":
      return <StreamingText block={block} />;

    case "chart":
      return <InlineChart block={block} />;

    case "table":
      return (
        <div className="bg-white rounded-xl border border-ink-100 shadow-card overflow-hidden animate-fade-in">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">Service</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">Delta $</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-ink-500 uppercase tracking-wide">Delta %</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink-50 last:border-0">
                  <td className="px-4 py-2.5 text-ink-700 font-medium">{row.service}</td>
                  <td className="px-4 py-2.5 text-right text-rose-500 font-semibold">+${row.delta.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-rose-500">+{row.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "opportunities":
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
                  <span className="text-mint-600 font-bold text-sm">Save ${item.savings.toLocaleString()}/mo</span>
                  <span className={clsx("text-xs px-2 py-0.5 rounded-full font-medium",
                    item.effort === "Low" ? "bg-mint-50 text-mint-700" : item.effort === "Medium" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                  )}>Effort: {item.effort}</span>
                  <span className={clsx("text-xs px-2 py-0.5 rounded-full font-medium",
                    item.risk === "Low" ? "bg-ink-50 text-ink-500" : item.risk === "Medium" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                  )}>Risk: {item.risk}</span>
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

    case "exec-summary":
      return (
        <div className="bg-white rounded-xl border border-ink-100 shadow-card px-5 py-5 animate-fade-in space-y-4">
          <p className="text-sm font-semibold text-ink-900 leading-snug">{block.summary.headline}</p>
          <div className="border-t border-ink-100 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-2">The numbers</p>
            <table className="w-full font-mono text-sm">
              <tbody>
                {block.summary.numbers.map((n, i) => (
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
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-2">Top movers</p>
            <ul className="space-y-1">
              {block.summary.movers.map((m, i) => (
                <li key={i} className="text-xs text-ink-600 flex gap-2">
                  <span className="text-ink-300">·</span>
                  <span><span className="font-medium text-ink-800">{m.label}</span> {m.delta}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-ink-100 pt-4 space-y-2">
            <p className="text-xs text-ink-600"><span className="font-semibold text-ink-800">Watching:</span> {block.summary.watching}</p>
            <p className="text-xs text-ink-600"><span className="font-semibold text-ink-800">One ask:</span> {block.summary.ask}</p>
          </div>
        </div>
      );

    case "actions":
      return (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {block.actions.map((a) => (
            <ActionButton key={a.id} action={a} />
          ))}
        </div>
      );

    case "followups":
      return (
        <div className="flex flex-wrap gap-2 pt-1 animate-fade-in">
          {block.chips.map((chip) => (
            <button
              key={chip}
              onClick={() => onChipClick(chip)}
              className="text-xs text-ink-600 border border-ink-200 rounded-full px-3 py-1.5 hover:border-mint-300 hover:text-ink-900 hover:bg-mint-50 transition-colors bg-white"
            >
              {chip}
            </button>
          ))}
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Action button — handles copy + toast inline
// ---------------------------------------------------------------------------

import { useState } from "react";

function ActionButton({ action }: { action: import("@/lib/types").ActionDef }) {
  const [toasted, setToasted] = useState(false);

  const handleClick = () => {
    if (action.action === "copy" && action.copyText) {
      navigator.clipboard.writeText(action.copyText).catch(() => {});
    }
    if (action.action === "copy" || action.action === "toast") {
      setToasted(true);
      setTimeout(() => setToasted(false), 2000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "text-sm px-4 py-2 rounded-xl font-medium transition-all duration-150",
        action.variant === "primary"
          ? "bg-mint-500 hover:bg-mint-600 text-white shadow-sm"
          : "bg-white border border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50",
        toasted && action.variant === "primary" && "bg-mint-600",
      )}
    >
      {toasted && action.toastMessage ? action.toastMessage : action.label}
    </button>
  );
}
