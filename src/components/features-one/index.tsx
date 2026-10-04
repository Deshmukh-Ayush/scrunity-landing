"use client";

import React from "react";
import Illustration1 from "./illustration1";
import { Illustration2 } from "./illustration2";
import { Illustration3 } from "./illustration3";
import { Para } from "../utility/texts";

const steps = [
  {
    Illustration: Illustration1,
    title: "Give your URL. Instant ICP & competitor mapping.",
    description:
      "Enter your domain. Scrunity extracts your product messaging, benchmarks competitor alternatives, and builds high-intent search queries.",
  },
  {
    Illustration: Illustration2,
    title: "Pinpoint verified decision makers without scrapers.",
    description:
      "Waterfall email verification filters out generic inboxes and finds budget-holders with direct, deliverability-checked corporate emails.",
  },
  {
    Illustration: Illustration3,
    title: "1-to-1 cold outreach that books qualified meetings.",
    description:
      "Contextual emails citing prospect company news. Review or edit before sending, and sync confirmed demos straight to your calendar.",
  },
];

export const Features1 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
      {steps.map(({ Illustration, title, description }) => (
        <div key={title} className="flex w-full flex-col gap-4 md:w-[373px]">
          <Illustration />
          <Para className="text-neutral-800 font-medium">{title}</Para>
          <Para>{description}</Para>
        </div>
      ))}
    </div>
  );
};
