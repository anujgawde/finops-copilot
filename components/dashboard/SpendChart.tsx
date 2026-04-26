"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

const Chart = dynamic(() => import("./SpendChartInner").then((m) => m.SpendChartInner), {
  ssr: false,
  loading: () => <div className="h-[280px]" />,
});

type Props = { onAsk?: () => void };

export function SpendChart({ onAsk }: Props) {
  return (
    <section className="bg-white rounded-xl border border-[#EDEDED] p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">Actual costs</p>
            <p className="text-[22px] font-bold text-ink-900 tabular-nums leading-tight tracking-tight">
              $23,313<span className="text-ink-400 text-[13px] font-bold">.61</span>
            </p>
            <p className="text-[11px] text-ink-400 mt-0.5">
              Original <span className="line-through">$30,091.37</span>
            </p>
          </div>
          <div className="border-l border-[#EFEFEF] pl-6">
            <p className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">All savings</p>
            <p className="text-[22px] font-bold text-ink-900 tabular-nums leading-tight tracking-tight">
              $6,777<span className="text-ink-400 text-[13px] font-bold">.76</span>
              <span className="text-[11px] text-ink-500 font-medium ml-0.5">/mo</span>
              <span className="ml-2 inline-flex items-center text-[10px] font-semibold bg-mint-100 text-mint-700 rounded-full px-1.5 py-0.5 align-middle">
                23%
              </span>
            </p>
            <p className="text-[11px] text-ink-400 mt-0.5">
              Pump savings <span className="text-ink-600">$6,777.76</span>{" "}
              <span className="text-ink-300">(estimated values)</span>
            </p>
          </div>
        </div>

        {onAsk && <AskWidgetButton onClick={onAsk} />}
      </div>

      <Chart />
    </section>
  );
}

function AskWidgetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] font-medium text-ink-600 border border-[#E5E5E5] bg-white hover:bg-mint-50 hover:text-mint-700 hover:border-mint-200 transition-colors"
    >
      <Sparkles size={12} className="text-mint-500 group-hover:text-mint-600" />
      Ask
    </button>
  );
}
