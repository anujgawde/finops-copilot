"use client";

import { LineChart as LineIcon, MoreVertical } from "lucide-react";
import dynamic from "next/dynamic";

const MiniBars = dynamic(() => import("./MiniBars").then((m) => m.MiniBars), {
  ssr: false,
  loading: () => <div className="h-[100px]" />,
});

export function ReportCard() {
  return (
    <section className="bg-gradient-to-b from-[#EAF8FB] to-white rounded-xl border border-[#EDEDED] overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <MiniBars />
      </div>
      <div className="px-5 pb-4 flex items-start justify-between border-t border-white/40">
        <div className="flex items-start gap-2.5 pt-3">
          <span className="w-7 h-7 rounded-lg bg-white border border-[#EDEDED] flex items-center justify-center shrink-0">
            <LineIcon size={13} className="text-mint-600" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-bold text-ink-900">Report</p>
              <span className="text-[10px] font-medium text-ink-500 bg-[#EFEFEF] rounded-full px-2 py-0.5">
                Demo data
              </span>
            </div>
            <p className="text-[11px] text-ink-400 mt-0.5">Last edited 11 months ago</p>
          </div>
        </div>
        <button aria-label="more" className="text-ink-300 hover:text-ink-500 cursor-default pt-3">
          <MoreVertical size={14} />
        </button>
      </div>
    </section>
  );
}
