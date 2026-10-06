"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TextMorph } from "torph/react";
import {
  ArrowRightIcon,
  GlobeIcon,
  TargetIcon,
  BuildingsIcon,
  UserCheckIcon,
  EnvelopeSimpleIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  PencilSimpleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightningIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Heading, Para } from "@/components/utility/texts";
import { Button } from "@/components/utility/button";
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
    tagline: "Open-source scheduling infrastructure for modern revenue teams",
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
      meetingsBooked: 24,
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
      meetingsBooked: 29,
    },
  },
  "resend.com": {
    domain: "resend.com",
    name: "Resend",
    industry: "Developer Email Infrastructure",
    tagline: "Email for developers with clean modern APIs and React templates",
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
      meetingsBooked: 33,
    },
  },
  "raycast.com": {
    domain: "raycast.com",
    name: "Raycast",
    industry: "Developer Productivity & Extensible Launcher",
    tagline: "Supercharged launcher built for high-velocity teams",
    keywords: ["Extensions API", "Command Bar", "Raycast AI", "Shortcuts"],
    competitors: ["Alfred", "Spotlight", "Scribe"],
    targetIcp: "Head of Developer Productivity, VP Engineering",
    sampleLead: {
      name: "Sarah Lindqvist",
      role: "VP of Developer Experience",
      company: "Voxel Engine",
      email: "sarah@voxelengine.io",
      linkedin: "linkedin.com/in/sarahlindqvist",
      fitScore: 96,
      emailSubject: "Cutting 45 min of context-switching for Voxel's 80 devs",
      emailSnippet:
        "Noticed Voxel engineers are shipping daily release notes on Discord. Context switching between Linear, GitHub, and Figma costs fast teams hours every sprint. Raycast for Teams embeds your entire engineering toolchain directly into a unified command palette.",
    },
    metrics: {
      leadsFound: 340,
      deliverability: "99.7%",
      replyRate: "17.4%",
      meetingsBooked: 26,
    },
  },
};

const STAGES = [
  { id: "research", label: "01 Domain Radar", icon: GlobeIcon },
  { id: "leads", label: "02 Decision Makers", icon: UserCheckIcon },
  { id: "email", label: "03 1-to-1 Outreach", icon: EnvelopeSimpleIcon },
  { id: "meetings", label: "04 Booked Demos", icon: CalendarCheckIcon },
];

