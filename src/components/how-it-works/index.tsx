import React from "react";
import { Card1 } from "./card-1";
import { Card2 } from "./card-2";
import { Card3 } from "./card-3";
import { Para } from "../utility/texts";

const phases = [
  {
    Illustration: Card1,
    title: "Research, competitors & ICP definition",
    description:
      "Give your website URL. The agent extracts positioning, benchmarks competitor wedges, and defines high-intent customer profiles.",
  },
  {
    Illustration: Card2,
    title: "Verified decision makers & 1-to-1 email drafting",
    description:
      "Waterfall email verification finds exact budget holders, and the agent crafts contextual cold outreach you can review and edit before sending.",
  },
  {
    Illustration: Card3,
    title: "Automated send, booked meetings & self-learning",
    description:
      "Outreach is dispatched via warmed secondary mailboxes, demo meetings sync to your calendar, and the agent doubles down on winning ICPs.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="w-full">
      <div className="my-10 flex h-full w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
        {phases.map(({ Illustration, title, description }) => (
          <div key={title} className="flex w-full flex-col gap-4 md:w-[373px]">
            <Illustration />
            <Para className="font-medium text-neutral-800">{title}</Para>
            <Para>{description}</Para>
          </div>
        ))}
      </div>
    </div>
  );
};
