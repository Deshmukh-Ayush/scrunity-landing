/**
 * Pricing plan tier definition conforming to Scrunity's scope & collaboration model.
 */
export interface PricingPlan {
  id: "freelancer" | "agency" | "enterprise";
  name: string;
  description: string;
  price: string;
  period: string;
  seats: string;
  cta: string;
  features: string[];
}

/**
 * Verified pricing tier configurations for independent pros, teams, and enterprise clients.
 */
export const PRICING_DATA: PricingPlan[] = [
  {
    id: "freelancer",
    name: "Freelancer",
    description: "For solo freelancers managing end-to-end client work",
    price: "$14",
    period: "/month",
    seats: "1 seat",
    cta: "Start free trial",
    features: [
      "Unlimited projects & clients",
      "Proposals & e-signed contracts",
      "Deliverables & file management",
      "Invoicing & payment tracking",
      "AI Scope Guardian",
      "Torch AI co-pilot",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    description: "For growing teams collaborating across multiple clients",
    price: "$29",
    period: "/month",
    seats: "Up to 5 seats",
    cta: "Start free trial",
    features: [
      "Everything in Freelancer",
      "Team collaboration",
      "Full Torch AI",
      "AI drafting & web search",
      "White-label client experience",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For larger organizations needing tailored terms and scale",
    price: "Custom",
    period: "",
    seats: "Custom seats",
    cta: "Contact sales",
    features: [
      "Everything in Agency",
      "Custom seat count",
      "Dedicated onboarding",
      "Custom workflows",
      "Custom terms",
      "Dedicated support",
    ],
  },
];
