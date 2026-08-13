import { cn } from "@/lib/utils";
import React from "react";

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto max-w-6xl border-y border-black", className)}>
      {children}
    </div>
  );
};
