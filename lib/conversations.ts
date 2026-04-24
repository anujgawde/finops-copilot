import type {
  ActionDef,
  BreakdownRow,
  ChartDataPoint,
  ExecSummaryData,
  FlowKey,
  Opportunity,
} from "./types";

// ---------------------------------------------------------------------------
// Flow action shape
// ---------------------------------------------------------------------------

export type FlowAction =
  | { at: number; type: "tool-start"; id: string; icon: string; label: string }
  | { at: number; type: "tool-done"; id: string }
  | { at: number; type: "text"; id: string; content: string }
  | { at: number; type: "chart"; id: string; data: ChartDataPoint[] }
  | { at: number; type: "table"; id: string; rows: BreakdownRow[] }
  | { at: number; type: "opportunities"; id: string; items: Opportunity[] }
  | { at: number; type: "exec-summary"; id: string; summary: ExecSummaryData }
  | { at: number; type: "actions"; id: string; actions: ActionDef[] }
  | { at: number; type: "followups"; id: string; chips: string[] }
  | { at: number; type: "done" };

export type FlowScript = {
  userText: string;
  actions: FlowAction[];
};

// ---------------------------------------------------------------------------
// Flow A — Root-cause spike
// Text: ~53 words × 35ms ≈ 1855ms streaming duration
// Text starts: 3500ms → done ~5355ms
// Subsequent blocks spaced 400ms apart from ~5500ms
// ---------------------------------------------------------------------------

const rootCauseChart: ChartDataPoint[] = [
  { date: "Apr 04", spend: 11120 },
  { date: "Apr 05", spend: 11340 },
  { date: "Apr 06", spend: 10980 },
  { date: "Apr 07", spend: 11260 },
  { date: "Apr 08", spend: 11040 },
  { date: "Apr 09", spend: 11410 },
  { date: "Apr 10", spend: 11150 },
  { date: "Apr 11", spend: 11220 },
  { date: "Apr 12", spend: 11080 },
  { date: "Apr 13", spend: 11330 },
  { date: "Apr 14", spend: 11170 },
  { date: "Apr 15", spend: 11290 },
  { date: "Apr 16", spend: 15480, spike: true, note: "Deploy v2.4.1 · +$4,280" },
  { date: "Apr 17", spend: 12910 },
];

const rootCauseRows: BreakdownRow[] = [
  { service: "EC2",         delta: 3120, pct: 42 },
  { service: "EBS",         delta: 780,  pct: 31 },
  { service: "NAT Gateway", delta: 380,  pct: 24 },
];

const rootCauseActions: ActionDef[] = [
  { id: "alert",  label: "Set anomaly alert",      variant: "primary",    action: "toast", toastMessage: "Anomaly alert set" },
  { id: "slack",  label: "Share to #infra",         variant: "secondary",  action: "toast", toastMessage: "Shared to #infra" },
  { id: "optim",  label: "Open in Optimizations",   variant: "secondary",  action: "noop" },
];

const spikeFlow: FlowScript = {
  userText: "Why did my AWS bill spike last Thursday?",
  actions: [
    { at: 180,  type: "tool-start", id: "t1", icon: "🔍", label: "Scanning anomalies across 47 services…" },
    { at: 1100, type: "tool-done",  id: "t1" },
    { at: 1300, type: "tool-start", id: "t2", icon: "📊", label: "Correlating with deployment events…" },
    { at: 2300, type: "tool-done",  id: "t2" },
    { at: 2500, type: "tool-start", id: "t3", icon: "🔗", label: "Checking ownership and tags…" },
    { at: 3400, type: "tool-done",  id: "t3" },
    {
      at: 3500,
      type: "text",
      id: "txt1",
      content:
        "Your AWS bill jumped **$4,280 on Apr 16** — a **38% spike** vs the prior 7-day average. Root cause: the **`data-pipeline-prod`** EKS cluster auto-scaled from 12 → 58 nodes around **2:14 PM UTC**, triggered by a deploy tagged `v2.4.1`. The scale-up persisted overnight because the HPA min-replicas was bumped in the same PR.",
    },
    { at: 5500, type: "chart",    id: "chart1", data: rootCauseChart },
    { at: 5900, type: "table",    id: "tbl1",   rows: rootCauseRows },
    { at: 6300, type: "actions",  id: "act1",   actions: rootCauseActions },
    {
      at: 6700,
      type: "followups",
      id: "fu1",
      chips: [
        "How can I prevent this next time?",
        "Who owns `data-pipeline-prod`?",
        "What would a Savings Plan save here?",
      ],
    },
    { at: 7500, type: "done" },
  ],
};

// ---------------------------------------------------------------------------
// Flow B — Savings opportunities
// Text: ~19 words × 35ms ≈ 665ms streaming duration
// Text starts: 4000ms → done ~4665ms
// Opportunities stagger in at 4800ms
// ---------------------------------------------------------------------------

const savingsItems: Opportunity[] = [
  {
    id: "op1",
    title: "Migrate 14 `m5.xlarge` to Graviton (`m7g.xlarge`)",
    savings: 4120,
    effort: "Low",
    risk: "Low",
    primaryAction: "Apply",
  },
  {
    id: "op2",
    title: "Purchase 1-yr Compute Savings Plan ($3,200/hr commit)",
    savings: 3640,
    effort: "Low",
    risk: "Medium",
    primaryAction: "Review details",
  },
  {
    id: "op3",
    title: "Delete 2.1 TB of cold S3 in `backups-legacy`",
    savings: 2100,
    effort: "Medium",
    risk: "Low",
    note: "Last accessed 180+ days ago",
    primaryAction: "Create deletion policy",
  },
];

