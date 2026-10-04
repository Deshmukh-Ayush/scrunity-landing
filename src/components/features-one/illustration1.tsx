"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { GlobeIcon, CursorIcon } from "@phosphor-icons/react";

const Skeleton = ({ className }: { className: string }) => {
  return <div className={`animate-pulse bg-gray-200 ${className}`}></div>;
};

const MotionSkeleton = motion.create(Skeleton);

type Stage = "flying" | "landed" | "settled" | "dashboard";

const FLY_MS = 1000;
const CLICK_MS = 400;
const SETTLE_MS = 80;
const MORPH_S = 0.6;
const HOLD_MS = 3000;

const reveal = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: MORPH_S, duration: 0.3, ease: "easeOut" as const },
};

export default function Illustration1() {
  const [stage, setStage] = useState<Stage>("flying");
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) =>
      timeouts.current.push(setTimeout(fn, delay));

    function runCycle() {
      timeouts.current = [];
      setStage("flying");
      schedule(() => setStage("landed"), FLY_MS);
      schedule(() => setStage("settled"), FLY_MS + CLICK_MS);
      schedule(() => setStage("dashboard"), FLY_MS + CLICK_MS + SETTLE_MS);
      schedule(runCycle, FLY_MS + CLICK_MS + SETTLE_MS + HOLD_MS);
    }

    runCycle();
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  const isDashboard = stage === "dashboard";
  const lid = (id: string) => (stage !== "flying" ? id : undefined);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-gray-200 bg-gray-50 p-[2px]">
      <div className="h-[200px] w-full rounded-lg border border-gray-200 p-[2px] md:w-[373px]">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4">
          {!isDashboard && (
            <>
              {/* URL Ingestion dropzone — morphs into dashboard outer frame */}
              <motion.div
                layoutId={lid("scr-outer")}
                transition={{ duration: MORPH_S, ease: "easeInOut" }}
                className="flex h-24 w-44 items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white"
              >
                <div className="flex flex-col items-center justify-center">
                  <GlobeIcon className="text-2xl text-blue-500" />
                  <p className="mt-1 font-mono text-[10px] font-medium text-neutral-600">
                    https://cal.com
                  </p>
                  <p className="text-[9px] text-neutral-400">
                    Crawl & analyze domain
                  </p>
                </div>
              </motion.div>

              <motion.div
                layoutId={lid("scr-card")}
                initial={{ x: 140, y: 70 }}
                animate={
                  stage === "landed"
                    ? { x: 0, y: 0, scale: [1, 0.86, 1.04, 1] }
                    : { x: 0, y: 0, scale: 1 }
                }
                transition={
                  stage === "landed"
                    ? { duration: CLICK_MS / 1000, ease: "easeInOut" }
                    : stage === "settled"
                      ? { duration: 0 }
                      : { duration: FLY_MS / 1000, ease: "easeInOut" }
                }
                className="absolute flex h-30 w-22 items-center justify-center rounded-[8px] border border-neutral-200 p-[2px]"
              >
                <motion.div
                  layoutId={lid("scr-inner")}
                  transition={{ duration: MORPH_S, ease: "easeInOut" }}
                  className="relative h-28 w-20 rounded-[6px] border border-dashed border-neutral-200 bg-white px-2 py-2"
                >
                  <CursorIcon className="absolute z-9 translate-4 text-xs text-neutral-800" />
                  <MotionSkeleton
                    layoutId={lid("skel-a")}
                    className="h-1 w-4 rounded-md"
                  />
                  <MotionSkeleton
                    layoutId={lid("skel-b")}
                    className="mt-0.5 h-1 w-full rounded-md"
                  />
                  <MotionSkeleton
                    layoutId={lid("skel-c")}
                    className="mt-1 h-8 w-full rounded-xs"
                  />
                  <MotionSkeleton
                    layoutId={lid("skel-d")}
                    className="mt-1 h-1 w-4 rounded-md"
                  />
                  <MotionSkeleton
                    layoutId={lid("skel-e")}
                    className="mt-1 h-8 w-full rounded-xs"
                  />
                </motion.div>
              </motion.div>
            </>
          )}

          {isDashboard && (
            <motion.div
              layoutId="scr-outer"
              initial={{ opacity: 0, filter: "blur(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: MORPH_S, ease: "easeInOut" }}
              className="mt-10 flex h-full w-72 rounded-lg border border-gray-200"
            >
              <motion.div
                layoutId="scr-card"
                transition={{ duration: MORPH_S, ease: "easeInOut" }}
                className="flex h-full w-16 flex-col rounded-tl-lg border-r border-gray-100 bg-white px-1 py-2"
              >
                <motion.div {...reveal} className="flex items-center gap-1">
                  <Image
                    src="/new-logo/scrunity-icon.svg"
                    alt="Scrunity Logo"
                    width={40}
                    height={40}
                    className="h-2.5 w-2.5"
                  />
                  <p className="text-[7px] font-medium text-gray-700">
                    Outbound
                  </p>
                </motion.div>

                <motion.div {...reveal} className="mt-4 flex flex-col gap-1">
                  <Skeleton className="h-1 w-10 rounded-sm" />
                  <Skeleton className="h-1 w-8 rounded-sm" />
                  <Skeleton className="h-1 w-9 rounded-sm" />
                  <Skeleton className="h-1 w-7 rounded-sm" />
                </motion.div>

                <motion.div {...reveal} className="mt-auto flex flex-col gap-1">
                  <Skeleton className="h-1 w-8 rounded-sm" />
                  <Skeleton className="h-1 w-6 rounded-sm" />
                </motion.div>
              </motion.div>

              <motion.div
                layoutId="scr-inner"
                transition={{ duration: MORPH_S, ease: "easeInOut" }}
                className="h-full w-56 rounded-tr-lg bg-white px-3 py-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] font-semibold text-neutral-900">
                      cal.com · 48 Accounts
                    </span>
                    <MotionSkeleton
                      layoutId="skel-b"
                      className="mt-1 h-1 w-20 rounded-sm"
                    />
                  </div>
                  <span className="rounded bg-blue-50 px-1 py-0.5 font-mono text-[7px] font-semibold text-blue-600">
                    ICP Mapped
                  </span>
                </div>

                <motion.div {...reveal} className="mt-3 grid grid-cols-3 gap-1">
                  <div className="rounded border border-gray-100 p-1">
                    <span className="text-[6px] text-neutral-400">ACCOUNTS</span>
                    <p className="font-mono text-[9px] font-semibold text-neutral-800">48</p>
                  </div>
                  <div className="rounded border border-gray-100 p-1">
                    <span className="text-[6px] text-neutral-400">LEADS</span>
                    <p className="font-mono text-[9px] font-semibold text-neutral-800">142</p>
                  </div>
                  <div className="rounded border border-gray-100 p-1">
                    <span className="text-[6px] text-neutral-400">FIT</span>
                    <p className="font-mono text-[9px] font-semibold text-emerald-600">99%</p>
                  </div>
                </motion.div>

                <motion.div
                  layoutId="skel-c"
                  transition={{ duration: MORPH_S, ease: "easeInOut" }}
                  className="mt-2.5 rounded border border-gray-100 p-2"
                >
                  <motion.div
                    {...reveal}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[8px] font-semibold text-neutral-800">
                      Synthetix Labs (Series B)
                    </span>
                    <span className="text-[7px] text-emerald-600 font-mono">
                      VP RevOps ✓
                    </span>
                  </motion.div>
                  <motion.div
                    {...reveal}
                    className="mt-2 flex h-8 items-end gap-1"
                  >
                    <Skeleton className="h-4 w-full rounded-t-xs" />
                    <Skeleton className="h-6 w-full rounded-t-xs" />
                    <Skeleton className="h-3 w-full rounded-t-xs" />
                    <Skeleton className="h-7 w-full rounded-t-xs" />
                    <Skeleton className="h-5 w-full rounded-t-xs" />
                    <Skeleton className="h-8 w-full rounded-t-xs" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
