"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MagnifyingGlassIcon,
  UserCheckIcon,
  EnvelopeSimpleIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ── 4 STREAMLINED PIPELINE STEPS ──────────────────────────────
const STEPS = [
  {
    id: "01",
    key: "research",
    label: "Domain & ICP Synthesis",
    summary:
      "Enter your domain URL. AI maps your value proposition and target decision-makers in seconds.",
    icon: MagnifyingGlassIcon,
    badge: "Stage 01 · Autonomous Research",
  },
  {
    id: "02",
    key: "discovery",
    label: "Waterfall Lead Discovery",
    summary:
      "14 data providers cascade with real-time port-25 SMTP validation for guaranteed 99.8% inbox delivery.",
    icon: UserCheckIcon,
    badge: "Stage 02 · Zero-Bounce Waterfall",
  },
  {
    id: "03",
    key: "outreach",
    label: "1-to-1 Contextual Writing",
    summary:
      "Hyper-personalized copy citing live company triggers, ready for 1-click team approval.",
    icon: EnvelopeSimpleIcon,
    badge: "Stage 03 · Human in the Loop",
  },
  {
    id: "04",
    key: "meetings",
    label: "Automated Calendar Demos",
    summary:
      "Agents answer prospect questions and place confirmed meetings directly into your sales calendar.",
    icon: CalendarCheckIcon,
    badge: "Stage 04 · Booked Meetings",
  },
];

const PROSPECTS = [
  {
    name: "Marcus Vance",
    role: "VP of Revenue Operations",
    company: "Synthetix Labs",
    email: "marcus.vance@synthetix.io",
    fit: "99.8%",
    status: "Verified Decision Maker",
  },
  {
    name: "Elena Rostova",
    role: "Head of Engineering",
    company: "Kitebase AI",
    email: "elena@kitebase.dev",
    fit: "99.6%",
    status: "Budget Holder",
  },
];

