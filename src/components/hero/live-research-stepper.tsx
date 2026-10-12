"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TextMorph } from "torph/react";
import {
  ArrowClockwiseIcon,
  BuildingsIcon,
  CalendarCheckIcon,
  GlobeIcon,
  PencilSimpleLineIcon,
  UserIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { GlowEffect } from "../join/glow-effect";
import { cn } from "@/lib/utils";
import { SCENARIOS } from "./research-scenarios";
import type {
  FindingItem,
  ScenarioData,
  StageData,
} from "./research-scenarios";

// Re-exported so existing imports from this file keep working.
export { SCENARIOS } from "./research-scenarios";
export type {
  FindingItem,
  ScenarioData,
  StageData,
} from "./research-scenarios";

// ── CONSTANTS ───────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const HOLD_MS = 3600;
const FALLBACK_DURATIONS_MS: readonly number[] = [2000, 2500, 1500, 2000, 1800];
const FALLBACK_TOTAL_MS: number = FALLBACK_DURATIONS_MS.reduce(
  (sum, ms) => sum + ms,
  0,
);

type StepState = "pending" | "active" | "complete";
type ChipType = NonNullable<FindingItem["chipType"]>;

type StageMeta = {
  short: string;
  command: string;
  Icon: Icon;
};

// Indexed by stage position; every scenario shares the same five stage kinds.
const STAGE_META: readonly StageMeta[] = [
  { short: "Research", command: "research --domain", Icon: GlobeIcon },
  { short: "Accounts", command: "find --icp", Icon: BuildingsIcon },
  { short: "Contacts", command: "waterfall --email", Icon: UserIcon },
  { short: "Copy", command: "draft --1to1", Icon: PencilSimpleLineIcon },
  { short: "Booking", command: "send --humanized", Icon: CalendarCheckIcon },
];

const FALLBACK_META: StageMeta = {
  short: "Stage",
  command: "run",
  Icon: GlobeIcon,
};

const CHIP_TEXT: Record<ChipType, string> = {
  tertiary: "text-[#fa5d19]",
  success: "text-emerald-700",
  blue: "text-[#0086c0]",
  neutral: "text-neutral-600",
};

const sleep = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const formatSeconds = (ms: number): string => `${(ms / 1000).toFixed(1)}s`;

// ── SMALL PIECES ────────────────────────────────────────────────────
type CheckMarkProps = { className?: string };

function CheckMark({ className }: CheckMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
      />
    </svg>
  );
}

type LiveTimeProps = {
  startedAt: number | null;
  endedMs: number | null;
  className?: string;
};

function LiveTime({ startedAt, endedMs, className }: LiveTimeProps) {
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    if (startedAt === null || endedMs !== null) return undefined;
    const id = window.setInterval(() => {
      setElapsed(performance.now() - startedAt);
    }, 100);
    return () => {
      window.clearInterval(id);
    };
  }, [startedAt, endedMs]);

  let text = "—";
  if (endedMs !== null) text = formatSeconds(endedMs);
  else if (startedAt !== null) text = formatSeconds(elapsed);

  return (
    <span className={cn("font-mono tabular-nums", className)}>{text}</span>
  );
}

type StatusDotProps = { state: StepState };

function StatusDot({ state }: StatusDotProps) {
  if (state === "complete") {
    return (
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.08, 1] }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid size-[18px] shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
      >
        <CheckMark className="size-[11px]" />
      </motion.span>
    );
  }

  return (
    <span
      className={cn(
        "relative size-[18px] shrink-0 rounded-full border-2 bg-white transition-colors duration-200",
        state === "active" ? "border-[#00aff9]/20" : "border-neutral-300",
      )}
    >
      {state === "active" && (
        <motion.span
          className="absolute -inset-0.5 rounded-full border-2 border-transparent border-t-[#00aff9]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
        />
      )}
    </span>
  );
}

type TimedProps = {
  state: StepState;
  startedAt: number | null;
  endedMs: number | null;
};

type PipelineNodeProps = TimedProps & { meta: StageMeta };

