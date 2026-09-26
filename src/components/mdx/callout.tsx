import React from "react";
import {
  InfoIcon,
  SparkleIcon,
  WarningCircleIcon,
  BookmarkSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "tip" | "warning" | "note";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const config: Record<
  CalloutType,
  {
    bg: string;
    border: string;
    text: string;
    titleColor: string;
    icon: React.ComponentType<{
      size?: number;
      className?: string;
      weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
    }>;
    defaultTitle: string;
  }
> = {
  info: {
    bg: "bg-blue-50/60",
    border: "border-blue-200/80",
    text: "text-blue-950",
    titleColor: "text-blue-900",
    icon: InfoIcon,
    defaultTitle: "Note",
  },
  tip: {
    bg: "bg-emerald-50/60",
    border: "border-emerald-200/80",
    text: "text-emerald-950",
    titleColor: "text-emerald-900",
    icon: SparkleIcon,
    defaultTitle: "Tip",
  },
  warning: {
    bg: "bg-amber-50/60",
    border: "border-amber-200/80",
    text: "text-amber-950",
    titleColor: "text-amber-900",
    icon: WarningCircleIcon,
    defaultTitle: "Warning",
  },
  note: {
    bg: "bg-neutral-100/70",
    border: "border-neutral-200",
    text: "text-neutral-800",
    titleColor: "text-neutral-900",
    icon: BookmarkSimpleIcon,
    defaultTitle: "Reference",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const current = config[type] || config.info;
  const Icon = current.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3.5 rounded-[14px] border p-4 text-sm leading-relaxed shadow-xs transition-colors",
        current.bg,
        current.border,
        current.text,
        className,
      )}
    >
      <div className="mt-0.5 shrink-0">
        <Icon size={18} weight="fill" className={current.titleColor} />
      </div>
      <div className="flex-1 space-y-1">
        {title && (
          <p className={cn("font-medium tracking-tight", current.titleColor)}>
            {title}
          </p>
        )}
        <div className="text-[14px] leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
