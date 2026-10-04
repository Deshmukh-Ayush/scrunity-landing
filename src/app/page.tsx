import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { HeroSection } from "@/components/hero/hero-section";
import { BentoGrid } from "@/components/bento/bento-grid";
import { ComparisonSection } from "@/components/comparison/comparison-section";
import { PipelineSimulator } from "@/components/simulator/pipeline-simulator";
import { Easy } from "@/components/easy";
import { Pricing } from "@/components/pricing";
import { FaqSection } from "@/components/faq/faq-section";
import { Footer } from "@/components/footer";
import { Divider } from "@/components/utility/divider";
import { Button } from "@/components/utility/button";
import { SubHeading, Para } from "@/components/utility/texts";
import { EverywhereayushShader } from "@/components/join/shader";

export const metadata: Metadata = {
  title: "Scrunity AI — Autonomous Outbound Sales Engine",
  description:
    "Autonomous B2B lead generation, waterfall decision-maker discovery, personalized 1-to-1 cold outreach, and booked calendar meetings.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scrunity AI — Autonomous Outbound Sales Engine",
    description:
      "Autonomous domain research, competitor mapping, verified decision-maker discovery, personalized outreach, and booked meetings.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50">
      {/* ── 1. Hero Section (Contains the ONLY <Heading> on the page) ── */}
      <HeroSection />

      {/* ── 2. Main Content Container with Vertical Borders ──────────── */}
      <Container className="border-x border-gray-200 px-6 sm:px-10 py-16">
        {/* Section 1: Bento Grid (Visualizing product, not reading) */}
        <section className="w-full py-8">
          <BentoGrid />
        </section>

        <Divider />

        {/* Section 2: Visual Comparison Canvas */}
        <section className="w-full py-12">
          <ComparisonSection />
        </section>

        <Divider />

        {/* Section 3: Interactive Pipeline Simulator */}
        <section className="w-full py-12">
          <PipelineSimulator />
        </section>

        <Divider />

        {/* Section 4: Physical Transition Pipeline (Easy) */}
        <section className="w-full py-12">
          <div className="mb-8 flex w-full flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-2xl">
              <SubHeading className="text-[28px] md:text-[36px]">
                Effortless by design.
              </SubHeading>
              <Para className="mt-2 text-base md:text-lg">
                Zero manual CSV uploads, zero fragile web scrapers. Scrunity AI takes your domain URL and
                executes end-to-end outbound autonomously.
              </Para>
            </div>
            <Button
              className="shrink-0 border-none bg-[#00b0fa] font-semibold text-neutral-950 hover:bg-[#009de0]"
              href="/join"
            >
              Get Started
            </Button>
          </div>
          <Easy />
        </section>

        <Divider />

        {/* Section 5: Pricing */}
        <section className="w-full py-12">
          <div className="mb-2">
            <SubHeading className="text-[28px] md:text-[36px]">
              Predictable, capacity-based pricing.
            </SubHeading>
            <Para className="mt-2 max-w-2xl text-base md:text-lg">
              Two tailored tiers with dedicated mailbox infrastructure and autonomous SDR execution.
            </Para>
          </div>
          <Pricing />
        </section>

        <Divider />

        {/* Section 6: Interactive FAQ */}
        <section className="w-full py-12">
          <FaqSection />
        </section>

        <Divider />

        {/* Section 7: Final High-Impact CTA */}
        <section className="w-full py-12">
          <div className="relative overflow-hidden rounded-[22px] border border-gray-200 bg-neutral-900 p-8 text-center shadow-lg md:p-12">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
              <EverywhereayushShader theme="dark" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
              <SubHeading className="text-[28px] tracking-tight text-white md:text-[40px]">
                Ready to scale your outbound pipeline with Scrunity AI?
              </SubHeading>
              <Para className="mt-4 text-base text-neutral-300 md:text-lg">
                Join high-growth revenue teams replacing manual prospecting with autonomous intelligence.
                Start generating qualified calendar meetings in under 48 hours.
              </Para>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="/join"
                  className="border-none bg-[#00b0fa] px-8 py-3 text-sm font-semibold text-neutral-950 shadow-[0_2px_12px_rgba(0,176,250,0.3)] hover:bg-[#009de0]"
                >
                  Get Started
                </Button>
                <Link
                  href="/join"
                  className="rounded-full border border-neutral-700 bg-neutral-800/80 px-6 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Footer ────────────────────────────────────────── */}
        <Footer />
      </Container>
    </div>
  );
}
