"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const ICON_BOX_CLASS =
  "flex items-center justify-center rounded-full border border-[oklch(0.309_0.031_157.2)] bg-[oklch(0.214_0.035_155.483)]";

const PATH_ORDER = [
  "user",
  "proposal",
  "contract",
  "deliverables",
  "client",
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
  user: 1,
  proposal: 2,
  contract: 3,
  deliverables: 4,
  client: 5,
};

const ICON_PT_INDEX: Record<IconKey, number> = {
  user: 0,
  proposal: 2,
  contract: 3,
  deliverables: 4,
  client: 6,
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

const INITIAL_STAGES: Record<IconKey, Stage> = {
  user: "pending",
  contract: "pending",
  proposal: "pending",
  deliverables: "pending",
  client: "pending",
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
    user: null,
    contract: null,
    proposal: null,
    deliverables: null,
    client: null,
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

    const start = centers.user;
    const end = centers.client;
    const leadIn: Point = { x: start.x + LEAD_IN_OUT, y: start.y };
    const leadOut: Point = { x: end.x - LEAD_IN_OUT, y: end.y };

    const pts: Point[] = [
      start,
      leadIn,
      centers.proposal,
      centers.contract,
      centers.deliverables,
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
      className="relative flex h-[486px] w-full items-center justify-between gap-10 rounded-lg border border-gray-200 bg-[oklch(0.15_0_0)] p-10 px-10"
    >
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
        className="pointer-events-none absolute top-8 right-8 z-20 font-mono text-xs font-medium tracking-widest text-neutral-200 uppercase select-none"
      >
        With Scrunity
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

      <User
        innerRef={setRef("user")}
        aligned={aligned}
        stage={stages.user}
        seconds={windowsRef.current?.user.seconds ?? MIN_FLICKER_SECONDS}
      />
      <Contract
        innerRef={setRef("contract")}
        aligned={aligned}
        stage={stages.contract}
        seconds={windowsRef.current?.contract.seconds ?? MIN_FLICKER_SECONDS}
      />
      <Proposal
        innerRef={setRef("proposal")}
        aligned={aligned}
        stage={stages.proposal}
        seconds={windowsRef.current?.proposal.seconds ?? MIN_FLICKER_SECONDS}
      />
      <Deliverables
        innerRef={setRef("deliverables")}
        aligned={aligned}
        stage={stages.deliverables}
        seconds={
          windowsRef.current?.deliverables.seconds ?? MIN_FLICKER_SECONDS
        }
      />
      <Client
        innerRef={setRef("client")}
        aligned={aligned}
        stage={stages.client}
        seconds={windowsRef.current?.client.seconds ?? MIN_FLICKER_SECONDS}
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
        "relative z-10 flex flex-col items-center justify-center gap-2",
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
      <p className="text-center text-lg tracking-tight text-neutral-200">
        {text}
      </p>
    </motion.div>
  );
};

const User = ({
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
    text="You"
    innerRef={innerRef}
    layoutId="user"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.user}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "rounded-full bg-[oklch(0.791_0.209_151.662)] text-[oklch(0.214_0.035_155.483)]",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  </IconBox>
);

const Client = ({
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
    text="Client"
    innerRef={innerRef}
    layoutId="client"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.client}
    className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "rounded-full bg-[oklch(0.704_0.159_253.4)] text-[oklch(0.283_0.091_267.5)]",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  </IconBox>
);

const Contract = ({
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
    text="Contract"
    innerRef={innerRef}
    layoutId="contract"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.contract}
    wrapperClassName="absolute left-70 top-10"
    className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "bg-[oklch(0.283_0.091_267.5)] text-[oklch(0.704_0.159_253.4)]",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
      <path d="M19 7h-4l-.001 -4.001z" />
    </svg>
  </IconBox>
);

const Proposal = ({
  innerRef,
  aligned,
  stage,
  seconds,
}: {
  innerRef?: (el: HTMLDivElement | null) => void;
  aligned: boolean;
  stage: stage;
  seconds: number;
}) => (
  <IconBox
    text="Proposal"
    innerRef={innerRef}
    layoutId="proposal"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.proposal}
    wrapperClassName="absolute right-110 bottom-10"
    className="border-[oklch(0.306_0.026_54.2)] bg-[oklch(0.21_0.032_52.2)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "text-[oklch(0.746_0.18_56.7)]",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
      <path d="M19 7h-4l-.001 -4.001z" />
    </svg>
  </IconBox>
);

const Deliverables = ({
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
    text="Deliverables"
    innerRef={innerRef}
    layoutId="deliverables"
    aligned={aligned}
    stage={stage}
    seconds={seconds}
    order={ALIGN_ORDER.deliverables}
    wrapperClassName="absolute right-100 top-10"
    className="border-[oklch(0.232_0.095_28.753)] bg-[oklch(0.232_0.095_28.709)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "text-[oklch(0.632_0.254_28.753)]",
        aligned ? "h-12 w-12" : "h-16 w-16",
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21.864 3.549l-6.454 17.868a1.55 1.55 0 0 1 -1.41 .903a1.54 1.54 0 0 1 -1.394 -.874l-2.88 -5.759zm-1.414 -1.414l-12.139 12.138l-5.728 -2.864a1.55 1.55 0 0 1 -.903 -1.409c0 -.606 .353 -1.157 .981 -1.44z" />
    </svg>
  </IconBox>
);
