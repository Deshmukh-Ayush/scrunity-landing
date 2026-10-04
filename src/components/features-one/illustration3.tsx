"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "motion/react";
import Image from "next/image";
import { CursorIcon } from "@phosphor-icons/react";

export const Illustration3 = () => {
  const [isMeetingBooked, setIsMeetingBooked] = useState(false);
  const cursorControls = useAnimationControls();
  const buttonControls = useAnimationControls();

  useEffect(() => {
    let isMounted = true;

    const runAnimationSequence = async () => {
      while (isMounted) {
        // 0. Reset state for loop
        setIsMeetingBooked(false);
        await cursorControls.set({ x: 140, y: 70, opacity: 0, scale: 1 });
        await buttonControls.set({ scale: 1 });

        // 1. Initial delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        // 2. Cursor glides to button
        cursorControls.set({ opacity: 1 });
        await cursorControls.start({
          x: 0,
          y: 0,
          transition: { duration: 1.8, ease: "easeInOut" },
        });
        if (!isMounted) break;

        // 3. Click down
        cursorControls.start({ scale: 0.8, transition: { duration: 0.15 } });
        await buttonControls.start({
          scale: 0.9,
          transition: { duration: 0.15 },
        });
        if (!isMounted) break;

        // 4. Release click
        cursorControls.start({
          scale: 1,
          opacity: 0,
          transition: { duration: 0.2 },
        });
        await buttonControls.start({
          scale: 1,
          transition: { duration: 0.15 },
        });
        if (!isMounted) break;

        // 5. Morph into Meeting Confirmation Ticket
        setIsMeetingBooked(true);

        // 6. Hold state before loop restart
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    runAnimationSequence();

    return () => {
      isMounted = false;
    };
  }, [cursorControls, buttonControls]);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-gray-200 bg-gray-50 p-[2px]">
      <div className="relative flex h-[200px] w-full items-start justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 pt-10 md:w-[373px]">
        {/* Animated Cursor */}
        <div className="pointer-events-none absolute top-[100px] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={cursorControls}
            initial={{ x: 140, y: 70, opacity: 0 }}
          >
            <CursorIcon
              size={24}
              weight="fill"
              className="-mt-[4px] -ml-[4px] text-neutral-800"
            />
          </motion.div>
        </div>

        {isMeetingBooked ? (
          <motion.div
            layoutId="outer"
            className="w-[290px] rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-white font-semibold text-xs">
                  MV
                </div>
                <div>
                  <p className="text-[9px] font-medium tracking-[0.18em] text-neutral-400 uppercase">
                    Synthetix Labs
                  </p>
                  <p className="text-xs font-semibold text-neutral-900">
                    Marcus Vance · VP RevOps
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 border border-emerald-100 uppercase">
                Demo Booked
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-y border-neutral-200/80 py-2.5 text-[10px] text-neutral-500">
              <div>
                <p className="tracking-[0.14em] text-neutral-400 uppercase">
                  Meeting Time
                </p>
                <p className="mt-0.5 font-medium text-neutral-800">
                  Thu, 2:00 PM EST
                </p>
              </div>
              <div className="text-right">
                <p className="tracking-[0.14em] text-neutral-400 uppercase">
                  Pipeline Value
                </p>
                <p className="mt-0.5 font-mono font-semibold text-neutral-900">
                  $36,000 ARR
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-[9px] text-neutral-400">
                Google Calendar invite synced ✓
              </span>
              <span className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono text-[8px] font-medium text-neutral-600">
                100% Qualified
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            animate={buttonControls}
            initial={{ scale: 1 }}
            onClick={() => setIsMeetingBooked(true)}
            layoutId="outer"
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className={cn(
              "text-shadow mt-10 cursor-pointer rounded-full border border-neutral-800 bg-neutral-800 px-6 py-2 text-[14px] text-neutral-50 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]",
            )}
          >
            Review & Dispatch
          </motion.button>
        )}
      </div>
    </div>
  );
};
