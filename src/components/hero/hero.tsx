import React from "react";
import { ChatRoot } from "./chat-root";
import { HeroSidebar } from "./sidebar";

export const Hero = () => {
  return (
    <div className="shadow-border-sm pointer-events-none relative flex h-[min(760px,calc(100svh-2rem))] min-h-[540px] w-full min-w-0 overflow-hidden rounded-[8px] bg-white select-none md:h-screen md:min-h-0 md:min-w-[960px]">
      {/* Static Left Sidebar */}
      <HeroSidebar />

      {/* Center Showcase Stage */}
      <div className="mx-auto flex h-full w-full min-w-0 flex-1 flex-col items-center justify-center p-3 sm:p-6">
        <ChatRoot />
      </div>
    </div>
  );
};

// todo https://ibelick.com/blog/create-gradient-shadows-tailwind-css
