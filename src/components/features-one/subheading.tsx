import React from "react";
import { SubHeading } from "../utility/texts";

export const SubHeadingAnimation = () => {
  return (
    <SubHeading className="flex flex-col items-start justify-center">
      <p>
        Turns{" "}
        <span className="rounded-lg bg-blue-200/50 p-0.5 text-cyan-500">
          contracts
        </span>{" "}
        into living workspaces
      </p>
      <p>
        Executes{" "}
        <span className="rounded-lg bg-gray-200/50 p-0.5 text-neutral-500">
          tasks
        </span>{" "}
        using smart agents
      </p>
      <p>
        Protects{" "}
        <span className="rounded-lg bg-gray-200/50 p-0.5 text-neutral-500">
          revenue
        </span>{" "}
        with linked invoicing
      </p>
    </SubHeading>
  );
};
