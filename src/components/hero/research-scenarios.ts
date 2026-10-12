// ── TYPES ───────────────────────────────────────────────────────────
export type FindingItem = {
  text: string;
  isChip?: boolean;
  chipType?: "tertiary" | "success" | "blue" | "neutral";
  chipBadge?: string;
};

export type StageData = {
  id: string;
  label: string;
  collapsedSummary: string;
  findings: FindingItem[];
};

export type ScenarioData = {
  domain: string;
  targetCompany: string;
  category: string;
  latency: string;
  stages: StageData[];
};

// ── 3 HIGH-FIDELITY B2B SCENARIOS ──────────────────────────────────
export const SCENARIOS: ScenarioData[] = [
  {
    domain: "cal.com",
    targetCompany: "Synthetix Labs",
    category: "B2B Scheduling & Routing",
    latency: "38ms",
    stages: [
      {
        id: "s1-1",
        label: "Domain & API Extraction",
        collapsedSummary: "48 high-fit accounts identified",
        findings: [
          {
            text: "Extracting cal.com metadata, value proposition & scheduling API",
          },
          { text: "Mapping competitive landscape vs. Calendly, Chili Piper" },
          {
            text: "ICP Fit: 99%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 99%",
          },
        ],
      },
      {
        id: "s1-2",
        label: "ICP Account Discovery",
        collapsedSummary: "Target account: Synthetix Labs (Series B AI)",
        findings: [
          {
            text: "Filtering 14,200 tech scaleups for active RevOps & AE expansion",
          },
          { text: "120 employees · Series B · Enterprise AI Infrastructure" },
          {
            text: "Synthetix Labs · 8 AE open roles",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Synthetix Labs · 8 AE open roles",
          },
        ],
      },
      {
        id: "s1-3",
        label: "Decision Maker Waterfall",
        collapsedSummary: "Marcus Vance (VP RevOps) → Direct MX valid",
        findings: [
          { text: "Target buyer: Marcus Vance — VP of Revenue Operations" },
          {
            text: "Cascade waterfall across 14 data providers for direct work email",
          },
          {
            text: "marcus@synthetix.io — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "marcus@synthetix.io — MX verified",
          },
        ],
      },
      {
        id: "s1-4",
        label: "Contextual 1-to-1 Writing",
        collapsedSummary: "1-to-1 copy drafted → Demo handoff latency angle",
        findings: [
          { text: "Referencing trigger: 8 new AE hires vs. 28% demo dropoff" },
          {
            text: "Synthesized personalized value hook: zero-redirect scheduling",
          },
          {
            text: "Deliverability: Warmup Mailbox #2",
            isChip: true,
            chipType: "blue",
            chipBadge: "Deliverability Guardrail: Warmup #2",
          },
        ],
      },
      {
        id: "s1-5",
        label: "Autonomous Dispatch & Booking",
        collapsedSummary: "Demo confirmed for Thursday 2:00 PM EST",
        findings: [
          {
            text: "Dispatched with humanized cadence & secondary domain rotation",
          },
          {
            text: "Positive reply in 38 mins: 'Dropoff is real. Let's do Thursday'",
          },
          {
            text: "Booked: Thu 2:00 PM EST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Thu 2:00 PM EST (30 mins)",
          },
        ],
      },
    ],
  },
  {
    domain: "linear.app",
    targetCompany: "Warp Engine",
    category: "Developer Tools & Issue Tracking",
    latency: "42ms",
    stages: [
      {
        id: "s2-1",
        label: "Product Positioning & Wedge",
        collapsedSummary: "Jira displacement wedge mapped",
        findings: [
          {
            text: "Indexing linear.app cycles, roadmap sync & keyboard shortcuts",
          },
          {
            text: "Mapping friction points in legacy Jira enterprise instances",
          },
          {
            text: "ICP Fit: 98.4%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 98.4%",
          },
        ],
      },
      {
        id: "s2-2",
        label: "Scaleup Account Filtering",
        collapsedSummary: "Target account: Warp Engine (Series C DevTools)",
        findings: [
          {
            text: "Querying 8,500 scaleups with active engineering headcount surge",
          },
          {
            text: "340 employees · Series C · Distributed Systems Infrastructure",
          },
          {
            text: "Warp Engine · 14 Eng pods active",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Warp Engine · 14 Eng pods active",
          },
        ],
      },
      {
        id: "s2-3",
        label: "Buyer Waterfall Verification",
        collapsedSummary: "Elena Rostova (VP Eng) → Real-time SMTP valid",
        findings: [
          { text: "Target buyer: Elena Rostova — VP of Engineering" },
          { text: "Cascade checking port-25 SMTP handshakes & SPF records" },
          {
            text: "elena@warpengine.dev — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "elena@warpengine.dev — MX verified",
          },
        ],
      },
      {
        id: "s2-4",
        label: "Engineering Copy Synthesis",
        collapsedSummary: "Copy drafted → Sprint cycle overhead hook",
        findings: [
          { text: "Referencing sprint review overhead across 14 remote pods" },
          { text: "Positioned automated 1-click Jira sync & velocity metrics" },
          {
            text: "Deliverability: Mailbox Pool #4",
            isChip: true,
            chipType: "blue",
            chipBadge: "Deliverability: Mailbox Pool #4",
          },
        ],
      },
      {
        id: "s2-5",
        label: "Calendar Conversion",
        collapsedSummary: "Migration demo confirmed for Friday 11:00 AM PST",
        findings: [
          {
            text: "Outreach triggered with randomized delay & verified headers",
          },
          {
            text: "Inbound response in 44 mins: 'Jira is slowing us down. Send invite'",
          },
          {
            text: "Booked: Fri 11:00 AM PST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Fri 11:00 AM PST (30 mins)",
          },
        ],
      },
    ],
  },
  {
    domain: "ramp.com",
    targetCompany: "Apex Global",
    category: "Corporate Spend & FinOps Autopilot",
    latency: "29ms",
    stages: [
      {
        id: "s3-1",
        label: "Domain Intelligence & Angles",
        collapsedSummary: "SaaS spend consolidation hook identified",
        findings: [
          {
            text: "Parsing ramp.com automated card controls & receipt matching",
          },
          {
            text: "Targeting multi-entity CFOs managing software license sprawl",
          },
          {
            text: "ICP Fit: 99.4%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 99.4%",
          },
        ],
      },
      {
        id: "s3-2",
        label: "Finance Account Discovery",
        collapsedSummary: "Target account: Apex Global (Series C Logistics)",
        findings: [
          {
            text: "Scanning 12,000 mid-market entities with >50 vendor contracts",
          },
          { text: "450 employees · Series C · Supply Chain Cloud Platform" },
          {
            text: "Apex Global · 62 SaaS vendors",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Apex Global · 62 SaaS vendors",
          },
        ],
      },
      {
        id: "s3-3",
        label: "Executive Waterfall Resolution",
        collapsedSummary: "David Kim (CFO) → Corporate SMTP certified",
        findings: [
          { text: "Economic buyer: David Kim — Chief Financial Officer" },
          {
            text: "Multi-provider waterfall verification with zero-bounce guarantee",
          },
          {
            text: "dkim@apexglobal.io — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "dkim@apexglobal.io — MX verified",
          },
        ],
      },
      {
        id: "s3-4",
        label: "Financial Impact Writing",
        collapsedSummary: "Outreach crafted → $140k duplicate SaaS waste hook",
        findings: [
          {
            text: "Citing detected $140k annual duplicate software subscription spend",
          },
          {
            text: "Framed automated 14-day spend audit with zero ERP migration",
          },
          {
            text: "Spam Score: 0.0/10 · Guardrail Certified",
            isChip: true,
            chipType: "blue",
            chipBadge: "Spam Score: 0.0/10 · Certified",
          },
        ],
      },
      {
        id: "s3-5",
        label: "Automated Meeting Conversion",
        collapsedSummary: "CFO review confirmed for Tuesday 3:30 PM EST",
        findings: [
          {
            text: "Dispatched via secondary domain cluster with ramped volume",
          },
          {
            text: "Reply in 22 mins: 'Good catch on the duplicate seats. Tuesday works'",
          },
          {
            text: "Booked: Tue 3:30 PM EST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Tue 3:30 PM EST (30 mins)",
          },
        ],
      },
    ],
  },
];
