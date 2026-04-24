"use client";

import {
  LayoutDashboard,
  Sparkles,
  WandSparkles,
  PiggyBank,
  ChartLine,
  Users,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { PumpLogo } from "@/components/PumpLogo";

type NavItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
  active?: boolean;
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard, active: true },
  { id: "ask-pump", label: "Ask Pump", Icon: Sparkles, badge: "NEW" },
  { id: "optimizations", label: "Optimizations", Icon: WandSparkles },
  { id: "savings-plans", label: "Savings Plans", Icon: PiggyBank },
  { id: "spend", label: "Spend", Icon: ChartLine },
  { id: "teams", label: "Teams", Icon: Users },
  { id: "settings", label: "Settings", Icon: Settings },
];

type Props = { open: boolean; onClose: () => void };

function NavLink({ item, collapsed }: { item: NavItem; collapsed?: boolean }) {
  const base =
    "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-default select-none";
  const active = "bg-mint-50 text-mint-600 font-semibold";
  const inactive = "text-ink-500 hover:bg-ink-50 hover:text-ink-700";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={!item.active}
      aria-current={item.active ? "page" : undefined}
      className={clsx(base, item.active ? active : inactive)}
    >
      <item.Icon size={18} className="shrink-0" />
      {!collapsed && (
        <span className="flex-1 text-sm truncate">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="text-[10px] font-bold bg-electric-100 text-electric-600 rounded-full px-1.5 py-0.5 leading-none">
          {item.badge}
        </span>
      )}
    </div>
  );
}

export function Sidebar({ open, onClose }: Props) {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Desktop / tablet static sidebar — md+ only */}
      <aside className="hidden md:flex flex-col w-16 lg:w-[248px] shrink-0 border-r border-ink-100 bg-white">
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} collapsed={true} />
          ))}
          {/* Show labels on lg+ */}
          <div className="lg:hidden" />
        </nav>
        <div className="px-4 pb-4 hidden lg:block">
          <p className="text-xs text-ink-300 leading-relaxed">
            concept demo · not affiliated with Pump
          </p>
        </div>
      </aside>

      {/* Full sidebar for lg+ overlaid on top of icon rail */}
      <aside className="hidden lg:flex flex-col fixed top-14 left-0 w-[248px] bottom-0 border-r border-ink-100 bg-white z-20">
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>
        <div className="px-4 pb-4">
          <p className="text-xs text-ink-300 leading-relaxed">
            concept demo · not affiliated with Pump
          </p>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={onClose}
              aria-hidden
            />
            <motion.aside
              key="drawer"
              initial={{ x: reduced ? 0 : -280, opacity: reduced ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduced ? 0 : -280, opacity: reduced ? 0 : 1 }}
              transition={{ duration: reduced ? 0.15 : 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 flex flex-col shadow-pop md:hidden"
            >
              <div className="h-14 flex items-center px-4 border-b border-ink-100">
                <PumpLogo size="sm" />
              </div>
              <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.id} item={item} />
                ))}
              </nav>
              <div className="px-4 pb-4">
                <p className="text-xs text-ink-300 leading-relaxed">
                  concept demo · not affiliated with Pump
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
