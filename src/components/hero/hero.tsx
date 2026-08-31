import React from "react";
import { ChatRoot } from "./chat-root";
import { HeroSidebar } from "./sidebar";

export const Hero = () => {
  return (
    <div className="shadow-border-sm pointer-events-none relative flex h-screen w-[1436px] overflow-hidden rounded-xl bg-white select-none">
      {/* Static Left Sidebar */}
      <HeroSidebar />

      {/* Center Showcase Stage */}
      <div className="mx-auto flex h-full w-full flex-1 flex-col items-center justify-center p-6">
        <ChatRoot />
      </div>
    </div>
  );
};

// todo https://ibelick.com/blog/create-gradient-shadows-tailwind-css