export const HeroSection = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("cal.com");
  const [activeStage, setActiveStage] = useState<string>("research");
  const [isEditingDraft, setIsEditingDraft] = useState<boolean>(false);
  const [editedBody, setEditedBody] = useState<string>("");

  const currentPreset = PRESETS[selectedDomain] ?? PRESETS["cal.com"];

  const handleSelectDomain = (domainKey: string) => {
    setSelectedDomain(domainKey);
    setIsEditingDraft(false);
  };

  return (
    <section className="relative w-full">
      {/* ── 1. Hero Copy — Split Layout (Generous top whitespace, tight to card) ── */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-6 sm:px-10 md:pt-28 md:pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          {/* Left: Heading — large, left-aligned, authoritative */}
          <div className="w-full md:max-w-[56%]">
            <Heading className="text-left font-semibold leading-[1.04] tracking-tight text-neutral-900 md:text-[58px]">
              Your outbound sales team, on autopilot.
            </Heading>
          </div>

          {/* Right: Subheading + CTAs — right-aligned column closer to bottom line */}
          <div className="flex w-full flex-col items-start gap-5 md:max-w-[40%] md:items-end">
            <Para className="text-base leading-relaxed text-neutral-500 md:text-right md:text-[17px]">
              Paste your URL. Scrunity AI finds your ideal buyers, writes
              personalized emails you approve, and books qualified meetings
              straight into your calendar.
            </Para>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-lg bg-[#00b0fa] px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-xs transition-colors duration-150 hover:bg-[#009de0]"
              >
                Get Started
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-xs transition-colors duration-150 hover:bg-gray-50 hover:border-gray-300"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Product Canvas ────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Outer Canvas Frame: Ultra-clean white background with crisp border and subtle ambient shadow */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]">
          {/* Subtle top light gradient */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-gray-50/50 to-white" />

          {/* Top Window Navigation Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-white/80 px-5 py-3 backdrop-blur-sm sm:px-6">
            {/* macOS Window Controls + Active Target Domain */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
                <span className="size-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
                <span className="size-3 rounded-full bg-[#28c840] border border-[#1aab29]/40" />
              </div>
              <div className="hidden h-3.5 w-px bg-gray-200 sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-neutral-900">
                  {currentPreset.domain}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Agent
                </span>
              </div>

              {/* Domain Switcher Chips */}
              <div className="hidden items-center gap-1 sm:flex pl-1">
                {Object.keys(PRESETS).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectDomain(key)}
                    className={cn(
                      "cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors select-none",
                      selectedDomain === key
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "text-neutral-500 hover:bg-gray-100 hover:text-neutral-900"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

              {/* Stage Tabs */}
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/90 p-1">
                {STAGES.map((stage) => {
                  const Icon = stage.icon;
                  const isActive = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStage(stage.id)}
                      className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors select-none",
                        isActive
                          ? "border border-gray-200 bg-white font-semibold text-neutral-900 shadow-xs"
                          : "text-neutral-500 hover:text-neutral-800",
                      )}
                    >
                      <Icon weight="bold" className="size-3.5" />
                      <span className="hidden sm:inline">{stage.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Metric */}
              <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-xs lg:flex">
                <LightningIcon weight="fill" className="size-3.5 text-[#00b0fa]" />
                <span className="font-mono tabular-nums font-semibold text-neutral-900">
                  {currentPreset.metrics.meetingsBooked}
                </span>
                <Para className="text-xs text-neutral-500">meetings booked</Para>
              </div>
            </div>

            {/* Stage Body */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {/* 01 DOMAIN RADAR */}
                {activeStage === "research" && (
                  <motion.div
                    key="research"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                  >
                    {/* Extracted Profile */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Stage 01 · Ingestion
                        </Para>
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#00b0fa]">
                          Complete
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-neutral-900 shadow-xs">
                          {currentPreset.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Para className="text-base font-semibold text-neutral-900">
                            {currentPreset.name}
                          </Para>
                          <Para className="text-xs text-neutral-500">{currentPreset.industry}</Para>
                        </div>
                      </div>
                      <Para className="mt-3 text-sm leading-relaxed text-neutral-600">
                        &ldquo;{currentPreset.tagline}&rdquo;
                      </Para>
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <Para className="font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Value Keywords
                        </Para>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {currentPreset.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs text-neutral-700"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Competitor Wedges */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Competitor Wedges
                        </Para>
                        <MagnifyingGlassIcon weight="bold" className="size-4 text-neutral-400" />
                      </div>
                      <div className="mt-3 space-y-2">
                        {currentPreset.competitors.map((comp) => (
                          <div
                            key={comp}
                            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/70 p-2.5 text-xs"
                          >
                            <span className="font-medium text-neutral-900">{comp}</span>
                            <span className="font-mono text-xs text-emerald-600 font-medium">
                              Wedge identified ✓
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-xs text-blue-900 leading-relaxed">
                          <span className="font-semibold">AI Pitch Wedge:</span> Emphasize speed,
                          developer control, and transparent pricing vs legacy incumbent complexity.
                        </div>
                      </div>
                    </div>

                    {/* ICP Blueprint */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Target ICP
                        </Para>
                        <TargetIcon weight="bold" className="size-4 text-[#00b0fa]" />
                      </div>
                      <Para className="mt-3 text-sm leading-relaxed text-neutral-700">
                        <span className="font-semibold text-neutral-900">Target Buyer:</span>{" "}
                        {currentPreset.targetIcp}
                      </Para>
                      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs">
                        <div className="flex justify-between">
                          <Para className="text-xs text-neutral-500">Verified Accounts:</Para>
                          <span className="font-mono font-semibold text-neutral-900">
                            {currentPreset.metrics.leadsFound}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <Para className="text-xs text-neutral-500">Deliverability:</Para>
                          <span className="font-semibold text-emerald-600">
                            {currentPreset.metrics.deliverability}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStage("leads")}
                        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800"
                      >
                        <span>Inspect Leads</span>
                        <ArrowRightIcon weight="bold" className="size-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 02 DECISION MAKERS */}
                {activeStage === "leads" && (
                  <motion.div
                    key="leads"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                  >
                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Para className="text-sm font-semibold text-neutral-900">
                            Discovered Decision Maker
                          </Para>
                          <Para className="text-xs text-neutral-400">
                            Multi-provider waterfall with live SMTP check
                          </Para>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircleIcon weight="fill" className="size-3.5 text-emerald-500" />
                          {currentPreset.sampleLead.fitScore}% fit
                        </span>
                      </div>

                      <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex size-11 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                            {currentPreset.sampleLead.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <Para className="text-sm font-semibold text-neutral-900">
                              {currentPreset.sampleLead.name}
                            </Para>
                            <Para className="text-xs text-neutral-500">
                              {currentPreset.sampleLead.role} · {currentPreset.sampleLead.company}
                            </Para>
                            <Para className="mt-0.5 font-mono text-xs text-[#00b0fa]">
                              {currentPreset.sampleLead.email}
                            </Para>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs text-neutral-600">
                            LinkedIn ✓
                          </span>
                          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-medium text-emerald-700">
                            99.8% deliverable
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <Para className="text-xs text-neutral-500">
                          {currentPreset.metrics.leadsFound} others queued
                        </Para>
                        <button
                          type="button"
                          onClick={() => setActiveStage("email")}
                          className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#00b0fa]"
                        >
                          <span>Review Email Draft</span>
                          <ArrowRightIcon weight="bold" className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Matched Accounts */}
                    <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-xs">
                      <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                        Matched Accounts
                      </Para>
                      <div className="mt-3 space-y-2.5">
                        {["Synthetix Labs", "Kitebase AI", "Orbit Payments", "Voxel Engine"].map(
                          (company, idx) => (
                            <div
                              key={company}
                              className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <BuildingsIcon weight="bold" className="size-4 text-neutral-400" />
                                <span className="font-medium text-neutral-900">{company}</span>
                              </div>
                              <span className="font-mono text-xs text-neutral-500 font-medium">
                                {idx === 0 ? "In Outreach" : "Queued"}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 03 1-TO-1 OUTREACH */}
                {activeStage === "email" && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Para className="text-xs font-medium text-neutral-500">To:</Para>
                          <span className="font-mono text-xs font-medium text-neutral-800">
                            {currentPreset.sampleLead.email}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Para className="text-xs font-medium text-neutral-500">Subject:</Para>
                          <span className="text-xs font-semibold text-neutral-900">
                            <TextMorph>{currentPreset.sampleLead.emailSubject}</TextMorph>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingDraft) setEditedBody(currentPreset.sampleLead.emailSnippet);
                            setIsEditingDraft(!isEditingDraft);
                          }}
                          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-gray-100"
                        >
                          <PencilSimpleIcon weight="bold" className="size-3 text-neutral-500" />
                          <span>{isEditingDraft ? "Save" : "Edit Draft"}</span>
                        </button>
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#00b0fa]">
                          Human Review
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/60 p-5 font-sans text-sm leading-relaxed text-neutral-700">
                      <Para className="mb-3 text-neutral-800">
                        Hi {currentPreset.sampleLead.name.split(" ")[0]},
                      </Para>
                      {isEditingDraft ? (
                        <textarea
                          rows={4}
                          value={editedBody}
                          onChange={(e) => setEditedBody(e.target.value)}
                          className="w-full rounded-lg border border-[#00b0fa] bg-white p-3 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      ) : (
                        <Para className="text-neutral-700">
                          {editedBody || currentPreset.sampleLead.emailSnippet}
                        </Para>
                      )}
                      <Para className="mt-4 text-neutral-700">
                        Do you have 15 minutes this Thursday or Friday to inspect our live pipeline?
                      </Para>
                      <Para className="mt-4 text-xs text-neutral-400">
                        Best, <br />
                        <span className="font-semibold text-neutral-800">
                          Autonomous Sales Representative
                        </span>{" "}
                        at {currentPreset.name}
                      </Para>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon weight="fill" className="size-4 text-emerald-500" />
                        <Para className="text-xs text-neutral-500">
                          3 rotating secondary mailboxes active
                        </Para>
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

                {/* 04 BOOKED DEMOS */}
                {activeStage === "meetings" && (
                  <motion.div
                    key="meetings"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                  >
                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between">
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Calendar
                        </Para>
                        <CalendarCheckIcon weight="fill" className="size-4 text-[#00b0fa]" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-mono text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                          {currentPreset.metrics.meetingsBooked}
                        </span>
                        <Para className="text-xs text-neutral-500">demos this month</Para>
                      </div>
                      <div className="mt-4 space-y-2 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs">
                        <div className="flex items-center justify-between font-medium text-neutral-800">
                          <span>Marcus Vance (VP Ops)</span>
                          <span className="font-mono text-emerald-600">Tomorrow 2:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-500">
                          <span>Elena Rostova (Head Eng)</span>
                          <span className="font-mono">Friday 11:30 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between">
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Optimization
                        </Para>
                        <ChartLineUpIcon weight="bold" className="size-4 text-emerald-500" />
                      </div>
                      <Para className="mt-3 text-sm leading-relaxed text-neutral-600">
                        Scrunity AI analyzes replies and reallocates send volume to winning segments:
                      </Para>
                      <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3 text-xs text-emerald-900">
                        <span className="font-semibold">Top Angle:</span> &ldquo;Speed vs.
                        incumbent latency&rdquo; →{" "}
                        <span className="font-bold">{currentPreset.metrics.replyRate}</span> reply rate.
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-[14px] border border-gray-200 bg-white p-6 shadow-xs">
                      <div>
                        <Para className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          Telemetry
                        </Para>
                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <Para className="text-xs text-neutral-500">Inbox Placement:</Para>
                            <span className="font-mono font-semibold text-neutral-900">
                              {currentPreset.metrics.deliverability}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <Para className="text-xs text-neutral-500">Reply Rate:</Para>
                            <span className="font-mono font-semibold text-emerald-600">
                              {currentPreset.metrics.replyRate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <Para className="text-xs text-neutral-500">CAC Reduction:</Para>
                            <span className="font-mono font-semibold text-[#00b0fa]">-64%</span>
                          </div>
                        </div>
                      </div>
                      <Link href="/join" className="mt-4 block w-full">
                        <button
                          type="button"
                          className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800"
                        >
                          Get Started with Scrunity AI
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 border-t border-gray-100 bg-gray-50/80 px-4 py-3 text-xs text-neutral-600 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-neutral-800">Scrunity AI:</span>
                  <span className="font-mono text-neutral-500">
                    Scanning {currentPreset.domain} · 14 data sources active
                  </span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs text-neutral-500">
                  <span>SMTP: 250 OK</span>
                  <span>Zero Bounce Guarantee</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};
