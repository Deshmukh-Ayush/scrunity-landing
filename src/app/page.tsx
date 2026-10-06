import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { HeroSection } from "@/components/hero/hero-section";
import { SplitPipelineSection } from "@/components/pipeline-split/pipeline-split-section";
import { Easy } from "@/components/easy";
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
        {/* Section 1: Split Pipeline Section (Interactive Left Tabs + Right Agent Canvas) */}
        <section className="w-full py-8">
          <SplitPipelineSection />
        </section>

        <Divider />

        {/* Section 2: Physical Transition Pipeline (Easy) */}
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

        {/* Section 5: Interactive FAQ */}
        <section className="w-full py-12">
          <FaqSection />
        </section>

        <Divider />

        {/* Section 6: Final High-Impact CTA (Gumloop Style) */}
        <section className="w-full py-12">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center shadow-xl md:p-14">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-15 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
              <EverywhereayushShader theme="dark" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[11px] font-semibold text-neutral-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Zero Setup Friction
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Ready to put your outbound sales on autopilot?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-400 md:text-lg">
                Paste your URL. Scrunity AI finds your ideal buyers, writes personalized emails you approve, and books qualified meetings straight into your calendar.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-xs transition-colors hover:bg-neutral-100"
                >
                  Get Started
                </Link>
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-2.5 text-sm font-medium text-neutral-200 shadow-xs transition-colors hover:bg-neutral-800 hover:border-neutral-700"
                >
                  Book a demo
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
