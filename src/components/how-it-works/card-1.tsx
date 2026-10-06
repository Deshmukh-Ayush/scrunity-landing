"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { CursorIcon } from "@phosphor-icons/react";
import { TextMorph } from "torph/react";
import { GlowEffect } from "../join/glow-effect";

export const Card1 = () => {
  const shouldReduceMotion = useReducedMotion();
  const [item1Checked, setItem1Checked] = useState(false);
  const [item2Checked, setItem2Checked] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const cursorControls = useAnimationControls();
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMountedRef = useRef(true);
  const runSequenceRef = useRef<() => void>(() => {});

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      if (isMountedRef.current) fn();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const runSequence = useCallback(async () => {
    clearAllTimeouts();

    // Reset visual states
    setIsResetting(false);
    setItem1Checked(false);
    setItem2Checked(false);
    setIsSigned(false);
    cursorControls.set({ opacity: 0, x: 42, y: 22, scale: 1 });

    if (shouldReduceMotion) {
      // In reduced motion mode, present clear states with gentle opacity
      setItem1Checked(true);
      setItem2Checked(true);
      setIsSigned(true);
      return;
    }

    // Step 1: Item 1 ("Discovery & UX") verification
    schedule(() => {
      setItem1Checked(true);
    }, 600);

    // Step 2: Item 2 ("Brand Kit") verification
    schedule(() => {
      setItem2Checked(true);
    }, 1300);

    // Step 3: Client cursor approaches the e-signature line
    schedule(async () => {
      // Cursor fades in and glides smoothly to the start of the signature stroke
      cursorControls.set({ opacity: 1, x: 40, y: 20 });
      await cursorControls.start({
        x: 2,
        y: 11,
        transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
      });

      // Step 4: Click down (tactile press)
      await cursorControls.start({
        scale: 0.82,
        transition: { duration: 0.12 },
      });

      // Step 5: Ink flows — signature path draws while cursor sweeps to stroke terminal
      setIsSigned(true);
      await cursorControls.start({
        x: 44,
        y: 4,
        scale: 0.9,
        transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
      });

      // Step 6: Cursor lifts and dissolves
      await cursorControls.start({
        scale: 1,
        opacity: 0,
        transition: { duration: 0.22, ease: "easeOut" },
      });
    }, 2000);

    // Step 7: Settle and hold in signed state for 4.2s so the user can inspect the card
    schedule(() => {
      setIsResetting(true);
      // Soft transition before loop restart
      schedule(() => {
        runSequenceRef.current();
      }, 350);
    }, 6800);
  }, [clearAllTimeouts, cursorControls, schedule, shouldReduceMotion]);

  useEffect(() => {
    runSequenceRef.current = runSequence;
  }, [runSequence]);

  useEffect(() => {
    isMountedRef.current = true;
    // The sequence initializes the animation state when the card mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runSequence();

    return () => {
      isMountedRef.current = false;
      clearAllTimeouts();
    };
  }, [runSequence, clearAllTimeouts]);

  // Click card to replay or trigger sign immediately
  const handleCardClick = () => {
    if (isSigned) {
      runSequence();
    } else {
      // Fast-forward to sign
      setItem1Checked(true);
      setItem2Checked(true);
      setIsSigned(true);
      cursorControls.set({ opacity: 0 });
    }
  };

  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px] select-none md:w-[373px]">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />

      {/* Atmospheric Ambient Glow Layer */}

      {/* Proposal Card */}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={handleCardClick}
        className={`relative z-10 mt-10 h-full w-[173px] cursor-pointer rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ${
          isResetting ? "opacity-60 blur-[1px]" : "opacity-100 blur-none"
        }`}
      >
        <div className="relative flex h-full flex-col p-3">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[9px] font-medium text-white shadow-xs">
                A
              </div>

              <p className="truncate text-[10px] leading-4 font-medium tracking-[-0.01em] text-[#171717]">
                Campaign & ICP
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] leading-3 font-medium transition-colors duration-300 ${
                isSigned
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-[#dbeafe] bg-[#eff6ff] text-[#2563eb]"
              }`}
            >
              <TextMorph>{isSigned ? "Verified ICP" : "Scanning"}</TextMorph>
            </span>
          </div>

          {/* Scope Deliverables Checklist */}
          <div className="mt-4 space-y-2.5">
            {/* Item 1 */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: item1Checked ? [1, 1.18, 1] : 1,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                  item1Checked
                    ? "bg-[#171717] text-white"
                    : "border border-neutral-300 bg-neutral-100 text-transparent"
                }`}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <motion.path
                    d="M1.5 4.2L3.8 6.5L8.5 1.8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: item1Checked ? 1 : 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                </svg>
              </motion.div>
              <span
                className={`text-[10px] leading-4 transition-colors duration-200 ${
                  item1Checked ? "text-[#4d4d4d]" : "text-neutral-400"
                }`}
              >
                Domain & Competitors
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: item2Checked ? [1, 1.18, 1] : 1,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                  item2Checked
                    ? "bg-[#171717] text-white"
                    : "border border-neutral-300 bg-neutral-100 text-transparent"
                }`}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <motion.path
                    d="M1.5 4.2L3.8 6.5L8.5 1.8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: item2Checked ? 1 : 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                </svg>
              </motion.div>
              <span
                className={`text-[10px] leading-4 transition-colors duration-200 ${
                  item2Checked ? "text-[#4d4d4d]" : "text-neutral-400"
                }`}
              >
                Target ICP: RevOps
              </span>
            </div>
          </div>

          {/* Bottom E-Signature & Milestone Signoff */}
          <div className="mt-auto">
            <div className="mb-1.5 h-px w-full bg-[#eaeaea]" />

            <div className="relative flex items-end justify-between gap-2">
              <div>
                <div className="relative mb-0.5 h-[18px] w-[48px] border-b border-[#171717]">
                  <svg
                    viewBox="0 0 48 18"
                    className="h-full w-full"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                      fill="none"
                      stroke="#171717"
                      strokeWidth="1.15"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: isSigned ? 1 : 0,
                        opacity: isSigned ? 1 : 0,
                      }}
                      transition={{
                        pathLength: {
                          duration: 0.75,
                          ease: [0.32, 0.72, 0, 1],
                        },
                        opacity: { duration: 0.1 },
                      }}
                    />
                  </svg>

                  {/* Micro Cursor following the signature stroke */}
                  <motion.div
                    animate={cursorControls}
                    initial={{ opacity: 0, x: 40, y: 20, scale: 1 }}
                    className="pointer-events-none absolute -top-1 left-0 z-20"
                  >
                    <CursorIcon
                      size={15}
                      weight="fill"
                      className="-rotate-15 text-neutral-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
                    />
                  </motion.div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-[7px] font-medium text-[#8f8f8f]">
                    agent inking
                  </p>
                  {isSigned && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="size-1 rounded-full bg-emerald-500"
                    />
                  )}
                </div>
              </div>

              {/* Status Pill */}
              <motion.span
                animate={isSigned ? { scale: [0.94, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`rounded-full border px-1.5 py-1 text-[8px] font-medium transition-colors duration-300 ${
                  isSigned
                    ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                    : "border-neutral-200 bg-neutral-50 text-neutral-500"
                }`}
              >
                <TextMorph>
                  {isSigned ? "Mapped · 48 Accounts" : "Finding · 48 Accounts"}
                </TextMorph>
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
