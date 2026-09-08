import React from "react";
import { Card1 } from "./card-1";
import { Card2 } from "./card-2";
import { Card3 } from "./card-3";
import { Para } from "../utility/texts";

const steps = [
  {
    Illustration: Card1,
    title: "Analyze your project scope and onboard clients",
    description:
      "Draft structured deliverables, set payment milestones, and share a branded portal link so clients sign off before work begins.",
  },
  {
    Illustration: Card2,
    title: "Deliverables and protect against scope creep",
    description:
      "Upload completed work for review, track feedback rounds transparently, AI catches unapproved scope changes before they cause project friction. ",
  },
  {
    Illustration: Card3,
    title: "Collect milestone payments ",
    description:
      "Issue automated invoices on approval, verify client payment proofs instantly, and maintain predictable revenue.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="my-10 flex h-full w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
      {steps.map(({ Illustration, title, description }) => (
        <div key={title} className="flex w-full flex-col gap-4 md:w-[373px]">
          <Illustration />
          <Para className="text-neutral-800">{title}</Para>
          <Para>{description}</Para>
        </div>
      ))}
    </div>
  );
};
