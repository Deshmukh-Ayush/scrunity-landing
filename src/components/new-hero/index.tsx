"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TextMorph } from "torph/react";
import {
  ArrowRightIcon,
  SparkleIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  TargetIcon,
  BuildingsIcon,
  UserCheckIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  PencilSimpleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EverywhereayushShader } from "@/components/join/shader";

interface DomainPreset {
  domain: string;
  name: string;
  industry: string;
  tagline: string;
  keywords: string[];
  competitors: string[];
  targetIcp: string;
  sampleLead: {
    name: string;
    role: string;
    company: string;
    email: string;
    linkedin: string;
    fitScore: number;
    emailSubject: string;
    emailSnippet: string;
  };
  metrics: {
    leadsFound: number;
    deliverability: string;
    replyRate: string;
    meetingsBooked: number;
  };
}

const PRESETS: Record<string, DomainPreset> = {
  "cal.com": {
    domain: "cal.com",
    name: "Cal.com",
    industry: "B2B Scheduling Infrastructure",
    tagline: "Open-source scheduling for enterprise teams",
    keywords: ["Scheduling API", "Round Robin", "Enterprise SSO", "Embeds"],
    competitors: ["Calendly", "Chili Piper", "Acuity"],
    targetIcp: "Heads of RevOps, VP Sales at Series A-C SaaS",
    sampleLead: {
      name: "Marcus Vance",
      role: "VP of Revenue Operations",
      company: "Synthetix Labs",
      email: "marcus.vance@synthetix.io",
      linkedin: "linkedin.com/in/marcusvance",
      fitScore: 98,
      emailSubject: "Quick question on Synthetix's lead-to-calendar routing",
      emailSnippet:
        "Saw Synthetix just scaled the AE team to 24 reps. Most teams at your stage lose ~28% of inbound demos in scheduling handoffs. Built an automated pipeline that embeds instant qualified booking directly into your form flow without Calendly redirects.",
    },
    metrics: {
      leadsFound: 412,
      deliverability: "99.4%",
      replyRate: "16.2%",
      meetingsBooked: 23,
    },
  },
  "linear.app": {
    domain: "linear.app",
    name: "Linear",
    industry: "Issue Tracking & Product Planning",
    tagline: "The issue tracker built for high-performance product teams",
    keywords: ["Issue Tracking", "Cycles", "Roadmaps", "Customer Requests"],
    competitors: ["Jira", "Asana", "Shortcut"],
    targetIcp: "VP Product, VP Engineering at Fast-Growing Tech",
    sampleLead: {
      name: "Elena Rostova",
      role: "Head of Engineering",
      company: "Kitebase AI",
      email: "elena@kitebase.dev",
      linkedin: "linkedin.com/in/elenarostova",
      fitScore: 99,
      emailSubject: "Linear cycles vs. Kitebase's sprint velocity",
      emailSnippet:
        "Noticed your recent tech blog on shipping weekly compiler updates. Teams moving at your speed usually get bogged down by Jira's 3-second load times. Set up a 1-click sync that cuts planning friction in half.",
    },
    metrics: {
      leadsFound: 384,
      deliverability: "99.8%",
      replyRate: "18.5%",
      meetingsBooked: 27,
    },
  },
  "resend.com": {
    domain: "resend.com",
    name: "Resend",
    industry: "Developer Email Infrastructure",
    tagline: "Email for developers with clean modern APIs",
    keywords: ["Transactional Email", "React Email", "Deliverability", "Webhooks"],
    competitors: ["SendGrid", "Postmark", "Mailgun"],
    targetIcp: "CTO, VP of Engineering, Lead Architects",
    sampleLead: {
      name: "Devon Chen",
      role: "Chief Technology Officer",
      company: "Orbit Payments",
      email: "devon@orbitpay.com",
      linkedin: "linkedin.com/in/devonchen",
      fitScore: 97,
      emailSubject: "React Email templates for Orbit's transaction receipts",
      emailSnippet:
        "Saw Orbit's announcement on expanding to instant multi-currency settlement. Building payment receipts with legacy email APIs is notoriously fragile. Our developer pipeline lets your engineers write emails with React components and 99.9% inbox placement.",
    },
    metrics: {
      leadsFound: 520,
      deliverability: "99.6%",
      replyRate: "14.9%",
      meetingsBooked: 31,
    },
  },
};

