import { cn } from "@/lib/utils";
import React from "react";

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative left-1/2 h-px w-screen -translate-x-1/2 bg-gray-200",
        className,
      )}
    />
  );
}
