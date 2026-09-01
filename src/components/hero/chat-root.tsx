"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chat } from "./ai-chat";
import { AIInput } from "./ai-input";
import { CONVERSATION_SCRIPT, type Message } from "./mock-data";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ChatRoot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll strictly inside the chat container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, inputText]);

  useEffect(() => {
    let isMounted = true;

    const runConversation = async () => {
      setMessages([]);
      setInputText("");
      await sleep(1000);

      for (let t = 0; t < CONVERSATION_SCRIPT.length; t++) {
        if (!isMounted) break;
        const turn = CONVERSATION_SCRIPT[t];

        // 1. Typewriter input
        setIsTyping(true);
        for (let i = 1; i <= turn.prompt.length; i++) {
          if (!isMounted) break;
          setInputText(turn.prompt.slice(0, i));
          await sleep(25 + Math.random() * 20);
        }
        setIsTyping(false);
        await sleep(500);
        if (!isMounted) break;

        // 2. Submit prompt
        setIsSubmitting(true);
        await sleep(200);
        if (!isMounted) break;

        const userMsgId = `usr-${Date.now()}-${t}`;
        const asstMsgId = `asst-${Date.now()}-${t}`;

        const userMsg: Message = {
          id: userMsgId,
          role: "user",
          content: turn.prompt,
        };

        const asstMsg: Message = {
          id: asstMsgId,
          role: "assistant",
          steps: turn.steps.map((st, idx) => ({
            ...st,
            status: idx === 0 ? "running" : "pending",
          })),
          content: "",
          isStreaming: true,
        };

        setMessages((prev) => [...prev, userMsg, asstMsg]);
        setInputText("");
        setIsSubmitting(false);

        // 3. Resolve execution steps (2.5s to 3.5s per step)
        for (let s = 0; s < turn.steps.length; s++) {
          const stepDuration = 2500 + Math.random() * 1000;
          await sleep(stepDuration);
          if (!isMounted) break;

          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id !== asstMsgId || !msg.steps) return msg;
              const updated = msg.steps.map((st, idx) => {
                if (idx === s) return { ...st, status: "completed" as const };
                if (idx === s + 1) return { ...st, status: "running" as const };
                return st;
              });
              return { ...msg, steps: updated };
            }),
          );
        }

        // 4. Stream words
        await sleep(250);
        const words = turn.content.split(" ");
        let streamText = "";

        for (let w = 0; w < words.length; w++) {
          if (!isMounted) break;
          streamText += (w === 0 ? "" : " ") + words[w];
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === asstMsgId ? { ...msg, content: streamText } : msg,
            ),
          );
          await sleep(35);
        }

        // 5. Mount Widget
        if (turn.widget) {
          await sleep(300);
          if (!isMounted) break;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === asstMsgId
                ? { ...msg, widget: turn.widget, isStreaming: false }
                : msg,
            ),
          );
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === asstMsgId ? { ...msg, isStreaming: false } : msg,
            ),
          );
        }

        // Pause before typing next turn (if not on the last turn)
        if (t < CONVERSATION_SCRIPT.length - 1) {
          await sleep(2500);
        }
      }
    };

    runConversation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex h-full w-full max-w-3xl flex-col justify-between">
      {/* Scrollable messages viewport */}
      <Chat.Root ref={containerRef} className="min-h-0 flex-1">
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
      </Chat.Root>

      {/* Input Dock (Fixed at bottom) */}
      <div className="shrink-0 pt-3 pb-2">
        <AIInput
          value={inputText}
          isTyping={isTyping}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
