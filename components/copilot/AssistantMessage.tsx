"use client";

import type { AssistantMessage as AsstMsg, Block } from "@/lib/types";
import { ToolUseChip } from "./blocks/ToolUseChip";
import { StreamingText } from "./blocks/StreamingText";
import { InlineChart } from "./blocks/InlineChart";
import { BreakdownTable } from "./blocks/BreakdownTable";
import { OpportunityCard } from "./blocks/OpportunityCard";
import { ExecSummary } from "./blocks/ExecSummary";
import { ActionBar } from "./blocks/ActionBar";

type Props = {
  message: AsstMsg;
  onChipClick: (text: string) => void;
};

export function AssistantMessage({ message, onChipClick }: Props) {
  return (
    <div className="animate-fade-in max-w-[65ch]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {message.blocks
            .filter((b): b is Extract<Block, { kind: "tool" }> => b.kind === "tool")
            .map((b) => (
              <ToolUseChip key={b.id} block={b} />
            ))}
        </div>

        {message.blocks
          .filter((b) => b.kind !== "tool")
          .map((block) => (
            <BlockRenderer key={block.id} block={block} onChipClick={onChipClick} />
          ))}

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
      return <BreakdownTable block={block} />;
    case "opportunities":
      return <OpportunityCard block={block} />;
    case "exec-summary":
      return <ExecSummary block={block} />;
    case "actions":
      return <ActionBar block={block} />;
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
