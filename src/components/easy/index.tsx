import { cn } from "@/lib/utils";
import { ContractsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

const ICON_BOX_CLASS =
  "flex items-center justify-center rounded-full border border-[oklch(0.309_0.031_157.2)] bg-[oklch(0.214_0.035_155.483)] p-3";

export const Easy = () => {
  return (
    <div className="flex h-full w-full flex-col gap-10">
      <div className="relative flex h-[486px] w-full items-center justify-between gap-10 rounded-lg border border-gray-200 bg-[oklch(0.15_0_0)] p-10 px-10">
        <User />
        <Contract />
        <Proposal />
        <Deliverables />
        <Client />
      </div>
    </div>
  );
};

const IconBox = ({
  children,
  className,
  wrapperClassName,
  text,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  text?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        wrapperClassName,
      )}
    >
      <div className="flex items-center justify-center rounded-full border border-neutral-800 bg-transparent p-1.5">
        <div className={cn(ICON_BOX_CLASS, className)}>{children}</div>
      </div>
      <p className="text-center text-lg tracking-tight text-neutral-200">
        {text}
      </p>
    </div>
  );
};

const User = () => {
  return (
    <IconBox text="You">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle h-16 w-16 rounded-full bg-[oklch(0.791_0.209_151.662)] text-[oklch(0.214_0.035_155.483)]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> */}
        <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
      </svg>
    </IconBox>
  );
};

const Client = () => {
  return (
    <IconBox
      text="Client"
      className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle h-16 w-16 rounded-full bg-[oklch(0.704_0.159_253.4)] text-[oklch(0.283_0.091_267.5)]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> */}
        <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
      </svg>
    </IconBox>
  );
};

const Contract = () => {
  return (
    <IconBox
      text="Contract"
      wrapperClassName="absolute left-70 top-10"
      className="border-[oklch(0.364_0.078_269.8)] bg-[oklch(0.283_0.091_267.5)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-file-description h-16 w-16 bg-[oklch(0.283_0.091_267.5)] text-[oklch(0.704_0.159_253.4)]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
        <path d="M19 7h-4l-.001 -4.001z" />
      </svg>
    </IconBox>
  );
};

const Proposal = () => {
  return (
    <IconBox
      text="Proposal"
      wrapperClassName="absolute right-110 bottom-10"
      className="border-[oklch(0.306_0.026_54.2)] bg-[oklch(0.21_0.032_52.2)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-file-description h-16 w-16 text-[oklch(0.746_0.18_56.7)]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
        <path d="M19 7h-4l-.001 -4.001z" />
      </svg>
    </IconBox>
  );
};

const Deliverables = () => {
  return (
    <IconBox
      text="Deliverables"
      wrapperClassName="absolute right-100 top-10"
      className="border-[oklch(0.232_0.095_28.753)] bg-[oklch(0.232_0.095_28.709)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-send h-16 w-16 text-[oklch(0.632_0.254_28.753)]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21.864 3.549l-6.454 17.868a1.55 1.55 0 0 1 -1.41 .903a1.54 1.54 0 0 1 -1.394 -.874l-2.88 -5.759zm-1.414 -1.414l-12.139 12.138l-5.728 -2.864a1.55 1.55 0 0 1 -.903 -1.409c0 -.606 .353 -1.157 .981 -1.44z" />
      </svg>
    </IconBox>
  );
};
