# SaaS Landing Page Generator Recipe

This reference provides a complete recipe to construct a production-ready SaaS landing page for any application using this design system.

---

## 1. Directory Structure

For any new SaaS landing page, assemble this structure:

```
src/
├── app/
│   ├── globals.css              # Custom variables (--shadow-border-sm, enter keyframes)
│   ├── layout.tsx               # Inter font, Navbar, Toaster
│   ├── page.tsx                 # Main landing page assembled in Containers
│   └── join/
│       └── page.tsx             # 50/50 Onboarding route with blueprint stage
├── components/
│   ├── container.tsx            # The foundational mx-auto max-w-7xl bg-gray-50 wrapper
│   ├── navbar/                  # 72px sticky header with pill links & CTA
│   ├── hero/                    # Interactive product UI showcase
│   ├── features/                # 3-column cards with morphing illustrations
│   ├── how-it-works/            # 3-step workflow with card decks & scalloped notches
│   ├── pricing/                 # Concentric border radius cards with tabular numbers
│   ├── footer/                  # Status pill, newsletter card, legal links
│   └── utility/
│       ├── texts.tsx            # Heading, SubHeading, Para with blur reveals
│       ├── divider.tsx          # Full-viewport breakout line
│       └── button.tsx           # Pill button with inset shadow & spring tap
```

---

## 2. Complete Landing Page Scaffold (`app/page.tsx`)

Here is the exact template to generate:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Heading, SubHeading, Para } from "@/components/utility/texts";
import { Divider } from "@/components/utility/divider";
import { Button } from "@/components/utility/button";
import Link from "next/link";

// 1. Metadata
export const metadata: Metadata = {
  title: "[Product Name] — [Core Value Proposition]",
  description: "[Clear 2-sentence description of the problem solved and the audience].",
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50">
      {/* ── 1. Hero Header Container ──────────────────────────── */}
      <Container className="overflow-hidden">
        <div className="flex flex-col items-start justify-between gap-4 px-10 pt-20 pb-10 md:flex-row md:items-end md:gap-6 md:pt-40">
          <Heading className="leading-none md:leading-16">
            [Main Headline Line 1] <br /> [Main Headline Line 2]
          </Heading>

          <div className="flex flex-col items-start justify-between gap-6 py-1">
            <Para className="text-start">
              [Concise summary of key capabilities and deliverables.] <br className="hidden md:inline" />
              [Secondary benefit and invitation to join.]
            </Para>

            <div className="flex flex-wrap items-center justify-start gap-4">
              <button className="cursor-pointer rounded-full px-6 py-2 text-[15px] text-neutral-800 transition-colors hover:bg-neutral-200/60">
                <Link href="/waitlist">Join Waitlist</Link>
              </button>
              <Button href="/join">Get Early Access</Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ── 2. Hero Interactive Product Stage ─────────────────── */}
      <div className="w-full overflow-hidden rounded-[10px] border border-gray-200 p-1.5 sm:p-2 md:ml-35 md:w-auto">
        {/* Replace with interactive app preview, terminal, or generative chat UI */}
        <HeroProductShowcase />
      </div>

      {/* ── 3. Main Body Container with Vertical Grid Borders ─── */}
      <Container className="mt-10 min-h-screen border-x border-gray-200 px-10.5 py-20 pb-10">
        {/* Feature Section 1 */}
        <div className="w-full">
          <SubHeading className="flex flex-col items-start justify-center">
            <p>
              [Verb 1]{" "}
              <span className="rounded-lg bg-blue-200/50 p-0.5 text-cyan-500">
                [Key Entity 1]
              </span>{" "}
              [Outcome 1]
            </p>
            <p>
              [Verb 2]{" "}
              <span className="rounded-lg bg-gray-200/50 p-0.5 text-neutral-500">
                [Key Entity 2]
              </span>{" "}
              [Outcome 2]
            </p>
          </SubHeading>
        </div>

        <div className="w-full py-10">
          <FeatureGrid />
        </div>

        <Divider />

        {/* How It Works Section */}
        <div className="w-full py-10">
          <SubHeading>How it works</SubHeading>
          <Para>From [initial trigger] to [final deliverable/payout] in three automated steps.</Para>
          <HowItWorksWorkflow />
        </div>

        <Divider />

        {/* Pricing Section */}
        <div className="w-full py-10">
          <SubHeading>Pricing</SubHeading>
          <Para>Start for free and scale with predictable tiers.</Para>
          <PricingGrid />
        </div>

        <Divider />

        {/* Interactive Value Section / Transformation */}
        <div className="w-full py-10">
          <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-0">
            <div className="w-full">
              <SubHeading>[Product Name] makes it effortless.</SubHeading>
              <Para className="my-2 w-full md:w-150">
                [Detailed explanation of how automation removes cognitive load and protects user revenue.]
              </Para>
            </div>
            <Button className="my-1 shrink-0" href="/join">Start free trial</Button>
          </div>

          <InteractiveFlowStage />
        </div>

        <Divider />

        {/* Footer */}
        <Footer />
      </Container>
    </div>
  );
}
```

---

## 3. Pricing Tier Implementation Pattern

Always construct pricing cards with concentric border radius and tabular-nums:

```tsx
<motion.div
  whileHover={{ y: -3 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  /* Concentric Outer Radius: 24px (rounded-[24px]) with 8px padding (p-2) */
  className="group relative flex h-full flex-col rounded-[24px] border border-gray-200/90 bg-gray-100/70 p-2 shadow-xs hover:border-gray-300"
>
  {/* Concentric Inner Radius: 16px (24px - 8px = 16px) */}
  <div className="shadow-border-sm relative flex h-full flex-col justify-between rounded-[16px] bg-white p-6 sm:p-7">
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-neutral-900">{plan.name}</h3>
          <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
        </div>
        <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-neutral-600">
          {plan.badge}
        </span>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <span className="text-4xl font-semibold tracking-tight text-neutral-900 tabular-nums">
          {plan.price}
        </span>
        <span className="text-sm font-medium text-neutral-500"> / month</span>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        <FeatureList items={plan.features} />
      </div>
    </div>

    <div className="mt-8 pt-2">
      <Button className="w-full" href="/join">{plan.cta}</Button>
    </div>
  </div>
</motion.div>
```

---

## 4. Footer Pattern

Include the operational status pill, clean copyright, legal links, and the concentric newsletter card:

```tsx
<div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100/70 p-0.5 shadow-xs select-none">
  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
    <span className="text-xs font-medium text-neutral-700">All systems operational</span>
  </div>
</div>
```
