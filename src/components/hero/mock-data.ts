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
    prompt:
      "Research Acme Studio, draft a client proposal, and prepare the milestone contract",
    steps: [
      {
        id: "s-1",
        label: "Searching web & analyzing Acme Studio company profile",
        status: "completed",
      },
      {
        id: "s-2",
        label: "Extracting deliverable scope & milestone timelines",
        status: "completed",
      },
      {
        id: "s-3",
        label: "Generating binding contract with scope boundary guards",
        status: "completed",
      },
    ],
    content:
      "I've completed the background research on Acme Studio and drafted a 3-phase proposal ($42,000 total). The contract includes defined deliverable milestones, payment terms, and automated scope protection ready for client e-signature.",
  },
  {
    prompt:
      "Check deliverable status for Horizon Corp and generate the milestone invoice",
    steps: [
      {
        id: "s-4",
        label: "Auditing active deliverables against contract SOW",
        status: "completed",
      },
      {
        id: "s-5",
        label: "Verifying milestone sign-offs & detecting scope changes",
        status: "completed",
      },
      {
        id: "s-6",
        label: "Generating itemized milestone invoice for client review",
        status: "completed",
      },
    ],
    content:
      "All 4 deliverables for Milestone 2 are complete and verified within contract scope. Invoice #INV-1082 ($16,500) has been generated and queued for client approval.",
    widget: {
      type: "revenue-audit",
      totalPipeline: "$148,000",
      atRisk: "$0 (Scope Safe)",
      wonRate: "98.4%",
    },
  },
  {
    prompt:
      "Draft a client collaboration update with the invoice and sign-off link",
    steps: [
      {
        id: "s-7",
        label: "Aggregating deliverable sign-offs and invoice summary",
        status: "completed",
      },
      {
        id: "s-8",
        label: "Formatting client portal message with secure payment link",
        status: "completed",
      },
    ],
    content:
      "Here is your client collaboration update for Horizon Corp:\n\n• Deliverables: Milestone 2 (Design System & Prototype) approved\n• Contract Status: On track, zero scope creep flagged\n• Invoice: #INV-1082 ($16,500) ready for one-click payment\n• Next Step: Milestone 3 kickoff scheduled for Monday\n\nReady to send through the client portal whenever you are.",
  },
];
