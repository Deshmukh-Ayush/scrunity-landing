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
      status: "optimal" | "degraded";
    }
  | {
      type: "approval-card";
      actionTitle: string;
      description: string;
      diffSummary: string;
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

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    role: "user",
    content:
      "Hi What's up!! Can you inspect our auth middleware and verify session latency?",
  },
  {
    id: "msg-2",
    role: "assistant",
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
      "Everything is good! I inspected the auth middleware: token validation is averaging 14ms across edge nodes, which is well within the 50ms budget.",
    widget: {
      type: "latency-metrics",
      title: "Edge Session Benchmark",
      latencyMs: 14,
      p99Ms: 28,
      status: "optimal",
    },
  },
];

export const SCENARIO_RESPONSES = [
  {
    steps: [
      {
        id: "s-a",
        label: "Parsing AST in src/middleware.ts",
        status: "completed" as StepStatus,
      },
      {
        id: "s-b",
        label: "Benchmarking Neon connection pool",
        status: "completed" as StepStatus,
      },
      {
        id: "s-c",
        label: "Synthesizing runtime execution plan",
        status: "completed" as StepStatus,
      },
    ],
    content:
      "Auth middleware logic is optimized. Connection pooling has 12 available idle clients, and edge cache hit ratio is currently at 94.2%.",
    widget: {
      type: "approval-card" as const,
      actionTitle: "Apply Edge Cache Headers",
      description:
        "Update next.config.ts to enforce stale-while-revalidate for auth sessions.",
      diffSummary: "+ Cache-Control: s-maxage=60, stale-while-revalidate=30",
    },
  },
  {
    steps: [
      {
        id: "s-d",
        label: "Fetching CRM deliverables pipeline",
        status: "completed" as StepStatus,
      },
      {
        id: "s-e",
        label: "Evaluating signed SOW milestones",
        status: "completed" as StepStatus,
      },
    ],
    content:
      "I audited all open projects: 3 client milestones are pending sign-off, while revenue velocity increased by 18% over the last sprint.",
    widget: {
      type: "revenue-audit" as const,
      totalPipeline: "$142,000",
      atRisk: "$12,400",
      wonRate: "78.4%",
    },
  },
];
