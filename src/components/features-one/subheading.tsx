import React from "react";
import { SubHeading } from "../utility/texts";

export const SubHeadingAnimation = () => {
  return (
    <SubHeading className="flex flex-col items-start justify-center gap-1.5">
      <p>
        Finds{" "}
        <span className="rounded-lg bg-blue-100/70 px-1.5 py-0.5 text-blue-600 font-semibold">
          verified decision makers
        </span>{" "}
        without scrapers
      </p>
      <p>
        Drafts{" "}
        <span className="rounded-lg bg-purple-100/70 px-1.5 py-0.5 text-purple-700 font-semibold">
          contextual 1-to-1 emails
        </span>{" "}
        with full user review
      </p>
      <p>
        Books{" "}
        <span className="rounded-lg bg-emerald-100/70 px-1.5 py-0.5 text-emerald-700 font-semibold">
          qualified sales meetings
        </span>{" "}
        into your calendar
      </p>
      <p className="text-neutral-400 text-lg md:text-xl font-normal">
        Learns from every reply and doubles down on winning ICP campaigns.
      </p>
    </SubHeading>
  );
};
