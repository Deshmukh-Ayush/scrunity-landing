"use client";

import { useEffect, useState } from "react";
import { SpinnerIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { TextMorph } from "torph/react";

const LEADS = [
  { id: 1, title: "Marcus Vance · VP RevOps @ Synthetix", email: "marcus@synthetix.io" },
  { id: 2, title: "Elena Rostova · Head of Eng @ Kitebase", email: "elena@kitebase.dev" },
  { id: 3, title: "Devon Chen · CTO @ Orbit", email: "devon@orbitpay.com" },
  { id: 4, title: "General Inquiries (info@)", email: "info@genericcorp.com" },
];

export const Illustration2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leadState, setLeadState] = useState("loading");

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;

    const scheduleNormalFlow = () => {
      setLeadState("loading");

      timer1 = setTimeout(() => {
        setLeadState("success");

        timer2 = setTimeout(() => {
          setActiveIndex((prev) => prev + 1);
        }, 1200);
      }, 1500);
    };

    const scheduleErrorFlow = () => {
      setLeadState("loading");

      timer1 = setTimeout(() => {
        setLeadState("error");

        timer2 = setTimeout(() => {
          setActiveIndex(0);
        }, 5000);
      }, 1500);
    };

    if (activeIndex < LEADS.length - 1) {
      timer1 = setTimeout(scheduleNormalFlow, 0);
    } else if (activeIndex === LEADS.length - 1) {
      timer1 = setTimeout(scheduleErrorFlow, 0);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [activeIndex]);

  const isGlobalError =
    activeIndex === LEADS.length - 1 && leadState === "error";

  return (
    <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-gray-200 bg-gray-50 p-[2px]">
      <motion.div
        animate={{ x: isGlobalError ? [-10, 10, -8, 8, -5, 5, 0] : 0 }}
        transition={{ duration: 0.5 }}
        className={`relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border transition-colors duration-500 md:w-[373px] ${
          isGlobalError
            ? "border-red-300 bg-red-50/50"
            : "border-gray-200 bg-gray-50/30"
        }`}
      >
        {LEADS.map((lead, index) => {
          const offset = index - activeIndex;
          const isCompleted = offset < 0;
          const isActive = offset === 0;

          let currentStatus = "loading";
          if (isCompleted) currentStatus = "success";
          if (isActive) currentStatus = leadState;

          let subtitle = "Validating MX";
          if (currentStatus === "success") subtitle = "Verified · Deliverable";
          if (currentStatus === "error") subtitle = "Non-decision maker · Filtered";

          let bgColor = "bg-white";
          let borderColor = "border-gray-200";
          let titleColor = "text-neutral-800";
          let subColor = "text-neutral-400";

          if (currentStatus === "error") {
            bgColor = "bg-red-50";
            borderColor = "border-red-300";
            titleColor = "text-red-900";
            subColor = "text-red-600";
          }

          if (offset > 3) return null;

          let y = offset * 12;
          let scale = 1 - offset * 0.05;
          let opacity = 1 - offset * 0.25;
          let zIndex = 10 - offset;

          if (isCompleted) {
            y = -40;
            scale = 0.95;
            opacity = 0;
            zIndex = 10 - offset;
          }

          return (
            <motion.div
              key={lead.id}
              initial={false}
              animate={{ y, scale, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ zIndex }}
              className={`absolute flex h-11 w-68 items-center rounded-lg border px-2.5 shadow-xs transition-colors duration-300 ${bgColor} ${borderColor}`}
            >
              {/* Icon Container */}
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                {currentStatus === "success" && <Tick />}
                {currentStatus === "error" && <Cross />}
                {currentStatus === "loading" && (
                  <SpinnerIcon className="h-4 w-4 animate-spin text-neutral-700" />
                )}
              </div>

              {/* Text Container */}
              <div className="ml-2.5 flex flex-col items-start justify-center text-[9px] leading-tight truncate">
                <p
                  className={`font-semibold truncate w-full transition-colors duration-300 ${titleColor}`}
                >
                  {lead.title}
                </p>
                <p className={`font-mono text-[8px] transition-colors duration-300 ${subColor}`}>
                  <TextMorph>{subtitle}</TextMorph>
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const Tick = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={13}
        height={13}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          d="M5 12l5 5l10 -10"
        />
      </motion.svg>
    </motion.div>
  );
};

const Cross = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={13}
        height={13}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          d="M18 6l-12 12M6 6l12 12"
        />
      </motion.svg>
    </motion.div>
  );
};
