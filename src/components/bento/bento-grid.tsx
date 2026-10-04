"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TextMorph } from "torph/react";
import {
  UserCheckIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  EnvelopeSimpleIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BuildingsIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SubHeading, Para } from "@/components/utility/texts";

// ── BENTO CARD 1: WATERFALL DECISION MAKERS DATA ──────────────
const PROSPECTS = [
  {
    id: "lead-1",
    name: "Marcus Vance",
    role: "VP of Revenue Operations",
    company: "Synthetix Labs",
    email: "marcus.vance@synthetix.io",
    confidence: "99.8%",
    mxValid: true,
    smtpCode: "250 2.1.5 Recipient OK",
    provider: "Waterfall (Primary)",
    status: "Verified & Inbox Ready",
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    role: "Head of Engineering",
    company: "Kitebase AI",
    email: "elena@kitebase.dev",
    confidence: "99.6%",
    mxValid: true,
    smtpCode: "250 2.1.5 Recipient OK",
    provider: "Waterfall (Secondary)",
    status: "Verified & Inbox Ready",
  },
  {
    id: "lead-3",
    name: "Devon Chen",
    role: "Chief Technology Officer",
    company: "Orbit Payments",
    email: "devon@orbitpay.com",
    confidence: "99.9%",
    mxValid: true,
    smtpCode: "250 2.1.5 Recipient OK",
    provider: "Waterfall (Primary)",
    status: "Verified & Inbox Ready",
  },
];

// ── BENTO CARD 2: COMPETITOR RADAR DATA ────────────────────────
const COMPETITOR_WEDGES = [
  {
    id: "calendly",
    competitor: "Calendly",
    short: "vs Calendly",
    headline: "Speed & API Control",
    pitch: "Direct embed with zero redirects and round-robin AE assignment directly in form flow.",
    winMetric: "+32% form-to-demo conversion",
  },
  {
    id: "chilipiper",
    competitor: "Chili Piper",
    short: "vs Chili Piper",
    headline: "Zero Implementation Friction",
    pitch: "No 6-week onboarding or complex routing matrices. Autonomous setup in under 10 minutes.",
    winMetric: "10x faster deployment",
  },
  {
    id: "zoominfo",
    competitor: "ZoomInfo",
    short: "vs ZoomInfo",
    headline: "Live Waterfall vs Stale DB",
    pitch: "Real-time SMTP ping rather than outdated 6-month-old databases with 15% bounce rates.",
    winMetric: "Zero bounce guarantee",
  },
];

// ── BENTO CARD 3: MAILBOX DATA ────────────────────────────────
const MAILBOXES = [
  { address: "sarah@scrunity-hq.io", dailySent: 42, maxDaily: 50, health: "100%", status: "Warmed" },
  { address: "team@getscrunity.co", dailySent: 38, maxDaily: 50, health: "99%", status: "Warmed" },
  { address: "outreach@scrunitymail.net", dailySent: 40, maxDaily: 50, health: "98%", status: "Warmed" },
];

