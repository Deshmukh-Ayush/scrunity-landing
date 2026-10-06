"use client";

/* eslint-disable react-hooks/refs -- DOM refs are intentionally read during layout measurement. */

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EverywhereayushShader } from "@/components/join/shader";

const ICON_BOX_CLASS =
  "flex items-center justify-center rounded-full border border-[oklch(0.309_0.031_157.2)] bg-[oklch(0.214_0.035_155.483)]";

const PATH_ORDER = [
  "domain",
  "research",
  "leads",
  "email",
  "meeting",
] as const;
const LEAD_IN_OUT = 100;
const DRAW_DURATION = 3000;
const MIN_FLICKER_SECONDS = 0.25;

const LEAD_FRACTION = 0.07;
const TRAIL_FRACTION = 0.07;

const FLICKER_OPACITY = [0, 0.4, 0, 0.8, 0, 0.2, 0, 0.6, 0, 1];
const FLICKER_SCALE = [0.8, 0.92, 0.82, 0.97, 0.88, 1];
const FLICKER_TIMES = [0, 0.15, 0.3, 0.5, 0.7, 1];

const TUBELIGHT_OPACITY = [0, 0.7, 0.05, 0.9, 0.1, 0.4, 0.95, 0.2, 1];
const TUBELIGHT_GLOW = [
  "drop-shadow(0 0 0px rgba(255,255,255,0))",
  "drop-shadow(0 0 6px rgba(255,255,255,0.7))",
  "drop-shadow(0 0 1px rgba(255,255,255,0.1))",
  "drop-shadow(0 0 10px rgba(255,255,255,0.9))",
  "drop-shadow(0 0 1px rgba(255,255,255,0.1))",
  "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
  "drop-shadow(0 0 12px rgba(255,255,255,0.85))",
  "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
  "drop-shadow(0 0 6px rgba(255,255,255,0.35))",
];
const TUBELIGHT_TIMES = [0, 0.1, 0.18, 0.32, 0.45, 0.58, 0.72, 0.85, 1];

type IconKey = (typeof PATH_ORDER)[number];
type Point = { x: number; y: number };
type Stage = "pending" | "flickering" | "settled";

const ALIGN_ORDER: Record<IconKey, number> = {
  domain: 1,
  research: 2,
  leads: 3,
  email: 4,
  meeting: 5,
};

