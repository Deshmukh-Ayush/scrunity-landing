import { cn } from "cn";
import React from "react";
import Image from "next/image";

export const Illustration = () => {
  return (
    <div className="shadow-border relative flex h-170 w-130 flex-col items-center justify-between gap-2 rounded-lg bg-gray-100 p-2">
      <div className="flex w-full justify-between">
        <Titles>Contracts</Titles>
        <Titles>Deliverables</Titles>
        <Titles>Invoices</Titles>
      </div>
      <div className="shadow-border-sm flex h-20 w-20 items-center justify-center rounded-lg p-1">
        <Image
          src="/logo/scrunity_svg.svg"
          alt="Scrunity Logo"
          width={100}
          height={100}
          className="h-auto w-8"
        />
      </div>
      <div>
        <Titles>Clients</Titles>
      </div>
    </div>
  );
};

export const Titles = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        `shadow-border flex h-10 w-34 items-center justify-center rounded-lg bg-white text-[20px] font-medium tracking-tight text-neutral-800`,
        className,
      )}
    >
      {children}
    </p>
  );
};
