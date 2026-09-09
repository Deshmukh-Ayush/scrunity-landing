"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children" | "type"> & {
  children: React.ReactNode;
  href?: "#" | string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  className,
  href,
  type,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
      type={type ?? "button"}
      className={cn(
        "text-shadow cursor-pointer rounded-full border border-neutral-800 bg-neutral-800 px-6 py-2 text-[15px] text-neutral-50 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]",
        className,
      )}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </motion.button>
  );
};