function PipelineNode({ meta, state, startedAt, endedMs }: PipelineNodeProps) {
  const { Icon: StageIcon } = meta;
  return (
    <div
      className={cn(
        "flex w-12 shrink-0 flex-col items-center gap-1 text-[10.5px] font-medium transition-colors duration-300 sm:w-[72px] sm:text-[11.5px]",
        state === "pending" ? "text-neutral-400" : "text-neutral-900",
      )}
    >
      <div
        className={cn(
          "relative grid size-10 place-items-center rounded-xl border bg-white transition-[border-color,color,box-shadow] duration-300",
          state === "pending" && "border-neutral-200 text-neutral-400",
          state === "active" &&
            "border-[#00aff9]/50 text-[#00aff9] shadow-[0_0_0_4px_rgba(0,175,249,0.1)]",
          state === "complete" && "border-neutral-200 text-emerald-500",
        )}
      >
        <StageIcon size={18} weight="bold" />
        <motion.span
          initial={false}
          animate={{ scale: state === "complete" ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute -right-1.5 -bottom-1.5 grid size-4 place-items-center rounded-full border-2 border-white bg-emerald-500 text-white"
        >
          {state === "complete" && <CheckMark className="size-2.5" />}
        </motion.span>
      </div>
      <span>{meta.short}</span>
      <LiveTime
        startedAt={startedAt}
        endedMs={endedMs}
        className={cn(
          "text-[10px] sm:text-[10.5px]",
          state === "pending" && "text-neutral-400",
          state === "active" && "text-[#0086c0]",
          state === "complete" && "text-emerald-600",
        )}
      />
    </div>
  );
}

type ConnectorProps = { filled: boolean };

function Connector({ filled }: ConnectorProps) {
  return (
    <div className="mt-[19px] h-0.5 min-w-1 flex-1 overflow-hidden rounded-full bg-neutral-200">
      <motion.div
        className="h-full origin-left bg-emerald-500"
        initial={false}
        animate={{ scaleX: filled ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  );
}

type StageRowProps = TimedProps & { label: string };

function StageRow({ label, state, startedAt, endedMs }: StageRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-300",
        state === "active" && "bg-[#00aff9]/[0.07]",
      )}
    >
      <StatusDot state={state} />
      <span
        className={cn(
          "truncate text-[13px] transition-colors duration-300",
          state === "pending" && "text-neutral-400",
          state === "active" && "font-medium text-neutral-900",
          state === "complete" && "text-neutral-600",
        )}
      >
        {label}
      </span>
      <LiveTime
        startedAt={startedAt}
        endedMs={endedMs}
        className="ml-auto shrink-0 text-[10.5px] text-neutral-400"
      />
    </div>
  );
}

type LogLineProps = { finding: FindingItem };

function LogLine({ finding }: LogLineProps) {
  const isChip = finding.isChip === true;
  const tone = isChip && finding.chipType ? CHIP_TEXT[finding.chipType] : "";
  const body = isChip ? (finding.chipBadge ?? finding.text) : finding.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className={cn("flex items-start gap-2", tone)}
    >
      <span className={cn("select-none", isChip ? "" : "text-neutral-400")}>
        {isChip ? "✓" : "→"}
      </span>
      <span className="min-w-0">{body}</span>
    </motion.div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────────────────
type Phase = "running" | "done";

export const LiveResearchStepper = () => {
  const reduced = useReducedMotion() === true;

  const scenarioRef = useRef<number>(0);
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [restartKey, setRestartKey] = useState<number>(0);
  const [runId, setRunId] = useState<number>(0);

  const [phase, setPhase] = useState<Phase>("running");
  const [activeIdxState, setActiveIdxState] = useState<number>(0);
  const [revealed, setRevealed] = useState<number>(0);
  const [showShimmer, setShowShimmer] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [durations, setDurations] = useState<number[]>([]);
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [stageStartedAt, setStageStartedAt] = useState<number | null>(null);
  const [totalMs, setTotalMs] = useState<number | null>(null);

  // Autonomous engine: runs each scenario, holds, then loops to the next.
  useEffect(() => {
    if (reduced) return undefined;
    let cancelled = false;

    const runEngine = async (): Promise<void> => {
      while (!cancelled) {
        const scenario = SCENARIOS[scenarioRef.current];
        if (!scenario) return;

        setRunId((id) => id + 1);
        setIsResetting(false);
        setPhase("running");
        setActiveIdxState(0);
        setRevealed(0);
        setShowShimmer(false);
        setDurations([]);
        setRunStartedAt(null);
        setStageStartedAt(null);
        setTotalMs(null);

        await sleep(350);
        if (cancelled) return;

        const runStart = performance.now();
        setRunStartedAt(runStart);

        for (let s = 0; s < scenario.stages.length; s++) {
          const stage = scenario.stages[s];
          if (!stage) continue;

          const stageStart = performance.now();
          setActiveIdxState(s);
          setRevealed(0);
          setStageStartedAt(stageStart);

          for (let f = 0; f < stage.findings.length; f++) {
            setShowShimmer(true);
            await sleep(320 + Math.random() * 120);
            if (cancelled) return;

            setShowShimmer(false);
            setRevealed(f + 1);

            const isLast = f === stage.findings.length - 1;
            await sleep(
              isLast ? 650 + Math.random() * 150 : 430 + Math.random() * 120,
            );
            if (cancelled) return;
          }

          const took = performance.now() - stageStart;
          setDurations((prev) => [...prev, took]);
          await sleep(260);
          if (cancelled) return;
        }

        setActiveIdxState(scenario.stages.length);
        setTotalMs(performance.now() - runStart);
        setPhase("done");

        await sleep(HOLD_MS);
        if (cancelled) return;

        setIsResetting(true);
        await sleep(350);
        if (cancelled) return;

        scenarioRef.current = (scenarioRef.current + 1) % SCENARIOS.length;
        setScenarioIdx(scenarioRef.current);
      }
    };

    void runEngine();

    return () => {
      cancelled = true;
    };
  }, [reduced, restartKey]);

  const handleRerun = useCallback((): void => {
    setRestartKey((key) => key + 1);
  }, []);

  const scenario: ScenarioData | undefined = SCENARIOS[scenarioIdx];
  if (!scenario) return null;

  const total = scenario.stages.length;
  const isDone = reduced || phase === "done";
  const activeIdx = reduced ? total : activeIdxState;
  const logIdx = Math.min(activeIdx, total - 1);
  const logStage: StageData | undefined = scenario.stages[logIdx];
  const logMeta: StageMeta = STAGE_META[logIdx] ?? FALLBACK_META;
  const shownCount = reduced ? (logStage?.findings.length ?? 0) : revealed;
  const findingsInStage = logStage?.findings.length ?? 1;

  const progress = isDone
    ? 1
    : (activeIdx + revealed / findingsInStage) / total;

  const stateOf = (idx: number): StepState => {
    if (idx < activeIdx) return "complete";
    if (idx === activeIdx) return "active";
    return "pending";
  };

  const endedFor = (idx: number): number | null =>
    reduced ? (FALLBACK_DURATIONS_MS[idx] ?? null) : (durations[idx] ?? null);

  const startedFor = (idx: number): number | null =>
    !reduced && idx === activeIdx ? stageStartedAt : null;

  const timeKey = `${scenarioIdx}-${runId}`;

  return (
    <div className="relative flex h-[540px] w-full max-w-[624px] shrink-0 flex-col items-center justify-center select-none sm:h-[552px]">
      {/* Layer 1: ambient glow */}
      <div className="pointer-events-none absolute -inset-2.5 z-0">
        <GlowEffect
          colors={
            isDone
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

      {/* Layer 2: concentric frame (outer 16px, padding 2px, inner 14px) */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition-all duration-350 ease-out",
          isResetting ? "opacity-60 blur-[1px]" : "blur-0 opacity-100",
        )}
      >
        {/* Layer 3: blueprint grid */}
        <div className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[24px_24px]" />

        {/* Layer 4: card surface */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-neutral-200/90 bg-white/95 backdrop-blur-md">
          {/* Header */}
          <div className="flex h-13 shrink-0 items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 shadow-2xs">
                <GlobeIcon size={14} weight="bold" />
              </div>
              <div className="flex min-w-0 items-baseline gap-1.5 truncate">
                <span className="font-mono text-[12px] font-semibold tracking-tight text-neutral-900 sm:text-[13px]">
                  <TextMorph>{scenario.domain}</TextMorph>
                </span>
                <span className="hidden text-xs text-neutral-400 sm:inline">
                  ·
                </span>
                <span className="hidden truncate text-[11px] font-medium text-neutral-500 sm:inline">
                  <TextMorph>{scenario.targetCompany}</TextMorph>
                </span>
              </div>
            </div>

            <motion.div
              animate={isDone ? { scale: [0.95, 1.04, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium shadow-2xs transition-colors duration-300",
                isDone
                  ? "border-emerald-200/70 bg-emerald-50 text-emerald-700"
                  : "border-[#00aff9]/25 bg-[#00aff9]/10 text-[#0086c0]",
              )}
            >
              {isDone ? (
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              ) : (
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00aff9] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#00aff9]" />
                </span>
              )}
              <span className="font-mono tabular-nums">
                <TextMorph>
                  {isDone
                    ? `${total}/${total} Verified`
                    : `Stage ${Math.min(activeIdx + 1, total)} of ${total}`}
                </TextMorph>
              </span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="relative h-0.5 w-full shrink-0 overflow-hidden bg-neutral-100">
            <motion.div
              className={cn(
                "absolute inset-0 origin-left transition-colors duration-300",
                isDone ? "bg-emerald-500" : "bg-[#00aff9]",
              )}
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6">
            {/* Stage nodes */}
            <div className="flex items-start">
              {scenario.stages.map((stage, idx) => (
                <Fragment key={stage.id}>
                  {idx > 0 && <Connector filled={idx - 1 < activeIdx} />}
                  <PipelineNode
                    meta={STAGE_META[idx] ?? FALLBACK_META}
                    state={stateOf(idx)}
                    startedAt={startedFor(idx)}
                    endedMs={endedFor(idx)}
                    key={`${stage.id}-${timeKey}`}
                  />
                </Fragment>
              ))}
            </div>

            {/* Stage checklist */}
            <div className="mt-5 flex flex-col gap-0.5">
              {scenario.stages.map((stage, idx) => (
                <StageRow
                  key={`${stage.id}-${timeKey}`}
                  label={stage.label}
                  state={stateOf(idx)}
                  startedAt={startedFor(idx)}
                  endedMs={endedFor(idx)}
                />
              ))}
            </div>

            {/* Terminal log */}
            <div className="mt-4 min-h-[104px] font-mono text-[11.5px] leading-[1.7] text-neutral-600">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${timeKey}-${logIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="text-neutral-400">
                    $ scrunity {logMeta.command}
                  </div>
                  {logStage?.findings
                    .slice(0, shownCount)
                    .map((finding, fIdx) => (
                      <LogLine key={fIdx} finding={finding} />
                    ))}
                  {showShimmer && !reduced && (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative flex items-center gap-2 overflow-hidden rounded-sm py-1"
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "280%" }}
                        transition={{
                          duration: 0.85,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                        className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-[#00aff9]/30 to-transparent blur-[2px]"
                      />
                      <span className="text-neutral-300 select-none">→</span>
                      <div className="h-3 w-48 rounded bg-neutral-100 sm:w-60" />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="flex h-12 shrink-0 items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-4 sm:px-6">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-500">
              <LiveTime
                key={timeKey}
                startedAt={reduced ? null : runStartedAt}
                endedMs={
                  isDone ? (reduced ? FALLBACK_TOTAL_MS : totalMs) : null
                }
                className={isDone ? "text-emerald-600" : undefined}
              />
              {isDone && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span className="tabular-nums">{scenario.latency}</span>
                </>
              )}
            </div>

            {!reduced && (
              <motion.button
                type="button"
                onClick={handleRerun}
                disabled={!isDone}
                whileTap={isDone ? { scale: 0.97 } : undefined}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-semibold transition-[background-color,color,opacity] duration-200",
                  isDone
                    ? "cursor-pointer bg-neutral-900 text-white hover:bg-neutral-800"
                    : "cursor-default bg-neutral-100 text-neutral-400",
                )}
              >
                {isDone && <ArrowClockwiseIcon size={12} weight="bold" />}
                <TextMorph>{isDone ? "Re-run" : "Running…"}</TextMorph>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
