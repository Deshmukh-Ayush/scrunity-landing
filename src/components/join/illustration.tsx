"use client";

import { cn } from "cn";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const TOP_TRAVEL = 0.8;
const HOLD_BOX = 1;
const BOTTOM_TRAVEL = 0.45;
const STAGGER = 0.15;
const HOLD_CLIENTS = 1;

const t1 = TOP_TRAVEL;
const t2 = t1 + HOLD_BOX;
const bottomStarts = [t2, t2 + STAGGER, t2 + 2 * STAGGER];
const bottomEnds = bottomStarts.map((s) => s + BOTTOM_TRAVEL);
const CYCLE = Math.max(...bottomEnds) + HOLD_CLIENTS;

const frac = (s: number) => s / CYCLE; // seconds -> fraction of the loop

export const Illustration = () => {
  return (
    <div className="relative flex h-170 w-130 flex-col items-center justify-between gap-2 rounded-lg p-2">
      <div className="relative z-10 flex w-full justify-between">
        <Titles>Contracts</Titles>
        <Titles>Deliverables</Titles>
        <Titles>Invoices</Titles>
      </div>

      <ConnectorLines />

      <div className="shadow-border-sm relative z-10 flex h-20 w-20 items-center justify-center rounded-lg p-1">
        <Image
          src="/logo/scrunity_svg.svg"
          alt="Scrunity Logo"
          width={100}
          height={100}
          className="h-auto w-8"
        />
      </div>

      <div className="relative z-10">
        <Titles>Clients</Titles>
      </div>
    </div>
  );
};

export const Titles = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "shadow-border flex h-10 w-34 items-center justify-center rounded-lg bg-white text-[20px] font-medium tracking-tight text-neutral-800",
        className,
      )}
    >
      {children}
    </p>
  );
};

type Pt = { x: number; y: number };

/**
 * Draws a static base line plus a moving-gradient "pulse" streak over it.
 * The streak is visible only between activeStart and activeEnd (seconds
 * within CYCLE); outside that window the gradient collapses to a single
 * point, which SVG renders as fully transparent (last stop has opacity 0).
 */
const Pulse = ({
  id,
  d,
  from,
  to,
  activeStart,
  activeEnd,
  band = 30,
}: {
  id: string;
  d: string;
  from: Pt;
  to: Pt;
  activeStart: number;
  activeEnd: number;
  band?: number;
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  const t0 = frac(activeStart);
  const t1f = frac(activeEnd);
  const times = [0, t0, t0, t1f, t1f, 1];

  return (
    <>
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <motion.linearGradient
        id={id}
        gradientUnits="userSpaceOnUse"
        animate={{
          x1: [
            from.x,
            from.x,
            from.x - ux * band,
            to.x - ux * band,
            to.x,
            to.x,
          ],
          y1: [
            from.y,
            from.y,
            from.y - uy * band,
            to.y - uy * band,
            to.y,
            to.y,
          ],
          x2: [from.x, from.x, from.x, to.x, to.x, to.x],
          y2: [from.y, from.y, from.y, to.y, to.y, to.y],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times }}
      >
        <stop stopColor="#2EB9DF" stopOpacity="0" />
        <stop offset="0.5" stopColor="#2EB9DF" />
        <stop offset="1" stopColor="#9E00FF" stopOpacity="0" />
      </motion.linearGradient>
    </>
  );
};

const ConnectorLines = () => {
  const height = 680;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 520 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base connectors (static, unchanged) */}
      <path
        d="M76 48V58C76 63 78 66 83 69L260 180"
        stroke="#171717"
        strokeOpacity="0.2"
      />
      <path d="M260 48V300" stroke="#171717" strokeOpacity="0.2" />
      <path
        d="M444 48V58C444 63 442 66 437 69L260 180"
        stroke="#171717"
        strokeOpacity="0.2"
      />
      <path d="M260 380V640" stroke="#171717" strokeOpacity="0.2" />

      {/* 1,2,3: travel from each card into the box */}
      <Pulse
        id="pulse-left"
        d="M76 48V58C76 63 78 66 83 69L260 180L260 300"
        from={{ x: 76, y: 48 }}
        to={{ x: 260, y: 300 }}
        activeStart={0}
        activeEnd={t1}
      />
      <Pulse
        id="pulse-mid"
        d="M260 48V300"
        from={{ x: 260, y: 48 }}
        to={{ x: 260, y: 300 }}
        activeStart={0}
        activeEnd={t1}
      />
      <Pulse
        id="pulse-right"
        d="M444 48V58C444 63 442 66 437 69L260 180L260 300"
        from={{ x: 444, y: 48 }}
        to={{ x: 260, y: 300 }}
        activeStart={0}
        activeEnd={t1}
      />

      {/* 5: come out of the box and go one by one; 6: hold at Clients */}
      <Pulse
        id="pulse-bottom-1"
        d="M260 380V640"
        from={{ x: 260, y: 380 }}
        to={{ x: 260, y: 640 }}
        activeStart={bottomStarts[0]}
        activeEnd={bottomEnds[0]}
      />
      <Pulse
        id="pulse-bottom-2"
        d="M260 380V640"
        from={{ x: 260, y: 380 }}
        to={{ x: 260, y: 640 }}
        activeStart={bottomStarts[1]}
        activeEnd={bottomEnds[1]}
      />
      <Pulse
        id="pulse-bottom-3"
        d="M260 380V640"
        from={{ x: 260, y: 380 }}
        to={{ x: 260, y: 640 }}
        activeStart={bottomStarts[2]}
        activeEnd={bottomEnds[2]}
      />
    </svg>
  );
};
