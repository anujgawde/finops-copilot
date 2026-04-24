"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AboutModal } from "./AboutModal";

export function AboutPill() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-ink-200 shadow-pop text-sm font-medium text-ink-700 hover:border-mint-300 hover:text-ink-900 hover:-translate-y-0.5 hover:shadow-[0_0_0_3px_rgba(94,219,160,0.15)] transition-all duration-200 select-none"
        aria-label="About this concept"
      >
        <Sparkles size={14} className="text-electric-500" />
        A Concept for Pump.co by Anuj
      </button>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
