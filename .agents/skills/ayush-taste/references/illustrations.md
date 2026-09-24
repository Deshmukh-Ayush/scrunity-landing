# The Living Illustration Atlas & Reference Library

This document contains the canonical, production-tested reference implementations extracted from the Scrunity landing page (`src/components/features-one`, `src/components/how-it-works`, and `src/components/join`).

Every illustration built with **Ayush Taste** must be modeled after one of these proven architectural archetypes.

---

## 1. Core Principle: What Is a "Living Illustration"?

Generic landing pages use:
* Static PNG screenshots that become outdated.
* Abstract 3D geometric shapes or floating blobs that communicate nothing about software.
* Icon-in-circle cards with three bullet points.

**Ayush Taste Living Illustrations** use:
1. **Real In-Code Micro-Interfaces**: Form elements, avatars, document badges, tab bars, file cards, e-signature boxes, skeleton metrics, and invoice tickets.
2. **Interactive System Mechanics**: Staged state machines simulating real client interactions:
   - A client signing a contract with realistic inking.
   - An AI engine scanning feedback comments and locking in scope protection.
   - Escrow funds releasing as an invoice lock physically unlatches.
   - A PDF dropping into a dropzone and morphing via `layoutId` into an active dashboard.
   - An automated cursor clicking a button that morphs into an approved receipt.
3. **Tasteful Ambient Atmosphere**: Masked architectural grid backdrop (`26px_26px` with radial ellipse mask) combined with soft, breathing ambient backlighting via `GlowEffect`.
4. **Fluid Typography Shifts**: Character-by-character text transitions using `TextMorph` from `torph/react`.

---

## 2. Canonical Archetype 1: The E-Signature Agreement (`Card1`)

Located at: `src/components/how-it-works/card-1.tsx`

### Story & Purpose
Represents onboarding a client: sending an invitation, validating project scope deliverables, and capturing an authentic client e-signature in real-time.

```
┌──────────────────────────────────────────────┐
│  [A] Proposal & Scope        [Invite Sent]   │
│                                              │
│  (✓) Discovery & UX                          │
│  (✓) Brand Kit                               │
│                                              │
│  ──────────────────────────────────────────  │
│  [   ✍️ Signature Stroke   ]  [Signed $4,500]│
│  e-signature · 🟢                            │
└──────────────────────────────────────────────┘
```

