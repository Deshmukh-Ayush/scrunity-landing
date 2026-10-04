import React from "react";
import { Card1 } from "./card-1";
import { Card2 } from "./card-2";
import { Card3 } from "./card-3";
import { Para } from "../utility/texts";

const phases = [
  {
    Illustration: Card1,
    title: "Research, competitors & ICP definition",
    description:
      "Give your website URL. The agent extracts positioning, benchmarks competitor wedges, and defines high-intent customer profiles.",
  },
  {
    Illustration: Card2,
    title: "Verified decision makers & 1-to-1 email drafting",
    description:
      "Waterfall email verification finds exact budget holders, and the agent crafts contextual cold outreach you can review and edit before sending.",
  },
  {
    Illustration: Card3,
    title: "Automated send, booked meetings & self-learning",
    description:
      "Outreach is dispatched via warmed secondary mailboxes, demo meetings sync to your calendar, and the agent doubles down on winning ICPs.",
  },
];

const nineSteps = [
  {
    number: "01",
    name: "Research",
    detail: "User provides domain URL; agent extracts metadata, logo, keywords, and value hooks.",
  },
  {
    number: "02",
    name: "Competitive analysis",
    detail: "Researches market competitors and creates precision search queries to pinpoint buyers.",
  },
  {
    number: "03",
    name: "Define ICP and campaigns",
    detail: "Identifies ideal customer profiles and organizes multi-track outreach campaigns.",
  },
  {
    number: "04",
    name: "Find potential customer",
    detail: "Compiles verified lists of high-fit target companies matching firmographic criteria.",
  },
  {
    number: "05",
    name: "Find decision maker",
    detail: "Identifies the exact budget-holders (VP Sales, CRO, Head of Growth) with verified work emails.",
  },
  {
    number: "06",
    name: "Write Emails",
    detail: "Drafts bespoke 1-to-1 cold emails citing prospect company news. 100% user-editable.",
  },
  {
    number: "07",
    name: "Send Emails",
    detail: "Dispatches emails to qualified leads via rotating secondary mailboxes with warmup protection.",
  },
  {
    number: "08",
    name: "Book meetings",
    detail: "Converts positive replies directly into confirmed calendar demo invites.",
  },
  {
    number: "09",
    name: "Learn and double down",
    detail: "Analyzes reply signals and sentiment, continuously reallocating volume to winning ICP angles.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="w-full">
      {/* 3 Living Interactive Cards */}
      <div className="my-10 flex h-full w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
        {phases.map(({ Illustration, title, description }) => (
          <div key={title} className="flex w-full flex-col gap-4 md:w-[373px]">
            <Illustration />
            <Para className="text-neutral-800 font-medium">{title}</Para>
            <Para>{description}</Para>
          </div>
        ))}
      </div>

      {/* 9-Step Detailed Sequence List */}
      <div className="mt-14 border-t border-gray-200/80 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Autonomous Pipeline Breakdown
          </p>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-mono text-[10px] text-neutral-600">
            9 Autonomous Stages
          </span>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {nineSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-1 rounded-lg border border-gray-200/60 bg-white/60 p-4 transition-colors hover:border-gray-300 hover:bg-white"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-blue-600">
                  {step.number}
                </span>
                <span className="text-[13px] font-semibold text-neutral-900">
                  {step.name}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
