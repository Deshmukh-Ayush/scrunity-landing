"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  UserCheckIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  EnvelopeSimpleIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SubHeading, Para } from "@/components/utility/texts";

// ── DATA ──────────────────────────────────────────────────────
const PROSPECTS = [
  {
    id: "lead-1",
    name: "Marcus Vance",
    role: "VP Revenue Operations",
    company: "Synthetix Labs",
    email: "marcus.vance@synthetix.io",
    confidence: "99.8%",
    smtpCode: "250 OK",
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    role: "Head of Engineering",
    company: "Kitebase AI",
    email: "elena@kitebase.dev",
    confidence: "99.6%",
    smtpCode: "250 OK",
  },
  {
    id: "lead-3",
    name: "Devon Chen",
    role: "Chief Technology Officer",
    company: "Orbit Payments",
    email: "devon@orbitpay.com",
    confidence: "99.9%",
    smtpCode: "250 OK",
  },
];

const STEPS = [
  {
    id: "01",
    icon: MagnifyingGlassIcon,
    label: "Domain Research",
    detail: "Paste your URL. AI extracts ICP, competitors, and market positioning in under 60 seconds.",
    color: "text-[#00b0fa]",
    bg: "bg-[#00b0fa]/10",
  },
  {
    id: "02",
    icon: UserCheckIcon,
    label: "Decision-Maker Discovery",
    detail: "14-provider waterfall with live SMTP verification. 99.8% inbox placement guaranteed.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "03",
    icon: EnvelopeSimpleIcon,
    label: "Personalized Outreach",
    detail: "1-to-1 emails referencing real company signals — not mail-merge templates.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: "04",
    icon: CalendarCheckIcon,
    label: "Meetings Booked",
    detail: "Confirmed calendar invites land directly on your AEs' calendars. No manual follow-up.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export const BentoGrid = () => {
  const [selectedProspect, setSelectedProspect] = useState(PROSPECTS[0]);
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="w-full">
      {/* ── Section Header (Gumloop-Style Clean Eyebrow + Headline) ── */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50/50 px-3 py-1 font-mono text-[11px] font-semibold text-blue-700">
          <span className="size-1.5 rounded-full bg-[#00b0fa]" />
          Autonomous Pipeline
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Build, dispatch & close meetings with sales agents
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
          Let autonomous SDR agents research target accounts, discover decision-makers, and write hyper-personalized outreach while your revenue leaders stay in control.
        </p>
      </div>

      {/* ── 4-Stage Agent Mechanics (Gumloop style clean white cards with crisp borders) ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="group relative flex flex-col justify-between rounded-xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={cn("flex size-9 items-center justify-center rounded-lg border border-gray-100", step.bg)}>
                    <Icon weight="bold" className={cn("size-4.5", step.color)} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-400">
                    {step.id}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-neutral-900">
                  {step.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {step.detail}
                </p>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-700 transition-colors">
                  Autonomous step
                  <ArrowRightIcon weight="bold" className="size-2.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Two-Column Detail Cards ──────────────────────────── */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* CARD A: Waterfall Verification (7 cols) */}
        <div className="flex flex-col gap-5 rounded-xl border border-gray-200/90 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Waterfall Verification
              </span>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-neutral-900">
                Verified Decision Makers
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                14-provider cascade · live SMTP handshake · zero bounce guarantee
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <CheckCircleIcon weight="fill" className="size-3 text-emerald-500" />
              Zero Bounce
            </span>
          </div>

          {/* Lead selector chips */}
          <div className="flex flex-wrap gap-2">
            {PROSPECTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProspect(p)}
                className={cn(
                  "cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors select-none",
                  selectedProspect.id === p.id
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                    : "border-gray-200 bg-gray-50/80 text-neutral-600 hover:bg-gray-100 hover:text-neutral-900",
                )}
              >
                {p.name.split(" ")[0]} ({p.company})
              </button>
            ))}
          </div>

          {/* Live lead card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProspect.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border border-gray-100 bg-gray-50/70 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-900 text-xs font-semibold text-white shadow-xs">
                    {selectedProspect.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {selectedProspect.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {selectedProspect.role} · {selectedProspect.company}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-[#00b0fa]">
                      {selectedProspect.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-700">
                    {selectedProspect.confidence} fit
                  </span>
                  <p className="mt-1.5 font-mono text-[10px] text-neutral-400">
                    SMTP: {selectedProspect.smtpCode}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
            <p className="text-neutral-400">Enriches 500+ ICP accounts monthly</p>
            <span className="font-mono text-[11px] font-medium text-emerald-600">Live · Active</span>
          </div>
        </div>

        {/* CARD B: 1-to-1 Outreach + Approve (5 cols) */}
        <div className="flex flex-col gap-5 rounded-xl border border-gray-200/90 bg-white p-6 shadow-xs lg:col-span-5">
          <div>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
              Hyper-Personalized Outreach
            </span>
            <h3 className="mt-1 text-base font-semibold tracking-tight text-neutral-900">
              Emails Your Team Approves
            </h3>
            <p className="mt-0.5 text-xs text-neutral-500">
              Contextual, not templated. 1-click approve or edit before send.
            </p>
          </div>

          {/* Email preview */}
          <div className="flex-1 rounded-lg border border-gray-100 bg-gray-50/60 p-4 text-xs leading-relaxed text-neutral-700">
            <div className="mb-3 border-b border-gray-200/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">To:</span>
                <span className="font-mono text-neutral-700">marcus.vance@synthetix.io</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-neutral-400">Re:</span>
                <span className="font-semibold text-neutral-900">
                  Synthetix&apos;s lead-to-calendar routing
                </span>
              </div>
            </div>
            <p className="text-neutral-700">Hi Marcus,</p>
            <p className="mt-2 text-neutral-600">
              Saw Synthetix scaled the AE team to 24 reps. Teams at your stage
              typically lose{" "}
              <span className="rounded bg-amber-100 px-1 font-medium text-amber-800">
                ~28% of demos
              </span>{" "}
              in calendar redirects.
            </p>
            <p className="mt-2 text-neutral-600">
              Scrunity AI embeds instant booking directly — no redirects.
            </p>
          </div>

          {/* Approve strip */}
          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3">
            <div className="flex items-center gap-2">
              {/* SVG signature */}
              <div className="relative h-5 w-16">
                <svg viewBox="0 0 48 18" className="h-full w-full">
                  <motion.path
                    d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                    fill="none"
                    stroke="#171717"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isSigned ? 1 : 0.65 }}
                    transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
                  />
                </svg>
              </div>
              <p className="font-mono text-[10px] text-neutral-400">Agent signoff</p>
            </div>

            <button
              type="button"
              onClick={() => setIsSigned(!isSigned)}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors select-none",
                isSigned
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
              )}
            >
              {isSigned ? "Approved ✓" : "1-Click Approve"}
            </button>
          </div>
        </div>
      </div>

      {/* CARD C: Full-width deliverability + calendar output */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Mailbox health */}
        <div className="rounded-xl border border-gray-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
              Deliverability Shield
            </span>
            <ShieldCheckIcon weight="fill" className="size-4 text-emerald-500" />
          </div>
          <h3 className="mt-2 text-sm font-semibold tracking-tight text-neutral-900">
            Domain Protection
          </h3>
          <div className="mt-4 space-y-2">
            {[
              { addr: "sarah@scrunity-hq.io", pct: "100%" },
              { addr: "team@getscrunity.co", pct: "99%" },
              { addr: "outreach@scrunitymail.net", pct: "98%" },
            ].map((mb) => (
              <div
                key={mb.addr}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-2 text-xs"
              >
                <span className="truncate font-mono text-[11px] text-neutral-700 max-w-[160px]">
                  {mb.addr}
                </span>
                <span className="shrink-0 font-mono text-[10px] font-semibold text-emerald-600">
                  {mb.pct} warm
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
            <p className="text-neutral-400">SPF · DKIM · DMARC</p>
            <span className="font-mono font-medium text-emerald-600">0 Spam Flags</span>
          </div>
        </div>

        {/* Calendar output — 2 col span */}
        <div className="rounded-xl border border-gray-200/90 bg-white p-6 shadow-xs sm:col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
              Pipeline Output
            </span>
            <CalendarCheckIcon weight="fill" className="size-4 text-[#00b0fa]" />
          </div>
          <h3 className="mt-2 text-sm font-semibold tracking-tight text-neutral-900">
            Qualified Meetings, Straight to Calendar
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            When a lead replies with interest, Scrunity AI schedules, converts time zones, and drops confirmed invites directly on your AEs&apos; calendars.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                initials: "MV",
                name: "Marcus Vance",
                role: "VP RevOps · Synthetix",
                time: "Tomorrow @ 2:00 PM",
                tool: "Google Meet",
                accent: "bg-[#00b0fa]",
              },
              {
                initials: "ER",
                name: "Elena Rostova",
                role: "Head Eng · Kitebase AI",
                time: "Friday @ 11:30 AM",
                tool: "HubSpot deal created",
                accent: "bg-neutral-900",
              },
            ].map((demo) => (
              <div
                key={demo.initials}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-3"
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-xs",
                    demo.accent
                  )}
                >
                  {demo.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">{demo.name}</p>
                  <p className="truncate text-[11px] text-neutral-400">{demo.role}</p>
                  <p className="mt-0.5 font-mono text-[11px] font-medium text-emerald-600">
                    {demo.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-mono font-semibold text-neutral-900">16.4%</p>
                <p className="text-neutral-400">reply rate</p>
              </div>
              <div>
                <p className="font-mono font-semibold text-neutral-900">99.8%</p>
                <p className="text-neutral-400">deliverability</p>
              </div>
              <div>
                <p className="font-mono font-semibold text-[#00b0fa]">-64%</p>
                <p className="text-neutral-400">CAC reduction</p>
              </div>
            </div>
            <Link
              href="/join"
              className="inline-flex items-center gap-1 font-semibold text-neutral-900 hover:text-[#00b0fa] transition-colors"
            >
              <span>Activate SDR Fleet</span>
              <ArrowRightIcon weight="bold" className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