const STAGES = [
  { id: "research", label: "01 Research", icon: GlobeIcon },
  { id: "icp", label: "02 ICP & Competitors", icon: TargetIcon },
  { id: "leads", label: "03 Decision Makers", icon: UserCheckIcon },
  { id: "email", label: "04 Dynamic Cold Email", icon: EnvelopeSimpleIcon },
  { id: "meetings", label: "05 Booked Meetings", icon: CalendarCheckIcon },
];

export const NewHero = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("cal.com");
  const [inputUrl, setInputUrl] = useState<string>("cal.com");
  const [activeStage, setActiveStage] = useState<string>("research");
  const [isEditingDraft, setIsEditingDraft] = useState<boolean>(false);
  const [editedBody, setEditedBody] = useState<string>("");

  const currentPreset = PRESETS[selectedDomain] ?? PRESETS["cal.com"];

  const handleSelectDomain = (domainKey: string) => {
    setSelectedDomain(domainKey);
    setInputUrl(domainKey);
    setIsEditingDraft(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputUrl.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
    if (PRESETS[clean]) {
      setSelectedDomain(clean);
    } else {
      setSelectedDomain("cal.com");
    }
  };

  return (
    <div className="w-full">
      {/* Top Hero Headline Block */}
      <div className="flex flex-col items-start justify-between gap-6 px-4 md:px-10">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-xs select-none">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
          </span>
          <span className="text-xs font-medium text-neutral-600">
            Autonomous Outbound Sales Engine
          </span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 border border-blue-100">
            Agentic AI
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-[68px] leading-[1.08]">
          Your outbound sales team <br className="hidden sm:inline" />
          <span className="text-neutral-400">on autopilot.</span>
        </h1>

        {/* Narrative Para */}
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-neutral-500 md:text-lg">
          Give your website URL. Our autonomous sales agent extracts your value proposition,
          analyzes competitors, maps high-intent ICPs, pinpoints verified decision makers,
          drafts personalized 1-to-1 outreach, and books qualified meetings into your calendar.
        </p>

        {/* Domain Input Bar + Instant Scan */}
        <div className="mt-2 w-full max-w-xl">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center rounded-full border border-gray-300 bg-white p-1.5 shadow-xs transition-focus focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <div className="flex items-center gap-2 ps-3.5 pe-2 text-neutral-400">
              <GlobeIcon weight="bold" className="size-4" />
              <span className="text-xs font-mono text-neutral-400 select-none">https://</span>
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="yourcompany.com"
              className="w-full bg-transparent text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 active:scale-[0.98]"
            >
              <span>Scan Pipeline</span>
              <ArrowRightIcon weight="bold" className="size-3" />
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="text-[11px] font-medium text-neutral-500">Try live example:</span>
            {Object.keys(PRESETS).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectDomain(key)}
                className={cn(
                  "cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px] font-mono transition-colors",
                  selectedDomain === key
                    ? "border-blue-300 bg-blue-50 text-blue-600 font-semibold"
                    : "border-gray-200 bg-white text-neutral-600 hover:border-gray-300",
                )}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-1 flex flex-wrap items-center gap-4">
          <Link href="/join">
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-6 py-2.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-colors hover:bg-neutral-800"
            >
              <span>Launch Autopilot</span>
              <ArrowRightIcon weight="bold" className="size-3.5" />
            </motion.button>
          </Link>
          <Link href="/join">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 shadow-xs transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              <span>Contact Sales</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Showcase Canvas Stage */}
      <div className="mt-12 px-2 sm:px-4 md:px-10">
        {/* Concentric Frame: Outer rounded-[22px] with p-2 */}
        <div className="relative rounded-[22px] border border-gray-200/90 bg-gray-100/70 p-2 shadow-xs">
          {/* Concentric Inner: rounded-[16px] bg-white */}
          <div className="relative min-h-[580px] overflow-hidden rounded-[16px] border border-gray-200/80 bg-white shadow-xs">
            {/* Ambient EverywhereayushShader in the backdrop */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mask-[radial-gradient(ellipse_70%_60%_at_50%_35%,#000_40%,transparent_100%)]">
              <EverywhereayushShader theme="light" />
            </div>

            {/* Stage Top Command Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
              {/* Left: Window Dots & Active Status */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="hidden h-4 w-px bg-gray-200 sm:block" />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-neutral-800">
                    {currentPreset.domain}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-100">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Agent Active
                  </span>
                </div>
              </div>

              {/* Center: Stage Navigator Tabs */}
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/80 p-1">
                {STAGES.map((stage) => {
                  const Icon = stage.icon;
                  const isActive = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStage(stage.id)}
                      className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors select-none",
                        isActive
                          ? "bg-white text-neutral-900 shadow-xs border border-gray-200"
                          : "text-neutral-500 hover:text-neutral-800",
                      )}
                    >
                      <Icon weight="bold" className="size-3" />
                      <span className="hidden md:inline">{stage.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Live Conversion Metric */}
              <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-xs lg:flex">
                <LightningIcon weight="fill" className="size-3.5 text-amber-500" />
                <span className="font-mono tabular-nums font-semibold text-neutral-900">
                  {currentPreset.metrics.meetingsBooked}
                </span>
                <span className="text-[11px] text-neutral-400">meetings booked</span>
              </div>
            </div>

            {/* Stage Body Content */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {/* 01 RESEARCH STAGE */}
                {activeStage === "research" && (
                  <motion.div
                    key="research"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                  >
                    {/* Left: Extracted Profile */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Step 1 · Domain Extraction
                        </span>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 border border-blue-100">
                          Complete
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-neutral-800 shadow-xs font-semibold text-lg">
                          {currentPreset.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-neutral-900">
                            {currentPreset.name}
                          </h4>
                          <p className="text-xs text-neutral-500">{currentPreset.industry}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-neutral-600">
                        &ldquo;{currentPreset.tagline}&rdquo;
                      </p>
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                          Extracted Keywords
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {currentPreset.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-mono text-neutral-700"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center: Competitor & Positioning Analysis */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Step 2 · Competitive Landscape
                        </span>
                        <MagnifyingGlassIcon weight="bold" className="size-4 text-neutral-400" />
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">
                        Agent generated queries to uncover competitors and wedge angles:
                      </p>
                      <div className="mt-3 space-y-2">
                        {currentPreset.competitors.map((comp) => (
                          <div
                            key={comp}
                            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/70 p-2.5 text-xs"
                          >
                            <span className="font-medium text-neutral-800">{comp}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Wedge identified ✓
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <div className="rounded-lg bg-blue-50/60 p-2.5 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                          <span className="font-semibold">AI Differentiation:</span> Focus on speed,
                          developer-first API, and self-hosted control vs. incumbent bloat.
                        </div>
                      </div>
                    </div>

                    {/* Right: ICP & Target Search Blueprint */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Step 3 · ICP Definition
                        </span>
                        <TargetIcon weight="bold" className="size-4 text-blue-500" />
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                        <span className="font-semibold text-neutral-800">Ideal Buyer:</span>{" "}
                        {currentPreset.targetIcp}
                      </p>
                      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs">
                        <div className="flex justify-between text-neutral-600">
                          <span>Target Company Size:</span>
                          <span className="font-mono text-neutral-900 font-medium">
                            25 - 500 employees
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Verified Accounts Found:</span>
                          <span className="font-mono text-neutral-900 font-semibold">
                            {currentPreset.metrics.leadsFound} accounts
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Data Enrichment:</span>
                          <span className="text-emerald-600 font-medium">Waterfall 99.4%</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStage("leads")}
                        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-neutral-900 bg-neutral-900 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800"
                      >
                        <span>View Discovered Leads</span>
                        <ArrowRightIcon weight="bold" className="size-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 02 ICP & COMPETITORS STAGE */}
                {activeStage === "icp" && (
                  <motion.div
                    key="icp"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  >
                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        Synthesized ICP & Search Queries
                      </h4>
                      <p className="mt-1 text-xs text-neutral-500">
                        Autonomous search syntax generated for B2B company discovery:
                      </p>
                      <div className="mt-4 space-y-2 font-mono text-xs">
                        <div className="rounded-lg bg-gray-50 border border-gray-200 p-2.5 text-neutral-700">
                          site:linkedin.com/company &ldquo;Series A&rdquo; &ldquo;{currentPreset.keywords[0]}&rdquo;
                        </div>
                        <div className="rounded-lg bg-gray-50 border border-gray-200 p-2.5 text-neutral-700">
                          headcount:&gt;30 &ldquo;{currentPreset.industry}&rdquo; hiring:(&ldquo;AE&rdquo; OR &ldquo;SDR&rdquo;)
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-neutral-600">
                          Queries executed across 14 sources continuously
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        Competitive Positioning Matrix
                      </h4>
                      <p className="mt-1 text-xs text-neutral-500">
                        How our agent pitches your product against market alternatives:
                      </p>
                      <div className="mt-4 space-y-3">
                        {currentPreset.competitors.map((comp) => (
                          <div key={comp} className="border-b border-gray-100 pb-2 text-xs">
                            <span className="font-semibold text-neutral-900">vs {comp}:</span>
                            <p className="text-neutral-500 mt-0.5">
                              Highlight friction in legacy onboarding and showcase 10x faster deployment.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 03 LEADS & DECISION MAKERS STAGE */}
                {activeStage === "leads" && (
                  <motion.div
                    key="leads"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                  >
                    <div className="lg:col-span-2 rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-900">
                            Discovered Decision Maker
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Verified via multi-provider waterfall with MX-record validation
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                          <CheckCircleIcon weight="fill" className="size-3.5 text-emerald-500" />
                          Fit Score: {currentPreset.sampleLead.fitScore}%
                        </span>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold text-sm">
                            {currentPreset.sampleLead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-neutral-900">
                              {currentPreset.sampleLead.name}
                            </h5>
                            <p className="text-xs text-neutral-500 font-medium">
                              {currentPreset.sampleLead.role} · {currentPreset.sampleLead.company}
                            </p>
                            <p className="mt-1 font-mono text-[11px] text-blue-600">
                              {currentPreset.sampleLead.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-mono text-neutral-600">
                            LinkedIn Verified ✓
                          </span>
                          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-mono text-emerald-700 font-medium">
                            Deliverability: 99.8%
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-xs text-neutral-500">
                          {currentPreset.metrics.leadsFound} other decision makers queued for this campaign
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveStage("email")}
                          className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                          <span>Inspect Drafted Email</span>
                          <ArrowRightIcon weight="bold" className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Target Accounts Stream */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                        Matched Companies
                      </span>
                      <div className="mt-3 space-y-2.5">
                        {["Synthetix Labs", "Kitebase AI", "Orbit Payments", "Prism Cloud"].map(
                          (company, idx) => (
                            <div
                              key={company}
                              className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <BuildingsIcon weight="bold" className="size-4 text-neutral-400" />
                                <span className="font-medium text-neutral-800">{company}</span>
                              </div>
                              <span className="font-mono text-[10px] text-neutral-400">
                                {idx === 0 ? "In Outreach" : "Queued"}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 04 DYNAMIC COLD EMAIL STAGE */}
                {activeStage === "email" && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-400">To:</span>
                          <span className="font-mono text-xs font-medium text-neutral-800">
                            {currentPreset.sampleLead.email}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-400">Subject:</span>
                          <span className="text-xs font-semibold text-neutral-900">
                            <TextMorph>{currentPreset.sampleLead.emailSubject}</TextMorph>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingDraft) {
                              setEditedBody(currentPreset.sampleLead.emailSnippet);
                            }
                            setIsEditingDraft(!isEditingDraft);
                          }}
                          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-gray-100"
                        >
                          <PencilSimpleIcon weight="bold" className="size-3 text-neutral-500" />
                          <span>{isEditingDraft ? "Save Edit" : "Edit Draft"}</span>
                        </button>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600 border border-blue-100">
                          Human Review Supported
                        </span>
                      </div>
                    </div>

                    {/* Email Content Box */}
                    <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/60 p-5 font-sans text-sm leading-relaxed text-neutral-700">
                      <p className="mb-3">Hi {currentPreset.sampleLead.name.split(" ")[0]},</p>
                      {isEditingDraft ? (
                        <textarea
                          rows={4}
                          value={editedBody}
                          onChange={(e) => setEditedBody(e.target.value)}
                          className="w-full rounded-lg border border-blue-300 bg-white p-3 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      ) : (
                        <p>{editedBody || currentPreset.sampleLead.emailSnippet}</p>
                      )}
                      <p className="mt-4">
                        Do you have 15 minutes this Thursday or Friday to inspect our live pipeline?
                      </p>
                      <p className="mt-4 text-xs text-neutral-500">
                        Best, <br />
                        <span className="font-semibold text-neutral-800">
                          Autonomous Sales Representative
                        </span>{" "}
                        at {currentPreset.name}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon weight="fill" className="size-4 text-emerald-500" />
                        <span>Domain Warmup: 3 rotating secondary mailboxes active</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStage("meetings")}
                        className="flex cursor-pointer items-center gap-1.5 font-semibold text-neutral-900 hover:underline"
                      >
                        <span>See Converted Meetings</span>
                        <ArrowRightIcon weight="bold" className="size-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 05 BOOKED MEETINGS & OPTIMIZATION STAGE */}
                {activeStage === "meetings" && (
                  <motion.div
                    key="meetings"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                  >
                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Step 8 · Calendar Sync
                        </span>
                        <CalendarCheckIcon weight="fill" className="size-4 text-blue-500" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                          {currentPreset.metrics.meetingsBooked}
                        </span>
                        <span className="text-xs text-neutral-400">qualified demos this month</span>
                      </div>
                      <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs space-y-2">
                        <div className="flex items-center justify-between font-medium text-neutral-800">
                          <span>Demo with Marcus Vance (VP Ops)</span>
                          <span className="text-emerald-600 font-mono">Tomorrow 2:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-500">
                          <span>Demo with Elena Rostova (Head Eng)</span>
                          <span className="font-mono">Friday 11:30 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Step 9 · Learn & Double Down
                        </span>
                        <ChartLineUpIcon weight="bold" className="size-4 text-emerald-500" />
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                        Agent analyzes replies, filters objections, and doubles down volume on winning
                        segments automatically:
                      </p>
                      <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-2.5 text-xs text-emerald-900">
                        <span className="font-semibold">Top Performing Angle:</span> &ldquo;Speed vs.
                        incumbent latency&rdquo; produced a{" "}
                        <span className="font-bold">{currentPreset.metrics.replyRate}</span> positive
                        reply rate. Reallocating +60% daily send volume.
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                          Summary HUD
                        </span>
                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Inbox Placement:</span>
                            <span className="font-mono font-semibold text-neutral-900">
                              {currentPreset.metrics.deliverability}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Positive Reply Rate:</span>
                            <span className="font-mono font-semibold text-emerald-600">
                              {currentPreset.metrics.replyRate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Average CAC Reduction:</span>
                            <span className="font-mono font-semibold text-blue-600">-64%</span>
                          </div>
                        </div>
                      </div>

                      <Link href="/join" className="mt-4 block w-full">
                        <button
                          type="button"
                          className="w-full rounded-full bg-neutral-900 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800"
                        >
                          Deploy This Agent
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage Bottom Live Activity Ticker */}
            <div className="relative z-10 border-t border-gray-100 bg-gray-50/80 px-4 py-2.5 text-[11px] text-neutral-500 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-neutral-700">Live Agent Log:</span>
                  <span className="font-mono text-neutral-500">
                    Discovered 14 new qualified decision makers at Series B SaaS companies
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">3 seconds ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
