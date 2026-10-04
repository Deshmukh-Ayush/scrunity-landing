/**
 * Pricing plan tier definition conforming to Scrunity's autonomous outbound sales model.
 */
export interface PricingPlan {
  id: "growth" | "enterprise";
  name: string;
  description: string;
  price: string;
  period: string;
  seats: string;
  cta: string;
  features: string[];
}

/**
 * Verified pricing tier configurations for growth teams and enterprise organizations.
 * Exactly two tiers, both featuring "Contact sales".
 */
export const PRICING_DATA: PricingPlan[] = [
  {
    id: "growth",
    name: "Growth Engine",
    description:
      "For scaling B2B companies ready to automate prospect discovery, personalized outreach, and booked meetings.",
    price: "Custom",
    period: "tailored volume",
    seats: "Autonomous SDR Agent",
    cta: "Contact Sales",
    features: [
      "Autonomous domain & competitor research",
      "Dynamic ICP mapping & campaign generation",
      "Target company & verified decision-maker discovery",
      "Contextual 1-to-1 email drafting with user review",
      "Automated deliverability guardrails & mailbox rotation",
      "Autonomous calendar meeting booking",
      "Self-learning campaign optimization loop",
      "Live analytics HUD & CRM webhooks",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "For high-volume revenue organizations requiring multi-agent orchestration, custom TAM enrichment, and dedicated mailbox infrastructure.",
    price: "Custom",
    period: "annual engagement",
    seats: "Multi-Agent Fleet",
    cta: "Contact Sales",
    features: [
      "Everything in Growth, built for high volume",
      "Multi-agent parallel campaign orchestration",
      "Dedicated domain & mailbox warmup infrastructure",
      "Native bi-directional CRM sync (Salesforce, HubSpot, Attio)",
      "Custom waterfall enrichment & phone verification",
      "Custom brand voice training & compliance guardrails",
      "Dedicated growth engineer & strategy reviews",
      "99.9% uptime SLA & enterprise security terms",
    ],
  },
];