const ICON_PT_INDEX: Record<IconKey, number> = {
  domain: 0,
  research: 2,
  leads: 3,
  email: 4,
  meeting: 6,
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

const INITIAL_STAGES: Record<IconKey, Stage> = {
  domain: "pending",
  leads: "pending",
  research: "pending",
  email: "pending",
  meeting: "pending",
};

export const Easy = ({ active }: { active?: boolean } = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewSelf = useInView(containerRef, { amount: 0.5, once: false });
  const inView = active ?? inViewSelf;

  const [phase, setPhase] = useState<"reveal" | "rearranging" | "done">(
    "reveal",
  );
  const [aligned, setAligned] = useState(false);
  const [stages, setStages] = useState<Record<IconKey, Stage>>(INITIAL_STAGES);

  const nodeRefs = useRef<Record<IconKey, HTMLDivElement | null>>({
    domain: null,
    leads: null,
    research: null,
    email: null,
    meeting: null,
  });
  const pathRef = useRef<SVGPathElement>(null);

  const windowsRef = useRef<Record<
    IconKey,
    { start: number; end: number; seconds: number }
  > | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const wasInViewRef = useRef(false);

  const setRef = (key: IconKey) => (el: HTMLDivElement | null) => {
    nodeRefs.current[key] = el;
  };

  const measure = () => {
    const container = containerRef.current;
    const nodes = nodeRefs.current;
    if (!container || Object.values(nodes).some((n) => !n)) return null;

    const containerRect = container.getBoundingClientRect();
    const centerOf = (el: HTMLDivElement): Point => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
      };
    };

    const centers = PATH_ORDER.reduce(
      (acc, key) => {
        acc[key] = centerOf(nodes[key] as HTMLDivElement);
        return acc;
      },
      {} as Record<IconKey, Point>,
    );

    const start = centers.domain;
    const end = centers.meeting;
    const leadIn: Point = { x: start.x + LEAD_IN_OUT, y: start.y };
    const leadOut: Point = { x: end.x - LEAD_IN_OUT, y: end.y };

    const pts: Point[] = [
      start,
      leadIn,
      centers.research,
      centers.leads,
      centers.email,
      leadOut,
      end,
    ];
    return { pts };
  };

  useLayoutEffect(() => {
    const result = measure();
    if (!result) return;
    const { pts } = result;
    const dist = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);
    const cum = [0];
    for (let i = 1; i < pts.length; i++)
      cum.push(cum[i - 1] + dist(pts[i - 1], pts[i]));
    const total = cum[cum.length - 1] || 1;

    const arrivals = PATH_ORDER.map((key) => cum[ICON_PT_INDEX[key]] / total);

    const windows = {} as Record<
      IconKey,
      { start: number; end: number; seconds: number }
    >;
    PATH_ORDER.forEach((key, i) => {
      const arrival = arrivals[i];
      const midPrev = i === 0 ? 0 : (arrivals[i - 1] + arrival) / 2;
      const midNext =
        i === PATH_ORDER.length - 1 ? 1 : (arrival + arrivals[i + 1]) / 2;

      const winStart = Math.max(midPrev, arrival - LEAD_FRACTION);
      const winEnd = Math.min(midNext, arrival + TRAIL_FRACTION);
      const seconds = Math.max(
        (winEnd - winStart) * (DRAW_DURATION / 1000),
        MIN_FLICKER_SECONDS,
      );

      windows[key] = { start: winStart, end: winEnd, seconds };
    });

    windowsRef.current = windows;
  }, []);

  useEffect(() => {
    if (inView && !wasInViewRef.current) {
      setPhase("reveal");
      setAligned(false);
      setStages(INITIAL_STAGES);
      startTimeRef.current = null;

      const path = pathRef.current;
      if (path) {
        path.removeAttribute("stroke-dasharray");
        path.removeAttribute("stroke-dashoffset");
      }
    }
    wasInViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    if (phase !== "rearranging" || !inView) return;

    const alignTimer = setTimeout(() => {
      setAligned(true);
    }, 600);

    const settleTimer = setTimeout(() => {
      setPhase("done");
    }, 1800);

    return () => {
      clearTimeout(alignTimer);
      clearTimeout(settleTimer);
    };
  }, [phase, inView]);

  useAnimationFrame((time) => {
    if (!inView || phaseRef.current === "done") return;

    const path = pathRef.current;
    const result = measure();
    if (!path || !result) return;

    const { pts } = result;
    const d = pts
      .map(
        (p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)},${p.y.toFixed(2)}`,
      )
      .join(" ");
    path.setAttribute("d", d);

    if (phaseRef.current === "reveal") {
      if (startTimeRef.current === null) startTimeRef.current = time;
      const progress = Math.min(
        1,
        (time - startTimeRef.current) / DRAW_DURATION,
      );

      const length = path.getTotalLength();
      path.setAttribute("stroke-dasharray", `${length}`);
      path.setAttribute("stroke-dashoffset", `${length * (1 - progress)}`);

      const windows = windowsRef.current;
      if (windows) {
        setStages((prev) => {
          let changed = false;
          const next = { ...prev };
          for (const key of PATH_ORDER) {
            const w = windows[key];
            if (prev[key] === "pending" && progress >= w.start) {
              next[key] = "flickering";
              changed = true;
            } else if (prev[key] === "flickering" && progress >= w.end) {
              next[key] = "settled";
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      }

      if (progress >= 1) {
        path.removeAttribute("stroke-dasharray");
        path.removeAttribute("stroke-dashoffset");
        setPhase("rearranging");
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative flex h-121.5 w-full flex-wrap items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-200 bg-[oklch(0.15_0_0)] p-4 md:flex-nowrap md:justify-between md:gap-10 md:p-10 md:px-10"
    >
      {/* Creative Shader Ambient Field */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]">
        <EverywhereayushShader theme="dark" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={
          phase === "done"
            ? {
                opacity: TUBELIGHT_OPACITY,
                filter: TUBELIGHT_GLOW,
              }
            : { opacity: 0, filter: "drop-shadow(0 0 0px transparent)" }
        }
        transition={{
          duration: 0.7,
          times: TUBELIGHT_TIMES,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-5 right-5 z-20 font-mono text-[10px] font-medium tracking-widest text-neutral-200 uppercase select-none md:top-8 md:right-8 md:text-xs"
      >
        With Scrunity AI
      </motion.p>

      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <path
          ref={pathRef}
          fill="none"
          stroke="oklch(0.285 0 89.9)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>

      <DomainNode
        innerRef={setRef("domain")}
        aligned={aligned}
        stage={stages.domain}
        seconds={windowsRef.current?.domain.seconds ?? MIN_FLICKER_SECONDS}
      />
      <LeadsNode
        innerRef={setRef("leads")}
        aligned={aligned}
        stage={stages.leads}
        seconds={windowsRef.current?.leads.seconds ?? MIN_FLICKER_SECONDS}
      />
      <ResearchNode
        innerRef={setRef("research")}
        aligned={aligned}
        stage={stages.research}
        seconds={windowsRef.current?.research.seconds ?? MIN_FLICKER_SECONDS}
      />
      <EmailNode
        innerRef={setRef("email")}
        aligned={aligned}
        stage={stages.email}
        seconds={windowsRef.current?.email.seconds ?? MIN_FLICKER_SECONDS}
      />
      <MeetingNode
        innerRef={setRef("meeting")}
        aligned={aligned}
        stage={stages.meeting}
        seconds={windowsRef.current?.meeting.seconds ?? MIN_FLICKER_SECONDS}
      />
    </div>
  );
};

const IconBox = ({
  children,
  className,
  wrapperClassName,
  text,
  innerRef,
  layoutId,
  aligned,
  order,
  stage,
  seconds,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  text?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
  layoutId: IconKey;
  aligned: boolean;
  order: number;
  stage: Stage;
  seconds: number;
}) => {
  const revealTransition =
    stage === "flickering"
      ? { duration: seconds, times: FLICKER_TIMES, ease: "easeOut" as const }
      : { duration: stage === "settled" ? 0.15 : 0 };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity:
          stage === "pending"
            ? 0
            : stage === "flickering"
              ? FLICKER_OPACITY
              : 1,
        scale:
          stage === "pending"
            ? 0.8
            : stage === "flickering"
              ? FLICKER_SCALE
              : 1,
      }}
      transition={{
        layout: SPRING,
        opacity: revealTransition,
        scale: revealTransition,
      }}
      style={{ order }}
      className={cn(
        "relative z-10 flex flex-col items-center justify-center gap-1 md:gap-2",
        aligned ? "" : wrapperClassName,
      )}
    >
      <motion.div
        layout
        transition={SPRING}
        ref={innerRef}
        className={cn(
          "flex items-center justify-center rounded-full border border-neutral-800 bg-transparent",
          aligned ? "p-1" : "p-1.5",
        )}
      >
        <div className={cn(ICON_BOX_CLASS, aligned ? "p-2" : "p-3", className)}>
          {children}
        </div>
      </motion.div>
      <p className="text-center text-sm tracking-tight text-neutral-200 md:text-lg">
        {text}
      </p>
    </motion.div>
  );
};

const DomainNode = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: Stage;
  seconds: number;
}) => (
  <IconBox
    text="Your Domain"
    innerRef={innerRef}
    layoutId="domain"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.domain}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "rounded-full bg-[oklch(0.791_0.209_151.662)] text-[oklch(0.214_0.035_155.483)] p-2",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  </IconBox>
);

const MeetingNode = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: Stage;
  seconds: number;
}) => (
  <IconBox
    text="Booked Meeting"
    innerRef={innerRef}
    layoutId="meeting"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.meeting}
    className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "rounded-full bg-[oklch(0.704_0.159_253.4)] text-[oklch(0.283_0.091_267.5)] p-2",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  </IconBox>
);

const LeadsNode = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: Stage;
  seconds: number;
}) => (
  <IconBox
    text="Decision Makers"
    innerRef={innerRef}
    layoutId="leads"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.leads}
    wrapperClassName="absolute top-18 left-6 md:top-10 md:left-70"
    className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "bg-[oklch(0.283_0.091_267.5)] text-[oklch(0.704_0.159_253.4)] p-1",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  </IconBox>
);

const ResearchNode = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: Stage;
  seconds: number;
}) => (
  <IconBox
    text="Research & ICP"
    innerRef={innerRef}
    layoutId="research"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.research}
    wrapperClassName="absolute bottom-18 left-6 md:right-110 md:bottom-10 md:left-auto"
    className="border-[oklch(0.306_0.026_54.2)] bg-[oklch(0.21_0.032_52.2)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "text-[oklch(0.746_0.18_56.7)] p-1",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
    </svg>
  </IconBox>
);

const EmailNode = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: Stage;
  seconds: number;
}) => (
  <IconBox
    text="1-to-1 Outreach"
    innerRef={innerRef}
    layoutId="email"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.email}
    wrapperClassName="absolute top-18 right-6 md:top-10 md:right-100"
    className="border-[oklch(0.232_0.095_28.753)] bg-[oklch(0.232_0.095_28.709)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "text-[oklch(0.632_0.254_28.753)] p-1",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="3 7 12 13 21 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </IconBox>
);
