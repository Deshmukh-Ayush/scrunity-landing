"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref);

  return (
    <motion.h2
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      ref={ref}
      className={cn(
        `inline text-[36px] font-medium tracking-tight text-neutral-800 md:text-[56px]`,
        className,
      )}
    >
      {children}
    </motion.h2>
  );
};

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref);
  return (
    <motion.h2
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      ref={ref}
      className={cn(
        `inline text-[24px] font-medium tracking-tighter text-neutral-800 md:text-[28px]`,
        className,
      )}
    >
      {children}
    </motion.h2>
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
