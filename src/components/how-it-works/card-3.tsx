"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TextMorph } from "torph/react";
import { GlowEffect } from "../join/glow-effect";

export const Card3 = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVerified, setIsVerified] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMountedRef = useRef(true);

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
    setIsVerified(false);

    if (shouldReduceMotion) {
      // In reduced motion mode, show verified state statically
      setIsVerified(true);
      return;
    }

    // Step 1: Verification arrives after inspection
    schedule(() => {
      setIsVerified(true);
    }, 1300);

    // Step 2: Hold verified milestone receipt for 4.8s so user can read
    schedule(() => {
      setIsResetting(true);
      // Soft transition before next cycle
      schedule(() => {
        runSequence();
      }, 350);
    }, 6500);
  }, [clearAllTimeouts, schedule, shouldReduceMotion]);

  useEffect(() => {
    isMountedRef.current = true;
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
      setIsVerified(true);
    }
  };

  return (
    <div className="relative flex h-[200px] w-full select-none items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px] md:w-[373px]">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />

      {/* Atmospheric Ambient Glow Layer */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-48 -translate-x-1/2 -translate-y-1/2 opacity-30 transition-opacity duration-700">
        <GlowEffect
          colors={
            isVerified
              ? ["#10b981", "#06b6d4", "#3b82f6", "#10b981"]
              : ["#38bdf8", "#818cf8", "#3b82f6", "#38bdf8"]
          }
          mode="breathe"
          blur="stronger"
          duration={6}
          scale={1.2}
        />
      </div>

      {/* Milestone Invoice Ticket */}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={handleCardClick}
        className={`shadow-border-sm relative z-10 flex w-[calc(100%-24px)] cursor-pointer flex-col items-center gap-3 rounded-[4px] bg-white px-5 pt-5 pb-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 md:w-[268px] ${
          isResetting ? "opacity-60 blur-[1px]" : "opacity-100 blur-none"
        }`}
      >
        {/* Notch: backdrop-colored scallops sitting on the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-3.5 -translate-y-1/2"
          style={{
            backgroundImage:
              "radial-gradient(circle at 7px 7px, #F9FAFB 7px, transparent 7.2px)",
            backgroundSize: "14px 14px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "top left",
          }}
        />

        {/* Invoice Header */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-tight text-gray-400">
          <span>Invoice #1042</span>
          <span>·</span>
          <span>Milestone 2</span>
        </div>

        {/* Milestone Amount */}
        <motion.div
          animate={
            isVerified
              ? { scale: [1, 1.04, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[28px] leading-none font-bold tracking-tight text-gray-900"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          $3,500.00
        </motion.div>

        {/* Dashed Perforation Divider */}
        <div className="h-px w-full border-t border-dashed border-gray-200" />

        {/* Payment Verification Status */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.span
            animate={
              isVerified
                ? { scale: [0.95, 1.03, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-300 ${
              isVerified
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-neutral-200 bg-neutral-50 text-neutral-500"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <motion.path
                d="M5 12.5 9.5 17 19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isVerified ? 1 : 0 }}
                transition={{
                  duration: 0.32,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
            </svg>
            <TextMorph>
              {isVerified
                ? "Payment proof verified"
                : "Verifying payment proof..."}
            </TextMorph>
          </motion.span>

          {/* Animated Lock & Escrow Release Status */}
          <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 overflow-visible"
            >
              {/* Lock Body */}
              <rect
                x="5"
                y="11"
                width="14"
                height="9"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              {/* Tactile Unlocking Shackle */}
              <motion.path
                d="M8 11V7a4 4 0 0 1 8 0v4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                animate={{
                  y: isVerified ? -3 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 20,
                }}
              />
            </svg>
            <TextMorph>
              {isVerified ? "Milestone released" : "Funds held in escrow"}
            </TextMorph>
          </span>
        </div>
      </motion.div>
    </div>
  );
};
