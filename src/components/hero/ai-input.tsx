"use client";

import React from "react";
import { ArrowUp, Plus } from "@phosphor-icons/react";

interface AIInputProps {
  value: string;
  isTyping?: boolean;
  isSubmitting?: boolean;
}

export const AIInput = ({
  value,
  isTyping = false,
  isSubmitting = false,
}: AIInputProps) => {
  return (
    <div className="relative mx-auto w-full select-none">
      <div className="flex min-h-[100px] w-full flex-col justify-between rounded-[14px] border border-[#E8E8E8] bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.06),0px_1px_4px_0px_rgba(0,0,0,0.06)]">
        {/* Simulated Textarea */}
        <div className="flex h-full w-full flex-1 items-start p-3 text-[15px] leading-relaxed tracking-tight text-neutral-900">
          {value ? (
            <span>
              {value}
              {isTyping && (
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-neutral-900 align-middle" />
              )}
            </span>
          ) : (
            <span className="text-gray-400">
              Ask anything or @ to add context
              {isTyping && (
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-neutral-400 align-middle" />
              )}
            </span>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#E8E8E8] bg-white text-neutral-500">
            <Plus className="h-4 w-4" />
          </div>

          <div
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#0088C4] text-white transition-transform duration-150 ${
              isSubmitting ? "scale-90 opacity-80" : "opacity-100"
            }`}
          >
            <ArrowUp className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
