"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "motion/react";
import Image from "next/image";
import { CursorIcon } from "@phosphor-icons/react"; // Using CursorIcon as requested

export const Illustration3 = () => {
  const [isInvoiceApproved, setIsInvoiceApproved] = useState(false);
  const cursorControls = useAnimationControls();
  const buttonControls = useAnimationControls();

  useEffect(() => {
    let isMounted = true;

    const runAnimationSequence = async () => {
      while (isMounted) {
        // 0. Reset state for the loop
        setIsInvoiceApproved(false);
        await cursorControls.set({ x: 140, y: 70, opacity: 0, scale: 1 });
        await buttonControls.set({ scale: 1 });

        // 1. Initial Delay (2 seconds) before starting
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        // 2. Cursor appears and moves to button over 2 seconds
        cursorControls.set({ opacity: 1 });
        await cursorControls.start({
          x: 0,
          y: 0,
          transition: { duration: 2, ease: "easeInOut" },
        });
        if (!isMounted) break;

        // 3. Click down (cursor & button scale down together)
        cursorControls.start({ scale: 0.8, transition: { duration: 0.15 } });
        await buttonControls.start({
          scale: 0.9,
          transition: { duration: 0.15 },
        });
        if (!isMounted) break;

        // 4. Release click (cursor disappears, button scales back up)
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

        // 5. Morph into Invoice
        setIsInvoiceApproved(true);

        // 6. Wait 5 seconds before resetting the whole illustration
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    runAnimationSequence();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks if unmounted
    };
  }, [cursorControls, buttonControls]);

  return (
    <div className="relative flex h-[200px] w-[373px] items-start justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 pt-10">
      {/* Animated Cursor Wrapper */}
      {/* Centered absolutely exactly where the button rests so x:0, y:0 is a direct hit */}
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

      {isInvoiceApproved ? (
        <motion.div
          layoutId="outer"
          className="w-[290px] rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100">
                <Image
                  src="/logo/scrunity_logo_dark.png"
                  alt="Scrunity Logo"
                  width={40}
                  height={40}
                  className="h-5 w-5"
                />
              </div>
              <div>
                <p className="text-[9px] font-medium tracking-[0.18em] text-neutral-400 uppercase">
                  Scrunity
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  Invoice #1042
                </p>
              </div>
            </div>

            <span className="rounded-full bg-neutral-100 px-2 py-1 text-[9px] font-medium tracking-[0.12em] text-neutral-600 uppercase">
              Paid
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-y border-neutral-200 py-3 text-[10px] text-neutral-500">
            <div>
              <p className="tracking-[0.14em] text-neutral-400 uppercase">
                Bill to
              </p>
              <p className="mt-1 font-medium text-neutral-700">
                Ayush Deshmukh
              </p>
            </div>
            <div className="text-right">
              <p className="tracking-[0.14em] text-neutral-400 uppercase">
                Due
              </p>
              <p className="mt-1 font-medium text-neutral-700">May 15, 2026</p>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-neutral-500">
              <span>Discovery sprint</span>
              <span className="font-medium text-neutral-700">$1,200</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-500">
              <span>UI system refresh</span>
              <span className="font-medium text-neutral-700">$2,850</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-500">
              <span>QA & handoff</span>
              <span className="font-medium text-neutral-700">$640</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
            <div>
              <p className="text-[9px] tracking-[0.16em] text-neutral-400 uppercase">
                Total
              </p>
              <p className="text-lg font-semibold text-neutral-900">$4,690</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-[9px] font-medium tracking-[0.12em] text-neutral-500 uppercase">
              Approved
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          animate={buttonControls}
          initial={{ scale: 1 }}
          onClick={() => setIsInvoiceApproved(true)}
          layoutId="outer"
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          className={cn(
            "text-shadow mt-10 cursor-pointer rounded-full border border-neutral-800 bg-neutral-800 px-6 py-2 text-[15px] text-neutral-50 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]",
          )}
        >
          Approve Deliverable
        </motion.button>
      )}
    </div>
  );
};