const savingsActions: ActionDef[] = [
  { id: "apply-all", label: "Apply all three",  variant: "primary",   action: "toast", toastMessage: "Applying optimizations…" },
  { id: "export",    label: "Export to PDF",     variant: "secondary", action: "noop" },
];

const savingsFlow: FlowScript = {
  userText: "What are my biggest savings opportunities?",
  actions: [
    { at: 180,  type: "tool-start", id: "t1", icon: "🧮", label: "Analyzing 12 months of usage…" },
    { at: 1280, type: "tool-done",  id: "t1" },
    { at: 1480, type: "tool-start", id: "t2", icon: "🎯", label: "Matching against Pump's group buys…" },
    { at: 2580, type: "tool-done",  id: "t2" },
    { at: 2780, type: "tool-start", id: "t3", icon: "🤖", label: "Ranking by impact × effort…" },
    { at: 3880, type: "tool-done",  id: "t3" },
    {
      at: 4000,
      type: "text",
      id: "txt1",
      content:
        "I found **3 opportunities worth $9,860/mo** if we move on them in the next 7 days. Ordered by ROI:",
    },
    { at: 4800, type: "opportunities", id: "opp1", items: savingsItems },
    { at: 5300, type: "actions",       id: "act1", actions: savingsActions },
    {
      at: 5700,
      type: "followups",
      id: "fu1",
      chips: [
        "Show me the Graviton migration plan",
        "Which teams are affected?",
        "Schedule these for next week",
      ],
    },
    { at: 6400, type: "done" },
  ],
};

// ---------------------------------------------------------------------------
// Flow C — Board exec summary
// Text: ~8 words × 35ms ≈ 280ms streaming duration
// Text starts: 4000ms → done ~4280ms
// Exec summary card at 4500ms
// ---------------------------------------------------------------------------

const execSummaryData: ExecSummaryData = {
  headline: "April cloud spend tracking 4% below plan, savings run-rate up $118K/yr.",
  numbers: [
    { label: "MTD spend",      value: "$312,480",    note: "plan: $325,000 · −3.8%" },
    { label: "Run-rate savings", value: "$118,200/yr", note: "+$14K vs March" },
    { label: "Forecast EoM",   value: "$342,600",    note: "plan: $355K" },
  ],
  movers: [
    { label: "EKS `data-pipeline-prod`",  delta: "+$4.2K (deploy anomaly, resolved)" },
    { label: "Graviton migration",         delta: "−$2.1K (2 of 6 services complete)" },
    { label: "S3 legacy cleanup",          delta: "−$1.4K" },
  ],
  watching:
    "Redshift reservation expires May 7 — Pump will auto-renew at the group-buy rate unless you override.",
  ask: "20 min next week to approve the Q2 Savings Plan commit ($3.2K/hr).",
};

const boardSummaryText = `Here's a **board-ready one-pager** for your April spend:`;

const boardActions: ActionDef[] = [
  {
    id: "copy",
    label: "Copy to clipboard",
    variant: "primary",
    action: "copy",
    copyText: [
      "April cloud spend tracking 4% below plan, savings run-rate up $118K/yr.",
      "",
      "MTD spend:       $312,480  (plan: $325,000 · −3.8%)",
      "Run-rate savings: $118,200/yr (+$14K vs March)",
      "Forecast EoM:    $342,600  (plan: $355K)",
      "",
      "Top movers:",
      "  EKS data-pipeline-prod  +$4.2K (deploy anomaly, resolved)",
      "  Graviton migration       −$2.1K (2 of 6 services complete)",
      "  S3 legacy cleanup        −$1.4K",
      "",
      "Watching: Redshift reservation expires May 7.",
      "One ask: 20 min to approve Q2 Savings Plan commit ($3.2K/hr).",
    ].join("\n"),
    toastMessage: "Copied to clipboard",
  },
  { id: "email",  label: "Email to @cfo",  variant: "secondary", action: "noop" },
  { id: "pdf",    label: "Export as PDF",  variant: "secondary", action: "noop" },
];

const boardFlow: FlowScript = {
  userText: "Draft a spend update for the board",
  actions: [
    { at: 180,  type: "tool-start", id: "t1", icon: "📅", label: "Pulling last 30 days…" },
    { at: 1280, type: "tool-done",  id: "t1" },
    { at: 1480, type: "tool-start", id: "t2", icon: "📊", label: "Comparing vs Q1 plan…" },
    { at: 2580, type: "tool-done",  id: "t2" },
    { at: 2780, type: "tool-start", id: "t3", icon: "✍️", label: "Drafting summary…" },
    { at: 3880, type: "tool-done",  id: "t3" },
    { at: 4000, type: "text", id: "txt1", content: boardSummaryText },
    { at: 4500, type: "exec-summary", id: "exec1", summary: execSummaryData },
    { at: 5300, type: "actions",      id: "act1",  actions: boardActions },
    {
      at: 5700,
      type: "followups",
      id: "fu1",
      chips: [
        "Make it more technical for engineering",
        "Add a chart",
        "Schedule this as a weekly digest",
      ],
    },
    { at: 6300, type: "done" },
  ],
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const FLOWS: Record<FlowKey, FlowScript> = {
  spike:   spikeFlow,
  savings: savingsFlow,
  board:   boardFlow,
};
