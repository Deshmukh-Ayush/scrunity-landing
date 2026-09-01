"use client";

import { CursorIcon, FilePdfIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import Illustration1 from "./illustration1";
import { Illustration2 } from "./illustration2";

export const HowItWorks = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <Illustration1 />
      <Illustration2 />
      <Illustration3 />
    </div>
  );
};

const Illustration3 = () => {
  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200"></div>
  );
};

export const Skeleton = ({ className }: { className: string }) => {
  return <div className={`animate-pulse bg-gray-200 ${className}`}></div>;
};
