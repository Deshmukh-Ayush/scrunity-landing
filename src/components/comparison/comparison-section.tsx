"use client";

import React from "react";
import Link from "next/link";
import {
  XCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LightningIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ── Comparison Dimensions ────────────────────────────────────
const TRADITIONAL_ITEMS = [
  {
    title: "5+ Fragmented Subscriptions",
    desc: "Juggling ZoomInfo, Clay, LinkedIn scrapers, and email sequencers with separate logins and fragile webhooks.",
  },
  {
    title: "15+ Hours of Manual Work",
    desc: "SDRs spend half their week manually cleaning CSVs, deduplicating spreadsheets, and writing generic copy.",
  },
  {
    title: "High Bounce Rates & Spam",
    desc: "Stale data and template mail-merges result in 12%+ bounce rates that damage your primary domain reputation.",
  },
  {
    title: "$7,500+/mo & Slow 3-Month Ramp",
    desc: "Paying heavy SaaS seat fees plus junior SDR salaries, only to start over when sales reps churn.",
  },
];

const SCRUNITY_ITEMS = [
  {
    title: "1 Unified Autonomous System",
    desc: "Enter your domain URL. Autonomous AI agents research accounts, verify emails, and write outreach in one place.",
  },
  {
    title: "Zero Manual Effort (100% Autopilot)",
    desc: "No CSV uploads, no spreadsheet cleaning, no scraper maintenance. Agents handle execution from start to finish.",
  },
  {
    title: "99.8% Inbox Placement",
    desc: "14-provider live waterfall enrichment with port-25 SMTP verification ensures zero bounced emails.",
  },
  {
    title: "Instant Velocity on Day 1",
    desc: "Hyper-personalized 1-to-1 outreach citing real company news and triggers, with 1-click human approval.",
  },
];

const METRIC_ROWS = [
  {
    label: "Time to First Campaign",
    traditional: "2–3 Weeks of Setup",
    scrunity: "Under 60 Seconds",
  },
  {
    label: "Weekly SDR Manual Hours",
    traditional: "15–20 Hours / Week",
    scrunity: "Zero (Fully Autonomous)",
  },
  {
    label: "Inbox Deliverability",
    traditional: "< 85% (Spam Risk)",
    scrunity: "99.8% (SMTP Verified)",
  },
  {
    label: "Cost & Complexity",
    traditional: "$7,500+/mo + Multiple Tools",
    scrunity: "1 Transparent Platform",
  },
];

export const ComparisonSection = () => {
  return (
    <div className="w-full">
      {/* ── Section Header ── */}
      <div className="mb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-neutral-800 shadow-xs">
          <span className="size-1.5 rounded-full bg-[#00b0fa]" />
          Outbound Comparison
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
          Manual 6-tool grind vs. Scrunity AI autopilot
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
          Traditional outbound requires multiple disjointed tools, endless spreadsheet cleaning, and constant manual labor. With Scrunity AI, your entire outbound sales engine runs on autopilot.
        </p>
      </div>

      {/* ── Side-by-Side Comparison Box ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── LEFT: Traditional Outbound Sales ── */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs sm:p-8">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-neutral-600">
                  <span className="size-1.5 rounded-full bg-neutral-400" />
                  Manual &amp; Fragile
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                  Traditional Outbound Stack
                </h3>
              </div>
              <span className="rounded-lg border border-neutral-200 bg-gray-50 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-600">
                ~$7,500 / mo
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Multiple disconnected subscriptions glued together with fragile webhooks, CSV spreadsheets, and hours of repetitive manual data entry.
            </p>

            {/* Comparison Items */}
            <div className="mt-6 space-y-4">
              {TRADITIONAL_ITEMS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                    <XCircleIcon weight="fill" className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Alert Bar */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 text-center text-xs font-medium text-neutral-600">
            Result: High manual overhead · Low deliverability · Painful tool bloat
          </div>
        </div>

        {/* ── RIGHT: Scrunity AI (Autopilot Engine) ── */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-white shadow-xl sm:p-8">
          {/* Subtle Ambient Brand Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#00b0fa]/10 blur-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  100% Autopilot
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Scrunity AI Autonomous Engine
                </h3>
              </div>
              <span className="rounded-lg border border-[#00b0fa]/30 bg-[#00b0fa]/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#00b0fa]">
                1 Flat Platform
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              One unified autonomous sales engine. Enter your domain URL and let AI agents discover decision makers, craft personalized pitches, and book meetings.
            </p>

            {/* Comparison Items */}
            <div className="mt-6 space-y-4">
              {SCRUNITY_ITEMS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircleIcon weight="fill" className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Highlight Bar & CTA */}
          <div className="relative z-10 mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 sm:flex-row">
            <span className="text-xs font-medium text-neutral-300">
              ✓ Zero manual work · 99.8% verified inbox delivery
            </span>
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-100"
            >
              <span>Get Started</span>
              <ArrowRightIcon weight="bold" className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Summary Matrix Bar ── */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-xs">
        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0 text-center">
          {METRIC_ROWS.map((row) => (
            <div key={row.label} className="p-4 sm:p-5">
              <p className="text-xs font-medium text-neutral-500">{row.label}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-neutral-400 line-through">
                  {row.traditional}
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  {row.scrunity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
