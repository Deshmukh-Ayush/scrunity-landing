import React from "react";
import { ChatRoot } from "./chat-root";

export const Hero = () => {
  return (
    <div className="shadow-border pointer-events-none h-screen w-[1436px] rounded-xl bg-gray-50 select-none">
      <div className="mx-auto flex h-full w-3xl flex-col items-center justify-center p-4">
        <ChatRoot />
      </div>
    </div>
  );
};
