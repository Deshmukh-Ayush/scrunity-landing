"use client";

import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Copied code" : "Copy code"}
      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700/60 bg-neutral-800/80 px-2 py-1 text-[11px] font-medium text-neutral-300 shadow-xs backdrop-blur-xs transition-colors hover:border-neutral-600 hover:bg-neutral-700/80 hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1 text-emerald-400"
          >
            <CheckIcon size={12} weight="bold" />
            <span>Copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <CopyIcon size={12} />
            <span>Copy</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
