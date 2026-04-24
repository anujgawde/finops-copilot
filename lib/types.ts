export type ToolBlock = {
  kind: "tool";
  id: string;
  label: string;
  icon: string;
  status: "running" | "done";
};

export type TextBlock = {
  kind: "text";
  id: string;
  text: string;
  revealed: number; // chars
};

export type ChartDataPoint = {
  date: string;
  spend: number;
  spike?: boolean;
  note?: string;
};

export type ChartBlock = {
  kind: "chart";
  id: string;
  data: ChartDataPoint[];
};

export type BreakdownRow = {
  service: string;
  delta: number; // absolute $
  pct: number;   // percentage delta
};

export type TableBlock = {
  kind: "table";
  id: string;
  rows: BreakdownRow[];
};

export type Opportunity = {
  id: string;
  title: string;
  savings: number; // monthly $
  effort: "Low" | "Medium" | "High";
  risk: "Low" | "Medium" | "High";
  note?: string;
  primaryAction: string;
};

export type OpportunitiesBlock = {
  kind: "opportunities";
  id: string;
  items: Opportunity[];
};

export type ExecSummaryData = {
  headline: string;
  numbers: Array<{ label: string; value: string; note: string }>;
  movers: Array<{ label: string; delta: string }>;
  watching: string;
  ask: string;
};

export type ExecSummaryBlock = {
  kind: "exec-summary";
  id: string;
  summary: ExecSummaryData;
};

export type ActionDef = {
  id: string;
  label: string;
  variant: "primary" | "secondary";
  action: "copy" | "toast" | "noop";
  copyText?: string;
  toastMessage?: string;
};

export type ActionsBlock = {
  kind: "actions";
  id: string;
  actions: ActionDef[];
};

export type FollowupsBlock = {
  kind: "followups";
  id: string;
  chips: string[];
};

export type Block =
  | ToolBlock
  | TextBlock
  | ChartBlock
  | TableBlock
  | OpportunitiesBlock
  | ExecSummaryBlock
  | ActionsBlock
  | FollowupsBlock;

export type UserMessage = {
  role: "user";
  id: string;
  text: string;
};

export type AssistantMessage = {
  role: "assistant";
  id: string;
  blocks: Block[];
  status: "streaming" | "done";
};

export type Message = UserMessage | AssistantMessage;

export type FlowKey = "spike" | "savings" | "board";

export const FLOW_CHIPS: Record<FlowKey, string> = {
  spike: "Why did my AWS bill spike last Thursday?",
  savings: "What are my biggest savings opportunities?",
  board: "Draft a spend update for the board",
};
