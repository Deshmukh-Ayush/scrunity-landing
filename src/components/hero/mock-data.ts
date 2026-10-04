export type MessageRole = "user" | "assistant" | "system";
export type StepStatus = "pending" | "running" | "completed" | "failed";

export type AgentStep = {
  id: string;
  label: string;
  status: StepStatus;
};

export type GenerativeWidget =
  | {
      type: "icp-discovery";
      company: string;
      industry: string;
      employees: string;
      targetBuyer: string;
      fitScore: number;
    }
  | {
      type: "email-draft";
      recipient: string;
      title: string;
      subject: string;
      snippet: string;
      deliverabilityScore: string;
    }
  | {
      type: "meeting-booked";
      attendee: string;
      company: string;
      time: string;
      winningAngle: string;
      reallocatedVolume: string;
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
      "Launch outbound campaign for https://cal.com. Target high-growth tech companies hiring sales teams.",
    steps: [
      {
        id: "s-1",
        label: "Extracting cal.com metadata, value proposition & scheduling API",
        status: "completed",
      },
      {
        id: "s-2",
        label: "Analyzing competitor landscape (Calendly, Chili Piper) for wedge angles",
        status: "completed",
      },
      {
        id: "s-3",
        label: "Synthesizing ICP: Series A-C SaaS, VP RevOps, Heads of Sales",
        status: "completed",
      },
      {
        id: "s-4",
        label: "Discovering target accounts & waterfall-verifying decision makers",
        status: "completed",
      },
    ],
    content:
      "I've analyzed cal.com and mapped your competitive advantages vs. Calendly. Identified 48 high-fit B2B SaaS accounts currently scaling AE teams. Target buyer persona: VP Revenue Operations and Heads of Growth.",
    widget: {
      type: "icp-discovery",
      company: "Synthetix Labs",
      industry: "Enterprise AI Infrastructure",
      employees: "120 employees · Series B",
      targetBuyer: "Marcus Vance — VP of Revenue Operations",
      fitScore: 99,
    },
  },
  {
    prompt:
      "Draft personalized 1-to-1 cold outreach for Marcus Vance referencing their team growth",
    steps: [
      {
        id: "s-5",
        label: "Verifying direct work email: marcus@synthetix.io (valid MX 99.8%)",
        status: "completed",
      },
      {
        id: "s-6",
        label: "Drafting contextual 1-to-1 email citing recent AE hiring surge",
        status: "completed",
      },
      {
        id: "s-7",
        label: "Applying deliverability guardrails: secondary mailbox rotation",
        status: "completed",
      },
    ],
    content:
      "Drafted a hyper-personalized email for Marcus Vance. The draft highlights their recent hiring of 8 AEs and pitches cal.com's automated scheduling to stop demo dropoffs. Ready for your review and editing before dispatch.",
    widget: {
      type: "email-draft",
      recipient: "marcus@synthetix.io",
      title: "VP of Revenue Operations @ Synthetix Labs",
      subject: "Synthetix's demo-to-close routing vs. AE growth",
      snippet:
        "Saw Synthetix just scaled to 24 AEs. Most teams at your velocity lose ~28% of qualified pipeline in manual scheduling handoffs. Built an automated pipeline that routes qualified demos instantly without redirects.",
      deliverabilityScore: "99.8% (Warmup Mailbox #2)",
    },
  },
  {
    prompt:
      "Approve outreach and sync meeting conversions into our sales calendar",
    steps: [
      {
        id: "s-8",
        label: "Dispatching outreach with randomized send cadence",
        status: "completed",
      },
      {
        id: "s-9",
        label: "Parsing positive prospect reply & scheduling availability",
        status: "completed",
      },
      {
        id: "s-10",
        label: "Analyzing campaign signals & doubling down on winning ICP",
        status: "completed",
      },
    ],
    content:
      "Outreach dispatched. Marcus Vance replied in 38 minutes: 'Good timing, our demo dropoff is real. Let's do Thursday 2 PM'. Demo confirmed and synced to Google Calendar. The agent has reallocated 65% of outbound capacity to Series B SaaS RevOps leaders.",
    widget: {
      type: "meeting-booked",
      attendee: "Marcus Vance",
      company: "Synthetix Labs",
      time: "Thursday, 2:00 PM EST (30 mins)",
      winningAngle: "AE Handoff Latency (+18.4% positive reply)",
      reallocatedVolume: "+65% send volume",
    },
  },
];
