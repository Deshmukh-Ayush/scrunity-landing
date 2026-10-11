"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TextMorph } from "torph/react";
import {
  GlobeIcon,
  ShieldCheckIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import { GlowEffect } from "../join/glow-effect";
import { cn } from "@/lib/utils";

// ── TYPES ───────────────────────────────────────────────────────────
export type FindingItem = {
  text: string;
  isChip?: boolean;
  chipType?: "tertiary" | "success" | "blue" | "neutral";
  chipBadge?: string;
};

export type StageData = {
  id: string;
  label: string;
  collapsedSummary: string;
  findings: FindingItem[];
};

export type ScenarioData = {
  domain: string;
  targetCompany: string;
  category: string;
  latency: string;
  stages: StageData[];
};

// ── 3 HIGH-FIDELITY B2B SCENARIOS ──────────────────────────────────
export const SCENARIOS: ScenarioData[] = [
  {
    domain: "cal.com",
    targetCompany: "Synthetix Labs",
    category: "B2B Scheduling & Routing",
    latency: "38ms",
    stages: [
      {
        id: "s1-1",
        label: "Domain & API Extraction",
        collapsedSummary: "48 high-fit accounts identified",
        findings: [
          { text: "Extracting cal.com metadata, value proposition & scheduling API" },
          { text: "Mapping competitive landscape vs. Calendly, Chili Piper" },
          {
            text: "ICP Fit: 99%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 99%",
          },
        ],
      },
      {
        id: "s1-2",
        label: "ICP Account Discovery",
        collapsedSummary: "Target account: Synthetix Labs (Series B AI)",
        findings: [
          { text: "Filtering 14,200 tech scaleups for active RevOps & AE expansion" },
          { text: "120 employees · Series B · Enterprise AI Infrastructure" },
          {
            text: "Synthetix Labs · 8 AE open roles",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Synthetix Labs · 8 AE open roles",
          },
        ],
      },
      {
        id: "s1-3",
        label: "Decision Maker Waterfall",
        collapsedSummary: "Marcus Vance (VP RevOps) → Direct MX valid",
        findings: [
          { text: "Target buyer: Marcus Vance — VP of Revenue Operations" },
          { text: "Cascade waterfall across 14 data providers for direct work email" },
          {
            text: "marcus@synthetix.io — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "marcus@synthetix.io — MX verified",
          },
        ],
      },
      {
        id: "s1-4",
        label: "Contextual 1-to-1 Writing",
        collapsedSummary: "1-to-1 copy drafted → Demo handoff latency angle",
        findings: [
          { text: "Referencing trigger: 8 new AE hires vs. 28% demo dropoff" },
          { text: "Synthesized personalized value hook: zero-redirect scheduling" },
          {
            text: "Deliverability: Warmup Mailbox #2",
            isChip: true,
            chipType: "blue",
            chipBadge: "Deliverability Guardrail: Warmup #2",
          },
        ],
      },
      {
        id: "s1-5",
        label: "Autonomous Dispatch & Booking",
        collapsedSummary: "Demo confirmed for Thursday 2:00 PM EST",
        findings: [
          { text: "Dispatched with humanized cadence & secondary domain rotation" },
          { text: "Positive reply in 38 mins: 'Dropoff is real. Let's do Thursday'" },
          {
            text: "Booked: Thu 2:00 PM EST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Thu 2:00 PM EST (30 mins)",
          },
        ],
      },
    ],
  },
  {
    domain: "linear.app",
    targetCompany: "Warp Engine",
    category: "Developer Tools & Issue Tracking",
    latency: "42ms",
    stages: [
      {
        id: "s2-1",
        label: "Product Positioning & Wedge",
        collapsedSummary: "Jira displacement wedge mapped",
        findings: [
          { text: "Indexing linear.app cycles, roadmap sync & keyboard shortcuts" },
          { text: "Mapping friction points in legacy Jira enterprise instances" },
          {
            text: "ICP Fit: 98.4%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 98.4%",
          },
        ],
      },
      {
        id: "s2-2",
        label: "Scaleup Account Filtering",
        collapsedSummary: "Target account: Warp Engine (Series C DevTools)",
        findings: [
          { text: "Querying 8,500 scaleups with active engineering headcount surge" },
          { text: "340 employees · Series C · Distributed Systems Infrastructure" },
          {
            text: "Warp Engine · 14 Eng pods active",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Warp Engine · 14 Eng pods active",
          },
        ],
      },
      {
        id: "s2-3",
        label: "Buyer Waterfall Verification",
        collapsedSummary: "Elena Rostova (VP Eng) → Real-time SMTP valid",
        findings: [
          { text: "Target buyer: Elena Rostova — VP of Engineering" },
          { text: "Cascade checking port-25 SMTP handshakes & SPF records" },
          {
            text: "elena@warpengine.dev — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "elena@warpengine.dev — MX verified",
          },
        ],
      },
      {
        id: "s2-4",
        label: "Engineering Copy Synthesis",
        collapsedSummary: "Copy drafted → Sprint cycle overhead hook",
        findings: [
          { text: "Referencing sprint review overhead across 14 remote pods" },
          { text: "Positioned automated 1-click Jira sync & velocity metrics" },
          {
            text: "Deliverability: Mailbox Pool #4",
            isChip: true,
            chipType: "blue",
            chipBadge: "Deliverability: Mailbox Pool #4",
          },
        ],
      },
      {
        id: "s2-5",
        label: "Calendar Conversion",
        collapsedSummary: "Migration demo confirmed for Friday 11:00 AM PST",
        findings: [
          { text: "Outreach triggered with randomized delay & verified headers" },
          { text: "Inbound response in 44 mins: 'Jira is slowing us down. Send invite'" },
          {
            text: "Booked: Fri 11:00 AM PST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Fri 11:00 AM PST (30 mins)",
          },
        ],
      },
    ],
  },
  {
    domain: "ramp.com",
    targetCompany: "Apex Global",
    category: "Corporate Spend & FinOps Autopilot",
    latency: "29ms",
    stages: [
      {
        id: "s3-1",
        label: "Domain Intelligence & Angles",
        collapsedSummary: "SaaS spend consolidation hook identified",
        findings: [
          { text: "Parsing ramp.com automated card controls & receipt matching" },
          { text: "Targeting multi-entity CFOs managing software license sprawl" },
          {
            text: "ICP Fit: 99.4%",
            isChip: true,
            chipType: "tertiary",
            chipBadge: "Fit: 99.4%",
          },
        ],
      },
      {
        id: "s3-2",
        label: "Finance Account Discovery",
        collapsedSummary: "Target account: Apex Global (Series C Logistics)",
        findings: [
          { text: "Scanning 12,000 mid-market entities with >50 vendor contracts" },
          { text: "450 employees · Series C · Supply Chain Cloud Platform" },
          {
            text: "Apex Global · 62 SaaS vendors",
            isChip: true,
            chipType: "neutral",
            chipBadge: "Apex Global · 62 SaaS vendors",
          },
        ],
      },
      {
        id: "s3-3",
        label: "Executive Waterfall Resolution",
        collapsedSummary: "David Kim (CFO) → Corporate SMTP certified",
        findings: [
          { text: "Economic buyer: David Kim — Chief Financial Officer" },
          { text: "Multi-provider waterfall verification with zero-bounce guarantee" },
          {
            text: "dkim@apexglobal.io — MX verified",
            isChip: true,
            chipType: "success",
            chipBadge: "dkim@apexglobal.io — MX verified",
          },
        ],
      },
      {
        id: "s3-4",
        label: "Financial Impact Writing",
        collapsedSummary: "Outreach crafted → $140k duplicate SaaS waste hook",
        findings: [
          { text: "Citing detected $140k annual duplicate software subscription spend" },
          { text: "Framed automated 14-day spend audit with zero ERP migration" },
          {
            text: "Spam Score: 0.0/10 · Guardrail Certified",
            isChip: true,
            chipType: "blue",
            chipBadge: "Spam Score: 0.0/10 · Certified",
          },
        ],
      },
      {
        id: "s3-5",
        label: "Automated Meeting Conversion",
        collapsedSummary: "CFO review confirmed for Tuesday 3:30 PM EST",
        findings: [
          { text: "Dispatched via secondary domain cluster with ramped volume" },
          { text: "Reply in 22 mins: 'Good catch on the duplicate seats. Tuesday works'" },
          {
            text: "Booked: Tue 3:30 PM EST (30 mins)",
            isChip: true,
            chipType: "success",
            chipBadge: "Booked: Tue 3:30 PM EST (30 mins)",
          },
        ],
      },
    ],
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LiveResearchStepper = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenarioIdxRef = useRef(0);

  // activeStageIdx: 0..4 is executing; 5 means all 5 stages completed and holding
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showShimmer, setShowShimmer] = useState(false);
  const [isLoopHolding, setIsLoopHolding] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Rail geometry state
  const listContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [firstDotTop, setFirstDotTop] = useState<number>(12);
  const [trackHeight, setTrackHeight] = useState<number>(0);
  const [railHeight, setRailHeight] = useState<number>(0);

  const scenario = SCENARIOS[scenarioIdx];

  // Measure rail geometry accurately
  const updateRail = useCallback(() => {
    const dots = dotRefs.current;
    if (!dots[0] || !listContainerRef.current) return;

    const firstCenter = dots[0].offsetTop + dots[0].offsetHeight / 2;
    setFirstDotTop(firstCenter);

    const lastIdx = scenario.stages.length - 1;
    const lastDot = dots[lastIdx];
    if (lastDot) {
      const lastCenter = lastDot.offsetTop + lastDot.offsetHeight / 2;
      setTrackHeight(Math.max(0, lastCenter - firstCenter));
    }

    const currentTargetIdx = Math.min(activeStageIdx, lastIdx);
    const currentTargetDot = dots[currentTargetIdx];
    if (currentTargetDot) {
      const targetCenter = currentTargetDot.offsetTop + currentTargetDot.offsetHeight / 2;
      setRailHeight(Math.max(0, targetCenter - firstCenter));
    }
  }, [activeStageIdx, scenario.stages.length]);

  // Recalculate rail whenever active stage or revealed items change
  useEffect(() => {
    updateRail();
    const frameId = requestAnimationFrame(updateRail);
    const timer = setTimeout(updateRail, 320);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [updateRail, revealedCount, showShimmer, activeStageIdx, scenarioIdx]);

  // ResizeObserver for reliable height tracking during collapse animations
  useEffect(() => {
    const el = listContainerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      updateRail();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateRail]);

  // Main autonomous execution engine
  useEffect(() => {
    let cancelled = false;

    if (shouldReduceMotion) {
      setActiveStageIdx(5);
      setIsLoopHolding(true);
      return;
    }

    const runEngine = async () => {
      while (!cancelled) {
        const currentScenario = SCENARIOS[scenarioIdxRef.current];

        // Reset for the new scenario pass
        setIsResetting(false);
        setIsLoopHolding(false);
        setActiveStageIdx(0);
        setRevealedCount(0);
        setShowShimmer(false);

        await sleep(350);
        if (cancelled) break;

        // Iterate sequentially through each stage (1 to 5)
        for (let s = 0; s < currentScenario.stages.length; s++) {
          if (cancelled) break;
          setActiveStageIdx(s);
          setRevealedCount(0);

          const currentStage = currentScenario.stages[s];
          const findingsCount = currentStage.findings.length;

          // Reveal findings one-by-one with jittered timing
          for (let f = 0; f < findingsCount; f++) {
            if (cancelled) break;

            // 1. Brief AI radar scanner placeholder (320-450ms)
            setShowShimmer(true);
            const shimmerDuration = 320 + Math.random() * 120;
            await sleep(shimmerDuration);
            if (cancelled) break;

            // 2. Finding appears
            setShowShimmer(false);
            setRevealedCount(f + 1);

            // 3. Stagger before next finding (450-700ms)
            const isLast = f === findingsCount - 1;
            const staggerPause = isLast
              ? 700 + Math.random() * 150
              : 440 + Math.random() * 140;
            await sleep(staggerPause);
          }

          if (cancelled) break;
          // Brief pause before smooth collapse into next stage
          await sleep(260);
        }

        if (cancelled) break;

        // All 5 stages completed!
        setActiveStageIdx(currentScenario.stages.length); // 5
        setIsLoopHolding(true);

        // Hold fully-collapsed summary state for 3.5s–4.0s so user can read everything
        await sleep(3600);
        if (cancelled) break;

        // Soft-blur crossfade before looping into next scenario
        setIsResetting(true);
        await sleep(350);
        if (cancelled) break;

        // Advance to next scenario pass
        scenarioIdxRef.current = (scenarioIdxRef.current + 1) % SCENARIOS.length;
        setScenarioIdx(scenarioIdxRef.current);
      }
    };

    runEngine();

    return () => {
      cancelled = true;
    };
  }, [shouldReduceMotion]);

  // Click card to immediately jump or replay
  const handleCardClick = () => {
    if (isLoopHolding) {
      scenarioIdxRef.current = (scenarioIdxRef.current + 1) % SCENARIOS.length;
      setScenarioIdx(scenarioIdxRef.current);
      setActiveStageIdx(0);
      setRevealedCount(0);
      setIsLoopHolding(false);
    } else {
      setActiveStageIdx(5);
      setIsLoopHolding(true);
      setShowShimmer(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[624px] h-[480px] sm:h-[500px] shrink-0 select-none">
      {/* Layer 1: Ambient Atmospheric Glow Shifter */}
      <div className="pointer-events-none absolute -inset-2.5 z-0">
        <GlowEffect
          colors={
            isLoopHolding
              ? ["#10B981", "#059669", "#00aff9", "#10B981"]
              : ["#00aff9", "#38bdf8", "#0284c7", "#00aff9"]
          }
          mode="breathe"
          blur="stronger"
          scale={1.04}
          duration={4}
          className="opacity-25"
        />
      </div>

      {/* Layer 2: Outer Concentric Frame (R_outer = 16px, Padding = 2px -> R_inner = 14px) */}
      <div
        className={cn(
          "relative z-10 flex flex-col w-full h-full p-[2px] rounded-2xl border border-neutral-200/80 bg-neutral-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition-all duration-350 ease-out",
          isResetting ? "opacity-60 blur-[1px]" : "opacity-100 blur-0"
        )}
      >
        {/* Layer 3: Architectural Blueprint Grid Backdrop */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[24px_24px] pointer-events-none" />

        {/* Layer 4: Living Card Surface */}
        <motion.div
          onClick={handleCardClick}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
          className="relative flex flex-col h-full w-full rounded-[14px] border border-neutral-200/90 bg-white/95 backdrop-blur-md overflow-hidden cursor-pointer"
        >
          {/* Top Header: Pipeline Mission Control */}
          <div className="h-13 shrink-0 flex items-center justify-between border-b border-neutral-100 px-4 sm:px-6 bg-neutral-50/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-2xs text-neutral-600 shrink-0">
                <GlobeIcon size={14} weight="bold" />
              </div>
              <div className="flex items-baseline gap-1.5 min-w-0 truncate">
                <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-neutral-900 tracking-tight">
                  <TextMorph>{scenario.domain}</TextMorph>
                </span>
                <span className="text-neutral-400 text-xs hidden sm:inline">·</span>
                <span className="text-[11px] font-medium text-neutral-500 truncate hidden sm:inline">
                  <TextMorph>{scenario.targetCompany}</TextMorph>
                </span>
              </div>
            </div>

            {/* Real-time Status Badge with TextMorph */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={isLoopHolding ? { scale: [0.95, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium border shadow-2xs transition-colors duration-300",
                  isLoopHolding
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                    : "bg-[#00aff9]/10 text-[#0086c0] border-[#00aff9]/25"
                )}
              >
                {isLoopHolding ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-2xs shrink-0" />
                ) : (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00aff9] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00aff9]" />
                  </span>
                )}
                <span className="font-mono tabular-nums">
                  <TextMorph>
                    {isLoopHolding ? "5/5 Verified" : `Stage ${Math.min(activeStageIdx + 1, 5)} of 5`}
                  </TextMorph>
                </span>
              </motion.div>
            </div>
          </div>

          {/* Stepper Body with Dual-Layer Progress Rail */}
          <div className="flex-1 min-h-0 flex flex-col justify-start px-4 py-4 sm:px-6 sm:py-5 overflow-hidden">
            <div ref={listContainerRef} className="relative">
              {/* 1. Track: Full-length faint gray line */}
              <div
                className="absolute w-[2px] bg-neutral-200/80 rounded-full z-0 transition-all duration-300"
                style={{
                  left: "10px", // 22px dot / 2 - 1px
                  top: `${firstDotTop}px`,
                  height: `${trackHeight}px`,
                }}
              />

              {/* 2. Brand Primary Progress Rail: Animates length to match pipeline progress */}
              <motion.div
                className="absolute w-[2px] bg-[#00aff9] rounded-full z-0"
                style={{
                  left: "10px",
                  top: `${firstDotTop}px`,
                }}
                animate={{
                  height: railHeight,
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />

              {/* Stage Items */}
              <div className="space-y-1">
                {scenario.stages.map((stage, idx) => {
                  const isComplete = idx < activeStageIdx;
                  const isActive = idx === activeStageIdx && !isLoopHolding;
                  const isPending = idx > activeStageIdx;

                  return (
                    <div
                      key={stage.id}
                      className="relative flex items-start gap-3.5 sm:gap-4"
                    >
                      {/* Dot on the rail */}
                      <div className="relative z-10 flex flex-col items-center shrink-0">
                        <div
                          ref={(el) => {
                            dotRefs.current[idx] = el;
                          }}
                          className="relative flex items-center justify-center w-5.5 h-5.5 mt-0.5"
                        >
                          {/* 1. Pending Dot: hollow, neutral gray, no fill */}
                          {isPending && (
                            <div className="w-5.5 h-5.5 rounded-full border-2 border-neutral-300 bg-white shadow-2xs" />
                          )}

                          {/* 2. Active Dot: brand primary with soft pulsing glow ring */}
                          {isActive && (
                            <div className="relative flex items-center justify-center w-5.5 h-5.5">
                              {/* Soft pulsing glow ring (~2s loop) */}
                              <motion.span
                                className="absolute -inset-1 rounded-full bg-[#00aff9]"
                                animate={{
                                  scale: [1, 1.25, 1],
                                  opacity: [0.45, 0.1, 0.45],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                              <div className="relative w-5.5 h-5.5 rounded-full bg-[#00aff9] flex items-center justify-center shadow-[0_0_10px_rgba(0,175,249,0.5)]">
                                <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                              </div>
                            </div>
                          )}

                          {/* 3. Complete Dot: solid success green with SVG inking checkmark */}
                          {isComplete && (
                            <motion.div
                              initial={{ scale: 0.85 }}
                              animate={{ scale: [0.85, 1.08, 1] }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xs"
                            >
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <motion.path
                                  d="M5 13l4 4L19 7"
                                  stroke="currentColor"
                                  strokeWidth="2.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    pathLength: {
                                      duration: 0.35,
                                      ease: [0.32, 0.72, 0, 1], // Apple deceleration curve
                                    },
                                  }}
                                />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="flex-1 min-w-0 pb-3 sm:pb-3.5">
                        {/* State 1: PENDING */}
                        {isPending && (
                          <div className="py-0.5">
                            <span className="text-[13px] sm:text-[14px] font-medium text-neutral-400 select-none">
                              {stage.label}
                            </span>
                          </div>
                        )}

                        {/* State 2: ACTIVE (Exactly ONE stage at a time) */}
                        {isActive && (
                          <div className="min-w-0">
                            {/* Active Label: Full-weight dark text */}
                            <div className="flex items-center gap-2 py-0.5">
                              <span className="text-[13px] sm:text-[14px] font-semibold text-neutral-900 tracking-tight">
                                {stage.label}
                              </span>
                            </div>

                            {/* Detail findings appear one at a time */}
                            <AnimatePresence initial={false}>
                              <motion.div
                                key="active-findings"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                                className="mt-2 space-y-1.5 overflow-hidden"
                              >
                                {stage.findings.slice(0, revealedCount).map((finding, fIdx) => (
                                  <motion.div
                                    key={fIdx}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                  >
                                    {finding.isChip ? (
                                      <motion.div
                                        initial={{ scale: 0.94 }}
                                        animate={{ scale: [0.94, 1.03, 1] }}
                                        transition={{ duration: 0.28, ease: "easeOut" }}
                                        className="pt-0.5"
                                      >
                                        <span
                                          className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border shadow-2xs tabular-nums",
                                            finding.chipType === "tertiary" &&
                                              "bg-[#fa5d19]/10 text-[#fa5d19] border-[#fa5d19]/25",
                                            finding.chipType === "success" &&
                                              "bg-emerald-50 text-emerald-700 border-emerald-200/70",
                                            finding.chipType === "blue" &&
                                              "bg-[#00aff9]/10 text-[#0086c0] border-[#00aff9]/25",
                                            finding.chipType === "neutral" &&
                                              "bg-neutral-100 text-neutral-700 border-neutral-200"
                                          )}
                                        >
                                          {finding.chipType === "tertiary" && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#fa5d19]" />
                                          )}
                                          {finding.chipType === "success" && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                          )}
                                          {finding.chipType === "blue" && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00aff9]" />
                                          )}
                                          {finding.chipBadge || finding.text}
                                        </span>
                                      </motion.div>
                                    ) : (
                                      <div className="flex items-start gap-2 font-mono text-[11.5px] sm:text-[12px] text-neutral-600 leading-relaxed tabular-nums">
                                        <span className="text-neutral-400 select-none mt-0.5 font-sans">
                                          ›
                                        </span>
                                        <span>{finding.text}</span>
                                      </div>
                                    )}
                                  </motion.div>
                                ))}

                                {/* AI Radar Light-Beam Scanner Placeholder (Ayush Taste Archetype 2) */}
                                {showShimmer && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="relative flex items-center gap-2 pt-0.5 overflow-hidden rounded-sm"
                                  >
                                    {/* Sweeping Light-Beam */}
                                    <motion.div
                                      initial={{ x: "-100%" }}
                                      animate={{ x: "280%" }}
                                      transition={{ duration: 0.85, ease: "easeInOut", repeat: Infinity }}
                                      className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-[#00aff9]/30 to-transparent blur-[2px]"
                                    />
                                    <span className="text-neutral-300 select-none font-sans text-xs">
                                      ›
                                    </span>
                                    <div className="h-3 w-48 sm:w-60 rounded bg-neutral-100" />
                                  </motion.div>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        )}

                        {/* State 3: COMPLETE (Collapses to SINGLE line with TextMorph) */}
                        {isComplete && (
                          <motion.div
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-0.5 leading-snug"
                          >
                            <span className="text-[13px] sm:text-[13.5px] font-medium text-neutral-900 shrink-0">
                              {stage.label}
                            </span>
                            <span className="text-neutral-400 select-none text-xs shrink-0">
                              →
                            </span>
                            <span className="font-mono text-[11px] sm:text-[11.5px] text-neutral-600 truncate tabular-nums">
                              <TextMorph>{stage.collapsedSummary}</TextMorph>
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Technical Telemetry Bar */}
          <div className="h-10 shrink-0 flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-4 sm:px-6 text-[10.5px] font-mono text-neutral-500">
            <div className="flex items-center gap-2 truncate">
              <ShieldCheckIcon size={13} className="text-emerald-600 shrink-0" />
              <span className="truncate">Waterfall: 14 SMTP Providers</span>
              <span className="text-neutral-300 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Port-25 Verified</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-neutral-400">
              <span className="font-mono tabular-nums text-neutral-500">{scenario.latency}</span>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1">
                <LightningIcon size={12} className="text-[#00aff9]" weight="fill" />
                <span>Autonomous</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
