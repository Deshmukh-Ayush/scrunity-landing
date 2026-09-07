"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, UsersIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "./data";
import { PricingFeatures } from "./pricing-features";

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export const PricingCard = ({ plan, className }: PricingCardProps) => {
  const isAgency = plan.id === "agency";
  const isEnterprise = plan.id === "enterprise";

  const href = isEnterprise ? "/contact" : "https://app.scrunity.com/sign-in";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        /* Concentric Outer Radius: 24px (rounded-[24px]) with 8px padding (p-2) */
        /* Clean, soft neutral frame without harsh dark borders */
        "group relative flex h-full flex-col rounded-[24px] border border-gray-200/90 bg-gray-100/70 p-2 shadow-xs transition-[box-shadow,border-color] duration-200 hover:border-gray-300 hover:shadow-sm",
        className,
      )}
    >
      {/* Concentric Inner Radius: 16px (24px - 8px = 16px -> rounded-[16px]) */}
      <div className="shadow-border-sm relative flex h-full flex-col justify-between rounded-[16px] bg-white p-6 sm:p-7">
        <div>
          {/* Header Row: Plan Title & Seats */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-balance text-neutral-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-pretty text-neutral-500">
                {plan.description}
              </p>
            </div>

            {/* Seats Badge */}
            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-neutral-600 select-none">
              <UsersIcon weight="bold" className="size-3 text-neutral-400" />
              <span>{plan.seats}</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <div className="flex items-baseline gap-1">
              <span
                className={cn(
                  "font-semibold tracking-tight text-neutral-900 tabular-nums",
                  plan.price === "Custom" ? "text-3xl" : "text-4xl",
                )}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm font-medium text-neutral-500">
                  {plan.period}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-neutral-400">
              {plan.id === "freelancer" &&
                "Essential contract & scope protection for solos"}
              {plan.id === "agency" &&
                "Multi-seat collaboration for client projects"}
              {plan.id === "enterprise" &&
                "Custom workflows, terms, and dedicated onboarding"}
            </p>
          </div>

          {/* Features Divider & List */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <PricingFeatures features={plan.features} />
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="mt-8 pt-2">
          <Link href={href} className="block w-full">
            <motion.button
              type="button"
              aria-label={`${plan.cta} for ${plan.name} plan`}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className={cn(
                /* Optical Alignment: ps-5 pe-4 so text-side is 2px wider than icon-side */
                "group/btn relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-2.5 ps-5 pe-4 text-xs font-semibold whitespace-nowrap transition-colors duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                isAgency
                  ? "border border-neutral-900 bg-neutral-900 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:bg-neutral-800 active:bg-neutral-950"
                  : isEnterprise
                    ? "border border-gray-300 bg-white text-neutral-900 shadow-xs hover:bg-gray-50 active:bg-gray-100"
                    : "border border-neutral-200/90 bg-neutral-100 text-neutral-900 shadow-xs hover:bg-neutral-200/80 active:bg-neutral-200",
              )}
            >
              <span>{plan.cta}</span>
              <ArrowRightIcon
                weight="bold"
                className="size-3.5 shrink-0 transition-transform duration-150 group-hover/btn:translate-x-0.5"
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
