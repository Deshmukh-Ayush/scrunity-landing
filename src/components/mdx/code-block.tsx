"use client";

import React from "react";
import { CopyButton } from "./copy-button";

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  // Extract text from children for copying
  interface ElementWithChildren {
    children?: React.ReactNode;
    className?: string;
  }

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement<ElementWithChildren>(node) && node.props?.children) {
      return extractText(node.props.children);
    }
    return "";
  };

  const codeText = extractText(children);

  // Extract language from child code component if available
  let language = "CODE";
  if (React.isValidElement<ElementWithChildren>(children) && children.props?.className) {
    const match = children.props.className.match(/language-(\w+)/);
    if (match) {
      language = match[1].toUpperCase();
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-[14px] border border-neutral-800 bg-[#141414] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      {/* Code Header Bar */}
      <div className="flex h-9 items-center justify-between border-b border-neutral-800/80 bg-neutral-900/60 px-4">
        <div className="flex items-center gap-2">
          {/* Mac-style subtle window dots */}
          <div className="flex items-center gap-1.5 opacity-60 transition-opacity group-hover:opacity-100">
            <span className="size-2.5 rounded-full bg-neutral-700/80" />
            <span className="size-2.5 rounded-full bg-neutral-700/80" />
            <span className="size-2.5 rounded-full bg-neutral-700/80" />
          </div>
          <span className="ml-2 font-mono text-[10px] font-medium tracking-wider text-neutral-400">
            {language}
          </span>
        </div>
        <CopyButton text={codeText} />
      </div>

      {/* Code Content */}
      <pre
        {...props}
        className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-200 selection:bg-neutral-700/60"
      >
        {children}
      </pre>
    </div>
  );
}
