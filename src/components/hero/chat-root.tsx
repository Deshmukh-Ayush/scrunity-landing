"use client";

import React, { useState, useRef, useEffect } from "react";
import { Chat } from "./ai-chat";
import {
  INITIAL_MESSAGES,
  SCENARIO_RESPONSES,
  type Message,
  type AgentStep,
} from "./mock-data";
import { AIInput } from "./ai-input";

export const ChatRoot = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scenarioIndex = useRef(0);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userText: string) => {
    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: userText,
    };

    const nextScenario =
      SCENARIO_RESPONSES[scenarioIndex.current % SCENARIO_RESPONSES.length];
    scenarioIndex.current += 1;

    const assistantMessageId = `asst-${Date.now()}`;
    const initialSteps: AgentStep[] = nextScenario.steps.map((s, idx) => ({
      ...s,
      status: idx === 0 ? "running" : "pending",
    }));

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      steps: initialSteps,
      content: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsGenerating(true);

    // 1. Simulate step execution progression
    for (let i = 0; i < nextScenario.steps.length; i++) {
      await new Promise((res) => setTimeout(res, 750));
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== assistantMessageId || !msg.steps) return msg;
          const updatedSteps = msg.steps.map((st, idx) => {
            if (idx === i) return { ...st, status: "completed" as const };
            if (idx === i + 1) return { ...st, status: "running" as const };
            return st;
          });
          return { ...msg, steps: updatedSteps };
        }),
      );
    }

    // 2. Simulate token-by-token streaming
    const fullText = nextScenario.content;
    let accumulatedText = "";
    const tokens = fullText.split(" ");

    for (let i = 0; i < tokens.length; i++) {
      accumulatedText += (i === 0 ? "" : " ") + tokens[i];
      await new Promise((res) => setTimeout(res, 45));

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: accumulatedText }
            : msg,
        ),
      );
    }

    // 3. Inject Generative UI widget & complete streaming
    await new Promise((res) => setTimeout(res, 200));
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === assistantMessageId
          ? {
              ...msg,
              widget: nextScenario.widget,
              isStreaming: false,
            }
          : msg,
      ),
    );

    setIsGenerating(false);
  };

  return (
    <div className="flex h-full w-full max-w-3xl flex-col justify-between">
      {/* Scrollable Message List */}
      <Chat.Root className="flex-1">
        {messages.map((msg) => (
          <Chat.Message key={msg.id} role={msg.role}>
            {msg.role === "assistant" && (
              <Chat.Avatar isStreaming={msg.isStreaming} />
            )}

            <Chat.Body>
              {msg.steps && msg.steps.length > 0 && (
                <Chat.Steps>
                  {msg.steps.map((step) => (
                    <Chat.Step key={step.id} status={step.status}>
                      {step.label}
                    </Chat.Step>
                  ))}
                </Chat.Steps>
              )}

              {msg.content && <Chat.Bubble>{msg.content}</Chat.Bubble>}

              {msg.widget && <Chat.GenerativeUI widget={msg.widget} />}
            </Chat.Body>
          </Chat.Message>
        ))}
        <div ref={scrollRef} />
      </Chat.Root>

      {/* Input Dock */}
      <div className="pt-2 pb-4">
        <AIInput onSendMessage={handleSendMessage} disabled={isGenerating} />
      </div>
    </div>
  );
};
