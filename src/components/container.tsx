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
    <div className={cn("mx-auto max-w-7xl bg-gray-50", className)}>
      {children}
    </div>
  );
};

// box-shadow for border-x: shadow-[0px_2px_2px_rgba(0,0,0,0.25)]
