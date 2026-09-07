"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const Card3 = () => {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const row: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
      transform: shouldReduceMotion ? "none" : "translateY(6px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px)",
      transition: { duration: 0.22, ease: EASE_OUT },
    },
  };

  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200 p-[2px]">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-50">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="shadow-border-sm relative flex w-[268px] flex-col items-center gap-3 rounded-[4px] bg-white px-5 pt-5 pb-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.15)]"
        >
          {/* Notch: backdrop-colored scallops sitting on the top edge, not a mask on the card itself */}
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

          {/* Header */}
          <motion.div
            variants={row}
            className="font-mono text-[10px] tracking-tight text-gray-400"
          >
            Invoice #1042 · Milestone 2
          </motion.div>

          {/* Amount */}
          <motion.div
            variants={row}
            className="text-[28px] leading-none font-bold tracking-tight text-gray-900"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            $3,500.00
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={row}
            className="h-px w-full border-t border-dashed border-gray-200"
          />

          {/* Status */}
          <motion.div
            variants={row}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                initial={
                  shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15 }
                    : {
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.25,
                        delay: 0.32,
                      }
                }
              >
                <path
                  d="M5 12.5 9.5 17 19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              Payment proof verified
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 11V7a4 4 0 0 1 8 0v4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Milestone released
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
