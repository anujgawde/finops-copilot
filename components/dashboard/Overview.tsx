"use client";

import { WelcomeHeader } from "./WelcomeHeader";
import { SpendChart } from "./SpendChart";
import { ReportCard } from "./ReportCard";
import { VulnerabilitiesCard } from "./VulnerabilitiesCard";
import { ServicesTable } from "./ServicesTable";
import type { Prefill, ViewId } from "@/lib/useView";

type Props = {
  goTo: (next: ViewId, payload?: Prefill) => void;
};

export function Overview({ goTo }: Props) {
  return (
    <div className="flex-1 overflow-auto bg-[#F7F8FA]">
      <div className="max-w-[1400px] mx-auto p-5 flex flex-col gap-4">
        <WelcomeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <SpendChart
              onAsk={() => goTo("ask-pump", { kind: "chip", chipKey: "spike" })}
            />
          </div>
          <div className="flex flex-col gap-5">
            <ReportCard />
            <VulnerabilitiesCard />
          </div>
        </div>

        <ServicesTable
          onAskRow={(service) =>
            goTo("ask-pump", { kind: "text", text: `Tell me more about ${service} spend` })
          }
        />
      </div>
    </div>
  );
}
