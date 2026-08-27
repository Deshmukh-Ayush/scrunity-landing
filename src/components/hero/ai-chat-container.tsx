import React from "react";

export type ChatRootProps = React.HTMLAttributes<HTMLDivElement>;

export const ChatRoot = React.forwardRef<HTMLDivElement, ChatRootProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex h-full w-full [scrollbar-width:none] flex-col gap-6 overflow-y-auto px-2 py-6 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ChatRoot.displayName = "ChatRoot";
