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
    <h2
      className={cn(
        `inline text-[36px] font-medium tracking-tight text-neutral-800 md:text-[56px]`,
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        `inline text-[24px] font-medium tracking-tighter text-neutral-800 md:text-[28px]`,
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        `text-[16px] font-medium tracking-tight text-neutral-500`,
        className,
      )}
    >
      {children}
    </p>
  );
};
