"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  WandSparkles,
  PiggyBank,
  ChartLine,
  Users,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
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
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "ask-pump", label: "Ask Pump", Icon: Sparkles, active: true, badge: "NEW" },
  { id: "optimizations", label: "Optimizations", Icon: WandSparkles },
  { id: "savings-plans", label: "Savings Plans", Icon: PiggyBank },
  { id: "spend", label: "Spend", Icon: ChartLine },
  { id: "teams", label: "Teams", Icon: Users },
  { id: "settings", label: "Settings", Icon: Settings },
];

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={!item.active}
      aria-current={item.active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={clsx(
        "flex items-center gap-3 py-2 rounded-lg transition-colors cursor-default select-none",
        collapsed ? "justify-center px-2" : "px-3",
        item.active
          ? "bg-[#EFEFEF] text-ink-900 font-semibold"
          : "text-ink-500 hover:bg-[#F5F5F5] hover:text-ink-700",
      )}
    >
      <item.Icon size={17} className="shrink-0" />
      {!collapsed && (
        <span className="flex-1 text-sm truncate whitespace-nowrap">
          {item.label}
        </span>
      )}
      {!collapsed && item.badge && (
        <span className="text-[10px] font-semibold bg-mint-100 text-mint-700 rounded-full px-1.5 py-0.5 leading-none uppercase tracking-wide">
          {item.badge}
        </span>
      )}
    </div>
  );
}

type Props = { mobileOpen: boolean; onMobileClose: () => void };

export function Sidebar({ mobileOpen, onMobileClose }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      {/* ── Desktop sidebar (full height) ── */}
      <aside
        className={clsx(
          "hidden md:flex flex-col shrink-0 bg-white border-r border-[#E5E5E5] overflow-hidden",
          "transition-[width] duration-300 ease-in-out",
          collapsed ? "w-14" : "w-[248px]",
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center  shrink-0 px-3 gap-2">
          {collapsed ? (
            // Collapsed: logo mark shown; on hover the whole area becomes the expand button
            <div className="group relative flex-1 flex items-center justify-center h-full">
              <div className="transition-opacity duration-150 group-hover:opacity-0 pointer-events-none select-none">
                <Image src="/pump-logo.png" alt="Pump" width={24} height={22} />
              </div>
              <button
                onClick={() => setCollapsed(false)}
                aria-label="Expand sidebar"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-ink-500 hover:text-ink-700"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          ) : (
            // Expanded: logo on left, «» collapse button always on right
            <>
              <div className="flex-1 min-w-0">
                <PumpLogo size="sm" />
              </div>
              <button
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="shrink-0 p-1.5 rounded-md text-ink-400 hover:text-ink-700 hover:bg-[#F5F5F5] transition-colors"
              >
                <ChevronsLeft size={16} />
              </button>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 pb-4 shrink-0">
            <p className="text-xs text-ink-300 leading-relaxed">
              concept demo · not affiliated with Pump
            </p>
          </div>
        )}
      </aside>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={onMobileClose}
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
              <div className="h-14 flex items-center px-4 ">
                <PumpLogo size="sm" />
              </div>
              <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.id} item={item} collapsed={false} />
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
