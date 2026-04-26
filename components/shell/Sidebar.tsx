"use client";

import { useEffect, useRef, useState } from "react";
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
  ChevronRight,
  BookOpen,
  LogOut,
  ExternalLink,
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
  { id: "overview",      label: "Overview",      Icon: LayoutDashboard },
  { id: "ask-pump",      label: "Ask Pump",       Icon: Sparkles, active: true, badge: "NEW" },
  { id: "optimizations", label: "Optimizations",  Icon: WandSparkles },
  { id: "savings-plans", label: "Savings Plans",  Icon: PiggyBank },
  { id: "spend",         label: "Spend",          Icon: ChartLine },
  { id: "teams",         label: "Teams",          Icon: Users },
];

// All icons/logo sit at 16px from the sidebar edge:
// header px-4 (16px), nav px-2 + item px-2 (16px), footer px-2 + item px-2 (16px)

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
        collapsed ? "justify-center px-2" : "px-2",
        item.active
          ? "bg-[#EFEFEF] text-ink-900 font-semibold"
          : "text-ink-500 hover:bg-[#F5F5F5] hover:text-ink-700",
      )}
    >
      <item.Icon size={17} className="shrink-0" />
      {!collapsed && (
        <span className="flex-1 text-sm truncate whitespace-nowrap">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="text-[10px] font-semibold bg-mint-100 text-mint-700 rounded-full px-1.5 py-0.5 leading-none uppercase tracking-wide">
          {item.badge}
        </span>
      )}
    </div>
  );
}

function UserPopover({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-2 right-2 mb-2 bg-white rounded-xl border border-ink-100 shadow-pop z-50 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="w-8 h-8 rounded-full bg-ink-200 text-ink-600 text-[13px] font-semibold flex items-center justify-center shrink-0 select-none">
          A
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-900 leading-tight">Anuj Gawde</p>
          <p className="text-xs text-ink-400 leading-tight truncate">gawdeanuj@gmail.com</p>
        </div>
      </div>

      <div className="border-t border-ink-100" />

      <button className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
        <span className="flex items-center gap-3">
          <BookOpen size={15} className="text-ink-400" />
          Docs
        </span>
        <ExternalLink size={13} className="text-ink-300" />
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors">
        <LogOut size={15} />
        Log out
      </button>
    </div>
  );
}

type Props = { mobileOpen: boolean; onMobileClose: () => void };

export function Sidebar({ mobileOpen, onMobileClose }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const reduced = useReducedMotion();

  const footer = (
    <div className="shrink-0 border-t border-[#E5E5E5] relative px-2 py-2">
      {userOpen && !collapsed && <UserPopover onClose={() => setUserOpen(false)} />}

      {/* Settings */}
      <div
        role="button"
        tabIndex={0}
        aria-disabled="true"
        title={collapsed ? "Settings" : undefined}
        className={clsx(
          "flex items-center gap-3 py-2 px-2 rounded-lg text-ink-500 hover:bg-[#F5F5F5] hover:text-ink-700 transition-colors cursor-default select-none mb-0.5",
          collapsed && "justify-center",
        )}
      >
        <Settings size={17} className="shrink-0" />
        {!collapsed && <span className="text-sm">Settings</span>}
      </div>

      {/* User row */}
      <button
        onClick={() => !collapsed && setUserOpen((v) => !v)}
        title={collapsed ? "Anuj Gawde" : undefined}
        className={clsx(
          "w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors",
          collapsed && "justify-center",
        )}
      >
        <div className="w-7 h-7 rounded-full bg-ink-200 text-ink-600 text-[11px] font-semibold flex items-center justify-center shrink-0 select-none">
          A
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 text-xs font-semibold text-ink-800 truncate text-left leading-tight">
              Anuj Gawde
            </span>
            <ChevronRight size={14} className="text-ink-300 shrink-0" />
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={clsx(
          "hidden md:flex flex-col shrink-0 bg-[#FBFBFB] border-r border-[#E5E5E5] overflow-hidden",
          "transition-[width] duration-300 ease-in-out",
          collapsed ? "w-14" : "w-[248px]",
        )}
      >
        {/* Header — logo at px-4 = 16px from edge */}
        <div className="h-14 flex items-center shrink-0 px-4 gap-2 border-b border-[#E5E5E5]">
          {collapsed ? (
            <div className="group relative flex-1 flex items-center justify-center h-full">
              <div className="transition-opacity duration-150 group-hover:opacity-0 pointer-events-none select-none">
                <Image src="/pump-logo-short.png" alt="Pump" width={24} height={24} />
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
            <>
              <div className="flex-1 min-w-0">
                <PumpLogo size="md" />
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

        {/* Nav — container px-2, items px-2 → icons at 16px from edge */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {footer}
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
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#FBFBFB] z-50 flex flex-col shadow-pop md:hidden"
            >
              <div className="h-14 flex items-center px-4 border-b border-[#E5E5E5]">
                <PumpLogo size="md" />
              </div>
              <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.id} item={item} collapsed={false} />
                ))}
              </nav>
              <div className="border-t border-[#E5E5E5] px-2 py-2">
                <div
                  role="button"
                  tabIndex={0}
                  aria-disabled="true"
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-ink-500 hover:bg-[#F5F5F5] transition-colors cursor-default select-none mb-0.5"
                >
                  <Settings size={17} className="shrink-0" />
                  <span className="text-sm">Settings</span>
                </div>
                <div className="flex items-center gap-2.5 px-2 py-2">
                  <div className="w-7 h-7 rounded-full bg-ink-200 text-ink-600 text-[11px] font-semibold flex items-center justify-center shrink-0 select-none">
                    A
                  </div>
                  <span className="flex-1 text-xs font-semibold text-ink-800 truncate leading-tight">
                    Anuj Gawde
                  </span>
                  <ChevronRight size={14} className="text-ink-300 shrink-0" />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
