# Motion Recipes & Micro-Interaction Formulas

Copy-pasteable, production-ready motion recipes implementing the exact physics of **Ayush Taste**.

---

## 1. SVG Cursive E-Signature & Inking

Draws a handwritten signature stroke using SVG `pathLength` while coordinating an automated cursor.

```tsx
import { motion, useAnimationControls } from "motion/react";
import { CursorIcon } from "@phosphor-icons/react";

// Signature box viewport: 48x18
// Path starts at (2, 13) and ends at (46, 5)
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
        pathLength: {
          duration: 0.75,
          ease: [0.32, 0.72, 0, 1], // iOS deceleration curve
        },
        opacity: { duration: 0.1 },
      }}
    />
  </svg>

  {/* Coordinated Client Cursor */}
  <motion.div
    animate={cursorControls}
    initial={{ opacity: 0, x: 40, y: 20, scale: 1 }}
    className="pointer-events-none absolute -top-1 left-0 z-20"
  >
    <CursorIcon
      size={15}
      weight="fill"
      className="-rotate-15 text-neutral-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
    />
  </motion.div>
</div>
```

**Cursor Animation Sequence:**
```ts
// 1. Cursor glides to start of signature line
cursorControls.set({ opacity: 1, x: 40, y: 20 });
await cursorControls.start({
  x: 2,
  y: 11,
  transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
});

// 2. Tactile click down
await cursorControls.start({
  scale: 0.82,
  transition: { duration: 0.12 },
});

// 3. Signature inks while cursor sweeps
setIsSigned(true);
await cursorControls.start({
  x: 44,
  y: 4,
  scale: 0.9,
  transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
});

// 4. Cursor lifts & dissolves
await cursorControls.start({
  scale: 1,
  opacity: 0,
  transition: { duration: 0.22, ease: "easeOut" },
});
```

---

## 2. The AI Radar Light-Beam Scanner

Simulates an AI engine scanning lines of text or feedback comments.

```tsx
<div className="relative flex flex-col gap-1.5 overflow-hidden rounded-sm py-0.5">
  {/* Light-Scan Beam */}
  {isScanning && (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "250%" }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent blur-[2px]"
    />
  )}

  {/* Skeleton Lines */}
  <motion.div
    initial={{ scaleX: 0.92, opacity: 0.6 }}
    animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    className="h-1.5 w-full origin-left rounded-full bg-gray-100"
  />
  <motion.div
    initial={{ scaleX: 0.92, opacity: 0.6 }}
    animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.06 }}
    className="h-1.5 w-4/5 origin-left rounded-full bg-gray-100"
  />
  <motion.div
    initial={{ scaleX: 0.92, opacity: 0.6 }}
    animate={{ scaleX: 1, opacity: isVerified ? 0.9 : 0.65 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.12 }}
    className="h-1.5 w-3/5 origin-left rounded-full bg-gray-100"
  />
</div>
```

---

## 3. Physical Lock Shackle Unlatch

Simulates an escrow release or permission unlocked by translating the shackle upward.

```tsx
<svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0 overflow-visible">
  {/* Lock Body */}
  <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
  
  {/* Tactile Unlocking Shackle */}
  <motion.path
    d="M8 11V7a4 4 0 0 1 8 0v4"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    animate={{ y: isUnlocked ? -3 : 0 }}
    transition={{ type: "spring", stiffness: 450, damping: 20 }}
  />
</svg>
```

---

## 4. Perforated Scalloped Ticket Notch

Creates the tactile look of a physical receipt or tear-off voucher on top of a card.

```tsx
{/* Notch sitting on the top edge of a white card against a gray-50 (#F9FAFB) canvas */}
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

---

## 5. Dual-Stage Shield Checkmark

```tsx
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-blue-500">
  {/* Outer Shield Contour */}
  <motion.path
    d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    initial={{ pathLength: 0.4 }}
    animate={{ pathLength: isVerified ? 1 : 0.4 }}
    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
  />
  {/* Internal Checkmark */}
  <motion.path
    d="m9 12 2 2 4-4"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: isVerified ? 1 : 0 }}
    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
  />
</svg>
```

---

## 6. The `TextMorph` Transition Pattern

```tsx
import { TextMorph } from "torph/react";

<motion.span
  animate={isResolved ? { scale: [0.95, 1.03, 1] } : { scale: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${
    isResolved
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-neutral-200 bg-neutral-50 text-neutral-500"
  }`}
>
  <TextMorph>
    {isResolved ? "Payment proof verified" : "Verifying payment proof..."}
  </TextMorph>
</motion.span>
```