### Complete Implementation
```tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { CursorIcon } from "@phosphor-icons/react";
import { TextMorph } from "torph/react";
import { GlowEffect } from "../join/glow-effect";

export const Card1 = () => {
  const shouldReduceMotion = useReducedMotion();
  const [item1Checked, setItem1Checked] = useState(false);
  const [item2Checked, setItem2Checked] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const cursorControls = useAnimationControls();
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMountedRef = useRef(true);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      if (isMountedRef.current) fn();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const runSequence = useCallback(async () => {
    clearAllTimeouts();

    setIsResetting(false);
    setItem1Checked(false);
    setItem2Checked(false);
    setIsSigned(false);
    cursorControls.set({ opacity: 0, x: 42, y: 22, scale: 1 });

    if (shouldReduceMotion) {
      setItem1Checked(true);
      setItem2Checked(true);
      setIsSigned(true);
      return;
    }

    // Deliverable 1 checks in
    schedule(() => setItem1Checked(true), 600);

    // Deliverable 2 checks in
    schedule(() => setItem2Checked(true), 1300);

    // Cursor approaches signature line
    schedule(async () => {
      cursorControls.set({ opacity: 1, x: 40, y: 20 });
      await cursorControls.start({
        x: 2,
        y: 11,
        transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
      });

      // Tactile click down
      await cursorControls.start({
        scale: 0.82,
        transition: { duration: 0.12 },
      });

      // Signature inks while cursor sweeps
      setIsSigned(true);
      await cursorControls.start({
        x: 44,
        y: 4,
        scale: 0.9,
        transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
      });

      // Cursor lifts & dissolves
      await cursorControls.start({
        scale: 1,
        opacity: 0,
        transition: { duration: 0.22, ease: "easeOut" },
      });
    }, 2000);

    // Hold verified state for 4.2s, then soft-blur reset
    schedule(() => {
      setIsResetting(true);
      schedule(runSequence, 350);
    }, 6800);
  }, [clearAllTimeouts, cursorControls, schedule, shouldReduceMotion]);

  useEffect(() => {
    isMountedRef.current = true;
    runSequence();
    return () => {
      isMountedRef.current = false;
      clearAllTimeouts();
    };
  }, [runSequence, clearAllTimeouts]);

  return (
    <div className="relative flex h-[200px] w-full select-none items-center justify-center overflow-hidden rounded-lg border border-[#eaeaea] p-[2px] md:w-[373px]">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[26px_26px]" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-48 -translate-x-1/2 -translate-y-1/2 opacity-35 transition-opacity duration-700">
        <GlowEffect
          colors={
            isSigned
              ? ["#10b981", "#06b6d4", "#3b82f6", "#10b981"]
              : ["#38bdf8", "#818cf8", "#3b82f6", "#38bdf8"]
          }
          mode="breathe"
          blur="stronger"
          duration={6}
          scale={1.2}
        />
      </div>

      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => {
          if (isSigned) runSequence();
          else {
            setItem1Checked(true);
            setItem2Checked(true);
            setIsSigned(true);
            cursorControls.set({ opacity: 0 });
          }
        }}
        className={`relative z-10 mt-10 h-full w-[173px] cursor-pointer rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ${
          isResetting ? "opacity-60 blur-[1px]" : "opacity-100 blur-none"
        }`}
      >
        <div className="relative flex h-full flex-col p-3">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[9px] font-medium text-white shadow-xs">
                A
              </div>
              <p className="truncate text-[10px] leading-4 font-medium tracking-[-0.01em] text-[#171717]">
                Proposal & Scope
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] leading-3 font-medium transition-colors duration-300 ${
                isSigned
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-[#dbeafe] bg-[#eff6ff] text-[#2563eb]"
              }`}
            >
              <TextMorph>{isSigned ? "Signed" : "Invite Sent"}</TextMorph>
            </span>
          </div>

          {/* Scope Deliverables */}
          <div className="mt-4 space-y-2.5">
            {[
              { label: "Discovery & UX", checked: item1Checked },
              { label: "Brand Kit", checked: item2Checked },
            ].map(({ label, checked }) => (
              <div key={label} className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: checked ? [1, 1.18, 1] : 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                    checked
                      ? "bg-[#171717] text-white"
                      : "border border-neutral-300 bg-neutral-100 text-transparent"
                  }`}
                >
                  <svg width="8" height="8" viewBox="0 0 10 8" fill="none" className="stroke-current">
                    <motion.path
                      d="M1.5 4.2L3.8 6.5L8.5 1.8"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: checked ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </svg>
                </motion.div>
                <span
                  className={`text-[10px] leading-4 transition-colors duration-200 ${
                    checked ? "text-[#4d4d4d]" : "text-neutral-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* E-Signature & Bottom Pill */}
          <div className="mt-auto">
            <div className="mb-1.5 h-px w-full bg-[#eaeaea]" />
            <div className="relative flex items-end justify-between gap-2">
              <div>
                <div className="relative mb-0.5 h-[18px] w-[48px] border-b border-[#171717]">
                  <svg viewBox="0 0 48 18" className="h-full w-full" aria-hidden="true">
                    <motion.path
                      d="M2 13C7 6 8 15 12 9C16 3 18 14 22 8C27 0 27 15 32 9C36 4 38 13 46 5"
                      fill="none"
                      stroke="#171717"
                      strokeWidth="1.15"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: isSigned ? 1 : 0,
                        opacity: isSigned ? 1 : 0,
                      }}
                      transition={{
                        pathLength: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
                        opacity: { duration: 0.1 },
                      }}
                    />
                  </svg>
                  <motion.div
                    animate={cursorControls}
                    initial={{ opacity: 0, x: 40, y: 20, scale: 1 }}
                    className="pointer-events-none absolute -top-1 left-0 z-20"
                  >
                    <CursorIcon size={15} weight="fill" className="-rotate-15 text-neutral-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" />
                  </motion.div>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[7px] font-medium text-[#8f8f8f]">e-signature</p>
                  {isSigned && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="size-1 rounded-full bg-emerald-500"
                    />
                  )}
                </div>
              </div>

              <motion.span
                animate={isSigned ? { scale: [0.94, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`rounded-full border px-1.5 py-1 text-[8px] font-medium transition-colors duration-300 ${
                  isSigned
                    ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                    : "border-neutral-200 bg-neutral-50 text-neutral-500"
                }`}
              >
                <TextMorph>{isSigned ? "Signed · $4,500" : "Awaiting · $4,500"}</TextMorph>
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

---

## 3. Canonical Archetype 2: The AI Scope Scanner (`Card2`)

Located at: `src/components/how-it-works/card-2.tsx`

### Story & Purpose
Represents AI-powered scope protection: deliverable file upload, client comment arrival, an AI light-beam reading feedback, and an agreement shield locking in.

```
┌──────────────────────────────────────────────┐
│  📄 Design_System_v2.fig    [• Rev 1 of 2]   │
│                                              │
│  🛡️ [Scope: within agreement]               │
│                                              │
│  Feedback preview          Verified · 0 creep│
│  [═══════💡AI SCAN BEAM════════════════]     │
│  [══════════════════════════════]            │
│  [═════════════════]                         │
└──────────────────────────────────────────────┘
```

### Key Techniques
1. **The Light Beam Scanner**:
   A GPU-accelerated gradient sweep that travels horizontally across comment bars:
   ```tsx
   <motion.div
     initial={{ x: "-100%" }}
     animate={{ x: "250%" }}
     transition={{ duration: 0.85, ease: "easeInOut" }}
     className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent blur-[2px]"
   />
   ```
2. **Dual-Stage SVG Shield**:
   Outer shield contour animates `pathLength: 0.4 → 1` (0.35s). Inner checkmark strikes in with `delay: 0.1s`.

---

## 4. Canonical Archetype 3: The Scalloped Ticket & Escrow Unlocking (`Card3`)

Located at: `src/components/how-it-works/card-3.tsx`

### Story & Purpose
Represents milestone payment release: automated invoice generation, payment proof validation, and the escrow lock physically opening.

```
┌──────────────────────────────────────────────┐
│  ▲▲▲▲▲▲▲▲▲ TICKET SCALLOP NOTCH ▲▲▲▲▲▲▲▲▲▲   │
│  Invoice #1042 · Milestone 2                 │
│                                              │
│               $3,500.00                      │
│  - - - - - - - - - - - - - - - - - - - - - - │
│  (✓) [Payment proof verified]                │
│  🔓 Milestone released                       │
└──────────────────────────────────────────────┘
```

### Key Techniques
1. **Perforated Ticket Notch**:
   Uses CSS `radial-gradient` matching container background `#F9FAFB`:
   ```tsx
   <div
     aria-hidden
     className="pointer-events-none absolute inset-x-0 top-0 h-3.5 -translate-y-1/2"
     style={{
       backgroundImage:
         "radial-gradient(circle at 7px 7px, #F9FAFB 7px, transparent 7.2px)",
       backgroundSize: "14px 14px",
       backgroundRepeat: "repeat-x",
       backgroundPosition: "top left",
     }}
   />
   ```
2. **Lock Shackle Physical Unlatch**:
   The shackle path in the lock SVG translates upwards:
   ```tsx
   <motion.path
     d="M8 11V7a4 4 0 0 1 8 0v4"
     stroke="currentColor"
     strokeWidth="1.6"
     strokeLinecap="round"
     animate={{ y: isVerified ? -3 : 0 }}
     transition={{ type: "spring", stiffness: 450, damping: 20 }}
   />
   ```

---

## 5. Canonical Archetype 4: Dropped Entity Morphing into Live Dashboard (`Illustration1`)

Located at: `src/components/features-one/illustration1.tsx`

### Story & Purpose
Represents dropping a raw file (contract, document, dataset) into an onboarding zone, which morphs via Motion's `layoutId` into a fully rendered, responsive dashboard with active skeleton metrics.

### Key Techniques
* **Shared `layoutId` Morphing**: The drop zone border morphs into the dashboard window (`layoutId="scr-outer"`).
* **Staggered Skeleton Reveal**: Navigation bars and metric bar charts reveal via `{ opacity: 1, filter: "blur(0px)" }` once the morph settles.

---

## 6. Canonical Archetype 5: The 3D Stacked Card Deck (`Illustration2`)

Located at: `src/components/features-one/illustration2.tsx`

### Story & Purpose
Represents cycling through a queue of tasks or deliverables with a physical stacked perspective deck, transitioning states (`loading` → `success` → `error`), with SVG checkmarks and a red error shake animation.

### Key Techniques
```tsx
const offset = index - activeIndex;
const y = offset * 12;
const scale = 1 - offset * 0.05;
const opacity = 1 - offset * 0.25;
const zIndex = 10 - offset;

<motion.div
  animate={{ y, scale, opacity }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  style={{ zIndex }}
  className="absolute flex h-10 w-64 items-center rounded-lg border px-2 shadow-sm"
/>
```
* **Full-card Error Shake**: `animate={{ x: isError ? [-10, 10, -8, 8, -5, 5, 0] : 0 }}`.

---

## 7. Canonical Archetype 6: Automated Cursor Click Morphing to Invoice (`Illustration3`)

Located at: `src/components/features-one/illustration3.tsx`

### Story & Purpose
An automated cursor glides to a dark pill CTA (`Approve Deliverable`), clicks down in tandem, releases, and morphs via `layoutId="outer"` into a complete invoice with itemized breakdown and approved status.
