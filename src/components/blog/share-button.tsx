"use client";

import React, { useState } from "react";
import { LinkSimpleIcon, CheckIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-2xs transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-neutral-900"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1 text-emerald-600"
          >
            <CheckIcon size={13} weight="bold" />
            <span>Copied link</span>
          </motion.span>
        ) : (
          <motion.span
            key="link"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1"
          >
            <LinkSimpleIcon size={13} weight="bold" />
            <span>Share</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
