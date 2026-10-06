"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { SubHeading, Para } from "@/components/utility/texts";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Will outbound outreach risk our primary company domain reputation?",
    answer:
      "Never. Scrunity AI never dispatches cold outreach from your primary domain. We automatically provision, isolate, and warm dedicated secondary domains (e.g., yourcompany-hq.com) configured with full SPF, DKIM, and DMARC authentication before any email leaves the queue.",
  },
  {
    question: "How does Scrunity AI discover decision makers without fragile web scrapers?",
    answer:
      "We query 14 enterprise B2B data providers in a cascading waterfall sequence. Every address undergoes real-time MX record verification and SMTP handshake validation. If a primary provider yields an unverified address, the waterfall automatically cascades to secondary providers to ensure a 99.8% zero-bounce rate.",
  },
  {
    question: "Can our team review and approve emails before they are sent?",
    answer:
      "Yes. You can switch between Full Autonomous Mode and Human Approval Mode at any time. In Approval Mode, every drafted email sits in a 1-click review queue where your team can edit, approve, or reject pitches before dispatch.",
  },
  {
    question: "Which CRMs and calendar tools are supported?",
    answer:
      "Scrunity AI connects directly with Google Calendar, Microsoft Outlook, HubSpot, and Salesforce. Confirmed bookings immediately synchronize to your rep's calendar and create enriched deal records in your CRM.",
  },
  {
    question: "How quickly do we see our first booked sales meetings?",
    answer:
      "Most customers see their first booked calendar meetings within 48 to 72 hours of campaign activation. Domain research and ICP synthesis take less than 15 minutes once you enter your domain URL.",
  },
  {
    question: "How does the agent handle replies with questions or objections?",
    answer:
      "Scrunity AI analyzes incoming reply sentiment. When a lead asks for timing changes or details, the agent formulates contextual answers citing your documentation and proposes available time slots directly.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* ── Section Header (Gumloop-Style Clean Eyebrow + Headline) ── */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-neutral-700 shadow-xs">
          <span className="size-1.5 rounded-full bg-neutral-900" />
          Clear Answers
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
          Everything you need to know about deliverability guarantees, waterfall data enrichment, and
          calendar synchronization with Scrunity AI.
        </p>
      </div>

      {/* ── Accordion List (Gumloop-Style Clean White Container) ── */}
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-200/90 bg-white p-5 shadow-xs md:p-7">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-start transition-colors select-none"
              >
                <SubHeading className="text-[17px] md:text-[18px]">
                  {faq.question}
                </SubHeading>
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-neutral-600 transition-transform duration-200",
                    isOpen ? "rotate-180 border-neutral-900 bg-neutral-900 text-white" : "",
                  )}
                >
                  <CaretDownIcon weight="bold" className="size-3.5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pr-8">
                      <Para className="text-sm leading-relaxed text-neutral-600 md:text-base">
                        {faq.answer}
                      </Para>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
