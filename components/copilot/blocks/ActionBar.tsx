"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ActionDef, ActionsBlock } from "@/lib/types";

type Props = { block: ActionsBlock };

export function ActionBar({ block }: Props) {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {block.actions.map((action) => (
        <ActionButton key={action.id} action={action} />
      ))}
    </div>
  );
}

function ActionButton({ action }: { action: ActionDef }) {
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
