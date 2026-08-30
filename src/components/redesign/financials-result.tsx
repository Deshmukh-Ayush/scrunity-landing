"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CurrencyDollarIcon } from "@phosphor-icons/react";

type MilestoneStatus = "collected" | "due" | "overdue" | "upcoming";

interface Milestone {
  id: string;
  name: string;
  amount: number;
  status: MilestoneStatus;
  /** Due date for due/overdue/upcoming, paid date for collected. */
  date?: string | Date;
}

interface FinancialsResultProps {
  projectName?: string;
  currency?: string;
  milestones?: Milestone[];
  onRemind?: (milestoneId: string) => void;
}

const STATUS_CONFIG: Record<
  MilestoneStatus,
  { label: string; dot: string; text: string; bar: string; priority: number }
> = {
  overdue: {
    label: "Overdue",
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-400",
    bar: "bg-rose-500",
    priority: 0,
  },
  due: {
    label: "Due",
    dot: "bg-zinc-400",
    text: "text-foreground",
    bar: "bg-zinc-400",
    priority: 1,
  },
  upcoming: {
    label: "Upcoming",
    dot: "bg-muted-foreground/30",
    text: "text-muted-foreground",
    bar: "bg-muted-foreground/25",
    priority: 2,
  },
  collected: {
    label: "Collected",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bar: "bg-emerald-500",
    priority: 3,
  },
};

const DAY = 1000 * 60 * 60 * 24;

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "1",
    name: "Project kickoff",
    amount: 6000,
    status: "collected",
    date: new Date(Date.now() - DAY * 40),
  },
  {
    id: "2",
    name: "Brand identity",
    amount: 6500,
    status: "collected",
    date: new Date(Date.now() - DAY * 22),
  },
  {
    id: "3",
    name: "Website delivery",
    amount: 6000,
    status: "due",
    date: new Date(Date.now() + DAY * 5),
  },
  {
    id: "4",
    name: "Final handoff",
    amount: 2500,
    status: "overdue",
    date: new Date(Date.now() - DAY * 9),
  },
  {
    id: "5",
    name: "Ongoing support retainer",
    amount: 4000,
    status: "upcoming",
    date: new Date(Date.now() + DAY * 30),
  },
];

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(input?: string | Date): string {
  if (!input) return "—";
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysOverdue(input?: string | Date): number {
  if (!input) return 0;
  const date = typeof input === "string" ? new Date(input) : input;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / DAY));
}

export function FinancialsResult({
  projectName,
  currency = "USD",
  milestones = DEFAULT_MILESTONES,
  onRemind,
}: FinancialsResultProps) {
  const totals = React.useMemo(() => {
    const byStatus: Record<MilestoneStatus, number> = {
      collected: 0,
      due: 0,
      overdue: 0,
      upcoming: 0,
    };
    for (const m of milestones) byStatus[m.status] += m.amount;
    const total = milestones.reduce((sum, m) => sum + m.amount, 0);
    return { ...byStatus, total };
  }, [milestones]);

  const hero =
    totals.overdue > 0
      ? {
          label: "Overdue",
          value: totals.overdue,
          tone: "text-rose-600 dark:text-rose-400",
        }
      : totals.due > 0
        ? { label: "Due", value: totals.due, tone: "text-foreground" }
        : {
            label: "Collected",
            value: totals.collected,
            tone: "text-emerald-600 dark:text-emerald-400",
          };

  const barOrder: MilestoneStatus[] = [
    "collected",
    "overdue",
    "due",
    "upcoming",
  ];
  const barSegments = barOrder
    .map((status) => ({ status, amount: totals[status] }))
    .filter((s) => s.amount > 0);

  const sortedMilestones = [...milestones].sort(
    (a, b) =>
      STATUS_CONFIG[a.status].priority - STATUS_CONFIG[b.status].priority,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className="border-border bg-background mx-auto w-3xl overflow-hidden rounded-xl border"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3">
        <CurrencyDollarIcon className="text-muted-foreground h-[17px] w-[17px]" />
        <div>
          <div className="text-[13px] font-semibold tracking-[-0.01em]">
            Financial summary
          </div>
          {projectName && (
            <div className="text-muted-foreground text-[12px]">
              {projectName}
            </div>
          )}
        </div>
        <span className="text-muted-foreground ml-auto text-[12px]">
          {milestones.length} milestones
        </span>
      </div>

      <div className="bg-border h-px w-full" />

      {/* Hero + payment health bar */}
      <div className="px-4 py-3.5">
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-semibold tabular-nums ${hero.tone}`}>
            {formatMoney(hero.value, currency)}
          </span>
          <span className="text-muted-foreground text-[13px]">
            {hero.label}
          </span>
          <span className="text-muted-foreground ml-auto text-[12px] tabular-nums">
            of {formatMoney(totals.total, currency)} total
          </span>
        </div>

        <div className="bg-muted mt-3 flex h-1.5 w-full overflow-hidden rounded-full">
          {barSegments.map((s) => (
            <div
              key={s.status}
              className={STATUS_CONFIG[s.status].bar}
              style={{ width: `${(s.amount / totals.total) * 100}%` }}
            />
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {barSegments.map((s) => (
            <span
              key={s.status}
              className={`flex items-center gap-1.5 text-[12px] tabular-nums ${STATUS_CONFIG[s.status].text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${STATUS_CONFIG[s.status].dot}`}
              />
              {formatMoney(s.amount, currency)}{" "}
              {STATUS_CONFIG[s.status].label.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-border h-px w-full" />

      {/* Milestones, most urgent first */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-[12.5px] font-medium">Milestone</th>
              <th className="px-4 py-2 text-[12.5px] font-medium">Date</th>
              <th className="px-4 py-2 text-right text-[12.5px] font-medium">
                Amount
              </th>
              <th className="px-4 py-2 text-right text-[12.5px] font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/40 divide-y">
            {sortedMilestones.map((m) => {
              const cfg = STATUS_CONFIG[m.status];
              const overdueDays =
                m.status === "overdue" ? daysOverdue(m.date) : 0;
              const canRemind =
                onRemind && (m.status === "due" || m.status === "overdue");
              return (
                <tr key={m.id} className="group text-foreground">
                  <td className="px-4 py-2 font-medium">{m.name}</td>
                  <td className="text-muted-foreground px-4 py-2 tabular-nums">
                    {formatDate(m.date)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">
                    {formatMoney(m.amount, currency)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      {canRemind && (
                        <button
                          onClick={() => onRemind?.(m.id)}
                          className="text-muted-foreground hover:text-foreground text-[12px] opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
                        >
                          Remind
                        </button>
                      )}
                      <span
                        className={`flex items-center gap-1.5 text-[12.5px] ${cfg.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                        />
                        {cfg.label}
                        {overdueDays > 0 && (
                          <span className="text-muted-foreground">
                            · {overdueDays}d
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
