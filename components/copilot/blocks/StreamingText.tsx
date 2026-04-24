"use client";

import clsx from "clsx";
import type { TextBlock } from "@/lib/types";

type Props = { block: TextBlock };

// Basic inline markdown: **bold**, `code`
function renderInline(text: string): React.ReactNode[] {
  const segments = text.split(/(\*\*[^*]*\*\*|`[^`]*`)/g);
  return segments.map((seg, i) => {
    if (/^\*\*[^*]*\*\*$/.test(seg)) {
      return (
        <strong key={i} className="font-semibold text-ink-900">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (/^`[^`]*`$/.test(seg)) {
      return (
        <code key={i} className="font-mono text-[12px] bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded">
          {seg.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{seg}</span>;
  });
}

export function StreamingText({ block }: Props) {
  const streaming = block.revealed < block.text.length;
  const visible = block.text.slice(0, block.revealed);

  return (
    <p
      className={clsx(
        "text-sm leading-7 text-ink-700 whitespace-pre-wrap animate-fade-in",
        streaming && "caret",
      )}
    >
      {renderInline(visible)}
    </p>
  );
}
