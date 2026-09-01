import { useEffect, useState } from "react";
import { SpinnerIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { TextMorph } from "torph/react";

const TASKS = [
  { id: 1, title: "Extracting deliverables from Scrunity AI" },
  { id: 2, title: "Bug in SVG illustration animation." },
  { id: 3, title: "Feature section takes too long to load." },
  { id: 4, title: "Create a new chat feature i" },
];

export const Illustration2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [taskState, setTaskState] = useState("loading");

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;

    const scheduleNormalFlow = () => {
      setTaskState("loading");

      timer1 = setTimeout(() => {
        setTaskState("success");

        timer2 = setTimeout(() => {
          setActiveIndex((prev) => prev + 1);
        }, 1000);
      }, 1500);
    };

    const scheduleErrorFlow = () => {
      setTaskState("loading");

      timer1 = setTimeout(() => {
        setTaskState("error");

        timer2 = setTimeout(() => {
          setActiveIndex(0);
        }, 5000);
      }, 1500);
    };

    if (activeIndex < TASKS.length - 1) {
      timer1 = setTimeout(scheduleNormalFlow, 0);
    } else if (activeIndex === TASKS.length - 1) {
      timer1 = setTimeout(scheduleErrorFlow, 0);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [activeIndex]);

  const isGlobalError =
    activeIndex === TASKS.length - 1 && taskState === "error";

  return (
    <motion.div
      animate={{ x: isGlobalError ? [-10, 10, -8, 8, -5, 5, 0] : 0 }}
      transition={{ duration: 0.5 }}
      className={`relative flex h-[200px] w-[373px] items-center justify-center overflow-hidden rounded-lg border transition-colors duration-500 ${
        isGlobalError
          ? "border-red-300 bg-red-50"
          : "border-gray-200 bg-gray-50/30"
      }`}
    >
      {TASKS.map((task, index) => {
        const offset = index - activeIndex;
        const isCompleted = offset < 0;
        const isActive = offset === 0;

        let currentStatus = "loading";
        if (isCompleted) currentStatus = "success";
        if (isActive) currentStatus = taskState;

        let subtitle = "Checking";
        if (currentStatus === "success") subtitle = "Within ";
        if (currentStatus === "error") subtitle = "Out of";

        let bgColor = "bg-white";
        let borderColor = "border-gray-200";
        let titleColor = "text-neutral-800";
        let subColor = "text-neutral-400";

        if (currentStatus === "error") {
          bgColor = "bg-red-100";
          borderColor = "border-red-400";
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
            key={task.id}
            initial={false}
            animate={{ y, scale, opacity }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ zIndex }}
            className={`absolute flex h-10 w-64 items-center rounded-lg border px-2 shadow-sm transition-colors duration-300 ${bgColor} ${borderColor}`}
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
            <div className="ml-3 flex flex-col items-start justify-center text-[9px] leading-tight">
              <p
                className={`font-medium transition-colors duration-300 ${titleColor}`}
              >
                {task.title}
              </p>
              <p className={`transition-colors duration-300 ${subColor}`}>
                <TextMorph>{subtitle}</TextMorph> scope
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Success Icon Component
const Tick = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
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

// Error Icon Component
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
        width={14}
        height={14}
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
