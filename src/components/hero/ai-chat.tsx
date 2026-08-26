"use client";

import React, { createContext, useContext, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircleIcon,
  SpinnerIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import type { GenerativeWidget, MessageRole, StepStatus } from "./mock-data";

const MessageContext = createContext<{ role: MessageRole }>({
  role: "assistant",
});
const useMessage = () => useContext(MessageContext);

export type ChatRootProps = React.HTMLAttributes<HTMLDivElement>;
export const ChatRoot = ({
  children,
  className = "",
  ...props
}: ChatRootProps) => {
  return (
    <div
      className={`relative flex h-full w-full [scrollbar-width:none] flex-col gap-6 overflow-y-auto px-4 py-6 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ChatMessageProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd"
> {
  role: MessageRole;
}
export const ChatMessage = ({
  role,
  children,
  className = "",
  ...props
}: ChatMessageProps) => {
  const alignmentClass =
    role === "user"
      ? "self-end flex flex-col items-end"
      : "self-start flex w-full items-start gap-3";

  return (
    <MessageContext.Provider value={{ role }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`${alignmentClass} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    </MessageContext.Provider>
  );
};

export interface ChatAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  isStreaming?: boolean;
}
export const ChatAvatar = ({
  isStreaming = false,
  className = "",
  ...props
}: ChatAvatarProps) => {
  return (
    <div
      className={`relative mt-1 h-5 w-5 shrink-0 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 ${
        isStreaming ? "animate-pulse ring-2 ring-cyan-400/40" : ""
      } ${className}`}
      {...props}
    />
  );
};

export type ChatBodyProps = React.HTMLAttributes<HTMLDivElement>;
export const ChatBody = ({
  children,
  className = "",
  ...props
}: ChatBodyProps) => {
  return (
    <div className={`flex max-w-156 flex-col gap-2.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export type ChatBubbleProps = React.HTMLAttributes<HTMLDivElement>;
export const ChatBubble = ({
  children,
  className = "",
  ...props
}: ChatBubbleProps) => {
  const { role } = useMessage();
  const bubbleStyles =
    role === "user"
      ? "shadow-border-sm w-fit max-w-156 rounded-xl bg-gray-200 px-3.5 py-2 text-neutral-800"
      : "w-fit max-w-156 rounded-xl px-3 py-1.5 text-neutral-800";

  return (
    <div className={`${bubbleStyles} ${className}`} {...props}>
      <p className="text-[15px] leading-relaxed tracking-tight">{children}</p>
    </div>
  );
};

export type ChatStepsProps = React.HTMLAttributes<HTMLDivElement>;
export const ChatSteps = ({
  children,
  className = "",
  ...props
}: ChatStepsProps) => {
  return (
    <div
      className={`flex flex-col gap-1.5 rounded-lg bg-neutral-50/80 p-2 font-mono text-xs text-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ChatStepProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: StepStatus;
}
export const ChatStep = ({
  status = "completed",
  children,
  className = "",
  ...props
}: ChatStepProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      {status === "running" && (
        <SpinnerIcon className="h-3 w-3 animate-spin text-blue-500" />
      )}
      {status === "completed" && (
        <CheckCircleIcon className="h-3 w-3 text-emerald-500" weight="fill" />
      )}
      {status === "failed" && (
        <WarningIcon className="h-3 w-3 text-red-500" weight="fill" />
      )}
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
      )}
      <span
        className={
          status === "running" ? "text-neutral-800" : "text-neutral-500"
        }
      >
        {children}
      </span>
    </div>
  );
};

// --- Generative UI Slots ---
export const ChatGenerativeUI = ({ widget }: { widget: GenerativeWidget }) => {
  const [approved, setApproved] = useState<boolean | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mt-1 w-full rounded-xl border border-[#E8E8E8] bg-white p-3.5 shadow-xs"
    >
      {widget.type === "latency-metrics" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-800">
              {widget.title}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
              <ShieldCheckIcon className="h-3.5 w-3.5" /> Optimal
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            <div className="rounded-lg bg-neutral-50 p-2">
              <span className="text-[10px] text-neutral-400">AVG LATENCY</span>
              <p className="text-sm font-semibold text-neutral-800">
                {widget.latencyMs}ms
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-2">
              <span className="text-[10px] text-neutral-400">P99 PEAK</span>
              <p className="text-sm font-semibold text-neutral-800">
                {widget.p99Ms}ms
              </p>
            </div>
          </div>
        </div>
      )}

      {widget.type === "approval-card" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-800">
              {widget.actionTitle}
            </span>
            <span className="text-[11px] text-neutral-400">
              Action Required
            </span>
          </div>
          <p className="text-xs text-neutral-600">{widget.description}</p>
          <div className="rounded-md bg-neutral-900 p-2 font-mono text-[11px] text-emerald-400">
            {widget.diffSummary}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {approved === null ? (
              <>
                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  className="cursor-pointer rounded-lg bg-[#0088C4] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                  Approve Execution
                </button>
                <button
                  type="button"
                  onClick={() => setApproved(false)}
                  className="cursor-pointer rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 active:scale-[0.98]"
                >
                  Reject
                </button>
              </>
            ) : (
              <span
                className={`text-xs font-medium ${
                  approved ? "text-emerald-600" : "text-neutral-400"
                }`}
              >
                {approved
                  ? "✓ Action approved and deployed"
                  : "✕ Action canceled"}
              </span>
            )}
          </div>
        </div>
      )}

      {widget.type === "revenue-audit" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-800">
              Pipeline Health
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendUpIcon className="h-3.5 w-3.5" /> {widget.wonRate}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-lg bg-neutral-50 p-2">
              <span className="text-[10px] text-neutral-400">PIPELINE</span>
              <p className="text-sm font-semibold text-neutral-800">
                {widget.totalPipeline}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-2">
              <span className="text-[10px] text-neutral-400">AT RISK</span>
              <p className="text-sm font-semibold text-red-600">
                {widget.atRisk}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const Chat = {
  Root: ChatRoot,
  Message: ChatMessage,
  Avatar: ChatAvatar,
  Body: ChatBody,
  Bubble: ChatBubble,
  Steps: ChatSteps,
  Step: ChatStep,
  GenerativeUI: ChatGenerativeUI,
};
