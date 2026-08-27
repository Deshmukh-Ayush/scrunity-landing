import React from "react";
import { ChatRoot } from "./chat-root";
import { HeroSidebar } from "./sidebar";

export const Hero = () => {
  return (
    <div className="shadow-border pointer-events-none flex h-screen w-[1436px] overflow-hidden rounded-xl bg-gray-50 select-none">
      {/* Static Left Sidebar */}
      <HeroSidebar />

      {/* Center Showcase Stage */}
      <div className="mx-auto flex h-full w-full flex-1 flex-col items-center justify-center p-6">
        <ChatRoot />
      </div>
    </div>
  );
};
