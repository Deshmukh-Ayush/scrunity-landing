"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";

export const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
  };

  return (
    /* Concentric Border Radius: 20px outer (rounded-[20px]) + 6px padding (p-1.5) -> 14px inner (rounded-[14px]) */
    <div className="rounded-[20px] border border-gray-200/90 bg-gray-100/70 p-1.5 shadow-xs">
      <div className="shadow-border-sm rounded-[14px] bg-white p-5">
        <p className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
          Stay informed
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500 text-pretty">
          Engineering dispatches and product release notes. No spam.
        </p>

        {isSubscribed ? (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-medium text-emerald-800">
            <CheckIcon weight="bold" className="size-3.5 shrink-0" />
            <span>Thank you for subscribing.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@agency.com"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="group/btn flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 py-2 ps-4 pe-3 text-xs font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-colors hover:bg-neutral-800"
            >
              <span>Subscribe to notes</span>
              <ArrowRightIcon
                weight="bold"
                className="size-3 transition-transform duration-150 group-hover/btn:translate-x-0.5"
              />
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};
