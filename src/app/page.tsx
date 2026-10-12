import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Easy } from "@/components/easy";
import { FaqSection } from "@/components/faq/faq-section";
import { Footer } from "@/components/footer";
import { Divider } from "@/components/utility/divider";
import { Button } from "@/components/utility/button";
import { SubHeading, Para, Heading } from "@/components/utility/texts";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works";
import { InfiniteSlider } from "@/components/powered-by/marquee";

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
      <Container className="border-x border-gray-200 px-6 py-16 sm:px-10">
        {/* Hero  */}
        <div className="mt-50 mb-20 flex w-full items-end justify-between">
          <div className="flex flex-col items-start gap-6">
            <Heading className="leading-none">
              Your outbound sales <br /> team on autopilot.
            </Heading>
            <Para>
              Purpose-built for automated outreach and designed for AI era.
            </Para>
          </div>
          <div className="mb-2 flex gap-3">
            
            <Button className="bg-gray-50 border-none text-neutral-800">Contact Sales</Button>
            <Button className="bg-brand text-white border border-brand">Book Demo</Button>
          </div>
        </div>
        <Hero />
        {/* Marquee */}
        {/* <InfiniteSlider></InfiniteSlider> */}

        {/* how it works */}
        <section className="items-between my-20 flex w-full flex-col justify-start gap-2 py-8">
          <SubHeading>
            <span className="text-brand rounded-lg bg-sky-100 p-1">
              Scrunity researches
            </span>{" "}
            your company,
          </SubHeading>
          <SubHeading>
            It{" "}
            <span className="text-brand rounded-lg bg-sky-100 p-1">
              finds ideal clients
            </span>{" "}
            for you,
          </SubHeading>
          <SubHeading>
            <span className="text-brand rounded-lg bg-sky-100 p-1">
              Book meetings
            </span>{" "}
            with them for you.
          </SubHeading>

          <HowItWorks />
        </section>

        <Divider />

        {/* FAQs */}
        <section className="w-full py-12">
          <FaqSection />
        </section>

        <Divider />

        {/* <section className="w-full py-12">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center shadow-xl md:p-14">
            <div className="pointer-events-none absolute inset-0 z-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-15">
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
                Paste your URL. Scrunity AI finds your ideal buyers, writes
                personalized emails you approve, and books qualified meetings
                straight into your calendar.
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
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-2.5 text-sm font-medium text-neutral-200 shadow-xs transition-colors hover:border-neutral-700 hover:bg-neutral-800"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>*/}

        <Divider />

        <Footer />
      </Container>
    </div>
  );
}
