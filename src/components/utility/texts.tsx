import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        `md:text:[56pxs] text-[36px] font-medium tracking-tight text-neutral-800`,
        className,
      )}
    >
      {children}
    </h1>
  );
};
