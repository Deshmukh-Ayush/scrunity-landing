# Motion & Animation Engineering Guide

This guide details the `motion/react` patterns, spring configurations, and choreographed interaction principles used throughout the codebase.

---

## 1. Import Standard

Always import from `"motion/react"` (Motion v13 standard for modern Next.js and React 19):

```tsx
import { motion, useInView, useReducedMotion, useAnimationControls, type Variants } from "motion/react";
```

Do not import from `"framer-motion"` directly unless maintaining legacy packages.

---

## 2. Spring Physics Profiles

Use purpose-built spring physics rather than arbitrary durations and floaty easing curves:

### A. Tactile Press Feedback (Buttons, Tabs)
Instantaneous, non-oscillating response that feels physical:
```tsx
whileTap={{ scale: 0.96 }}
transition={{ type: "spring", duration: 0.3, bounce: 0 }}
```

### B. Micro-Elevations (Card Hover)
Gentle 3-pixel lift with tight damping:
```tsx
whileHover={{ y: -3 }}
transition={{ type: "spring", stiffness: 300, damping: 25 }}
```

### C. Layout Morphing (`layoutId` Transitions)
Smooth retargeting without jitter:
```tsx
transition={{ type: "spring", stiffness: 260, damping: 28 }}
// or
transition={{ type: "spring", duration: 0.5, bounce: 0 }}
```

### D. Status Confirmation Pop (Checkmarks, Badges)
Playful subtle bounce for milestones:
```tsx
transition={{ type: "spring", duration: 0.5, bounce: 0.25, delay: 0.2 }}
```

---

## 3. Viewport Blur-In Reveals

Standard fade-ins feel generic. In this design system, elements enter by clearing a gentle 10px lens blur while ascending:

```tsx
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });

<motion.div
  ref={ref}
  initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
  animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
>
  {children}
</motion.div>
```

---

## 4. Staggered Container Coordination

For grids, lists, and pricing tiers:

```tsx
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.23, 1, 0.32, 1], // Custom strong ease-out
    },
  },
};

// Usage:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={cardVariants}>
      <Card item={item} />
    </motion.div>
  ))}
</motion.div>
```

---

## 5. Physical Card Deck Stacking Math

Used in `Illustration2` to render a stacked deck of interactive task cards:

```tsx
const offset = index - activeIndex;
const isCompleted = offset < 0;
const isActive = offset === 0;

// Discard cards that are too far behind or ahead
if (offset > 3) return null;

let y = offset * 12;                 // 12px vertical step per card
let scale = 1 - offset * 0.05;       // 5% scale reduction per depth level
let opacity = 1 - offset * 0.25;     // 25% opacity drop per depth level
let zIndex = 10 - offset;

// Completed item flies upward and vanishes
if (isCompleted) {
  y = -40;
  scale = 0.95;
  opacity = 0;
  zIndex = 10 - offset;
}

<motion.div
  key={task.id}
  initial={false}
  animate={{ y, scale, opacity }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  style={{ zIndex }}
  className="absolute h-10 w-64 rounded-lg border px-2 shadow-sm bg-white"
>
  {/* Card content */}
</motion.div>
```

### Error Shake Profile:
When an item encounters an error state, trigger a quick multi-frequency lateral jolt:
```tsx
animate={{ x: isError ? [-10, 10, -8, 8, -5, 5, 0] : 0 }}
transition={{ duration: 0.5 }}
```

---

## 6. SVG Path Length Draw Animations

For checkmarks and success states:

```tsx
<motion.svg
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
```

---

## 7. Morphing with Shared `layoutId`

Framer Motion / Motion React automatically interpolates bounding box, border radius, and position when two different elements share the same `layoutId`:

```tsx
// State A: Compact Drag & Drop Zone
{!isExpanded && (
  <motion.div
    layoutId="dashboard-shell"
    className="h-24 w-40 rounded-lg border border-dashed border-neutral-200 bg-white"
  >
    <DropContent />
  </motion.div>
)}

// State B: Expanded Active Project Dashboard
{isExpanded && (
  <motion.div
    layoutId="dashboard-shell"
    className="h-full w-full rounded-lg border border-gray-200 bg-white"
  >
    <FullDashboardContent />
  </motion.div>
)}
```

---

## 8. Accessibility & Reduced Motion

Always respect `prefers-reduced-motion` using `useReducedMotion()`:

```tsx
const shouldReduceMotion = useReducedMotion();

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 16,
    filter: shouldReduceMotion ? "none" : "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: { duration: shouldReduceMotion ? 0.1 : 0.4 },
  },
};
```
