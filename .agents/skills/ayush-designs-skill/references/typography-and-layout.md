# Typography & Layout Engineering Guide

This guide details the structural layout rules, typography components, and token specifications that form the backbone of this landing page architecture.

---

## 1. The Container Component (`components/container.tsx`)

The `Container` is the foundational layout primitive. Every landing page section must be wrapped in it to guarantee consistent max-width, center alignment, and background tone.

```tsx
import { cn } from "@/lib/utils";
import React from "react";

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto max-w-7xl bg-gray-50", className)}>
      {children}
    </div>
  );
};
```

### Layout Rules with Container:
- **Hero Header**:
  ```tsx
  <Container className="overflow-hidden">
    <div className="flex flex-col items-start justify-between gap-4 px-10 pt-20 pb-10 md:flex-row md:items-end md:gap-6 md:pt-40">
      <Heading className="leading-none md:leading-16">
        Save time <br /> and think less
      </Heading>
      <div className="flex flex-col items-start justify-between gap-6 py-1">
        <Para className="text-start">
          Contracts, Deliverables, E-Signatures, Payment Tracking, <br className="hidden md:inline" />
          Timelines and more. Join the waitlist to get early access.
        </Para>
        <div className="flex flex-wrap items-center justify-start gap-4">
          <button className="cursor-pointer rounded-full px-6 py-2 text-[15px] text-neutral-800">
            <Link href="/waitlist">Join Waitlist</Link>
          </button>
          <Button href="/join">Get Early Access</Button>
        </div>
      </div>
    </div>
  </Container>
  ```
- **Main Section Body Container**:
  Always use `border-x border-gray-200 px-10.5 py-20 pb-10`:
  ```tsx
  <Container className="mt-10 min-h-screen border-x border-gray-200 px-10.5 py-20 pb-10">
    {/* Sections separated by <Divider /> */}
  </Container>
  ```

---

## 2. The Architectural Breakout Divider (`components/utility/divider.tsx`)

Instead of standard HR lines that stop inside container padding, the `Divider` breaks out to the full browser window width (`w-screen`) while remaining inside the `relative` context of the centered container. This forms a crisp, intersecting technical blueprint grid against the container's `border-x`.

```tsx
import { cn } from "@/lib/utils";
import React from "react";

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative left-1/2 h-px w-screen -translate-x-1/2 bg-gray-200",
        className,
      )}
    />
  );
}
```

---

## 3. Typography Hierarchy (`components/utility/texts.tsx`)

Every text block uses viewport-aware blur reveals driven by `motion/react` and `useInView`.

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref);

  return (
    <motion.h2
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className={cn(
        "inline text-[36px] font-medium tracking-tight text-neutral-800 md:text-[56px]",
        className,
      )}
    >
      {children}
    </motion.h2>
  );
};

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref);
  return (
    <motion.h2
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      ref={ref}
      className={cn(
        "inline text-[24px] font-medium tracking-tighter text-neutral-800 md:text-[28px]",
        className,
      )}
    >
      {children}
    </motion.h2>
  );
};

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref);
  return (
    <motion.p
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      className={cn(
        "text-[16px] font-medium tracking-tight text-neutral-500",
        className,
      )}
    >
      {children}
    </motion.p>
  );
};
```

### Accent Keyword Pattern in SubHeadings:
To emphasize key value props without screaming, wrap keywords in subtle pill badges:
```tsx
<SubHeading className="flex flex-col items-start justify-center">
  <p>
    Turns{" "}
    <span className="rounded-lg bg-blue-200/50 p-0.5 text-cyan-500">
      contracts
    </span>{" "}
    into living workspaces
  </p>
  <p>
    Executes{" "}
    <span className="rounded-lg bg-gray-200/50 p-0.5 text-neutral-500">
      tasks
    </span>{" "}
    using smart agents
  </p>
</SubHeading>
```

---

## 4. The Pill Action Button (`components/utility/button.tsx`)

The primary button features tactile inset illumination and physical spring release:

```tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children" | "type"> & {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  className,
  href,
  type,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      type={type ?? "button"}
      className={cn(
        "text-shadow cursor-pointer rounded-full border border-neutral-800 bg-neutral-800 px-6 py-2 text-[15px] text-neutral-50 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]",
        className,
      )}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </motion.button>
  );
};
```

### Button Optical Alignment:
When an icon is appended to the right of text inside a pill button:
- Use `ps-5 pe-4` (start padding 20px, end padding 16px).
- The 4px offset visually balances the icon's bounding box against the letterforms.

---

## 5. Concentric Border Radius Formula

Whenever nesting cards inside padded containers, uncoordinated radii make an interface look amateurish. Always apply the concentric formula:

$$\text{Radius}_{\text{inner}} = \text{Radius}_{\text{outer}} - \text{Padding}$$

### Production Examples:
1. **Pricing Card**:
   - Outer wrapper: `rounded-[24px]` with `p-2` (8px padding)
   - Inner card: $24 - 8 = 16\text{px}$ → `rounded-[16px]`
2. **Newsletter Card**:
   - Outer wrapper: `rounded-[20px]` with `p-1.5` (6px padding)
   - Inner card: $20 - 6 = 14\text{px}$ → `rounded-[14px]`
3. **Illustration Container**:
   - Outer wrapper: `rounded-[10px]` with `p-[2px]` (2px padding)
   - Inner card: $10 - 2 = 8\text{px}$ → `rounded-lg`

---

## 6. Shadows and Elevation Tokens

In `globals.css`:
```css
:root {
  --shadow-border-sm:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);

  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);

  --border-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08);
}
```
Apply via classes `.shadow-border-sm` or `.shadow-border` on white cards for clean definition without blurry drop-shadow mud.
