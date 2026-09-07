"use client";

import React from "react";
import { CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface PricingFeaturesProps {
  features: string[];
  className?: string;
}

export const PricingFeatures = ({
  features,
  className,
}: PricingFeaturesProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
        What&apos;s included
      </p>
      <ul className="space-y-2.5">
        {features.map((feature, idx) => {
          const isBaseInherited = feature.startsWith("Everything in");
          const isAIFeature =
            feature.includes("AI") || feature.includes("Torch");

          return (
            <li key={idx} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700"
                aria-hidden="true"
              >
                <CheckIcon weight="bold" className="size-2.5" />
              </div>

              <div className="flex flex-1 flex-wrap items-center gap-1.5 leading-snug">
                <span
                  className={cn(
                    "text-sm",
                    isBaseInherited
                      ? "font-medium text-neutral-900"
                      : "text-neutral-600",
                  )}
                >
                  {feature}
                </span>

                {isAIFeature && !isBaseInherited && (
                  <span
                    title="Powered by Scrunity AI"
                    className="inline-flex items-center gap-0.5 rounded-[4px] border border-sky-200/80 bg-sky-50 px-1 py-0.5 text-[9px] font-semibold text-sky-700 select-none"
                  >
                    <SparkleIcon
                      weight="fill"
                      className="size-2.5 text-sky-600"
                    />
                    AI
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
