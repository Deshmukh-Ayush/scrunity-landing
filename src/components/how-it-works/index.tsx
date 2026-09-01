"use client";

import React from "react";
import Illustration1 from "./illustration1";
import { Illustration2 } from "./illustration2";
import { Illustration3 } from "./illustration3";
import { Para } from "../utility/texts";

const steps = [
  {
    Illustration: Illustration1,
    title: "Turn any signed contract into a workspace.",
    description:
      "Upload your agreement. Scrunity instantly extracts scope boundaries, milestones, and deliverables into a live, ready-to-run project. (17 words)",
  },
  {
    Illustration: Illustration2,
    title: "Stop unpaid revisions before they happen.",
    description:
      "Client reviews stay contract-aligned. AI flags out-of-scope requests and generates itemized change orders in one click.",
  },
  {
    Illustration: Illustration3,
    title: "Asks pay the moment work is approved.",
    description:
      "Deliverable sign offs automatically trigger milestone invoices, payment tracking and automatic invoice generation.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      {steps.map(({ Illustration, title, description }) => (
        <div key={title} className="flex w-[373px] flex-col gap-4">
          <Illustration />
          <Para className="text-neutral-800">{title}</Para>
          <Para>{description}</Para>
        </div>
      ))}
    </div>
  );
};

export const Skeleton = ({ className }: { className: string }) => {
  return <div className={`animate-pulse bg-gray-200 ${className}`}></div>;
};
