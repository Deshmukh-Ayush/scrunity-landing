"use client";

import React from "react";
import {
  DeskIcon,
  CaretRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";

type DeliverableStatus =
  | "in_review"
  | "revision_requested"
  | "approved"
  | "pending";

interface Deliverable {
  id: string;
  name: string;
  project?: string;
  status: DeliverableStatus;
  updatedAt?: string | Date;
}

interface WorkspaceOverviewResult {
  totalProjects?: number;
  activeProjects?: number;
  inReviewDeliverablesCount?: number;
  totalProposalPipeline?: number | string;
  inReviewDeliverables?: unknown[];
  projects?: unknown[];
  error?: unknown;
}

interface WorkspaceOverviewUIProps {
  result?: unknown;
  lastUpdated?: string | Date;
  inReviewCount?: number;
  projectCount?: number;
  pipelineValue?: string;
  deliverables?: Deliverable[];
  totalPendingCount?: number;
  onViewAll?: () => void;
}

const STATUS_CONFIG: Record<
  DeliverableStatus,
  { label: string; dot: string; text: string; priority: number }
> = {
  revision_requested: {
    label: "Revision requested",
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-400",
    priority: 0,
  },
  in_review: {
    label: "In review",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    priority: 1,
  },
  approved: {
    label: "Approved",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    priority: 2,
  },
  pending: {
    label: "Pending",
    dot: "bg-neutral-400",
    text: "text-neutral-500",
    priority: 3,
  },
};

const HOUR = 1000 * 60 * 60;

const DEFAULT_DELIVERABLES: Deliverable[] = [
  {
    id: "1",
    name: "Landing page design",
    project: "Nova Robotics",
    status: "revision_requested",
    updatedAt: new Date(Date.now() - HOUR * 96),
  },
  {
    id: "2",
    name: "Brand identity system",
    project: "Verdant & Co",
    status: "in_review",
    updatedAt: new Date(Date.now() - HOUR * 6),
  },
  {
    id: "3",
    name: "Mobile app prototype",
    project: "Nova Robotics",
    status: "approved",
    updatedAt: new Date(Date.now() - HOUR * 48),
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

function relativeTime(input?: string | Date): string | null {
  if (!input) return null;

  const date = typeof input === "string" ? new Date(input) : input;
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) return null;

  const diffMin = Math.round((Date.now() - timestamp) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  return `${Math.round(diffHr / 24)}d ago`;
}

function normalizeStatus(value: unknown): DeliverableStatus {
  if (
    value === "in_review" ||
    value === "revision_requested" ||
    value === "approved" ||
    value === "pending"
  ) {
    return value;
  }

  return "pending";
}

function formatPipelineValue(value: number | string | undefined): string {
  if (typeof value === "string") return value;
  if (typeof value !== "number" || !Number.isFinite(value)) return "$0";

  return `$${value.toLocaleString("en-US")}`;
}

function extractDeliverables(result: Record<string, unknown>): Deliverable[] {
  if (!Array.isArray(result.inReviewDeliverables)) {
    return [];
  }

  return result.inReviewDeliverables
    .filter(isRecord)
    .map((item, index) => ({
      id:
        typeof item.id === "string"
          ? item.id
          : typeof item.id === "number"
            ? String(item.id)
            : `deliverable-${index}`,
      name:
        typeof item.title === "string"
          ? item.title
          : typeof item.name === "string"
            ? item.name
            : "Untitled deliverable",
      project:
        typeof item.project === "string"
          ? item.project
          : typeof item.projectName === "string"
            ? item.projectName
            : undefined,
      status: normalizeStatus(item.status),
      updatedAt:
        typeof item.updatedAt === "string" || item.updatedAt instanceof Date
          ? item.updatedAt
          : undefined,
    }));
}

export const WorkspaceOverviewUI = ({
  result,
  lastUpdated = new Date(),
  inReviewCount,
  projectCount,
  pipelineValue,
  deliverables,
  totalPendingCount,
  onViewAll,
}: WorkspaceOverviewUIProps) => {
  let resolvedInReviewCount = inReviewCount ?? 4;
  let resolvedProjectCount = projectCount ?? 8;
  let resolvedPipelineValue = pipelineValue ?? "$24,500";
  let resolvedDeliverables = deliverables ?? DEFAULT_DELIVERABLES;
  let resolvedTotalPendingCount = totalPendingCount;

  if (isRecord(result) && typeof result.error !== "string") {
    if (typeof result.inReviewDeliverablesCount === "number") {
      resolvedInReviewCount = result.inReviewDeliverablesCount;
    }

    if (typeof result.totalProjects === "number") {
      resolvedProjectCount = result.totalProjects;
    }

    if (
      typeof result.totalProposalPipeline === "number" ||
      typeof result.totalProposalPipeline === "string"
    ) {
      resolvedPipelineValue = formatPipelineValue(result.totalProposalPipeline);
    }

    if (deliverables === undefined) {
      const parsedDeliverables = extractDeliverables(result);
      resolvedDeliverables = parsedDeliverables;
    }

    if (
      resolvedTotalPendingCount === undefined &&
      typeof result.inReviewDeliverablesCount === "number"
    ) {
      resolvedTotalPendingCount = result.inReviewDeliverablesCount;
    }
  }

  const sorted = [...resolvedDeliverables].sort(
    (a, b) =>
      STATUS_CONFIG[a.status].priority - STATUS_CONFIG[b.status].priority,
  );

  const pendingShown = sorted.filter((d) => d.status !== "approved").length;
  const overflow =
    resolvedTotalPendingCount !== undefined
      ? Math.max(resolvedTotalPendingCount - pendingShown, 0)
      : 0;

  return (
    <div className="border-border text-foreground mx-auto w-3xl overflow-hidden rounded-xl border border-neutral-100 shadow-xs">
      <div className="flex items-center gap-2.5 bg-gray-100 px-4 py-3">
        <span className="text-[14px] font-medium text-neutral-900">
          Workspace overview
        </span>
        <span className="ml-auto text-[11px] text-neutral-500">
          Updated {relativeTime(lastUpdated)}
        </span>
      </div>

      <div className="h-px w-full bg-neutral-100" />

      <div className="grid grid-cols-3 divide-x divide-neutral-100">
        <Stat
          label="In review"
          value={resolvedInReviewCount}
          flag={resolvedInReviewCount > 0}
        />
        <Stat label="Projects" value={resolvedProjectCount} />
        <Stat label="Pipeline" value={resolvedPipelineValue} mono />
      </div>

      <div className="h-px w-full bg-neutral-100" />

      <div>
        <div className="px-4 pt-3 pb-1 text-[14px] text-neutral-500">
          Deliverables
        </div>
        <ul>
          {sorted.map((d, i) => {
            const cfg = STATUS_CONFIG[d.status];
            const rel = relativeTime(d.updatedAt);
            return (
              <li
                key={d.id}
                className={`group flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 transition-colors duration-200 hover:bg-gray-100 ${
                  i !== sorted.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-[14px] text-neutral-900">
                    {d.name}
                  </div>
                  <div className="truncate text-[14px] text-neutral-400">
                    {[d.project, rel].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`flex items-center gap-1.5 text-[12.5px] ${cfg.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  <CaretRightIcon className="h-3 w-3 text-neutral-400/0 transition-colors group-hover:text-neutral-400/60" />
                </div>
              </li>
            );
          })}
        </ul>
        {overflow > 0 && (
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            +{overflow} more pending review
          </div>
        )}
      </div>

      <div className="bg-border h-px w-full" />

      <button
        onClick={onViewAll}
        className="hover:text-foreground flex w-full items-center justify-between px-4 py-2.5 text-[12.5px] text-neutral-400 transition-colors"
      >
        View all projects
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const Stat = ({
  label,
  value,
  flag,
  mono,
}: {
  label: string;
  value: string | number;
  flag?: boolean;
  mono?: boolean;
}) => (
  <div className="flex flex-col gap-0.5 px-4 py-3">
    <span
      className={`tabular-nums text-[15px] font-semibold ${
        mono ? "font-mono" : ""
      } ${flag ? "text-amber-600 dark:text-amber-400" : "text-neutral-900"}`}
    >
      {value}
    </span>
    <span className="text-[12px] text-neutral-400">{label}</span>
  </div>
);