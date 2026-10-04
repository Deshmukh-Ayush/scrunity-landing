import React from "react";
import { ChatRoot } from "./chat-root";
import { HeroSidebar } from "./sidebar";
import { EverywhereayushShader } from "@/components/join/shader";

export const Hero = () => {
  return (
    <div className="shadow-border-sm relative flex h-[min(760px,calc(100svh-2rem))] min-h-[540px] w-full min-w-0 overflow-hidden rounded-[8px] bg-white select-none md:h-screen md:min-h-0 md:min-w-[960px]">
      {/* Subtle WebGL Shader Ambient Flow in Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10 mask-[radial-gradient(ellipse_70%_60%_at_65%_40%,#000_30%,transparent_100%)]">
        <EverywhereayushShader theme="light" />
      </div>

      {/* Static Left Sidebar */}
      <HeroSidebar />

      {/* Center Showcase Stage */}
      <div className="relative z-10 mx-auto flex h-full w-full min-w-0 flex-1 flex-col items-center justify-center p-3 sm:p-6">
        <ChatRoot />
      </div>
    </div>
  );
};
