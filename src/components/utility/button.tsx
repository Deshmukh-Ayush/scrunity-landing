import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const Button = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: "#" | string;
}) => {
  const linkHref = href ?? "#";

  return (
    <div
      className={cn(
        `text-shadow cursor-pointer rounded-full border border-neutral-800 bg-neutral-800 px-6 py-2 text-[15px] text-neutral-50 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]`,
        className,
      )}
    >
      <Link href={linkHref}>{children}</Link>
    </div>
  );
};