export const BentoGrid = () => {
  const [selectedProspect, setSelectedProspect] = useState(PROSPECTS[0]);
  const [selectedWedge, setSelectedWedge] = useState(COMPETITOR_WEDGES[0]);
  const [reviewMode, setReviewMode] = useState<"auto" | "approval">("auto");
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="w-full">
      {/* ── Section Header ────────────────────────────────────── */}
      <div className="mb-12">
        <SubHeading className="text-[28px] md:text-[36px]">
          Engineered for pipeline, not reading.
        </SubHeading>
        <Para className="mt-2 max-w-2xl text-base md:text-lg">
          Top revenue teams visualize every stage of outbound execution. From instant domain intelligence
          to verified decision makers and booked calendar demos with Scrunity AI.
        </Para>
      </div>

      {/* ── Bento Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ── CARD 1: WATERFALL DECISION MAKERS (7 cols) ──────── */}
        <div className="flex flex-col justify-between rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-7">
          <div>
            <div className="flex items-center justify-between">
              <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Waterfall Verification Engine
              </Para>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <CheckCircleIcon weight="fill" className="size-3 text-emerald-500" />
                Zero Bounce Guarantee
              </span>
            </div>

            <div className="mt-3">
              <SubHeading className="text-[20px] md:text-[22px]">
                Waterfall Decision-Maker Discovery
              </SubHeading>
              <Para className="mt-1 text-sm text-neutral-500">
                Cascades across 14 data providers with live SMTP verification. Filters out generic info@
                inboxes and pinpoints direct budget holders.
              </Para>
            </div>

            {/* Interactive Lead Switcher */}
            <div className="mt-5 flex flex-wrap gap-2">
              {PROSPECTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProspect(p)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors select-none",
                    selectedProspect.id === p.id
                      ? "border-neutral-900 bg-neutral-900 text-white font-semibold"
                      : "border-gray-200 bg-gray-50 text-neutral-600 hover:bg-gray-100",
                  )}
                >
                  {p.name} ({p.role.split(" ")[0]})
                </button>
              ))}
            </div>

            {/* Living Prospect Inspector Card */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                    {selectedProspect.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <Para className="text-sm font-semibold text-neutral-900">
                      {selectedProspect.name}
                    </Para>
                    <Para className="text-xs text-neutral-400">
                      {selectedProspect.role} · {selectedProspect.company}
                    </Para>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-700">
                    {selectedProspect.confidence} Fit
                  </span>
                  <span className="rounded-md border border-[#00b0fa]/30 bg-[#00b0fa]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-neutral-900">
                    LinkedIn ✓
                  </span>
                </div>
              </div>

              {/* Real-time Verification Telemetry */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-200/60 pt-3 text-[11px] sm:grid-cols-3">
                <div>
                  <Para className="text-[10px] text-neutral-400">Target Email:</Para>
                  <span className="truncate font-mono font-medium text-neutral-800 text-xs">
                    {selectedProspect.email}
                  </span>
                </div>
                <div>
                  <Para className="text-[10px] text-neutral-400">SMTP Handshake:</Para>
                  <span className="font-mono font-medium text-emerald-600 text-xs">
                    {selectedProspect.smtpCode}
                  </span>
                </div>
                <div>
                  <Para className="text-[10px] text-neutral-400">Provider Source:</Para>
                  <span className="font-mono text-neutral-700 text-xs">{selectedProspect.provider}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
            <Para className="text-xs text-neutral-400">Continuously enriches 500+ ICP accounts monthly</Para>
            <span className="font-mono text-[11px] font-medium text-emerald-600">
              Live Validation Active
            </span>
          </div>
        </div>

        {/* ── CARD 2: COMPETITOR RADAR (5 cols) ───────────────── */}
        <div className="flex flex-col justify-between rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Positioning Intelligence
              </Para>
              <MagnifyingGlassIcon weight="bold" className="size-4 text-neutral-400" />
            </div>

            <div className="mt-3">
              <SubHeading className="text-[20px] md:text-[22px]">
                Autonomous Competitor Radar
              </SubHeading>
              <Para className="mt-1 text-sm text-neutral-500">
                Discovers market alternatives and formulates precision pitch angles tailored to each buyer.
              </Para>
            </div>

            {/* Competitor Chips Selector */}
            <div className="mt-5 flex flex-wrap gap-2">
              {COMPETITOR_WEDGES.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWedge(w)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors select-none",
                    selectedWedge.id === w.id
                      ? "border-[#00b0fa] bg-[#00b0fa]/15 font-semibold text-neutral-900"
                      : "border-gray-200 bg-gray-50 text-neutral-600 hover:bg-gray-100",
                  )}
                >
                  {w.short}
                </button>
              ))}
            </div>

            {/* Dynamic Pitch Angle Card */}
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-900">
                  <TextMorph>{selectedWedge.headline}</TextMorph>
                </span>
                <span className="rounded-full border border-blue-200 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700">
                  {selectedWedge.winMetric}
                </span>
              </div>
              <Para className="mt-2 text-xs leading-relaxed text-blue-900/80">
                <TextMorph>{selectedWedge.pitch}</TextMorph>
              </Para>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
            <Para className="text-xs text-neutral-400">Automated wedge injection</Para>
            <span className="font-mono text-[11px] font-medium text-neutral-800">
              100% Contextual
            </span>
          </div>
        </div>

        {/* ── CARD 3: DELIVERABILITY SHIELD (5 cols) ──────────── */}
        <div className="flex flex-col justify-between rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Deliverability Infrastructure
              </Para>
              <ShieldCheckIcon weight="fill" className="size-4 text-emerald-500" />
            </div>

            <div className="mt-3">
              <SubHeading className="text-[20px] md:text-[22px]">
                Multi-Mailbox Deliverability Shield
              </SubHeading>
              <Para className="mt-1 text-sm text-neutral-500">
                Protects your root domain with dedicated secondary domains, automated warmup, and SPF/DKIM/DMARC records.
              </Para>
            </div>

            {/* Mailbox Health Matrix */}
            <div className="mt-5 space-y-2.5">
              {MAILBOXES.map((mb) => (
                <div
                  key={mb.address}
                  className="rounded-lg border border-gray-100 bg-gray-50/70 p-2.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-medium text-neutral-800">{mb.address}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <span className="size-1 rounded-full bg-emerald-500" />
                      {mb.health} Warm
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <Para className="text-[11px] text-neutral-400">Sent today: {mb.dailySent}/{mb.maxDaily}</Para>
                    <span className="font-mono text-[10px] text-neutral-400">SPF · DKIM · DMARC ✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
            <Para className="text-xs text-neutral-400">Primary domain reputation: Protected</Para>
            <span className="font-mono text-[11px] font-medium text-emerald-600">0 Spam Flags</span>
          </div>
        </div>

        {/* ── CARD 4: 1-TO-1 COLD OUTREACH & INKING (7 cols) ──── */}
        <div className="flex flex-col justify-between rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-7">
          <div>
            <div className="flex items-center justify-between">
              <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Hyper-Personalized Outreach
              </Para>
              <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setReviewMode("auto")}
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors select-none",
                    reviewMode === "auto"
                      ? "border border-gray-200 bg-white text-neutral-900 shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800",
                  )}
                >
                  Autonomous
                </button>
                <button
                  type="button"
                  onClick={() => setReviewMode("approval")}
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors select-none",
                    reviewMode === "approval"
                      ? "border border-gray-200 bg-white text-neutral-900 shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800",
                  )}
                >
                  Human Review
                </button>
              </div>
            </div>

            <div className="mt-3">
              <SubHeading className="text-[20px] md:text-[22px]">
                1-to-1 Contextual Cold Outreach
              </SubHeading>
              <Para className="mt-1 text-sm text-neutral-500">
                Every email references authentic prospect milestones and pain points. Never generic mail merge templates.
              </Para>
            </div>

            {/* Email Canvas Preview with SVG Signature Inking */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 text-xs">
                <div className="flex items-center gap-2">
                  <Para className="text-xs text-neutral-400">Subject:</Para>
                  <span className="font-semibold text-neutral-900">
                    Quick question on Synthetix&apos;s lead-to-calendar routing
                  </span>
                </div>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] text-[#00b0fa]">
                  Dynamic Tokens Active
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs leading-relaxed text-neutral-700">
                <Para className="text-xs text-neutral-800">Hi Marcus,</Para>
                <Para className="text-xs text-neutral-700">
                  Saw Synthetix just scaled the AE team to 24 reps. Teams at your stage usually lose{" "}
                  <span className="rounded bg-amber-100 px-1 py-0.5 font-medium text-amber-800">
                    ~28% of demo inbound
                  </span>{" "}
                  during calendar redirects.
                </Para>
                <Para className="text-xs text-neutral-700">
                  Scrunity AI embeds instant qualified booking directly without redirects.
                </Para>
              </div>

              {/* Bottom Inking and Approval State */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200/60 pt-3">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-20">
                    <svg viewBox="0 0 48 18" className="h-full w-full">
                      <motion.path
                        d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                        fill="none"
                        stroke="#171717"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isSigned ? 1 : 0.7 }}
                        transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                      />
                    </svg>
                  </div>
                  <Para className="font-mono text-[10px] text-neutral-400">Agent Signoff</Para>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSigned(!isSigned)}
                  className="cursor-pointer rounded-full border border-neutral-900 bg-neutral-900 px-3 py-1 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800"
                >
                  {isSigned ? "Approved & Queued ✓" : "1-Click Approve"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
            <Para className="text-xs text-neutral-400">Average positive reply rate: 16.4%</Para>
            <span className="font-mono text-[11px] font-medium text-neutral-900">
              4.2x Industry Standard
            </span>
          </div>
        </div>

        {/* ── CARD 5: AUTONOMOUS CALENDAR CLOSER (12 cols) ────── */}
        <div className="rounded-[18px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                  Direct Pipeline Output
                </Para>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Calendar Sync
                </span>
              </div>
              <SubHeading className="mt-2 text-[20px] md:text-[22px]">
                Autonomous Calendar Closer
              </SubHeading>
              <Para className="mt-1 text-sm text-neutral-500">
                When a prospect replies with interest, Scrunity AI handles scheduling, time-zone conversion, and
                drops confirmed invites directly onto your account executives&apos; calendars.
              </Para>
            </div>

            {/* Confirmed Ticket Preview */}
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {/* Confirmed Demo Ticket 1 */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 shadow-xs">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#00b0fa] text-neutral-950 font-semibold text-xs">
                  <CalendarCheckIcon weight="bold" className="size-5" />
                </div>
                <div>
                  <Para className="text-xs font-semibold text-neutral-900">
                    Marcus Vance (VP RevOps)
                  </Para>
                  <span className="font-mono text-[11px] text-emerald-600 font-medium">Tomorrow @ 2:00 PM EST</span>
                  <Para className="text-[10px] text-neutral-400">Google Meet invite sent</Para>
                </div>
              </div>

              {/* Confirmed Demo Ticket 2 */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3.5 shadow-xs">
                <div className="flex size-9 items-center justify-center rounded-lg bg-neutral-900 text-white font-semibold text-xs">
                  <CalendarCheckIcon weight="bold" className="size-5" />
                </div>
                <div>
                  <Para className="text-xs font-semibold text-neutral-900">
                    Elena Rostova (Head Eng)
                  </Para>
                  <span className="font-mono text-[11px] text-emerald-600 font-medium">Friday @ 11:30 AM PST</span>
                  <Para className="text-[10px] text-neutral-400">HubSpot deal created</Para>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
