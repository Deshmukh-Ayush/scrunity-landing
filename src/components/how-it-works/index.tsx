import React from "react";

export const HowItWorks = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <Illustration1 />
      <Illustration2 />
      <Illustration3 />
    </div>
  );
};

const Illustration1 = () => {
  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200">
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="h-22 w-22 rounded-md border-dashed border-neutral-400">
          1
        </div>
      </div>
    </div>
  );
};
const Illustration2 = () => {
  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200"></div>
  );
};
const Illustration3 = () => {
  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200"></div>
  );
};
