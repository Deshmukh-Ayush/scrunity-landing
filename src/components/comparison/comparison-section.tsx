"use client";

import React from "react";
import {
  XCircleIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { SubHeading, Para } from "@/components/utility/texts";

const LEGACY_TOOLS = [
  { name: "ZoomInfo / Apollo", cost: "$12,000 / yr", issue: "Stale data, 12%+ bounce rates" },
  { name: "Clay credits", cost: "$349 / mo", issue: "Complex webhook matrices & table limits" },
  { name: "Scraper proxies", cost: "$150 / mo", issue: "Breaks whenever LinkedIn modifies markup" },
  { name: "Instantly / Lemlist", cost: "$97 / mo", issue: "Generic templates land in spam folders" },
  { name: "Junior SDR hire", cost: "$6,500 / mo", issue: "Takes 3 months to ramp, high turnover" },
];

const SCRUNITY_ADVANTAGES = [
  {
    title: "1 Domain URL In → Booked Meetings Out",
    detail: "Zero manual prospecting, list deduplication, or CSV exports. Fully automated from day 1.",
  },
  {
    title: "14-Provider Waterfall Verification",
    detail: "Live SMTP handshakes and MX-record validation ensure a 99.8% inbox placement rate.",
  },
  {
    title: "1-to-1 Contextual Writing (Not Mail Merge)",
    detail: "Bespoke outreach citing company news, recent funding, and engineering initiatives.",
  },
  {
    title: "Dedicated Secondary Mailbox Warmup",
    detail: "Protects your primary corporate domain with isolated sender reputation and automated rotation.",
  },
  {
    title: "Continuous Self-Learning Feedback Loop",
    detail: "Analyzes reply sentiment and reallocates send volume to winning ICP angles in real time.",
  },
];

export const ComparisonSection = () => {
  return (
    <div className="w-full">
      {/* ── Section Header ────────────────────────────────────── */}
      <div className="mb-12">
        <SubHeading className="text-[28px] md:text-[36px]">
          The modern outbound advantage.
        </SubHeading>
        <Para className="mt-2 max-w-2xl text-base md:text-lg">
          Replace a fragmented, expensive SDR toolchain with Scrunity AI to continuously
          book qualified meetings.
        </Para>
      </div>

      {/* ── Side-by-Side Comparison Canvas ────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── LEFT: The Fragmented SDR Stack ────────────────── */}
        <div className="flex flex-col justify-between rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <Para className="font-mono text-[10px] font-semibold tracking-wider text-rose-500 uppercase">
                  Legacy SDR Approach
                </Para>
                <SubHeading className="mt-1 block text-[20px]">
                  The Fragmented 6-Tool Stack
                </SubHeading>
              </div>
              <span className="rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 font-mono text-xs font-semibold text-rose-600">
                ~$7,400 / mo
              </span>
            </div>

            <Para className="mt-4 text-sm text-neutral-500">
              Multiple expensive software subscriptions glued together with fragile webhooks and hours of
              manual data entry.
            </Para>

            {/* List of Legacy Costs and Frictions */}
            <div className="mt-5 space-y-3">
              {LEGACY_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs"
                >
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-neutral-900">{tool.name}</span>
                    <span className="font-mono text-neutral-500">{tool.cost}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-rose-600/90">
                    <XCircleIcon weight="fill" className="size-3.5 shrink-0 text-rose-500" />
                    <Para className="text-[11px] text-rose-600">{tool.issue}</Para>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Legacy Friction Stats */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center text-xs">
            <div>
              <span className="font-mono text-sm font-semibold text-neutral-900">18 hrs/wk</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Manual CSV exports</Para>
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-rose-600">12%</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Email bounce rate</Para>
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-neutral-700">2.8%</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Average reply rate</Para>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Scrunity AI ─────────────────────────────── */}
        <div className="relative flex flex-col justify-between rounded-[18px] border border-neutral-900 bg-neutral-900 p-6 text-white shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <Para className="font-mono text-[10px] font-semibold tracking-wider text-[#00b0fa] uppercase">
                  Autonomous Engine
                </Para>
                <SubHeading className="mt-1 block text-[20px] text-white">
                  Scrunity AI
                </SubHeading>
              </div>
              <span className="rounded-full border border-[#00b0fa]/30 bg-[#00b0fa]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#00b0fa]">
                1 Flat Unified Plan
              </span>
            </div>

            <Para className="mt-4 text-sm text-neutral-300">
              One unified autonomous sales agent. Give your domain URL and let Scrunity AI discover decision makers
              and book calendar demos.
            </Para>

            {/* List of Gains */}
            <div className="mt-5 space-y-3">
              {SCRUNITY_ADVANTAGES.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-xl border border-neutral-800 bg-neutral-800/60 p-3 text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-white">
                    <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-[#00b0fa]" />
                    <span>{adv.title}</span>
                  </div>
                  <Para className="mt-1 ps-6 text-[11px] leading-relaxed text-neutral-400">
                    {adv.detail}
                  </Para>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Performance ROI Telemetry */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-800 pt-4 text-center text-xs">
            <div>
              <span className="font-mono text-sm font-semibold text-white">0 hrs/wk</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Manual prospecting</Para>
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-[#00b0fa]">99.8%</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Verified deliverability</Para>
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-emerald-400">16.4%</span>
              <Para className="mt-0.5 text-[10px] text-neutral-400">Positive reply rate</Para>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
