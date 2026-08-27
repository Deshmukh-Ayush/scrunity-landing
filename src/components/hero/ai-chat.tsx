"use client";

import React, { createContext, useContext } from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  CircleNotch,
  ShieldCheck,
  TrendUp,
  WarningCircle,
} from "@phosphor-icons/react";
import type { GenerativeWidget, MessageRole, StepStatus } from "./mock-data";

const MessageContext = createContext<{ role: MessageRole }>({
  role: "assistant",
});

const useMessage = () => useContext(MessageContext);

export type ChatRootProps = React.HTMLAttributes<HTMLDivElement>;

export const ChatRoot = React.forwardRef<HTMLDivElement, ChatRootProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex h-full w-full [scrollbar-width:none] flex-col gap-6 overflow-y-auto px-2 py-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ChatRoot.displayName = "ChatRoot";

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
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
      : "self-start flex w-full items-start gap-2.5";

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
      className={`mt-1 h-5 w-5 shrink-0 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 ${
        isStreaming ? "animate-pulse ring-2 ring-cyan-400/30" : ""
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
    <div className={`flex max-w-156 flex-col gap-2 ${className}`} {...props}>
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
      ? "shadow-border-sm w-fit max-w-156 rounded-xl bg-gray-200 px-3 py-1.5 text-neutral-800"
      : "w-fit max-w-156 rounded-xl px-3 py-1.5 text-neutral-800";

  return (
    <div className={`${bubbleStyles} ${className}`} {...props}>
      <p className="text-[15px] leading-relaxed tracking-tight whitespace-pre-line">
        {children}
      </p>
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
      className={`flex flex-col gap-1.5 px-3 py-1 font-mono text-xs text-neutral-500 ${className}`}
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
        <CircleNotch className="h-3 w-3 shrink-0 animate-spin text-blue-500" />
      )}
      {status === "completed" && (
        <CheckCircle
          className="h-3 w-3 shrink-0 text-emerald-500"
          weight="fill"
        />
      )}
      {status === "failed" && (
        <WarningCircle
          className="h-3 w-3 shrink-0 text-red-500"
          weight="fill"
        />
      )}
      {status === "pending" && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
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

export const ChatGenerativeUI = ({ widget }: { widget: GenerativeWidget }) => {
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
              <ShieldCheck className="h-3.5 w-3.5" /> Optimal
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

      {widget.type === "revenue-audit" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-800">
              Pipeline Velocity
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendUp className="h-3.5 w-3.5" /> {widget.wonRate}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-lg bg-neutral-50 p-2">
              <span className="text-[10px] text-neutral-400">
                TOTAL PIPELINE
              </span>
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
