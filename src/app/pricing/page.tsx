import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/utility/button";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description:
    "Transparent pricing for modern agencies and freelancers. Protect client revenue, eliminate scope creep, and automate contracts.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing Plans | Scrunity",
    description:
      "Transparent pricing for modern agencies and freelancers. Free trial, Freelancer, Agency, and Enterprise tiers.",
    url: "/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans | Scrunity",
    description:
      "Transparent pricing for modern agencies and freelancers. Free trial, Freelancer, Agency, and Enterprise tiers.",
  },
};

const tiers = [
  {
    name: "Free Trial",
    price: "$0",
    period: "for 14 days",
    description: "Experience AI scope protection on your upcoming client engagement.",
    features: [
      "1 agency owner seat",
      "Up to 2 active client projects",
      "Basic AI scope clause extraction",
      "E-signatures & PDF contract vault",
      "Basic milestone payment tracking",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Freelancer",
    price: "$20",
    period: "/ month",
    description: "Complete client collaboration and revenue protection for independent pros.",
    features: [
      "1 full agency seat",
      "Unlimited client projects",
      "Unlimited contracts & proposals",
      "AI Scope Guardian (automated change orders)",
      "Multi-currency milestone payments",
      "Standard pooled AI credits",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Agency",
    price: "$30",
    period: "/ month",
    description: "Built for scaling agencies managing multiple team members and enterprise clients.",
    features: [
      "Up to 5 team seats included",
      "Unlimited clients & projects",
      "Whitelabeling & custom brand logos",
      "Extended pooled AI & search credits",
      "Dual-role client access safeguards",
      "EvilCharts velocity & payment analytics",
    ],
    cta: "Scale Your Agency",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual billing",
    description: "Custom infrastructure, SLAs, and security for large digital studios.",
    features: [
      "Custom seat limits & SSO",
      "Unlimited AI credits",
      "Dedicated account manager",
      "Custom legal templates & integrations",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <Container className="px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-[#00AAF7] ring-1 ring-sky-200">
            Predictable, Simple Pricing
          </span>
          <Heading className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Protect your scope. <br /> Get paid on time.
          </Heading>
          <Para className="mt-4 text-base text-neutral-600">
            Replace DocuSign, spreadsheet invoices, and chaotic WhatsApp threads with a single
            verified system of record for your client work.
          </Para>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                tier.popular
                  ? "border-[#00AAF7] bg-white shadow-xl shadow-sky-500/5 ring-2 ring-[#00AAF7]"
                  : "border-gray-200 bg-white shadow-xs hover:border-gray-300"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00AAF7] px-3 py-0.5 text-xs font-semibold text-white shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-neutral-900">{tier.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-neutral-900">
                    {tier.price}
                  </span>
                  <span className="text-xs text-neutral-500">{tier.period}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                  {tier.description}
                </p>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    What&apos;s included
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-neutral-700">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-[#00AAF7]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link href={`${siteConfig.appUrl}/sign-in`} className="block w-full">
                  <button
                    className={`w-full rounded-full py-2.5 text-xs font-semibold transition-all ${
                      tier.popular
                        ? "bg-[#00AAF7] text-white hover:bg-[#0088c4]"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