export const SplitPipelineSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const activeStep = STEPS[activeStepIndex];

  // Auto-advance loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full">
      {/* ── Section Header ── */}
      <div className="mb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-neutral-800 shadow-xs">
          <span className="size-1.5 rounded-full bg-[#00b0fa]" />
          Autonomous Pipeline
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
          Build, dispatch &amp; close meetings with sales agents
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
          Let autonomous SDR agents research target accounts, discover decision-makers, and write hyper-personalized outreach while your revenue leaders stay in control.
        </p>
      </div>

      {/* ── Split Layout: Left Interactive Tabs / Right Interactive Canvas ── */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Step Progression Cards (5 cols) */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={cn(
                  "group relative flex w-full cursor-pointer flex-col rounded-xl border p-4 sm:p-5 text-left transition-all duration-200 select-none",
                  isActive
                    ? "border-neutral-900 bg-white shadow-md ring-1 ring-neutral-900/10"
                    : "border-gray-200/90 bg-white/70 hover:border-gray-300 hover:bg-white hover:shadow-xs"
                )}
              >
                {/* Active progress bar indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-neutral-900"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg border",
                        isActive
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                          : "border-gray-100 bg-gray-50 text-neutral-500 group-hover:text-neutral-900"
                      )}
                    >
                      <Icon weight="bold" className="size-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-neutral-400">
                        Step {step.id}
                      </span>
                      <h3
                        className={cn(
                          "text-base font-semibold tracking-tight transition-colors",
                          isActive
                            ? "text-neutral-900"
                            : "text-neutral-700 group-hover:text-neutral-900"
                        )}
                      >
                        {step.label}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "size-2 rounded-full transition-all",
                      isActive
                        ? "bg-neutral-900 scale-125"
                        : "bg-gray-200 group-hover:bg-gray-300"
                    )}
                  />
                </div>

                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed transition-colors",
                    isActive
                      ? "text-neutral-600"
                      : "text-neutral-500 group-hover:text-neutral-600"
                  )}
                >
                  {step.summary}
                </p>
              </button>
            );
          })}

          <div className="mt-1 flex items-center justify-between px-2 pt-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isAutoPlaying
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-neutral-400"
                )}
              />
              {isAutoPlaying ? "Auto-advancing" : "Interactive mode"}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="cursor-pointer font-medium text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
            >
              {isAutoPlaying ? "Pause" : "Resume tour"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Animated Agent Canvas (7 cols) */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm lg:col-span-7 sm:p-7">
          {/* Top Window Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
              <span className="size-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
              <span className="size-2.5 rounded-full bg-[#28c840] border border-[#1aab29]/40" />
              <div className="ml-2 hidden h-3.5 w-px bg-gray-200 sm:block" />
              <span className="ml-1 font-mono text-xs font-semibold text-neutral-900">
                agent://pipeline/{activeStep.key}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-neutral-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {activeStep.badge}
            </span>
          </div>

          {/* Dynamic Interactive Stage Body */}
          <div className="relative mt-6 min-h-[380px]">
            <AnimatePresence mode="wait">
              {/* STAGE 01: DOMAIN RESEARCH & ICP SYNTHESIS */}
              {activeStep.key === "research" && (
                <motion.div
                  key="research"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white shadow-xs">
                          SC
                        </div>
                        <div>
                          <p className="text-base font-semibold text-neutral-900">
                            cal.com
                          </p>
                          <p className="text-sm text-neutral-500">
                            Scheduling Infrastructure for Enterprise
                          </p>
                        </div>
                      </div>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700">
                        Synthesized in 12s
                      </span>
                    </div>

                    <div className="mt-4 border-t border-gray-200/60 pt-4">
                      <p className="font-mono text-xs font-semibold uppercase text-neutral-500">
                        Target Decision-Maker ICP
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-900">
                        VP Sales, Head of RevOps &amp; Chief Revenue Officer
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">
                        Eliminate calendar drop-off &amp; embed booking directly into outbound sequences.
                      </p>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <p className="font-mono text-xs font-semibold uppercase text-neutral-500">
                      Signals Extracted by Agent
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Headcount: 50 – 500 Reps",
                        "Tech: Salesforce / HubSpot",
                        "Active Sales Hiring: Yes",
                        "Funding: Series A – C",
                      ].map((sig) => (
                        <span
                          key={sig}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 font-mono text-xs font-medium text-neutral-800"
                        >
                          <CheckCircleIcon
                            weight="fill"
                            className="size-3.5 text-emerald-500"
                          />
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 text-sm font-medium text-blue-950">
                    <span className="flex items-center gap-2">
                      <LightningIcon
                        weight="fill"
                        className="size-4 text-[#00b0fa]"
                      />
                      500 Qualified Target Accounts Queued for Waterfall
                    </span>
                    <span className="font-mono text-xs font-semibold">100% Ready</span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 02: WATERFALL DECISION MAKER DISCOVERY */}
              {activeStep.key === "discovery" && (
                <motion.div
                  key="discovery"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          14-Provider Waterfall Query
                        </p>
                        <p className="text-xs text-neutral-500">
                          Live port-25 SMTP verification with zero bounces
                        </p>
                      </div>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700">
                        Zero Bounce Guarantee
                      </span>
                    </div>

                    {/* Verified Prospects Feed */}
                    <div className="mt-4 space-y-3">
                      {PROSPECTS.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-white">
                              {p.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-900">
                                {p.name}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {p.role} · {p.company}
                              </p>
                              <p className="font-mono text-xs text-[#00b0fa]">
                                {p.email}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700">
                              {p.fit} deliverable
                            </span>
                            <p className="mt-1 font-mono text-xs text-neutral-500">
                              SMTP: 250 OK ✓
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-neutral-500">
                    <span>Providers: Apollo, ZoomInfo, Hunter + 11 others</span>
                    <span className="font-mono font-semibold text-emerald-600">
                      99.8% Inbox Score
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 03: 1-TO-1 CONTEXTUAL OUTREACH & SIGN OFF */}
              {activeStep.key === "outreach" && (
                <motion.div
                  key="outreach"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="mb-3 border-b border-gray-200/60 pb-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">To:</span>
                          <span className="font-mono font-medium text-neutral-900">
                            marcus.vance@synthetix.io
                          </span>
                        </div>
                        <span className="rounded-md bg-violet-50 px-2 py-0.5 font-mono text-xs font-semibold text-violet-700">
                          Bespoke Angle
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-neutral-500">Re:</span>
                        <span className="font-semibold text-neutral-900">
                          Synthetix&apos;s lead-to-calendar AE routing
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
                      <p>Hi Marcus,</p>
                      <p>
                        Saw Synthetix recently scaled your outbound AE team to 24 reps across North America. Teams expanding at that pace typically lose{" "}
                        <span className="rounded bg-amber-100 px-1 font-medium text-amber-900">
                          ~28% of demo opportunities
                        </span>{" "}
                        due to scheduling handoff friction.
                      </p>
                      <p>
                        Scrunity AI syncs directly with Cal.com to embed booking links inside outbound emails without redirects.
                      </p>
                    </div>

                    {/* Human in the loop approval footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-200/80 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-20">
                          <svg viewBox="0 0 48 18" className="h-full w-full">
                            <motion.path
                              d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                              fill="none"
                              stroke="#171717"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: isSigned ? 1 : 0.65 }}
                              transition={{
                                duration: 1.4,
                                ease: [0.32, 0.72, 0, 1],
                              }}
                            />
                          </svg>
                        </div>
                        <span className="font-mono text-xs text-neutral-500">
                          Team Approval
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsSigned(!isSigned)}
                        className={cn(
                          "cursor-pointer rounded-lg border px-4 py-2 text-xs font-semibold shadow-xs transition-colors select-none",
                          isSigned
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
                        )}
                      >
                        {isSigned ? "Approved & Queued ✓" : "1-Click Approve Email"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STAGE 04: AUTOMATED CALENDAR CONVERSIONS */}
              {activeStep.key === "meetings" && (
                <motion.div
                  key="meetings"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                      <div className="flex items-center gap-2">
                        <CalendarCheckIcon
                          weight="fill"
                          className="size-5 text-emerald-600"
                        />
                        <p className="text-sm font-semibold text-neutral-900">
                          Confirmed Meeting Booked
                        </p>
                      </div>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700">
                        Synced to Calendar
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-semibold text-neutral-900">
                            Intro &amp; Architecture Demo
                          </p>
                          <p className="text-sm text-neutral-600">
                            Marcus Vance (VP RevOps, Synthetix Labs)
                          </p>
                        </div>
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700">
                          Google Meet
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-xs font-medium text-neutral-600">
                        <span>📅 Tomorrow, 2:00 PM – 2:30 PM EST</span>
                        <span>👥 2 Attendees</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-sm font-medium text-emerald-950">
                    <span className="flex items-center gap-2">
                      <ShieldCheckIcon
                        weight="fill"
                        className="size-4 text-emerald-600"
                      />
                      Objection resolved with product collateral · Slot confirmed
                    </span>
                    <span className="font-mono text-xs font-semibold">100% Autopilot</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
