import * as React from "react";
import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-neutral-200 bg-transparent px-2.5 py-2 text-base text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus-visible:border-[var(--brand)] focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--brand),transparent_50%)] disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-red-600 aria-invalid:ring-3 aria-invalid:ring-red-600/20 md:text-sm dark:bg-neutral-900/30 dark:disabled:bg-neutral-800 dark:aria-invalid:border-red-600/50 dark:aria-invalid:ring-red-600/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
