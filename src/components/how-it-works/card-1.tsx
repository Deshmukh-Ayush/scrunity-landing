"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export const Card1 = () => {
  return (
    <div className="relative flex h-[200px] w-[373px] items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px]">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />

      <div className="relative z-10 mt-10 h-full w-[173px] rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="relative flex h-full flex-col p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[9px] font-medium text-white">
                A
              </div>

              <p className="truncate text-[10px] leading-4 font-medium tracking-[-0.01em] text-[#171717]">
                Proposal & Scope
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-[#dbeafe] bg-[#eff6ff] px-1.5 py-0.5 text-[8px] leading-3 font-medium text-[#2563eb]">
              Invite Sent
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[8px] font-semibold text-white">
                <CheckIcon />
              </div>
              <span className="text-[10px] leading-4 text-[#4d4d4d]">
                Discovery & UX
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[8px] font-semibold text-white">
                <CheckIcon />
              </div>
              <span className="text-[10px] leading-4 text-[#4d4d4d]">
                Brand Kit
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-1.5 h-px w-full bg-[#eaeaea]" />

            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="mb-0.5 h-[18px] w-[48px] border-b border-[#171717]">
                  <svg
                    viewBox="0 0 48 18"
                    className="h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="text-[7px] font-medium text-[#8f8f8f]">
                  e-signature
                </p>
              </div>

              <span className="rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-1.5 py-1 text-[8px] font-medium text-[#15803d]">
                Signed · $4,500
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
