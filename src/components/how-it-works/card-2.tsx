"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TextMorph } from "torph/react";
import { GlowEffect } from "../join/glow-effect";

export const Card2 = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

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

  const runSequence = useCallback(() => {
    clearAllTimeouts();

    // Reset visual states
    setIsResetting(false);
    setIsScanning(false);
    setIsVerified(false);

    if (shouldReduceMotion) {
      // In reduced motion mode, show verified state statically
      setIsVerified(true);
      return;
    }

    // Step 1: AI scan initiates across the incoming feedback comments
    schedule(() => {
      setIsScanning(true);
    }, 600);

    // Step 2: AI analysis verifies all items against contract scope
    schedule(() => {
      setIsScanning(false);
      setIsVerified(true);
    }, 1500);

    // Step 3: Hold verified state for 4.8s so user can read and inspect
    schedule(() => {
      setIsResetting(true);
      // Soft transition before next cycle
      schedule(() => {
        runSequenceRef.current();
      }, 350);
    }, 6600);
  }, [clearAllTimeouts, schedule, shouldReduceMotion]);

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

  // Click card to replay or trigger immediate verification
  const handleCardClick = () => {
    if (isVerified) {
      runSequence();
    } else {
      setIsScanning(false);
      setIsVerified(true);
    }
  };

  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px] select-none md:w-[373px]">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />

      {/* Deliverable Review & Scope Protection Card */}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={handleCardClick}
        className={`shadow-border-sm relative z-10 h-[150px] w-[calc(100%-24px)] cursor-pointer overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 md:w-[280px] ${
          isResetting ? "opacity-60 blur-[1px]" : "opacity-100 blur-none"
        }`}
      >
        <div className="flex h-full w-full flex-col justify-between p-3.5">
          {/* File Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-gray-400"
              >
                <path
                  d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 2v5h5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate font-mono text-[11px] text-gray-700">
                Synthetix_Leads.csv
              </span>
            </div>

            <span className="flex shrink-0 items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-blue-700">
              <span
                className={`size-1 rounded-full bg-blue-500 ${
                  !isVerified ? "animate-pulse" : ""
                }`}
              />
              3 Decision Makers
            </span>
          </div>

          {/* Scope Row */}
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: isVerified ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="flex shrink-0 items-center justify-center text-blue-500"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-blue-500"
              >
                {/* Shield Contour */}
                <motion.path
                  d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0.4 }}
                  animate={{ pathLength: isVerified ? 1 : 0.4 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                />
                {/* Checkmark inside Shield */}
                <motion.path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isVerified ? 1 : 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.1,
                  }}
                />
              </svg>
            </motion.div>

            <motion.span
              animate={isVerified ? { scale: [0.96, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${
                isVerified
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-500"
              }`}
            >
              <TextMorph>
                {isVerified
                  ? "Verified: Valid MX Handshake"
                  : "Scanning MX records..."}
              </TextMorph>
            </motion.span>
          </div>

          {/* Feedback Preview Skeleton Section */}
          <div className="relative flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-mono">
                marcus@synthetix.io
              </span>
              {isVerified && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[9px] text-emerald-600 font-semibold"
                >
                  Deliverability 99.8% ✓
                </motion.span>
              )}
            </div>

            {/* Skeleton comment bars with AI light-scan beam */}
            <div className="relative flex flex-col gap-1.5 overflow-hidden rounded-sm py-0.5">
              {/* Subtle AI Scan Streak */}
              {isScanning && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "250%" }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent blur-[2px]"
                />
              )}

              <motion.div
                initial={{ scaleX: 0.92, opacity: 0.6 }}
                animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-1.5 w-full origin-left rounded-full bg-gray-100"
              />
              <motion.div
                initial={{ scaleX: 0.92, opacity: 0.6 }}
                animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
                transition={{
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.06,
                }}
                className="h-1.5 w-4/5 origin-left rounded-full bg-gray-100"
              />
              <motion.div
                initial={{ scaleX: 0.92, opacity: 0.6 }}
                animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
                transition={{
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.12,
                }}
                className="h-1.5 w-3/5 origin-left rounded-full bg-gray-100"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
