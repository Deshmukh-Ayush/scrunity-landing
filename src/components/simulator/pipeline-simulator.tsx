"use client";

import React, { useState } from "react";
import {
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { SubHeading, Para } from "@/components/utility/texts";
import { Button } from "@/components/utility/button";
import { cn } from "@/lib/utils";

const VOLUMES = [
  { id: 500, label: "500 accounts / mo", leads: 480, demos: 18 },
  { id: 1500, label: "1,500 accounts / mo", leads: 1440, demos: 54 },
  { id: 3500, label: "3,500 accounts / mo", leads: 3360, demos: 126 },
];

const CONTRACT_SIZES = [
  { id: "sm", label: "$12,000 ACV", value: 12000 },
  { id: "md", label: "$24,000 ACV", value: 24000 },
  { id: "lg", label: "$48,000 ACV", value: 48000 },
];

export const PipelineSimulator = () => {
  const [selectedVolume, setSelectedVolume] = useState(VOLUMES[1]);
  const [selectedAcv, setSelectedAcv] = useState(CONTRACT_SIZES[1]);

  const projectedPipeline = selectedVolume.demos * selectedAcv.value;

  return (
    <div className="w-full">
      {/* ── Section Header ────────────────────────────────────── */}
      <div className="mb-12">
        <SubHeading className="text-[28px] md:text-[36px]">
          Simulate your pipeline velocity.
        </SubHeading>
        <Para className="mt-2 max-w-2xl text-base md:text-lg">
          Adjust your target outbound parameters to calculate projected verified accounts, reply rates, and
          calendar bookings with Scrunity AI.
        </Para>
      </div>

      {/* ── Simulator Interactive Canvas ──────────────────────── */}
      <div className="rounded-[18px] border border-gray-200 bg-white p-6 md:p-8 shadow-xs">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Interactive Controls (5 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div>
              <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                Campaign Parameters
              </Para>

              {/* Volume Selection */}
              <div className="mt-4">
                <Para className="text-xs font-semibold text-neutral-800">
                  Target Account Volume (Monthly)
                </Para>
                <div className="mt-2 flex flex-col gap-2">
                  {VOLUMES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVolume(v)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs transition-colors select-none",
                        selectedVolume.id === v.id
                          ? "border-[#00b0fa] bg-[#00b0fa]/15 font-semibold text-neutral-900"
                          : "border-gray-200 bg-gray-50/70 text-neutral-700 hover:bg-gray-100",
                      )}
                    >
                      <span>{v.label}</span>
                      <span className="font-mono text-[11px] opacity-80">
                        ~{v.demos} demos / mo
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contract Size Selection */}
              <div className="mt-6">
                <Para className="text-xs font-semibold text-neutral-800">
                  Average Deal Size (ACV)
                </Para>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {CONTRACT_SIZES.map((acv) => (
                    <button
                      key={acv.id}
                      type="button"
                      onClick={() => setSelectedAcv(acv)}
                      className={cn(
                        "cursor-pointer rounded-xl border py-2.5 text-center text-xs transition-colors select-none",
                        selectedAcv.id === acv.id
                          ? "border-[#00b0fa] bg-[#00b0fa]/15 font-semibold text-neutral-900"
                          : "border-gray-200 bg-gray-50/70 text-neutral-700 hover:bg-gray-100",
                      )}
                    >
                      {acv.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-blue-900">
              <span className="font-semibold">Scrunity AI Guardrail:</span> Outreach send frequency is
              throttled dynamically to maintain a 99.8% mailbox deliverability score.
            </div>
          </div>

          {/* Right: Calculated Pipeline Telemetry (7 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-6 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                <Para className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                  Projected Monthly Output
                </Para>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <CheckCircleIcon weight="fill" className="size-3 text-emerald-500" />
                  Continuous Optimization Active
                </span>
              </div>

              {/* Large Metric Display */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-xs">
                  <Para className="text-xs text-neutral-400">Confirmed Calendar Demos</Para>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-semibold tracking-tight text-neutral-900">
                      {selectedVolume.demos}
                    </span>
                    <span className="font-mono text-xs font-medium text-emerald-600">
                      +16.2% reply rate
                    </span>
                  </div>
                  <Para className="mt-2 text-[11px] text-neutral-400">
                    Direct calendar invites with verified decision makers
                  </Para>
                </div>

                <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-xs">
                  <Para className="text-xs text-neutral-400">Projected Pipeline Value</Para>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-semibold tracking-tight text-neutral-900">
                      ${(projectedPipeline / 1000).toLocaleString()}k
                    </span>
                    <span className="font-mono text-xs font-medium text-[#00b0fa]">
                      monthly run-rate
                    </span>
                  </div>
                  <Para className="mt-2 text-[11px] text-neutral-400">
                    Based on {selectedAcv.label} average deal size
                  </Para>
                </div>
              </div>

              {/* Granular Breakdown */}
              <div className="mt-6 space-y-2.5 border-t border-gray-200/60 pt-4 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <Para className="text-xs text-neutral-500">Verified Accounts Discovered:</Para>
                  <span className="font-mono font-medium text-neutral-900">
                    {selectedVolume.leads} budget holders
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <Para className="text-xs text-neutral-500">Waterfall Inbox Placement:</Para>
                  <span className="font-mono font-medium text-emerald-600">
                    99.8% zero-bounce rate
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <Para className="text-xs text-neutral-500">Estimated Time Saved:</Para>
                  <span className="font-mono font-medium text-neutral-900">
                    ~72 SDR hours per month
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-4 sm:flex-row">
              <Para className="text-xs text-neutral-400">
                Ready to deploy Scrunity AI capacity?
              </Para>
              <Button href="/join" className="w-full bg-[#00b0fa] hover:bg-[#009de0] text-neutral-950 font-semibold border-none sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
