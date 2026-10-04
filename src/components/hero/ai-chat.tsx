"use client";

import React, { createContext, useContext } from "react";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import {
  CheckCircle,
  CircleNotch,
  ShieldCheck,
  WarningCircle,
  Buildings,
  EnvelopeSimple,
  CalendarCheck,
  PencilSimple,
  TrendUp,
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

export interface ChatMessageProps extends HTMLMotionProps<"div"> {
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
      <p className="text-[14px] leading-relaxed tracking-tight whitespace-pre-line text-neutral-800">
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
          status === "running" ? "text-neutral-800 font-medium" : "text-neutral-500"
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
      className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs"
    >
      {/* 1. ICP Discovery Widget */}
      {widget.type === "icp-discovery" && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Buildings className="h-4 w-4 text-blue-500" weight="bold" />
              <span className="text-xs font-semibold text-neutral-900">
                {widget.company}
              </span>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono">
                {widget.industry}
              </span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" weight="fill" />
              Fit: {widget.fitScore}%
            </span>
          </div>

          <div className="rounded-lg bg-gray-50/70 p-2.5 text-xs text-neutral-700 space-y-1 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-neutral-400">Firmographics:</span>
              <span className="font-mono text-neutral-800">{widget.employees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Key Decision Maker:</span>
              <span className="font-semibold text-neutral-900">{widget.targetBuyer}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Personalized Email Draft Widget */}
      {widget.type === "email-draft" && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2">
              <EnvelopeSimple className="h-4 w-4 text-purple-600" weight="bold" />
              <span className="text-xs font-semibold text-neutral-900">
                Draft for {widget.recipient}
              </span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-100">
              <PencilSimple className="h-3 w-3 text-blue-500" />
              Editable Draft
            </span>
          </div>

          <div className="text-xs space-y-1.5">
            <div className="text-neutral-500">
              <span className="font-medium text-neutral-700">Subject:</span> &ldquo;{widget.subject}&rdquo;
            </div>
            <div className="rounded-lg bg-gray-50/70 p-2.5 text-[11px] text-neutral-600 italic border border-gray-100 leading-relaxed">
              &ldquo;{widget.snippet}&rdquo;
            </div>
            <div className="flex justify-between pt-1 text-[10px] text-neutral-400 font-mono">
              <span>Deliverability Score:</span>
              <span className="text-emerald-600 font-semibold">{widget.deliverabilityScore}</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Booked Meeting & Doubling Down Widget */}
      {widget.type === "meeting-booked" && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-emerald-600" weight="fill" />
              <span className="text-xs font-semibold text-neutral-900">
                Demo Booked: {widget.attendee}
              </span>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100">
              Calendar Synced ✓
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            <div className="rounded-lg bg-gray-50 p-2 border border-gray-100">
              <span className="text-[10px] text-neutral-400 uppercase">Confirmed Slot</span>
              <p className="text-xs font-semibold text-neutral-800 mt-0.5">{widget.time}</p>
            </div>
            <div className="rounded-lg bg-emerald-50/50 p-2 border border-emerald-100">
              <span className="text-[10px] text-emerald-700 uppercase">Doubled Down</span>
              <p className="text-xs font-semibold text-emerald-900 mt-0.5">{widget.reallocatedVolume}</p>
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
