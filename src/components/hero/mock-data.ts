export type MessageRole = "user" | "assistant" | "system";
export type StepStatus = "pending" | "running" | "completed" | "failed";

export type AgentStep = {
  id: string;
  label: string;
  status: StepStatus;
};

export type GenerativeWidget =
  | {
      type: "latency-metrics";
      title: string;
      latencyMs: number;
      p99Ms: number;
    }
  | {
      type: "revenue-audit";
      totalPipeline: string;
      atRisk: string;
      wonRate: string;
    };

export type Message = {
  id: string;
  role: MessageRole;
  content?: string;
  steps?: AgentStep[];
  widget?: GenerativeWidget;
  isStreaming?: boolean;
};

export type DemoTurn = {
  prompt: string;
  steps: AgentStep[];
  content: string;
  widget?: GenerativeWidget;
};

export const CONVERSATION_SCRIPT: DemoTurn[] = [
  {
    prompt: "Inspect our auth middleware and verify session latency",
    steps: [
      { id: "s-1", label: "Searching src/middleware.ts", status: "completed" },
      {
        id: "s-2",
        label: "Executing db:benchmark_session_query",
        status: "completed",
      },
      {
        id: "s-3",
        label: "Evaluating edge runtime overhead",
        status: "completed",
      },
    ],
    content:
      "Everything looks optimal. Edge token validation is averaging 14ms across nodes, comfortably within the 50ms budget.",
    widget: {
      type: "latency-metrics",
      title: "Edge Session Benchmark",
      latencyMs: 14,
      p99Ms: 28,
    },
  },
  {
    prompt: "Awesome. Now check the deliverable pipeline for pending sign-offs",
    steps: [
      {
        id: "s-4",
        label: "Querying CRM deliverable contracts",
        status: "completed",
      },
      {
        id: "s-5",
        label: "Auditing active SOW milestone statuses",
        status: "completed",
      },
    ],
    content:
      "Found 3 pending client deliverables awaiting sign-off. Overall sprint velocity increased by 18%.",
    widget: {
      type: "revenue-audit",
      totalPipeline: "$142,000",
      atRisk: "$12,400",
      wonRate: "78.4%",
    },
  },
  {
    prompt: "Draft an update summarizing this for the team Slack",
    steps: [
      {
        id: "s-6",
        label: "Aggregating performance and milestone logs",
        status: "completed",
      },
      {
        id: "s-7",
        label: "Synthesizing executive summary",
        status: "completed",
      },
    ],
    content:
      "Here is your team update:\n\n• Auth edge validation: 14ms avg (optimal)\n• Pipeline: $142k total ($12.4k at risk across 3 pending SOW milestones)\n• Sprint velocity: +18% WoW\n\nReady to dispatch whenever you are.",
  },
];
